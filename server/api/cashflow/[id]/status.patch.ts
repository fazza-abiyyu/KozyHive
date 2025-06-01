import { Cashflow } from "~/server/models/Cashflow";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);
        const data = await readBody(event);

        if (!id || !data.status) {
            return ErrorHandler.handleError(event, {
                statusCode: 400,
                statusMessage: "Harap berikan `status` untuk memperbarui Cashflow."
            });
        }

        const updatedCashflow = await Cashflow.updateStatus(Number(id), data.status);

        return ResponseHandler.sendSuccess(event, "Status Cashflow berhasil diperbarui!", updatedCashflow, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
