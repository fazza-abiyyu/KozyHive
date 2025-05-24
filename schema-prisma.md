```
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Untuk user role USER (penyewa/pencari kos)
  userBookings       Booking[]     @relation("UserBookings")
  userTransactions   Transaction[] @relation("UserTransactions")

  // Untuk user role ADMIN (pengelola/pemilik kos)
  kosProperties      KosProperty[]
  adminBookings      Booking[]     @relation("AdminBookings")
  adminTransactions  Transaction[] @relation("AdminTransactions")

  RefreshToken RefreshToken[]
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
  id       Int     @id @default(autoincrement())
  userId   Int     @unique
  name     String
  phone    String
  address  String
  idNumber String? // Nomor KTP/identitas

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model KosProperty {
  id          Int              @id @default(autoincrement())
  adminId     Int              // User dengan role ADMIN (pengelola kos)
  name        String           // Nama kos
  description String           @db.Text // Deskripsi kos
  address     String           // Alamat lengkap kos
  city        String           // Kota
  province    String           // Provinsi
  latitude    Float?           // Koordinat latitude
  longitude   Float?           // Koordinat longitude
  facilities  String?          @db.Text // Fasilitas umum (JSON string)
  rules       String?          @db.Text // Peraturan kos
  status      PropertyStatus   @default(ACTIVE)
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt

  admin User       @relation(fields: [adminId], references: [id])
  rooms KosRoom[]
}

model KosRoom {
  id           Int        @id @default(autoincrement())
  propertyId   Int        // ID kos property
  roomNumber   String     // Nomor kamar
  roomType     RoomType   // Tipe kamar
  price        Float      // Harga sewa per bulan
  deposit      Float      @default(0) // Uang jaminan
  size         Float?     // Ukuran kamar (m²)
  facilities   String?    @db.Text // Fasilitas kamar (JSON string)
  isAvailable  Boolean    @default(true)
  status       RoomStatus @default(AVAILABLE)
  images       String?    @db.Text // URL gambar kamar (JSON array)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  property KosProperty @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  bookings Booking[]
}

model Booking {
  id             Int           @id @default(autoincrement())
  userId         Int           // User dengan role USER (penyewa)
  adminId        Int           // User dengan role ADMIN (pengelola kos)
  roomId         Int           // ID kamar yang dibooking
  checkInDate    DateTime      // Tanggal masuk
  duration       Int           // Durasi sewa (bulan)
  monthlyPrice   Float         // Harga sewa per bulan
  deposit        Float         // Uang jaminan
  totalAmount    Float         // Total yang harus dibayar
  adminFee       Float         @default(0) // Biaya admin/platform
  status         BookingStatus @default(PENDING)
  paymentLink    String?       // Link pembayaran
  notes          String?       // Catatan booking
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  user User    @relation("UserBookings", fields: [userId], references: [id])
  admin User   @relation("AdminBookings", fields: [adminId], references: [id])
  room KosRoom @relation(fields: [roomId], references: [id])

  transaction  Transaction?
  bookingLogs  BookingLog[] // Log perubahan status booking
}

model BookingLog {
  id          Int           @id @default(autoincrement())
  bookingId   Int
  status      BookingStatus
  description String?
  createdAt   DateTime      @default(now())

  booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)
}

model Transaction {
  id            Int             @id @default(autoincrement())
  bookingId     Int             @unique // Setiap booking hanya punya satu transaksi
  userId        Int             // User dengan role USER (penyewa)
  adminId       Int             // User dengan role ADMIN (pengelola kos)
  status        PaymentStatus   @default(PENDING)
  type          TransactionType
  amount        Float           // Jumlah transaksi
  adminFee      Float           @default(0) // Biaya admin
  netAmount     Float           // Jumlah bersih (setelah fee)
  paymentMethod String?
  paymentId     String?         // ID dari payment gateway
  notes         String?         // Catatan transaksi
  paymentDate   DateTime?       // Tanggal pembayaran berhasil
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  booking Booking @relation(fields: [bookingId], references: [id])
  user    User    @relation("UserTransactions", fields: [userId], references: [id])
  admin   User    @relation("AdminTransactions", fields: [adminId], references: [id])
}

enum Role {
  ADMIN // Pengelola/pemilik kos
  USER  // Penyewa/pencari kos
}

enum PropertyStatus {
  ACTIVE
  INACTIVE
  MAINTENANCE
  DELETED
}

enum RoomType {
  SINGLE    // Kamar single
  SHARED    // Kamar sharing
  DELUXE    // Kamar deluxe
  STANDARD  // Kamar standard
}

enum RoomStatus {
  AVAILABLE  // Tersedia
  OCCUPIED   // Terisi/disewa
  MAINTENANCE // Dalam perbaikan
  RESERVED   // Direservasi
}

enum BookingStatus {
  PENDING    // Menunggu pembayaran
  PAID       // Pembayaran diterima
  CONFIRMED  // Booking dikonfirmasi admin
  ACTIVE     // Sedang menyewa
  COMPLETED  // Sewa selesai
  CANCELLED  // Booking dibatalkan
  EXPIRED    // Booking expired
}

enum PaymentStatus {
  PENDING
  SUCCESS
  FAILED
}

enum TransactionType {
  BOOKING_PAYMENT // Pembayaran booking kos
  DEPOSIT         // Pembayaran deposit
  MONTHLY_RENT    // Pembayaran sewa bulanan
  REFUND          // Pengembalian dana
  FEE             // Biaya platform
}

```
