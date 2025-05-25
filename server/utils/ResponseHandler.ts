// utils/ResponseHandler.ts

import { H3Event } from "h3";

export class ResponseHandler {
    static sendSuccess<T>(event: H3Event, message: string, data: T, statusCode: number = 200, meta?: Meta) {
        setResponseStatus(event, statusCode);

        return {
            success: true,
            statusCode,
            message,
            ...(data && Object.keys(data).length > 0 ? { data: { ...data } } : {}),
            meta,
        };
    }

    static sendCreated<T>(event: H3Event, message: string, data: T, statusCode: number = 201, meta?: Meta) {
        setResponseStatus(event, statusCode);
        return {
            success: true,
            statusCode,
            message,
            data: {...data},
            meta,
        };
    }
}

interface Meta {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
}
