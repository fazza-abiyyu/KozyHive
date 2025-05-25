import { Profile } from "~/server/models/Profile";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.auth?.user?.id;

        const data = await readBody(event);
        const profile = await Profile.createProfile(userId, data);

        return ResponseHandler.sendSuccess(event, "Profile berhasil dibuat!", profile, 201);
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
