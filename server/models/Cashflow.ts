import { prisma } from "~/server/config/db";
import { CashflowType, CashflowStatus } from "@prisma/client";

export class Cashflow {

    static async getTotalAmount(userId: number | undefined) {
        const validUserId = userId ?? 0; // 🔥 Hindari undefined dengan default value

        // 🔥 Hitung total DEBIT (pemasukan)
        const totalDebit = await prisma.cashflow.aggregate({
            where: { OR: [{ tenantId: validUserId }, { ownerId: validUserId }], type: CashflowType.DEBIT },
            _sum: { amount: true },
        });

        // 🔥 Hitung total CREDIT (pengeluaran)
        const totalCredit = await prisma.cashflow.aggregate({
            where: { OR: [{ tenantId: validUserId }, { ownerId: validUserId }], type: CashflowType.CREDIT },
            _sum: { amount: true },
        });

        // 🔥 Saldo akhir adalah DEBIT dikurangi CREDIT
        return (totalDebit._sum.amount || 0) - (totalCredit._sum.amount || 0);
    }



    static async create({
                            tenantId,
                            ownerId,
                            transactionId,
                            name,
                            bank,
                            number,
                            amount,
                            type
                        }: {
        tenantId?: number, // 🔥 Bisa null jika bukan tenant
        ownerId?: number,  // 🔥 Bisa null jika bukan owner
        transactionId?: number, // 🔥 Bisa null jika CREDIT tidak terkait transaksi
        name: string,
        bank: string,
        number?: string,
        amount: number,
        type: CashflowType
    }) {

        if (type === CashflowType.CREDIT) {
            const totalSaldo = await this.getTotalAmount(tenantId ?? ownerId);

            if (totalSaldo < amount) {
                throw new Error("Saldo tidak mencukupi untuk withdrawal.");
            }
        }

        return prisma.cashflow.create({
            data: {
                tenantId: tenantId ?? null,
                ownerId: ownerId ?? null,
                transactionId: transactionId ?? null,
                name,
                bank,
                number,
                amount,
                type,
                status: CashflowStatus.PENDING
            },
        });
    }

    static async updateStatus(id: number, status: CashflowStatus) {
        // 🔥 Pastikan status yang diberikan valid
        if (!Object.values(CashflowStatus).includes(status)) {
            throw new Error("Status tidak valid.");
        }

        // 🔥 Perbarui status transaksi berdasarkan ID
        const updatedCashflow = await prisma.cashflow.update({
            where: { id },
            data: { status }
        });

        return updatedCashflow;
    }

    static async getAllById(userId: number | undefined, page: number = 1, pageSize: number = 10) {
        const validUserId = userId ?? 0; // 🔥 Hindari undefined dengan default value
        const skip = (page - 1) * pageSize;

        // 🔥 Hitung total jumlah transaksi terkait user (baik sebagai tenant maupun owner)
        const total = await prisma.cashflow.count({
            where: { OR: [{ tenantId: validUserId }, { ownerId: validUserId }] },
        });

        // 🔥 Ambil transaksi dengan pagination
        const cashflows = await prisma.cashflow.findMany({
            where: { OR: [{ tenantId: validUserId }, { ownerId: validUserId }] },
            skip, // ✅ Lewati data sesuai halaman
            take: pageSize, // ✅ Ambil sejumlah `pageSize` transaksi
            orderBy: { createdAt: "desc" } // 🔥 Urutkan dari yang terbaru
        });

        // 🔥 Hitung total saldo akhir
        const totalSaldo = await this.getTotalAmount(userId);

        return {
            success: true,
            message: "Transaksi berhasil diambil.",
            data: cashflows,
            meta: {
                page,
                limit: pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }

    static async getAll(page: number = 1, pageSize: number = 10) {
        const skip = (page - 1) * pageSize;

        // 🔥 Hitung total jumlah semua transaksi dalam sistem
        const total = await prisma.cashflow.count();

        // 🔥 Ambil semua transaksi dengan pagination
        const cashflows = await prisma.cashflow.findMany({
            skip, // ✅ Lewati data sesuai halaman
            take: pageSize, // ✅ Ambil sejumlah `pageSize` transaksi
            orderBy: { createdAt: "desc" } // 🔥 Urutkan dari yang terbaru
        });

        return {
            success: true,
            message: "Semua transaksi berhasil diambil.",
            data: cashflows,
            meta: {
                page,
                limit: pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }


}
