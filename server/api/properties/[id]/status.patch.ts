import { Property } from "~/server/models/Property";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { $Enums } from "~/generated/prisma";
import PropertyStatus = $Enums.PropertyStatus;

export default defineEventHandler(async (event) => {
    const user = event.context.auth?.user;
    if (!user) {
        return ErrorHandler.handleError(event, { statusCode: 401, statusMessage: "User tidak terautentikasi." });
    }

    const id = parseInt(event.context.params?.id as string);
    if (isNaN(id)) {
        return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Properti ID tidak valid." });
    }

    const existingProperty = await Property.getPropertyById(id);
    if (!existingProperty) {
        return ErrorHandler.handleError(event, { statusCode: 404, statusMessage: "Properti tidak ditemukan." });
    }

    if (existingProperty.ownerId !== user.id) {
        return ErrorHandler.handleError(event, { statusCode: 403, statusMessage: "Tidak memiliki izin untuk mengubah status properti ini." });
    }

    const body = await readBody(event);
    const rawStatus = body.status?.trim().toUpperCase();

    if (!rawStatus || !Object.values(PropertyStatus).includes(rawStatus as PropertyStatus)) {
        return ErrorHandler.handleError(event, { statusCode: 400, statusMessage: "Status tidak valid." });
    }

    const updatedProperty = await Property.updateProperty(id, { status: rawStatus as PropertyStatus });

    return { code: 200, message: "Status properti berhasil diperbarui!", data: updatedProperty };
});
