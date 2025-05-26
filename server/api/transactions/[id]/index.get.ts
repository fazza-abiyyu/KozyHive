import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.auth?.user?.id;
        if (!userId) {
            return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
        }

        const id = parseInt(event.context.params?.id as string);
        if (isNaN(id)) {
            return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Transaction ID tidak valid." });
        }

        const transaction = await Transaction.getTransactionById(id);
        // if (!transaction || (transaction.tenantId !== userId && transaction.ownerId !== userId)) {
        //     return ErrorHandler.handleError(event, { statusCode: 403, statusMessage: "Anda tidak memiliki akses ke transaksi ini." });
        // }

        return ResponseHandler.sendSuccess(event, "Detail transaksi berhasil diambil!", transaction, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
