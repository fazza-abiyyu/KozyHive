import { prisma } from "~/server/config/db";

export class RefreshToken {
    static create(userId: number, refreshToken: string) {
        return prisma.refreshToken.create({
            data: {
                userId,
                refreshToken,
            },
        });
    }

    static findToken(token: string) {
        return prisma.refreshToken.findFirst({
            where: { refreshToken: token },
        });
    }

    static deleteToken(token: string) {
        return prisma.refreshToken.deleteMany({
            where: { refreshToken: token },
        });
    }

    static async getToken(refreshToken: string) {
        return prisma.refreshToken.findFirst({
            where: {
                refreshToken: refreshToken,
            },
        });
    }
}