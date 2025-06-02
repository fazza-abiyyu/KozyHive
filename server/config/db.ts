// server/config/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'], // bisa tambahin 'query' buat debug dev
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
