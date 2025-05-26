import { Property } from "~/server/models/Property";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);

        const filters = {
            city: typeof query.city === "string" ? query.city : undefined,
            minPrice: query.minPrice ? Number(query.minPrice) : undefined,
            maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
        };

        const properties = await Property.searchProperty(filters);

        return ResponseHandler.sendSuccess(event, "Pencarian properti berhasil!", properties, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
