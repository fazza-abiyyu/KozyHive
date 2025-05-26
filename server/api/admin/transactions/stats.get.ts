import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const adminId = event.context.auth?.user?.id;
        const isAdmin = event.context.auth?.user?.role === "ADMIN";
        // if (!adminId || !isAdmin) {
        //     return ErrorHandler.handleError(event, { statusCode: 403, statusMessage: "Akses terlarang. Hanya admin yang dapat melihat statistik transaksi." });
        // }

        const totalTransactions = await Transaction.getTotalTransactionCount();
        const totalRevenue = await Transaction.getTotalRevenue();
        const successfulTransactions = await Transaction.getTotalTransactionsByStatus("SUCCESS");
        const failedTransactions = await Transaction.getTotalTransactionsByStatus("FAILED");

        return ResponseHandler.sendSuccess(event, "Statistik transaksi berhasil diambil!", {
            totalTransactions,
            totalRevenue,
            successfulTransactions,
            failedTransactions
        }, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
