import { User } from "~/server/models/User";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { Pagination } from "~/server/utils/Pagination"; // 🔹 Gunakan utils pagination

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const { page, limit } = Pagination.getPagination(query);

        const total = await User.countUsers(); // 🔹 Hitung total user
        const { data, meta } = await User.getAllUsers(page, limit);

        return ResponseHandler.sendSuccess(event, "Data user ditemukan!", data, 200, meta);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
