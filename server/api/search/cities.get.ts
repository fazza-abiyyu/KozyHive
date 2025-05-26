import { Property } from "~/server/models/Property";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const cities = await Property.getAvailableCities();

        return ResponseHandler.sendSuccess(event, "Daftar kota berhasil diambil!", cities, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
