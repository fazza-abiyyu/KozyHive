import { User } from "~/server/models/User";
import { Property } from "~/server/models/Property";
import { Transaction } from "~/server/models/Transaction";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const isAdmin = event.context.auth?.user?.role === "ADMIN";
        // if (!isAdmin) {
        //     return ErrorHandler.handleError(event, { statusCode: 403, statusMessage: "Akses terlarang. Hanya admin yang dapat melihat dashboard." });
        // }

        const totalUsers = await User.countTotalUsers();
        const totalProperties = await Property.countTotalProperties();
        const totalTransactions = await Transaction.getTotalTransactionCount();

        return ResponseHandler.sendSuccess(event, "Data dashboard admin berhasil diambil!", {
            totalUsers,
            totalProperties,
            totalTransactions
        }, 200);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
