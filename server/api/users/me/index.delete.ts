import { User } from "~/server/models/User";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.auth?.user?.id;

        const deletedProfile = await User.deleteUser(userId);

        return ResponseHandler.sendSuccess(event, "Pengguna berhasil dihapus!", deletedProfile, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
