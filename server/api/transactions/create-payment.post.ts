import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const tenantId = event.context.auth?.user?.id;
        if (!tenantId) {
            return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
        }

        const data = await readBody(event);
        if (!data.bookingId || !data.paymentMethod) {
            return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Harap berikan `bookingId` dan metode pembayaran." });
        }

        const transaction = await Transaction.createTransaction(data.bookingId, data.paymentMethod, data.notes);
        return ResponseHandler.sendCreated(event, "Pembayaran berhasil dibuat!", transaction, 201);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
