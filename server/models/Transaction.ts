import { prisma } from "~/server/config/db";
import {CashflowStatus, CashflowType, PaymentStatus, TransactionType} from "@prisma/client";
import {Cashflow} from "~/server/models/Cashflow";

export class Transaction {
    // 🛠️ Membuat transaksi baru langsung berdasarkan bookingId
    // static async createTransaction(bookingId: number, paymentMethod: string, notes?: string) {
    //     const booking = await prisma.booking.findUnique({
    //         where: { id: bookingId },
    //         select: {
    //             id: true,
    //             tenantId: true,
    //             ownerId: true,
    //             totalAmount: true,
    //         },
    //     });
    //
    //     if (!booking) throw new Error("Booking tidak ditemukan.");
    //
    //     return prisma.transaction.create({
    //         data: {
    //             bookingId: booking.id,
    //             tenantId: booking.tenantId,
    //             ownerId: booking.ownerId,
    //             status: PaymentStatus.PENDING,
    //             type: TransactionType.BOOKING_PAYMENT,
    //             amount: booking.totalAmount, // 🔥 Mengambil jumlah dari booking!
    //             adminFee: booking.totalAmount * 0.05, // 🔥 Contoh biaya platform 5%
    //             netAmount: booking.totalAmount * 0.95, // 🔥 Bersih setelah dikurangi adminFee
    //             paymentMethod,
    //             notes,
    //         },
    //     });
    // }
    static async createTransaction(
        bookingId: number,
        paymentMethod: string,
        notes?: string
    ) {
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            select: {
                id: true,
                tenantId: true,
                ownerId: true,
                totalAmount: true,
            },
        });

        if (!booking) throw new Error("Booking tidak ditemukan.");

        const transaction = await prisma.transaction.create({
            data: {
                bookingId: booking.id,
                tenantId: booking.tenantId,
                ownerId: booking.ownerId,
                status: PaymentStatus.PENDING,
                type: TransactionType.BOOKING_PAYMENT,
                amount: booking.totalAmount,
                adminFee: booking.totalAmount * 0.05,
                netAmount: booking.totalAmount * 0.95,
                paymentMethod,
                notes,
            },
        });

        // Menambahkan otomatis ke Cashflow sebagai DEBIT sesuai skema baru
        await Cashflow.create({
            ownerId: booking.ownerId,
            transactionId: transaction.id,
            name: "Penyewa",
            bank: String(transaction.paymentMethod),
            amount: transaction.netAmount,
            type: CashflowType.DEBIT
        });

        return transaction;
    }


    // 📜 Mengambil transaksi berdasarkan ID
    static async getTransactionById(id: number) {
        return prisma.transaction.findUnique({
            where: { id },
            include: {
                booking: true,
                tenant: {
                    select: {
                        id: true,
                        email: true,
                        profile: {
                            select: { name: true, phone: true, address: true }
                        }
                    }
                },
                owner: {
                    select: {
                        id: true,
                        email: true,
                        profile: {
                            select: { name: true, phone: true, address: true }
                        }
                    }
                }
            },
        });
    }

    // 📜 Mengambil transaksi berdasarkan Booking ID
    static async getTransactionByBookingId(bookingId: number) {
        return prisma.transaction.findUnique({
            where: { bookingId },
            include: { booking: true, tenant: true, owner: true },
        });
    }

    // 🔄 Memperbarui transaksi berdasarkan ID
    // static async updateTransaction(id: number, data: any) {
    //     return prisma.transaction.update({
    //         where: { id },
    //         data: {
    //             status: data.status,
    //             paymentMethod: data.paymentMethod,
    //             paymentId: data.paymentId,
    //             notes: data.notes,
    //             paymentDate: data.paymentDate ? new Date(data.paymentDate) : undefined,
    //         },
    //     });
    // }
    static async updateTransaction(id: number, newStatus: PaymentStatus) {
        const updatedTransaction = await prisma.transaction.update({
            where: { id },
            data: { status: newStatus } // Menggunakan inputan status
        });

        // Perbarui semua Cashflow terkait transaksi ini sesuai dengan status transaksi
        await prisma.cashflow.updateMany({
            where: { transactionId: id },
            data: { status: newStatus }, // Cashflow mengikuti status transaksi
        });

        return updatedTransaction;
    }

    // ❌ Menghapus transaksi berdasarkan ID
    static async deleteTransaction(id: number) {
        return prisma.transaction.delete({
            where: { id },
        });
    }

    // 🔢 Menghitung total pendapatan berdasarkan status transaksi tertentu
    static async getTotalRevenueByStatus(status: PaymentStatus) {
        const totalRevenue = await prisma.transaction.aggregate({
            _sum: { netAmount: true },
            where: { status },
        });

        return totalRevenue._sum.netAmount ?? 0;
    }

    static async getTransactionsByTenant(tenantId: number, page: number = 1, pageSize: number = 10) {
        const skip = (page - 1) * pageSize;
        const total = await prisma.transaction.count({ where: { tenantId } });

        const transactions = await prisma.transaction.findMany({
            where: { tenantId },
            skip,
            take: pageSize,
            orderBy: { paymentDate: "desc" },
            include: {
                booking: true,
                owner: { select: { id: true, email: true } },
            },
        });

        return {
            success: true,
            message: "Transaksi tenant berhasil diambil.",
            data: transactions,
            meta: {
                page,
                limit: pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }

    static async getTransactionsByOwner(ownerId: number, page: number = 1, pageSize: number = 10) {
        const skip = (page - 1) * pageSize;
        const total = await prisma.transaction.count({ where: { ownerId } });

        const transactions = await prisma.transaction.findMany({
            where: { ownerId },
            include: {
                booking: true,
                tenant: { select: { id: true, email: true } },
            },
        });

        return {
            success: true,
            message: "Transaksi owner berhasil diambil.",
            data: transactions,
            meta: {
                page,
                limit: pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }

    // Mengambil semua transaksi dengan pagination
    static async getAllTransactions(page: number = 1, pageSize: number = 10) {
        const skip = (page - 1) * pageSize;
        const total = await prisma.transaction.count();

        const transactions = await prisma.transaction.findMany({
            skip,
            take: pageSize,
            orderBy: { paymentDate: "desc" },
            include: {
                booking: {select: {id: true, property: {select: {name: true}}}},
                tenant: { select: { id: true, email: true } },
                owner: { select: { id: true, email: true } }
            },
        });

        return {
            success: true,
            message: "Semua transaksi berhasil diambil.",
            data: transactions,
            meta: {
                page,
                limit: pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }

    // Menghitung total transaksi
    static async getTotalTransactionCount() {
        return prisma.transaction.count();
    }

    // Menghitung total pendapatan dari transaksi sukses
    static async getTotalRevenue() {
        const totalRevenue = await prisma.transaction.aggregate({
            _sum: { netAmount: true },
            where: { status: PaymentStatus.SUCCESS },
        });

        return totalRevenue._sum.netAmount ?? 0;
    }

    // Menghitung jumlah transaksi berdasarkan status tertentu
    static async getTotalTransactionsByStatus(status: PaymentStatus) {
        return prisma.transaction.count({ where: { status } });
    }

    static async getTotalTransactionsByOwner(ownerId: number) {
        return prisma.transaction.count({ where: { ownerId } });
    }

    static async getTotalTransactionsByTenant(tenantId: number) {
        return prisma.transaction.count({ where: { tenantId } });
    }

    static async getTotalRevenueByOwner(ownerId: number) {
        const revenue = await prisma.transaction.aggregate({
            _sum: { netAmount: true },
            where: { ownerId, status: PaymentStatus.SUCCESS },
        });

        return revenue._sum.netAmount ?? 0;
    }

    static async getTotalTransactionsByStatusForTenant(tenantId: number, status: PaymentStatus) {
        return prisma.transaction.count({ where: { tenantId, status } });
    }

    static async getTotalTransactionsByStatusForOwner(ownerId: number, status: PaymentStatus) {
        return prisma.transaction.count({ where: { ownerId, status } });
    }

    static async getRevenueByMonthForOwner(ownerId: number) {
        return prisma.transaction.groupBy({
            by: ["paymentDate"],
            _sum: { netAmount: true },
            where: { ownerId, status: PaymentStatus.SUCCESS },
        });
    }

    static async getTotalSpentByTenant(tenantId: number) {
        const totalSpent = await prisma.transaction.aggregate({
            _sum: { amount: true },
            where: { tenantId, status: PaymentStatus.SUCCESS },
        });

        return totalSpent._sum.amount ?? 0;
    }

    static async getRevenueByMonth() {
        return prisma.transaction.groupBy({
            by: ["paymentDate"],
            _sum: { netAmount: true },
            where: { status: PaymentStatus.SUCCESS },
            orderBy: { paymentDate: "asc" }
        });
    }

    static async getTransactionTrends() {
        return prisma.transaction.groupBy({
            by: ["paymentDate"],
            _count: { id: true },
            where: { status: { in: [PaymentStatus.SUCCESS, PaymentStatus.FAILED] } },
            orderBy: { paymentDate: "asc" }
        });
    }
}
