import { Profile } from "~/server/models/Profile";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.auth?.user?.id;

        const profile = await Profile.getProfileByUserId(userId);

        return ResponseHandler.sendSuccess(event, "Profile ditemukan!", profile, 200);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
