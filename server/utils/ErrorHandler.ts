import { H3Event } from "h3";

export class ErrorHandler {
    static handleError(event: H3Event, error: any) {
        let statusCode = error.statusCode || 500;
        let message = error.statusMessage || error.message || "Terjadi kesalahan internal.";

        // Tangani error Unique Constraint
        if (error.message.includes("Unique constraint failed on the constraint")) {
            statusCode = 409;
            message = "Email sudah terdaftar. Gunakan email lain.";
        }

        console.error("Error Caught:", error);

        setResponseStatus(event, statusCode);
        return {
            success: false,
            statusCode,
            message,
        };
    }
}
