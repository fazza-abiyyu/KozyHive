import { Cashflow } from "~/server/models/Cashflow";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.auth?.user?.id;

        const totalAmount = await Cashflow.getTotalAmount(userId);

        return ResponseHandler.sendSuccess(event, "Total Saldo Ditemukan!", { amount: totalAmount } , 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
