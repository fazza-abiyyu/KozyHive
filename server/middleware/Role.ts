import UrlPattern from "url-pattern";
import { defineEventHandler } from "h3";
import { ErrorHandler } from "~/server/utils/ErrorHandler";

export default defineEventHandler(async (event) => {
    try {
        // Daftar endpoint yang harus DILEWATI oleh middleware role
        const excludedEndpoints = ["/api/auth/*", "/api/profile", "/api/users/me", "/api/properties/search", "/api/properties/cities",];
        const isExcluded = excludedEndpoints.some((endpoint) => {
            const pattern = new UrlPattern(endpoint);
            return pattern.match(event.req.url as string);
        });

        if (isExcluded) {
            console.log(`⏩ Middleware Role dilewati untuk: ${event.req.url}`);
            return;
        }

        // Pastikan user dari middleware Auth tersedia
        const user = event.context.auth?.user;
        if (!user) {
            throw { statusCode: 401, statusMessage: "Unauthorized - User tidak ditemukan." };
        }

        // Daftar endpoint yang membutuhkan validasi role
        const roleEndpoints: { path: string; roles: ("ADMIN" | "OWNER" | "TENANT")[] }[] = [
            { path: "/api/users", roles: ["ADMIN"] },
            { path: "/api/users/:id", roles: ["ADMIN"] },
            // { path: "/api/properties/*", roles: ["OWNER"] },
            { path: "/api/bookings/*", roles: ["TENANT"] },
        ];

        // Cek apakah URL cocok dengan salah satu endpoint yang butuh validasi role
        const matchedEndpoint = roleEndpoints.find(({ path }) => {
            const pattern = new UrlPattern(path);
            return pattern.match(event.req.url as string);
        });

        if (!matchedEndpoint) {
            return;
        }

        // Periksa apakah role pengguna termasuk dalam daftar yang diperbolehkan
        if (!matchedEndpoint.roles.includes(user.role)) {
            throw { statusCode: 403, statusMessage: "Forbidden - Anda tidak memiliki akses." };
        }

    } catch (error) {
        return ErrorHandler.handleError(event, error);
    }
});
