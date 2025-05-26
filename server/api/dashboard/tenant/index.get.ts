import { Transaction } from "~/server/models/Transaction";
import { Booking } from "~/server/models/Booking";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const tenantId = event.context.auth?.user?.id;
        if (!tenantId) {
            return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
        }

        const totalBookings = await Booking.countBookingsByTenant(tenantId);
        const totalTransactions = await Transaction.getTotalTransactionsByTenant(tenantId);
        const activeBookings = await Booking.getActiveBookingsByTenant(tenantId);

        return ResponseHandler.sendSuccess(event, "Data dashboard tenant berhasil diambil!", {
            totalBookings,
            totalTransactions,
            activeBookings
        }, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
