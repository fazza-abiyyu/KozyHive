import { User } from "~/server/models/User";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        const deletedUser = await User.deleteUser(id);

        return ResponseHandler.sendSuccess(event, "Pengguna berhasil dihapus!", deletedUser, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
