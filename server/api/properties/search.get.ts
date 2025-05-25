import { Property } from "~/server/models/Property";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { Pagination } from "~/server/utils/Pagination";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const { page, limit } = Pagination.getPagination(query);

        console.log("📌 Query Params:", query);

        // ✅ Pastikan query parameter tidak kosong
        const searchQuery = typeof query.q === "string" ? query.q.trim() : "";

        if (!searchQuery || searchQuery.length < 1) {
            throw { statusCode: 400, statusMessage: "Query pencarian tidak boleh kosong." };
        }

        const { data, meta } = await Property.searchProperties(searchQuery, page, limit);

        return ResponseHandler.sendSuccess(event, "Data properti ditemukan!", data, 200, meta);

    } catch (error: any) {
        console.error("❌ Error Caught:", error);
        return ErrorHandler.handleError(event, error);
    }
});
