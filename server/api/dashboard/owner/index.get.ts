import { Property } from "~/server/models/Property";
import { Booking } from "~/server/models/Booking";
import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const ownerId = event.context.auth?.user?.id;
        if (!ownerId) {
            return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
        }

        const totalProperties = await Property.countPropertiesByOwner(ownerId);
        const totalBookings = await Booking.countBookingsByOwner(ownerId);
        const totalTransactions = await Transaction.getTotalTransactionsByOwner(ownerId);

        return ResponseHandler.sendSuccess(event, "Data dashboard owner berhasil diambil!", {
            totalProperties,
            totalBookings,
            totalTransactions
        }, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
