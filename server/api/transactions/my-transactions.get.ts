import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { Pagination } from "~/server/utils/Pagination";

export default defineEventHandler(async (event) => {
    try {
        const tenantId = event.context.auth?.user?.id;
        if (!tenantId) {
            return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
        }

        const query = getQuery(event);
        const { page, limit } = Pagination.getPagination(query);

        const transactions = await Transaction.getTransactionsByTenant(tenantId, page, limit);
        return ResponseHandler.sendSuccess(event, "Data transaksi berhasil diambil!", transactions, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
