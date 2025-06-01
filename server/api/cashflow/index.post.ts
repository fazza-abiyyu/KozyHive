import { Cashflow } from "~/server/models/Cashflow";
import { ResponseHandler } from "~/server/utils/ResponseHandler";
import { ErrorHandler } from "~/server/utils/ErrorHandler";
import { CashflowType } from "@prisma/client";
import { prisma } from "~/server/config/db";

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.auth?.user?.id;

        if (!userId) {
            return ErrorHandler.handleError(event, {
                statusCode: 401,
                statusMessage: "User tidak ditemukan. Pastikan pengguna sudah login."
            });
        }

        const data = await readBody(event);

        if (!data.amount || !data.bank || !data.number) {
            return ErrorHandler.handleError(event, {
                statusCode: 400,
                statusMessage: "Harap berikan `amount`, `bank`, dan `number` untuk transaksi CREDIT."
            });
        }

        console.log(`User ID: ${userId}`);

        // 🔥 Cek apakah user memiliki transaksi aktif sebagai tenant atau owner
        const userCashflows = await prisma.cashflow.findMany({
            where: {
                OR: [{ tenantId: userId }, { ownerId: userId }]
            },
            select: { tenantId: true, ownerId: true }
        });

        if (!userCashflows.length) {
            return ErrorHandler.handleError(event, {
                statusCode: 400,
                statusMessage: "User tidak memiliki riwayat transaksi sebagai tenant atau owner."
            });
        }

        // 🔥 Ambil tenantId atau ownerId dari riwayat transaksi
        const tenantId = userCashflows.find(c => c.tenantId === userId)?.tenantId ?? undefined;
        const ownerId = userCashflows.find(c => c.ownerId === userId)?.ownerId ?? undefined;

        const totalSaldo = await Cashflow.getTotalAmount(userId);

        if (totalSaldo < data.amount) {
            return ErrorHandler.handleError(event, {
                statusCode: 400,
                statusMessage: "Saldo tidak mencukupi untuk melakukan withdrawal."
            });
        }

        // 🔥 Membuat transaksi CREDIT dengan status PENDING
        const cashflow = await Cashflow.create({
            tenantId,
            ownerId,
            transactionId: undefined,
            name: data.name,
            bank: data.bank,
            number: data.number,
            amount: data.amount,
            type: CashflowType.CREDIT
        });

        const response = {
            cashflow,
            totalSaldo
        };

        return ResponseHandler.sendSuccess(event, "Permintaan withdrawal berhasil dibuat!", response, 201);

    } catch (error: any) {
        return ErrorHandler.handleError(event, error);
    }
});
