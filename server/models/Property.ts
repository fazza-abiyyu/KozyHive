import { prisma } from "~/server/config/db";
import {PropertyStatus} from "@prisma/client";

export class Property {
    // GET: Ambil properti milik owner
    static async getMyProperties(ownerId: number, page: number, pageSize: number, filters: any = {}) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const properties = await prisma.property.findMany({
            where: {
                ownerId,
                ...filters,
            },
            skip,
            take,
            include: {
                owner: { select: { id: true, email: true } },
                bookings: true,
            },
        });

        const total = await prisma.property.count({ where: { ownerId, ...filters } });
        const totalPages = Math.ceil(total / pageSize);

        return {
            success: true,
            message: "Owner's properties retrieved successfully",
            data: properties,
            meta: {
                page,
                limit: pageSize,
                total,
                totalPages,
            },
        };
    }

    static async countMyProperties(ownerId: number) {
        return prisma.property.count({
            where: { ownerId }
        });
    }

    // POST: Buat properti baru
    static async createProperty(data: any) {
        if (!data.ownerId || !data.name || !data.description || !data.address || !data.city || !data.price) {
            throw { statusCode: 400, statusMessage: "Semua field wajib diisi!" };
        }

        return prisma.property.create({
            data: {
                ownerId: data.ownerId,
                name: data.name,
                description: data.description,
                address: data.address,
                city: data.city,
                price: Number(data.price),
                totalRooms: Number(data.totalRooms ?? 1),
                availableRooms: Number(data.availableRooms ?? data.totalRooms ?? 1),
                status: data.status ?? "INACTIVE",
                images: data.images ?? null, // 🔹 Pastikan bisa null jika tidak ada gambar
            },
        });
    }

    // PUT: Update properti
    static async updateProperty(id: number, data: any) {
        return prisma.property.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                address: data.address,
                city: data.city,
                price: data.price,
                totalRooms: data.totalRooms,
                availableRooms: data.availableRooms,
                status: data.status ?? "ACTIVE",
                images: data.images,
            },
        });
    }

    static async patchPropertyStatus(id: number, status: string) {
        const validStatuses = ["ACTIVE", "INACTIVE", "PENDING"];

        if (!validStatuses.includes(status)) {
            throw { statusCode: 400, statusMessage: "Status properti tidak valid." };
        }

        const statusEnum = PropertyStatus[status as keyof typeof PropertyStatus];

        if (!statusEnum) {
            throw { statusCode: 400, statusMessage: "Konversi status ke enum gagal." };
        }

        const property = await prisma.property.findUnique({ where: { id } });

        if (!property) {
            throw { statusCode: 404, statusMessage: "Properti tidak ditemukan." };
        }

        return prisma.property.update({
            where: { id },
            data: { status: statusEnum },
        });
    }

    // DELETE: Hapus properti
    static async deleteProperty(id: number) {
        return prisma.property.delete({
            where: { id },
        });
    }

    // PATCH: Update status properti
    static async updatePropertyStatus(id: number, status: PropertyStatus) {
        return prisma.property.update({
            where: { id },
            data: { status },
        });
    }

    static async countProperties() {
        return prisma.property.count();
    }

    static async getAllProperties(page: number, pageSize: number, filters: any = {}) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const properties = await prisma.property.findMany({
            where: {
                ...filters,
            },
            skip,
            take,
            include: {
                owner: { select: { id: true, email: true } },
                bookings: true,
            },
        });

        const total = await prisma.property.count({ where: { ...filters } });
        const totalPages = Math.ceil(total / pageSize);

        return {
            success: true,
            message: "Properties retrieved successfully",
            data: properties,
            meta: {
                page,
                limit: pageSize,
                total,
                totalPages,
            },
        };
    }

    static async getPropertyById(id: number) {
        return prisma.property.findUnique({
            where: { id },
        });
    }

    static async searchProperties(query: string, page: number = 1, pageSize: number = 10) {
        const searchQuery = query?.trim().toLowerCase();
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const properties = await prisma.property.findMany({
            where: {
                OR: [
                    { name: { contains: searchQuery } },
                    { description: { contains: searchQuery } }
                ]
            },
            skip,
            take,
            include: {
                owner: { select: { id: true, email: true } },
                bookings: true,
            },
        });

        const total = await prisma.property.count({
            where: {
                OR: [
                    { name: { contains: searchQuery } },
                    { description: { contains: searchQuery } }
                ]
            }
        });

        return {
            success: true,
            message: "Properties searched successfully",
            data: properties,
            meta: {
                page,
                limit: pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }

    static async filterPropertiesByCity(city: string, page: number = 1, pageSize: number = 10) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const properties = await prisma.property.findMany({
            where: { city: { equals: city } },
            skip,
            take,
            include: {
                owner: { select: { id: true, email: true } },
                bookings: true,
            },
        });

        const total = await prisma.property.count({ where: { city: { equals: city } } });

        return {
            success: true,
            message: `Properties in ${city} retrieved successfully`,
            data: properties,
            meta: {
                page,
                limit: pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }

    static async countPropertiesByOwner(ownerId: number) {
        return prisma.property.count({ where: { ownerId } });
    }

    static async countTotalProperties() {
        return prisma.property.count();
    }

    // 🏡 Pencarian properti dengan filter (lokasi, harga)
    static async searchProperty(filters: { city?: string, minPrice?: number, maxPrice?: number }) {
        return prisma.property.findMany({
            where: {
                city: filters.city ? { equals: filters.city } : undefined,
                price: filters.minPrice || filters.maxPrice
                    ? {
                        gte: filters.minPrice ?? undefined,
                        lte: filters.maxPrice ?? undefined,
                    }
                    : undefined,
                isArchived: false, // Hanya menampilkan properti yang aktif
                status: "ACTIVE", // Hanya menampilkan properti yang tersedia
            },
            orderBy: { price: "asc" },
        });
    }

    // 🔍 Mendapatkan properti yang sering dicari sebagai saran pencarian
    static async getPopularSearches() {
        return prisma.property.findMany({
            orderBy: { createdAt: "desc" }, // Menampilkan properti terbaru sebagai rekomendasi
            take: 3, // Hanya menampilkan 5 properti rekomendasi
        });
    }

    // 📍 Mendapatkan daftar kota yang memiliki properti aktif
    static async getAvailableCities() {
        const cities = await prisma.property.findMany({
            distinct: ["city"],
            where: { isArchived: false, status: "ACTIVE" }, // Hanya menampilkan kota dengan properti aktif
            select: { city: true },
        });

        return cities.map(item => item.city); // Mengembalikan daftar nama kota
    }

    // 💰 Menghitung rentang harga properti tersedia
    static async getPriceRange() {
        const minMaxPrice = await prisma.property.aggregate({
            _min: { price: true },
            _max: { price: true },
            where: { isArchived: false, status: "ACTIVE" }, // Hanya menghitung properti aktif
        });

        return {
            minPrice: minMaxPrice._min.price ?? 0,
            maxPrice: minMaxPrice._max.price ?? 0,
        };
    }
}
