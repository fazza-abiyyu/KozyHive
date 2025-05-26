import { uploadFile } from "~/server/utils/UploadFiles";
import { Property } from "~/server/models/Property";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { $Enums } from "~/generated/prisma";
import PropertyStatus = $Enums.PropertyStatus;

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;
        if (!user) {
            return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User not authenticated." });
        }

        const formData = await readMultipartFormData(event);

        if (!formData) {
            return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "No form data provided." });
        }

        // 🔹 Inisialisasi payload untuk properti
        const payload: {
            ownerId: number;
            name: string;
            description: string;
            address: string;
            city: string;
            price: number;
            totalRooms: number;
            availableRooms: number;
            status: PropertyStatus;
            images: string;
        } = {
            ownerId: user.id,
            name: "",
            description: "",
            address: "",
            city: "",
            price: 0,
            totalRooms: 1,
            availableRooms: 1,
            status: PropertyStatus.INACTIVE,
            images: "",
        };

        let uploadResult;

        for (const field of formData) {
            const { name, data, filename, type } = field;

            if (typeof name !== "string") continue;

            if (filename) {
                const fileBuffer = data as Buffer;
                const fileName = `${filename.replace(/\s/g, "_")}_${Date.now()}`;

                try {
                    uploadResult = await uploadFile(<any>{
                        fileBuffer,
                        filename: fileName,
                        mimeType: type,
                    });

                    if (!uploadResult || !uploadResult.secure_url) {
                        throw new Error("Gagal mengupload gambar.");
                    }

                    payload.images = uploadResult.secure_url;
                } catch (uploadError: any) {
                    return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: uploadError.message || "Gagal mengupload gambar." });
                }
            } else if (data) {
                switch (name) {
                    case "name":
                        payload.name = data.toString("utf-8").trim();
                        break;
                    case "description":
                        payload.description = data.toString("utf-8").trim();
                        break;
                    case "address":
                        payload.address = data.toString("utf-8").trim();
                        break;
                    case "city":
                        payload.city = data.toString("utf-8").trim();
                        break;
                    case "price":
                        payload.price = parseFloat(data.toString("utf-8").trim());
                        break;
                    case "totalRooms":
                        payload.totalRooms = parseInt(data.toString("utf-8").trim(), 10);
                        break;
                    case "availableRooms":
                        payload.availableRooms = parseInt(data.toString("utf-8").trim(), 10);
                        break;
                    case "status":
                        const rawStatus = data.toString("utf-8").trim().toUpperCase();
                        payload.status = rawStatus === "INACTIVE" ?  PropertyStatus.INACTIVE : PropertyStatus.ACTIVE;
                        break;
                }
            }
        }

        // 🔹 Validasi apakah semua field penting sudah terisi
        if (!payload.name || !payload.description || !payload.address || !payload.city || !payload.price) {
            return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Semua field wajib diisi!" });
        }

        // 🔹 Buat properti baru di database
        try {
            const newProperty = await Property.createProperty(payload);
            return { code: 201, message: "Properti berhasil ditambahkan!", data: newProperty };
        } catch (dbError: any) {
            return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: dbError.message || "Gagal menyimpan properti ke database." });
        }

    } catch (error: any) {
        return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: error.message || "Internal Server Error" });
    }
});
