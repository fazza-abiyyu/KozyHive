import { prisma } from "~/server/config/db";
import { $Enums } from "~/generated/prisma";
import BookingStatus = $Enums.BookingStatus;

export class BookingLog {
    // Simpan log perubahan status booking
    static async createLog(bookingId: number, status: BookingStatus, description?: string) {
        return prisma.bookingLog.create({
            data: {
                bookingId,
                status,
                description,
            },
        });
    }

    // Ambil semua log berdasarkan `bookingId`
    static async getLogsByBookingId(bookingId: number) {
        return prisma.bookingLog.findMany({
            where: { bookingId },
            orderBy: { createdAt: "desc" },
        });
    }
}
