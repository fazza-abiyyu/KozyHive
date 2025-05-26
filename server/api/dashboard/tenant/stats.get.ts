import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { PaymentStatus } from "@prisma/client";

export default defineEventHandler(async (event) => {
    try {
        const tenantId = event.context.auth?.user?.id;
        if (!tenantId) {
            return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
        }

        const successfulTransactions = await Transaction.getTotalTransactionsByStatusForTenant(tenantId, PaymentStatus.SUCCESS);
        const totalSpent = await Transaction.getTotalSpentByTenant(tenantId);

        return ResponseHandler.sendSuccess(event, "Statistik tenant berhasil diambil!", {
            successfulTransactions,
            totalSpent
        }, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
