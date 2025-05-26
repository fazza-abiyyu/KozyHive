import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const data = await readBody(event);
        if (!data.bookingId || !data.status) {
            return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Harap berikan `bookingId` dan status pembayaran." });
        }

        const transaction = await Transaction.getTransactionByBookingId(data.bookingId);
        if (!transaction) {
            return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Transaksi tidak ditemukan untuk booking ini." });
        }

        const updatedTransaction = await Transaction.updateTransaction(transaction.id, {
            status: data.status,
            paymentId: data.paymentId,
            paymentDate: new Date(),
        });

        return ResponseHandler.sendSuccess(event, "Pembayaran berhasil dikonfirmasi!", updatedTransaction, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
