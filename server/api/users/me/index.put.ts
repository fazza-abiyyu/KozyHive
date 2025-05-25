import { User } from "~/server/models/User";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.auth?.user?.id;

        const data = await readBody(event);
        console.log(`🔹 ID pengguna yang diupdate: ${userId}`);
        console.log(`🔹 Data yang akan diupdate:`, data);

        const updatedUser = await User.updateUser(userId, data);

        return ResponseHandler.sendSuccess(event, "Pengguna berhasil diubah!", updatedUser, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
