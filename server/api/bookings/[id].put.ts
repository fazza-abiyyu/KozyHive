import { Booking } from "~/server/models/Booking";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        const userId = event.context.auth?.user?.id;

        const data = await readBody(event);
        const updatedBooking = await Booking.updateBooking(id, userId, data);

        return ResponseHandler.sendSuccess(event, "Data pemesanan berhasil diubah!", updatedBooking, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
