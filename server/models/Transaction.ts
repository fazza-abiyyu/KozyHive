import { prisma } from "~/server/config/db";
import { $Enums } from "~/generated/prisma";
import TransactionType = $Enums.TransactionType;
import PaymentStatus = $Enums.PaymentStatus;

export class Transaction {
    // Membuat transaksi baru
    static async createTransaction(data: any) {
        return prisma.transaction.create({
            data: {
                bookingId: data.bookingId,
                tenantId: data.tenantId,
                ownerId: data.ownerId,
                status: data.status ?? PaymentStatus.PENDING,
                type: data.type ?? TransactionType.BOOKING_PAYMENT,
                amount: data.amount,
                adminFee: data.adminFee ?? 0,
                netAmount: data.amount - (data.adminFee ?? 0),
                paymentMethod: data.paymentMethod,
                paymentId: data.paymentId,
                notes: data.notes,
                paymentDate: data.paymentDate ? new Date(data.paymentDate) : undefined,
            },
        });
    }

    // Mengambil transaksi berdasarkan ID
    static async getTransactionById(id: number) {
        return prisma.transaction.findUnique({
            where: { id },
        });
    }

    // Mengambil semua transaksi milik tenant (dengan pagination)
    static async getTransactionsByTenant(tenantId: number, page: number = 1, pageSize: number = 10) {
        const skip = (page - 1) * pageSize;
        const total = await prisma.transaction.count({ where: { tenantId } });

        const transactions = await prisma.transaction.findMany({
            where: { tenantId },
            skip,
            take: pageSize,
            orderBy: { paymentDate: "desc" },
        });

        return {
            success: true,
            message: "Tenant's transactions retrieved successfully",
            data: transactions,
            meta: {
                page,
                limit: pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }

    // Mengambil semua transaksi milik owner (dengan pagination)
    static async getTransactionsByOwner(ownerId: number, page: number = 1, pageSize: number = 10) {
        const skip = (page - 1) * pageSize;
        const total = await prisma.transaction.count({ where: { ownerId } });

        const transactions = await prisma.transaction.findMany({
            where: { ownerId },
            skip,
            take: pageSize,
            orderBy: { paymentDate: "desc" },
        });

        return {
            success: true,
            message: "Owner's transactions retrieved successfully",
            data: transactions,
            meta: {
                page,
                limit: pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }

    // Memperbarui transaksi berdasarkan ID
    static async updateTransaction(id: number, data: any) {
        return prisma.transaction.update({
            where: { id },
            data: {
                status: data.status,
                paymentMethod: data.paymentMethod,
                paymentId: data.paymentId,
                notes: data.notes,
                paymentDate: data.paymentDate ? new Date(data.paymentDate) : undefined,
            },
        });
    }

    // Menghapus transaksi berdasarkan ID
    static async deleteTransaction(id: number) {
        return prisma.transaction.delete({
            where: { id },
        });
    }

    // Menghitung total pendapatan dari transaksi dengan status tertentu
    static async getTotalRevenueByStatus(status: PaymentStatus) {
        const totalRevenue = await prisma.transaction.aggregate({
            _sum: { netAmount: true },
            where: { status },
        });

        return totalRevenue._sum.netAmount ?? 0;
    }
}
