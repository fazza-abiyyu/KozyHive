import { Booking } from "~/server/models/Booking";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { Pagination } from "~/server/utils/Pagination";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.auth?.user?.id;
        const query = getQuery(event);
        const { page, limit } = Pagination.getPagination(query);

        const { data, meta } = await Booking.getAllBookings(userId, page, limit);

        return ResponseHandler.sendSuccess(event, "Data pesanan ditemukan!", data, 200, meta);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
