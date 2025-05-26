import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const isAdmin = event.context.auth?.user?.role === "ADMIN";
        // if (!isAdmin) {
        //     return ErrorHandler.handleError(event, { statusCode: 403, statusMessage: "Akses terlarang. Hanya admin yang dapat melihat analitik platform." });
        // }

        const revenueByMonth = await Transaction.getRevenueByMonth();
        const transactionTrends = await Transaction.getTransactionTrends();

        return ResponseHandler.sendSuccess(event, "Analitik platform berhasil diambil!", {
            revenueByMonth,
            transactionTrends
        }, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
