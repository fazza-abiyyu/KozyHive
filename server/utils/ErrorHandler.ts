import { H3Event } from "h3";

export class ErrorHandler {
    static handleError(event: H3Event, error: any) {
        let statusCode = error.statusCode || 500;
        let message = error.statusMessage || error.message || "Terjadi kesalahan internal.";

        switch (error.code) {
            case "P2002": // Unique Constraint (data sudah ada)
                if (event.req.method === "POST") {
                    statusCode = 409;
                    message = "Data sudah ada.";
                } else {
                    statusCode = 400;
                    message = "Gagal memperbarui data. Pastikan tidak ada duplikasi.";
                }
                break;

            case "P2003": // Foreign Key Constraint (data masih digunakan)
                statusCode = 400;
                message = "Tidak bisa menghapus atau mengubah karena data terkait masih digunakan.";
                break;

            case "P2025": // Record Not Found (data tidak ditemukan)
                statusCode = 404;
                message = "Data tidak ditemukan.";
                break;

            case "P2000": // Field missing or validation error
                statusCode = 400;
                message = "Validasi gagal. Data tidak sesuai format.";
                break;

            case "P2011": // Constraint Violation (misalnya field yang harus unik tidak sesuai)
                statusCode = 400;
                message = "Validasi gagal. Data tidak memenuhi aturan yang ditentukan.";
                break;

            case "P2010": // Kesalahan terkait middleware Role
                statusCode = 500;
                message = "Kesalahan dalam middleware role. Periksa aturan akses dan endpoint.";
                break;

            case "P2012": // Kesalahan autentikasi: Token tidak ditemukan
                statusCode = 401;
                message = "Authorization gagal. Token tidak ditemukan dalam request.";
                break;

            case "P2013": // Kesalahan autentikasi: Token tidak valid
                statusCode = 401;
                message = "Authorization gagal. Token yang diberikan tidak valid.";
                break;

            case "P2014": // Kesalahan autentikasi: User tidak ditemukan
                statusCode = 401;
                message = "Authorization gagal. User tidak ditemukan di dalam sistem.";
                break;

            case "P2015": // Kesalahan role-based authorization
                statusCode = 403;
                message = "Anda tidak memiliki izin untuk mengakses endpoint ini.";
                break;
        }

        console.error("Error Caught:", {
            statusCode,
            message,
        });

        setResponseStatus(event, statusCode);
        return {
            success: false,
            statusCode,
            message,
        };
    }
}
