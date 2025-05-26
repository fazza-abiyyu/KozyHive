import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { Pagination } from "~/server/utils/Pagination";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const { page, limit } = Pagination.getPagination(query);

        const { data, meta } = await Transaction.getTransactionsByOwner(page, limit);

        return ResponseHandler.sendSuccess(event, "Data properti ditemukan!", data, 200, meta);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
