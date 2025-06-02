import { uploadFile } from "~/server/utils/UploadFiles";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { Booking } from "~/server/models/Booking"; // Pastikan model Booking diimpor jika belum ada

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        const user = event.context.auth?.user;
        if (!user) {
            return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User not authenticated." });
        }

        const formData = await readMultipartFormData(event);
        if (!formData) {
            return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "No form data provided." });
        }

        let paymentLink = "";

        for (const field of formData) {
            const filename = field.filename;
            const data = field.data;
            const type = field.type;

            if (filename) {
                const fileBuffer = data as Buffer;
                const fileName = `${filename.replace(/\s/g, "_")}_${Date.now()}`;

                try {
                    const uploadResult = await uploadFile({
                        fileBuffer,
                        filename: fileName,
                        mimeType: type,
                    });

                    if (!uploadResult || !uploadResult.secure_url) {
                        throw new Error("Gagal mengupload file.");
                    }

                    paymentLink = uploadResult.secure_url; // Simpan link hasil upload
                } catch (uploadError: any) {
                    return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: uploadError.message || "Gagal mengupload file." });
                }
            }
        }

        // Perbarui paymentLink di database
        try {
            const updatedBooking = await Booking.updatePaymentLink(id, paymentLink);
            return ResponseHandler.sendSuccess(event, "Payment link berhasil diperbarui!", updatedBooking, 200);
        } catch (dbError: any) {
            return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: dbError.message || "Gagal menyimpan data ke database." });
        }

    } catch (error: any) {
        return ErrorHandler.handleError(event, { statusCode: 500, statusMessage: error.message || "Internal Server Error" });
    }
});
