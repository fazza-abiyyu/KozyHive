import { Booking } from "~/server/models/Booking";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        const bookingById = await Booking.getBookingById(id);

        return ResponseHandler.sendSuccess(event, "Data pemesanan ditemukan!", bookingById , 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
