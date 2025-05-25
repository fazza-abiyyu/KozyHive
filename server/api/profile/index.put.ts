import { Profile } from "~/server/models/Profile";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.auth?.user?.id;

        const data = await readBody(event);
        const updatedProfile = await Profile.updateProfile(userId, data);

        return ResponseHandler.sendSuccess(event, "Profile berhasil diperbarui!", updatedProfile, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
