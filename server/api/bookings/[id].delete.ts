import { Booking } from "~/server/models/Booking";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        const deletedBooking = await Booking.deleteBooking(id);

        return ResponseHandler.sendSuccess(event, "Data pemesanan berhasil dihapus!", deletedBooking, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
