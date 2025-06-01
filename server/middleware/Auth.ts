import UrlPattern from "url-pattern";
import { User } from "~/server/models/User";
import { decodeAccessToken } from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
    try {
        const url = event.req.url || "";
        const method = event.req.method?.toUpperCase() || "GET";

        // Daftar endpoint dengan metode yang diizinkan
        const endpoints = [
            { url: '/api/auth/user', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
            { url: '/api/users*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
            { url: '/api/profile*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
            { url: '/api/properties*', methods: [ 'POST', 'PUT', 'DELETE', 'PATCH'] },
            { url: '/api/bookings*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
            { url: '/api/transactions*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
            { url: '/api/dashboard*', methods: ['GET'] },
            { url: '/api/admin*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
            { url: '/api/properties/my-properties', methods: ['GET'] },
            { url: '/api/cashflow*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
        ];

        // Cek apakah URL dan method cocok dengan daftar endpoint
        const isHandledByThisMiddleware = endpoints.some(({ url: patternUrl, methods }) => {
            const pattern = new UrlPattern(patternUrl);
            return pattern.match(url) && methods.includes(method);
        });

        if (!isHandledByThisMiddleware) {
            return;
        }

        // Ambil token dari header
        const token = event.req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return sendError(event, createError({
                statusCode: 401,
                statusMessage: 'Unauthorized - Token missing'
            }));
        }

        // Decode token
        const decoded = decodeAccessToken(token);

        if (!decoded || !decoded.id) {
            return sendError(event, createError({
                statusCode: 401,
                statusMessage: 'Unauthorized - Invalid token'
            }));
        }

        // Ambil user berdasarkan ID
        const user = await User.getUserById(decoded.id);

        if (!user) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: 'User not found'
            }));
        }

        // Hapus password_hash agar tidak dikirim ke konteks
        const { password, ...safeUser } = user;

        // Tambahkan ke context
        event.context.auth = { user: safeUser };

    } catch (e) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        }));
    }
});
