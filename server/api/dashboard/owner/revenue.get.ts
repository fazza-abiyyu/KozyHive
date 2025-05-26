import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const ownerId = event.context.auth?.user?.id;
        if (!ownerId) {
            return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
        }

        const revenueByMonth = await Transaction.getRevenueByMonthForOwner(ownerId);

        return ResponseHandler.sendSuccess(event, "Analitik pendapatan berhasil diambil!", { revenueByMonth }, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
