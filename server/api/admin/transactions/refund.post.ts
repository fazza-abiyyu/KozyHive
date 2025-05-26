import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { PaymentStatus } from "@prisma/client";

export default defineEventHandler(async (event) => {
    try {
        const adminId = event.context.auth?.user?.id;
        const isAdmin = event.context.auth?.user?.role === "ADMIN";
        // if (!adminId || !isAdmin) {
        //     return ErrorHandler.handleError(event, { statusCode: 403, statusMessage: "Akses terlarang. Hanya admin yang dapat memproses refund." });
        // }

        const data = await readBody(event);
        if (!data.transactionId) {
            return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Harap berikan `transactionId` untuk refund." });
        }

        const transaction = await Transaction.getTransactionById(data.transactionId);
        if (!transaction) {
            return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Transaksi tidak ditemukan." });
        }

        if (transaction.status !== PaymentStatus.SUCCESS) {
            return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Hanya transaksi sukses yang dapat direfund." });
        }

        const refundedTransaction = await Transaction.updateTransaction(transaction.id, {
            status: PaymentStatus.FAILED, // Bisa dibuat enum REFUNDED jika ada
            notes: "Refund telah diproses oleh admin.",
        });

        return ResponseHandler.sendSuccess(event, "Refund berhasil diproses!", refundedTransaction, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
