```
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// ================================
// USER MANAGEMENT
// ================================

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  role      Role     @default(TENANT)
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Untuk role TENANT (penyewa)
  tenantBookings     Booking[]     @relation("TenantBookings")
  tenantTransactions Transaction[] @relation("TenantTransactions")

  // Untuk role OWNER (pemilik kos)
  properties         Property[]
  ownerBookings      Booking[]     @relation("OwnerBookings")
  ownerTransactions  Transaction[] @relation("OwnerTransactions")

  refreshTokens RefreshToken[]
}

model RefreshToken {
  id           Int      @id @default(autoincrement())
  userId       Int
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  refreshToken String   @unique @db.VarChar(300)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Profile {
  id      Int    @id @default(autoincrement())
  userId  Int    @unique
  name    String
  phone   String
  address String

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// ================================
// PROPERTY MANAGEMENT
// ================================

model Property {
  id          Int           @id @default(autoincrement())
  ownerId     Int // User dengan role OWNER
  name        String
  description String
  address     String
  city        String
  price       Float // Harga per bulan
  totalRooms  Int           @default(1)
  availableRooms Int        @default(1)
  status      PropertyStatus @default(ACTIVE)
  images      String? // Single image URL
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  owner    User      @relation(fields: [ownerId], references: [id])
  bookings Booking[]
}

// ================================
// BOOKING MANAGEMENT
// ================================

model Booking {
  id          Int           @id @default(autoincrement())
  tenantId    Int // User dengan role TENANT
  ownerId     Int // User dengan role OWNER
  propertyId  Int
  
  checkInDate  DateTime
  duration     Int // Durasi dalam bulan
  monthlyPrice Float // Harga per bulan
  deposit      Float @default(0) // Deposit
  totalAmount  Float // Total yang harus dibayar
  
  status       BookingStatus @default(PENDING)
  notes        String?
  paymentLink  String? // Link pembayaran jika ada
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  tenant      User        @relation("TenantBookings", fields: [tenantId], references: [id])
  owner       User        @relation("OwnerBookings", fields: [ownerId], references: [id])
  property    Property    @relation(fields: [propertyId], references: [id])
  
  transaction Transaction?
  bookingLogs BookingLog[]
}

model BookingLog {
  id          Int           @id @default(autoincrement())
  bookingId   Int
  status      BookingStatus
  description String?
  createdAt   DateTime      @default(now())

  booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)
}

// ================================
// PAYMENT & TRANSACTION
// ================================

model Transaction {
  id            Int             @id @default(autoincrement())
  bookingId     Int             @unique // Setiap booking hanya punya satu transaksi
  tenantId      Int // User dengan role TENANT
  ownerId       Int // User dengan role OWNER
  
  status        PaymentStatus   @default(PENDING)
  type          TransactionType @default(BOOKING_PAYMENT)
  amount        Float // Jumlah transaksi
  adminFee      Float           @default(0) // Biaya platform
  netAmount     Float // Jumlah bersih
  
  paymentMethod String?
  paymentId     String? // ID dari payment gateway
  notes         String?
  paymentDate   DateTime? // Tanggal pembayaran berhasil
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  booking Booking @relation(fields: [bookingId], references: [id])
  tenant  User    @relation("TenantTransactions", fields: [tenantId], references: [id])
  owner   User    @relation("OwnerTransactions", fields: [ownerId], references: [id])
}

// ================================
// ENUMS
// ================================

enum Role {
  OWNER  // Pemilik kos
  TENANT // Penyewa kos
  ADMIN  // Admin platform
}

enum PropertyStatus {
  ACTIVE
  INACTIVE
  DELETED
}

enum BookingStatus {
  PENDING    // Menunggu konfirmasi
  CONFIRMED  // Dikonfirmasi owner
  PAID       // Sudah dibayar
  ACTIVE     // Sedang berlangsung
  COMPLETED  // Selesai
  CANCELLED  // Dibatalkan
}

enum PaymentStatus {
  PENDING
  SUCCESS
  FAILED
}

enum TransactionType {
  BOOKING_PAYMENT // Pembayaran booking
  DEPOSIT        // Deposit
  MONTHLY_RENT   // Sewa bulanan
  REFUND         // Pengembalian
}

```
