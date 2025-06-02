import { User } from "~/server/models/User";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    const user = event.context.auth?.user;
    if (!user) {
        return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
    }

    const id = parseInt(event.context.params?.id as string);
    if (isNaN(id)) {
        return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Properti ID tidak valid." });
    }

    const existinguser = await User.getUserById(id);
    if (!existinguser) {
        return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Properti tidak ditemukan." });
    }


    const body = await readBody(event);
    if (!body.role) {
        return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Role harus diberikan." });
    }

    const updateduser = await User.updateUserRole(id, body.role);

    return { code: 200, message: "Status properti berhasil diperbarui!", data: updateduser };
});
