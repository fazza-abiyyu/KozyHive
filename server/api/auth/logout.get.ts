import { RefreshToken } from "~/server/models/RefreshToken";
import { addToBlacklist } from "~/server/utils/TokenBlacklist";
import { deleteRefreshToken, verifyToken } from "~/server/utils/jwt";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        // Memeriksa apakah pengguna ada
        const user = event.context.auth.user;

        if (!user) {
            throw createError({
                statusCode: 403,
                statusMessage: "Pengguna tidak valid.",
            });
        }

        // Memeriksa header otorisasi
        const authHeader = event.req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw createError({
                statusCode: 401,
                statusMessage: "Tidak terotorisasi.",
            });
        }

        // Memverifikasi token
        const token = authHeader.split(" ")[1];
        verifyToken(token);

        // Menambahkan token akses ke dalam daftar hitam
        addToBlacklist(token);

        // Mengambil refresh token dari cookie
        const refreshToken = getCookie(event, "refresh_token");

        if (!refreshToken) {
            throw createError({
                statusCode: 400,
                statusMessage: "Tidak ada refresh token yang ditemukan dalam cookie.",
            });
        }

        // Menghapus refresh token dari basis data
        await RefreshToken.deleteToken(refreshToken);

        // Menghapus refresh token dari cookie
        deleteRefreshToken(event);

        // Menambahkan header Set-Cookie untuk menghapus refresh token
        appendHeader(event, "Set-Cookie", "refresh_token=; HttpOnly; Path=/; Max-Age=0");

        // Mengembalikan respons sukses menggunakan ResponseHandler
        return ResponseHandler.sendSuccess(
            event,
            "Berhasil keluar!",
            {},
            200
        );
    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
