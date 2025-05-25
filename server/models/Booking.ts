import { prisma } from "~/server/config/db";
import {$Enums} from "~/generated/prisma";
import BookingStatus = $Enums.BookingStatus;

export class Booking {
    // GET: Ambil booking berdasarkan ID
    static async getBookingById(id: number) {
        return prisma.booking.findUnique({
            where: { id },
            include: {
                tenant: { select: { id: true, email: true } },
                owner: { select: { id: true, email: true } },
                property: true,
                bookingLogs: true,
            },
        });
    }

    // GET: Ambil semua booking milik tenant
    static async getTenantBookings(tenantId: number, page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const totalBookings = await prisma.booking.count({ where: { tenantId } });

        const bookings = await prisma.booking.findMany({
            where: { tenantId },
            skip,
            take: pageSize,
            include: {
                property: true,
                owner: { select: { id: true, email: true } },
            },
        });

        const totalPages = Math.ceil(totalBookings / pageSize);

        return {
            success: true,
            message: "Tenant's bookings retrieved successfully",
            data: bookings,
            meta: {
                page,
                limit: pageSize,
                total: totalBookings,
                totalPages,
            },
        };
    }

    // GET: Ambil semua booking milik owner
    static async getOwnerBookings(ownerId: number, page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const totalBookings = await prisma.booking.count({ where: { ownerId } });

        const bookings = await prisma.booking.findMany({
            where: { ownerId },
            skip,
            take: pageSize,
            include: {
                property: true,
                tenant: { select: { id: true, email: true } },
            },
        });

        const totalPages = Math.ceil(totalBookings / pageSize);

        return {
            success: true,
            message: "Owner's bookings retrieved successfully",
            data: bookings,
            meta: {
                page,
                limit: pageSize,
                total: totalBookings,
                totalPages,
            },
        };
    }

    // POST: Buat booking baru dan kurangi ketersediaan kamar
    static async createBooking(data: any, userId: number) {
        const property = await prisma.property.findUnique({ where: { id: data.propertyId } });

        if (!property || property.availableRooms <= 0 || property.status !== "ACTIVE") {
            throw { statusCode: 400, statusMessage: "Properti tidak tersedia untuk booking." };
        }

        // Hitung harga berdasarkan properti yang dipilih
        const monthlyPrice = property.price;
        const deposit = data.deposit ?? 0;
        const totalAmount = data.duration * monthlyPrice + deposit;

        const booking = await prisma.booking.create({
            data: {
                tenantId: userId,
                ownerId: property.ownerId,
                propertyId: data.propertyId,
                checkInDate: new Date(data.checkInDate),
                duration: data.duration,
                monthlyPrice,
                deposit,
                totalAmount,
                status: BookingStatus.PENDING,
                notes: data.notes ?? null,
            },
        });

        await prisma.property.update({
            where: { id: data.propertyId },
            data: { availableRooms: property.availableRooms - 1 },
        });

        return booking;
    }


    static async updateBooking(id: number, tenantId: number, data: any) {
        const booking = await prisma.booking.findUnique({ where: { id } });
        const property = await prisma.property.findUnique({ where: { id: booking?.propertyId } });

        return prisma.booking.update({
            where: { id },
            data: {
                checkInDate: data.checkInDate ? new Date(data.checkInDate) : undefined,
                duration: data.duration ?? undefined,
                monthlyPrice: property?.price ?? undefined,
                deposit: data.deposit ?? undefined,
                totalAmount: (data.duration ?? booking?.duration ?? 0) * (property?.price ?? 0) + (data.deposit ?? 0),
                notes: data.notes ?? undefined,
            },
        });
    }


    static async deleteBooking(id: number) {
        return prisma.booking.delete({
            where: { id },
        });
    }
}
