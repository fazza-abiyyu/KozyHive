import { BookingLog } from "~/server/models/BookingLog";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        const bookingById = await BookingLog.getLogsByBookingId(id);

        return ResponseHandler.sendSuccess(event, "Data riwayat pemesanan ditemukan!", bookingById , 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
