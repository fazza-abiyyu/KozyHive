import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { PaymentStatus } from "@prisma/client";

export default defineEventHandler(async (event) => {
    try {
        const ownerId = event.context.auth?.user?.id;
        if (!ownerId) {
            return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
        }

        const successfulTransactions = await Transaction.getTotalTransactionsByStatusForOwner(ownerId, PaymentStatus.SUCCESS);
        const totalRevenue = await Transaction.getTotalRevenueByOwner(ownerId);

        return ResponseHandler.sendSuccess(event, "Statistik transaksi owner berhasil diambil!", {
            successfulTransactions,
            totalRevenue
        }, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
