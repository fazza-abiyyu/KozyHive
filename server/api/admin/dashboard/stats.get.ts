import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { PaymentStatus } from "@prisma/client";

export default defineEventHandler(async (event) => {
    try {
        const isAdmin = event.context.auth?.user?.role === "ADMIN";
        // if (!isAdmin) {
        //     return ErrorHandler.handleError(event, { statusCode: 403, statusMessage: "Akses terlarang. Hanya admin yang dapat melihat statistik platform." });
        // }

        const totalTransactions = await Transaction.getTotalTransactionCount();
        const totalRevenue = await Transaction.getTotalRevenue();
        const successfulTransactions = await Transaction.getTotalTransactionsByStatus(PaymentStatus.SUCCESS);
        const failedTransactions = await Transaction.getTotalTransactionsByStatus(PaymentStatus.FAILED);

        return ResponseHandler.sendSuccess(event, "Statistik platform berhasil diambil!", {
            totalTransactions,
            totalRevenue,
            successfulTransactions,
            failedTransactions
        }, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
