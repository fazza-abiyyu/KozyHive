import { Property } from "~/server/models/Property";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        const propertyById = await Property.getPropertyById(id);

        return ResponseHandler.sendSuccess(event, "Properti ditemukan!", propertyById , 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
