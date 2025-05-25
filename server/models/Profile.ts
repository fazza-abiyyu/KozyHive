import { prisma } from "~/server/config/db";

export class Profile {
    static createProfile = async (userId: number, data: any) => {
        return prisma.profile.create({
            data: {
                userId,
                name: data.name,
                phone: data.phone,
                address: data.address,
            },
        });
    };

    static getProfileByUserId = async (userId: number) => {
        return prisma.profile.findUnique({
            where: { userId },
        });
    };

    static updateProfile = async (userId: number, data: any) => {
        return prisma.profile.update({
            where: { userId },
            data: {
                name: data.name,
                phone: data.phone,
                address: data.address,
            },
        });
    };

    static deleteProfile = async (userId: number) => {
        return prisma.profile.delete({
            where: { userId },
        });
    };
}
