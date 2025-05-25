import { Booking } from "~/server/models/Booking";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.auth?.user?.id;
        const data = await readBody(event);
        const booking = await Booking.createBooking(data, userId);

        return ResponseHandler.sendSuccess(event, "Pesanan berhasil dibuat!", booking, 201);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
