import { BookingLog } from "~/server/models/BookingLog";
import {BookingStatus} from "@prisma/client";

export class BookingLogger {
    static async logStatusChange(bookingId: number, newStatus: BookingStatus, message?: string) {
        await BookingLog.createLog(bookingId, newStatus, message);
    }
}
