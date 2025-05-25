import { prisma } from "~/server/config/db";
import {$Enums} from "~/generated/prisma";
import Role = $Enums.Role;
import {RegisterRequest} from "~/types/AuthType";

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

    static registerUser = (data: RegisterRequest) => {
        return prisma.user.create({
            data: {
                email: data.email,
                password: data.password
            },
        });
    };

    static getUserById = (id: number) => {
        return prisma.user.findUnique({
            where: { id },
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

    static updateUser = (id: number, data: any) => {
        return prisma.user.update({
            where: { id },
            data: {
                email: data.email,
                password: data.password,
                role: data.role,
                profile: data.profile
                    ? { update: data.profile }
                    : undefined,
            },
        });
    };

    static deleteUser = (id: number) => {
        return prisma.user.delete({
            where: { id },
        });
    };

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
}
