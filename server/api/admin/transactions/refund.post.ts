import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { PaymentStatus } from "@prisma/client";

export default defineEventHandler(async (event) => {
    try {
        // Pastikan hanya admin yang bisa memproses refund
        const user = event.context.auth?.user;
        if (!user || user.role !== "ADMIN") {
            return ErrorHandler.handleError(event, { statusCode: 403, statusMessage: "Akses terlarang. Hanya admin yang dapat memproses refund." });
        }

        // Pastikan ada `transactionId` dalam request body
        const { transactionId } = await readBody(event);
        if (!transactionId) {
            return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Harap berikan `transactionId` untuk refund." });
        }

        // Cek apakah transaksi benar-benar ada
        const transaction = await Transaction.getTransactionById(transactionId);
        if (!transaction) {
            return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Transaksi tidak ditemukan." });
        }

        // Hanya transaksi dengan status SUCCESS yang bisa direfund
        if (transaction.status !== PaymentStatus.SUCCESS) {
            return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Hanya transaksi sukses yang dapat direfund." });
        }

        // Refund dengan status baru
        const refundedTransaction = await Transaction.updateTransaction(transaction.id, PaymentStatus.FAILED); // Bisa buat enum REFUNDED kalau diperlukan

        return ResponseHandler.sendSuccess(event, "Refund berhasil diproses!", { refundedTransaction }, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
