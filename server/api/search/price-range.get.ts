import { Property } from "~/server/models/Property";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const priceRange = await Property.getPriceRange();

        return ResponseHandler.sendSuccess(event, "Rentang harga properti berhasil diambil!", priceRange, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
