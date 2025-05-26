import UrlPattern from "url-pattern"
import {decodeAccessToken} from "~/server/utils/jwt";
import {User} from "~/server/models/User";

export default defineEventHandler( async (event) => {
    try {
        const endpoints = [
            '/api/auth/user',
            '/api/auth/logs',
            '/api/auth/logout',
            '/api/auth/verification',
            '/api/users',
            '/api/users/me',
            '/api/users/:id',
            '/api/users/search?q=:q',
            '/api/users?page=:page&pagesize=:pagesize',
            '/api/profile',
            '/api/properties',
            '/api/properties/my-properties',
            '/api/properties/:id',
            '/api/properties?page=:page&pagesize=:pagesize',
            '/api/properties/search?q=:q&page=:page&pagesize=:pagesize',
            '/api/properties/cities?c=:c&page=:page&pagesize=:pagesize',
            '/api/properties/:id/status',
            '/api/admin/properties/:id/approve',
            '/api/admin/properties/:id/reject',
            '/api/bookings/:id/activate',
            '/api/bookings/:id/complete',
            '/api/bookings/:id/confirm',
            '/api/bookings/:id/reject',
            '/api/bookings/:id/logs',
            '/api/admin/properties',
            '/api/admin/properties/:id',
            '/api/admin/bookings?page=:page&pagesize=:pagesize',
            '/api/admin/bookings/stats',
            '/api/admin/properties?page=:page&pagesize=:pagesize',
            '/api/bookings/my-bookings',
            '/api/bookings/:id',
            '/api/bookings',
        ]

        const isHandledByThisMiddleware = endpoints.some(endopoint => {
            const pattern = new UrlPattern(endopoint)
            return pattern.match(event.req.url as string)
        })

        if (!isHandledByThisMiddleware) {
            return
        }

        const token = event.req.headers['authorization']?.split(' ')[1]

        const decoded = decodeAccessToken(token as string)

        if (!decoded) {
            return sendError(event, createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            }))
        }


        try {
            const userId = decoded.id;
            const user = await User.getUserById(userId);

            if (!user) {
                throw createError({
                    statusCode: 403,
                    statusMessage: "Unauthorized - User tidak ditemukan.",
                });
            }

            event.context.auth = { user };
        } catch (error) {
            throw createError({
                statusCode: 500,
                statusMessage: "Internal Server Error saat mendapatkan pengguna.",
            });
        }

    } catch (e) {
        return
    }})