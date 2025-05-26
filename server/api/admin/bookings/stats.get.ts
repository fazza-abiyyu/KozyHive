import { Booking } from "~/server/models/Booking";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {

        const stats = await Booking.getBookingStats();
        return ResponseHandler.sendSuccess(event, "Data statistik booking berhasil diambil!", stats, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
