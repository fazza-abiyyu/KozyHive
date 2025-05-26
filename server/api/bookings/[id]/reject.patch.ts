import { Booking } from "~/server/models/Booking";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { $Enums } from "~/generated/prisma";
import BookingStatus = $Enums.BookingStatus;
import {BookingLogger} from "~/server/utils/BookingLoggers";

export default defineEventHandler(async (event) => {
    const user = event.context.auth?.user;
    if (!user) {
        return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
    }

    const id = parseInt(event.context.params?.id as string);
    if (isNaN(id)) {
        return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Pesanan ID tidak valid." });
    }

    const existingBooking = await Booking.getBookingById(id);
    if (!existingBooking) {
        return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Pesanan tidak ditemukan." });
    }

    const body = await readBody(event);
    let rawStatus = body?.status?.trim().toUpperCase() || "CANCELLED";

    if (!rawStatus || !Object.values(BookingStatus).includes(rawStatus as BookingStatus)) {
        return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Status tidak valid." });
    }

    // Simpan log perubahan status
    await BookingLogger.logStatusChange(id, rawStatus, `Status booking berubah menjadi ${rawStatus}`);

    const updatedBooking = await Booking.updateBookingStatus(id, rawStatus as BookingStatus);

    return { code: 200, message: "Status properti berhasil diperbarui!", data: updatedBooking };
});
