import { Property } from "~/server/models/Property";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { Pagination } from "~/server/utils/Pagination";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.auth?.user?.id;
        const query = getQuery(event);
        const { page, limit } = Pagination.getPagination(query);

        const { data, meta } = await Property.getMyProperties(userId, page, limit);

        return ResponseHandler.sendSuccess(event, "Data properti ditemukan!", data, 200, meta);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
