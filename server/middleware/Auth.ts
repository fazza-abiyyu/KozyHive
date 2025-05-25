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
            '/api/auth/users',
            '/api/auth/users/:id',
            '/api/auth/users/search?q=:q',
            '/api/auth/users?page=:page&pagesize=:pagesize',
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