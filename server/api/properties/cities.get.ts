import { Property } from "~/server/models/Property";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { Pagination } from "~/server/utils/Pagination";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const { page, limit } = Pagination.getPagination(query);


        const citiesQuery = query.search as string;

        const { data, meta } = await Property.filterPropertiesByCity(citiesQuery, page, limit);

        return ResponseHandler.sendSuccess(event, "Data properti ditemukan!", data, 200, meta);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
