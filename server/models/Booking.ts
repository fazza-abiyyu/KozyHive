import {prisma} from "~/server/config/db";
import {BookingStatus} from "@prisma/client";

export class Booking {
    // GET: Ambil booking berdasarkan ID
    static async getBookingById(id: number) {
        return prisma.booking.findUnique({
            where: {id},
            include: {
                tenant: {select: {id: true, email: true}},
                owner: {select: {id: true, email: true}},
                property: true,
                bookingLogs: true,
            },
        });
    }

    // GET: Ambil semua booking milik tenant
    static async getTenantBookings(tenantId: number, page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const totalBookings = await prisma.booking.count({where: {tenantId}});

        const bookings = await prisma.booking.findMany({
            where: {tenantId},
            skip,
            take: pageSize,
            include: {
                property: true,
                owner: {select: {id: true, email: true}},
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
        const totalBookings = await prisma.booking.count({where: {ownerId}});

        const bookings = await prisma.booking.findMany({
            where: {ownerId},
            skip,
            take: pageSize,
            include: {
                property: true,
                tenant: {select: {id: true, email: true}},
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

    static async getAllBookings(tenantId: number, page: number = 1, pageSize: number = 10) {
        const skip = (page - 1) * pageSize;

        const totalBookings = await prisma.booking.count({
            where: {tenantId},
        });

        const bookings = await prisma.booking.findMany({
            where: {tenantId},
            skip,
            take: pageSize,
            include: {
                property: true,
                owner: {select: {id: true, email: true}},
            },
        });

        const totalPages = Math.ceil(totalBookings / pageSize);

        return {
            success: true,
            message: "Data booking tenant berhasil diambil!",
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
        const property = await prisma.property.findUnique({where: {id: data.propertyId}});

        if (!property || property.availableRooms <= 0 || property.status !== "ACTIVE") {
            throw {statusCode: 400, statusMessage: "Properti tidak tersedia untuk booking."};
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
            where: {id: data.propertyId},
            data: {availableRooms: property.availableRooms - 1},
        });

        return booking;
    }


    static async updateBooking(id: number, tenantId: number, data: any) {
        const booking = await prisma.booking.findUnique({where: {id}});
        const property = await prisma.property.findUnique({where: {id: booking?.propertyId}});

        return prisma.booking.update({
            where: {id},
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

    static async updateBookingStatus(id: number, status: BookingStatus) {
        return prisma.booking.update({
            where: {id},
            data: {status},
        });
    }

    static async deleteBooking(id: number) {
        return prisma.booking.delete({
            where: {id},
        });
    }

    static async getBookingStats() {
        const totalBookings = await prisma.booking.count();

        const totalRevenuePaid = await prisma.booking.aggregate({
            _sum: {totalAmount: true},
            where: {status: "PAID"},
        });

        const totalRevenueCompleted = await prisma.booking.aggregate({
            _sum: {totalAmount: true},
            where: {status: "COMPLETED"},
        });

        const totalDeposit = await prisma.booking.aggregate({
            _sum: {deposit: true},
        });

        // Gunakan `findMany()` lalu hitung jumlah unik
        const uniqueTenants = await prisma.booking.findMany({
            select: {tenantId: true},
            distinct: ['tenantId'],
        });
        const totalTenants = uniqueTenants.length;

        const uniqueOwners = await prisma.booking.findMany({
            select: {ownerId: true},
            distinct: ['ownerId'],
        });
        const totalOwners = uniqueOwners.length;

        const pendingBookings = await prisma.booking.count({where: {status: "PENDING"}});
        const confirmedBookings = await prisma.booking.count({where: {status: "CONFIRMED"}});
        const activeBookings = await prisma.booking.count({where: {status: "ACTIVE"}});
        const completedBookings = await prisma.booking.count({where: {status: "COMPLETED"}});
        const cancelledBookings = await prisma.booking.count({where: {status: "CANCELLED"}});

        return {
            totalBookings,
            totalRevenuePaid: totalRevenuePaid._sum.totalAmount ?? 0,
            totalRevenueCompleted: totalRevenueCompleted._sum.totalAmount ?? 0,
            totalDeposit: totalDeposit._sum.deposit ?? 0,
            totalTenants,
            totalOwners,
            pendingBookings,
            confirmedBookings,
            activeBookings,
            completedBookings,
            cancelledBookings,
        };
    }
}
