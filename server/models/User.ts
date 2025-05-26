import { prisma } from "~/server/config/db";
import {RegisterRequest} from "~/types/AuthType";
import bcrypt from "bcryptjs";
import {Role} from "@prisma/client";

export class User {
    static createUser = (data: any) => {
        return prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                role: data.role ?? Role.TENANT,
                profile: data.profile
                    ? { create: data.profile }
                    : undefined,
            },
        });
    };

    static async registerUser(data: RegisterRequest) {
        return prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                role: Role.TENANT, // Default role sebagai TENANT
                profile: {
                    create: {
                        name: data.profile?.name ?? "",
                        phone: data.profile?.phone ?? "",
                        address: data.profile?.address ?? "",
                    },
                },
            },
            include: { profile: true }
        });
    }

    static getUserById = (id: number) => {
        return prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                profile: true,
                tenantBookings: true,
                tenantTransactions: true,
                properties: true,
                ownerBookings: true,
                ownerTransactions: true,
            },
        });
    };

    static getUserByEmail = (email: string) => {
        return prisma.user.findUnique({
            where: { email },
            include: {
                profile: true,
                tenantBookings: true,
                tenantTransactions: true,
                properties: true,
                ownerBookings: true,
                ownerTransactions: true,
                refreshTokens: true,
            },
        });
    };

    static updateUser = async (id: number, data: any) => {
        const updatedData: any = {
            email: data.email,
            role: data.role,
            profile: data.profile ? { update: data.profile } : undefined,
        };

        // Jika ada perubahan password, lakukan hashing sebelum disimpan
        if (data.password) {
            const saltRounds = 10;
            updatedData.password = await bcrypt.hash(data.password, saltRounds);
        }

        return prisma.user.update({
            where: { id },
            data: updatedData,
        });
    };

    static deleteUser = async (id: number) => {
        return prisma.user.delete({
            where: { id },
        });
    };

    static async countUsers() {
        return prisma.user.count();
    }

    static getAllUsers = async (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const users = await prisma.user.findMany({
            skip,
            take,
            include: {
                profile: true,
            },
        });

        const total = await prisma.user.count();
        const totalPages = Math.ceil(total / pageSize);

        return {
            success: true,
            message: "Users retrieved successfully",
            data: users,
            meta: {
                page,
                limit: pageSize,
                total,
                totalPages,
            },
        };
    };

    static searchUser = async (search: string, page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { email: { contains: search } },
                    { profile: { name: { contains: search } } },
                ],
            },
            skip,
            take,
            include: {
                profile: true,
            },
        });

        const total = await prisma.user.count({
            where: {
                OR: [
                    { email: { contains: search } },
                    { profile: { name: { contains: search } } },
                ],
            },
        });

        const totalPages = Math.ceil(total / pageSize);

        return {
            success: true,
            message: "Search results retrieved successfully",
            data: users,
            meta: {
                page,
                limit: pageSize,
                total,
                totalPages,
            },
        };
    };

    static async countTotalUsers() {
        return prisma.user.count();
    }
}
