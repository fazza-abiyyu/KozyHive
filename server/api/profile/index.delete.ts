import { Profile } from "~/server/models/Profile";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.auth?.user?.id;

        const deletedProfile = await Profile.deleteProfile(userId);

        return ResponseHandler.sendSuccess(event, "Profile berhasil dihapus!", deletedProfile, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
