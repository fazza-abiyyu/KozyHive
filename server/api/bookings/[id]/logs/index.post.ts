import { BookingLog } from "~/server/models/BookingLog";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import {BookingStatus} from "@prisma/client";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);
        const { status, description } = await readBody(event);

        if (!status || typeof status !== "string") {
            return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Status booking tidak valid." });
        }

        const bookingLog = await BookingLog.createLog(id, status as BookingStatus, description);

        return ResponseHandler.sendSuccess(event, "Riwayar pesanan berhasil dibuat!", bookingLog, 201);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
