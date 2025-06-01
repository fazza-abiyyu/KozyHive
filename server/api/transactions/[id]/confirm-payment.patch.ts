import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);
        const { status } = await readBody(event); // Ambil hanya status

        const updatedTransaction = await Transaction.updateTransaction(id, status);

        return ResponseHandler.sendSuccess(event, "Pembayaran berhasil dikonfirmasi!", { updatedTransaction }, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
