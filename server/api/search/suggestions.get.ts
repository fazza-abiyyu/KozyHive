import { Property } from "~/server/models/Property";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const suggestions = await Property.getPopularSearches();

        return ResponseHandler.sendSuccess(event, "Saran pencarian berhasil diambil!", suggestions, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
