import { uploadFile } from "~/server/utils/UploadFiles";
import { Property } from "~/server/models/Property";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import {PropertyStatus} from "@prisma/client";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;
        if (!user) {
            return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User not authenticated." });
        }

        const id = parseInt(event.context.params?.id as string); // 🔥 Ambil ID properti dari URL
        if (isNaN(id)) {
            return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Properti ID tidak valid." });
        }

        const existingProperty = await Property.getPropertyById(id);
        if (!existingProperty) {
            return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Properti tidak ditemukan." });
        }

        if (existingProperty.ownerId !== user.id) {
            return ErrorHandler.handleError(event, { statusCode: 403, statusMessage: "Tidak memiliki izin untuk update properti ini." });
        }

        const formData = await readMultipartFormData(event);
        if (!formData) {
            return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "No form data provided." });
        }

        const payload: Partial<{
            name: string;
            description: string;
            address: string;
            city: string;
            price: number;
            totalRooms: number;
            availableRooms: number;
            status: PropertyStatus;
            images: string;
        }> = {};

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
                        payload.status = rawStatus === "ACTIVE" ? PropertyStatus.ACTIVE : PropertyStatus.INACTIVE;
                        break;
                }
            }
        }

        try {
            const updatedProperty = await Property.updateProperty(id, payload);
            return { code: 200, message: "Properti berhasil diperbarui!", data: updatedProperty };
        } catch (dbError: any) {
            return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: dbError.message || "Gagal memperbarui properti di database." });
        }

    } catch (error: any) {
        return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: error.message || "Internal Server Error" });
    }
});
