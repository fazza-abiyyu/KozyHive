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
  status    UserStatus @default(ACTIVE)
  avatar    String?  // URL foto profil
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Untuk user role USER (penyewa/pencari kos)
  userBookings       Booking[]     @relation("UserBookings")
  userTransactions   Transaction[] @relation("UserTransactions")
  userReviews        Review[]      @relation("UserReviews")
  userNotifications  Notification[] @relation("UserNotifications")

  // Untuk user role ADMIN (pengelola/pemilik kos)
  kosProperties      KosProperty[]
  adminBookings      Booking[]     @relation("AdminBookings")
  adminTransactions  Transaction[] @relation("AdminTransactions")
  adminNotifications Notification[] @relation("AdminNotifications")

  RefreshToken RefreshToken[]
  DeviceToken  DeviceToken[]
  PasswordReset PasswordReset[]
}

model RefreshToken {
  id           Int      @id @default(autoincrement())
  userId       Int
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  refreshToken String   @unique @db.VarChar(300)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model PasswordReset {
  id        Int      @id @default(autoincrement())
  userId    Int
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token     String   @unique
  expiresAt DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())
}

model DeviceToken {
  id           Int      @id @default(autoincrement())
  userId       Int
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  deviceToken  String   @unique
  deviceType   String   // ios, android, web
  deviceId     String?  // unique device identifier
  isActive     Boolean  @default(true)
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
  dateOfBirth DateTime?
  gender   Gender?
  occupation String?
  emergencyContact String? // Kontak darurat
  emergencyPhone String?   // Nomor telepon darurat

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
  postalCode  String?          // Kode pos
  latitude    Float?           // Koordinat latitude
  longitude   Float?           // Koordinat longitude
  facilities  String?          @db.Text // Fasilitas umum (JSON string)
  rules       String?          @db.Text // Peraturan kos
  images      String?          @db.Text // URL gambar properti (JSON array)
  contactInfo String?          @db.Text // Info kontak (JSON: phone, whatsapp, etc)
  nearbyPlaces String?         @db.Text // Tempat terdekat (JSON array)
  status      PropertyStatus   @default(ACTIVE)
  rating      Float?           @default(0) // Rating rata-rata
  totalReviews Int             @default(0) // Total review
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt

  admin User       @relation(fields: [adminId], references: [id])
  rooms KosRoom[]
  reviews Review[]
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
  description  String?    @db.Text // Deskripsi kamar
  maxOccupancy Int        @default(1) // Maksimal penghuni
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  property KosProperty @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  bookings Booking[]

  @@unique([propertyId, roomNumber]) // Nomor kamar unik per properti
}

model Booking {
  id             Int           @id @default(autoincrement())
  userId         Int           // User dengan role USER (penyewa)
  adminId        Int           // User dengan role ADMIN (pengelola kos)
  roomId         Int           // ID kamar yang dibooking
  checkInDate    DateTime      // Tanggal masuk
  checkOutDate   DateTime?     // Tanggal keluar (untuk extend)
  duration       Int           // Durasi sewa (bulan)
  monthlyPrice   Float         // Harga sewa per bulan
  deposit        Float         // Uang jaminan
  totalAmount    Float         // Total yang harus dibayar
  adminFee       Float         @default(0) // Biaya admin/platform
  status         BookingStatus @default(PENDING)
  paymentLink    String?       // Link pembayaran
  notes          String?       // Catatan booking
  rejectionReason String?      // Alasan penolakan
  expiresAt      DateTime?     // Waktu kadaluarsa booking
  actualCheckIn  DateTime?     // Waktu check-in sebenarnya
  actualCheckOut DateTime?     // Waktu check-out sebenarnya
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  user User    @relation("UserBookings", fields: [userId], references: [id])
  admin User   @relation("AdminBookings", fields: [adminId], references: [id])
  room KosRoom @relation(fields: [roomId], references: [id])

  transaction  Transaction?
  bookingLogs  BookingLog[] // Log perubahan status booking
  extensions   BookingExtension[] // Perpanjangan sewa
}

model BookingExtension {
  id              Int      @id @default(autoincrement())
  bookingId       Int
  extensionMonths Int      // Bulan perpanjangan
  extensionAmount Float    // Biaya perpanjangan
  newCheckOutDate DateTime // Tanggal checkout baru
  status          ExtensionStatus @default(PENDING)
  requestedAt     DateTime @default(now())
  processedAt     DateTime?

  booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)
}

model BookingLog {
  id          Int           @id @default(autoincrement())
  bookingId   Int
  status      BookingStatus
  description String?
  changedBy   String?       // Email user yang mengubah status
  createdAt   DateTime      @default(now())

  booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)
}

model Transaction {
  id            Int             @id @default(autoincrement())
  bookingId     Int?            @unique // Tidak selalu terkait booking (untuk monthly rent)
  userId        Int             // User dengan role USER (penyewa)
  adminId       Int             // User dengan role ADMIN (pengelola kos)
  status        PaymentStatus   @default(PENDING)
  type          TransactionType
  amount        Float           // Jumlah transaksi
  adminFee      Float           @default(0) // Biaya admin
  netAmount     Float           // Jumlah bersih (setelah fee)
  paymentMethod String?
  paymentId     String?         // ID dari payment gateway
  externalRef   String?         // Reference dari payment gateway
  notes         String?         // Catatan transaksi
  paymentDate   DateTime?       // Tanggal pembayaran berhasil
  refundAmount  Float?          // Jumlah refund
  refundDate    DateTime?       // Tanggal refund
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  booking Booking? @relation(fields: [bookingId], references: [id])
  user    User     @relation("UserTransactions", fields: [userId], references: [id])
  admin   User     @relation("AdminTransactions", fields: [adminId], references: [id])
}

model Review {
  id         Int      @id @default(autoincrement())
  userId     Int      // User yang memberikan review
  propertyId Int      // Properti yang direview
  bookingId  Int?     // Booking terkait (opsional)
  rating     Int      // Rating 1-5
  title      String?  // Judul review
  comment    String   @db.Text // Komentar review
  images     String?  @db.Text // Gambar review (JSON array)
  isAnonymous Boolean @default(false) // Review anonim
  status     ReviewStatus @default(ACTIVE)
  helpfulCount Int    @default(0) // Jumlah "helpful"
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  user     User        @relation("UserReviews", fields: [userId], references: [id])
  property KosProperty @relation(fields: [propertyId], references: [id], onDelete: Cascade)

  @@unique([userId, propertyId]) // Satu user hanya bisa review satu properti sekali
}

model Notification {
  id          Int              @id @default(autoincrement())
  userId      Int?             // Penerima notifikasi (null untuk broadcast)
  adminId     Int?             // Admin penerima (untuk notifikasi khusus admin)
  title       String
  message     String           @db.Text
  type        NotificationType
  data        String?          @db.Text // Data tambahan (JSON)
  isRead      Boolean          @default(false)
  readAt      DateTime?
  createdAt   DateTime         @default(now())

  user  User? @relation("UserNotifications", fields: [userId], references: [id], onDelete: Cascade)
  admin User? @relation("AdminNotifications", fields: [adminId], references: [id], onDelete: Cascade)
}

model SystemSetting {
  id        Int      @id @default(autoincrement())
  key       String   @unique
  value     String   @db.Text
  description String?
  type      SettingType @default(STRING)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model FileUpload {
  id         Int        @id @default(autoincrement())
  fileName   String
  originalName String
  filePath   String
  fileSize   Int
  mimeType   String
  uploadedBy Int?       // User yang upload
  entityType String?    // Type entity (property, room, review, etc)
  entityId   Int?       // ID entity terkait
  status     FileStatus @default(ACTIVE)
  createdAt  DateTime   @default(now())
}

model AppVersion {
  id          Int      @id @default(autoincrement())
  platform    String   // ios, android, web
  version     String
  buildNumber Int
  isRequired  Boolean  @default(false)
  downloadUrl String?
  releaseNotes String? @db.Text
  createdAt   DateTime @default(now())
}

enum Role {
  ADMIN // Pengelola/pemilik kos
  USER  // Penyewa/pencari kos
}

enum UserStatus {
  ACTIVE
  INACTIVE
  BANNED
  PENDING_VERIFICATION
}

enum Gender {
  MALE
  FEMALE
  OTHER
}

enum PropertyStatus {
  ACTIVE
  INACTIVE
  MAINTENANCE
  DELETED
  PENDING_APPROVAL
}

enum RoomType {
  SINGLE    // Kamar single
  SHARED    // Kamar sharing
  DELUXE    // Kamar deluxe
  STANDARD  // Kamar standard
  SUITE     // Kamar suite
}

enum RoomStatus {
  AVAILABLE   // Tersedia
  OCCUPIED    // Terisi/disewa
  MAINTENANCE // Dalam perbaikan
  RESERVED    // Direservasi
  BLOCKED     // Diblokir admin
}

enum BookingStatus {
  PENDING    // Menunggu pembayaran
  PAID       // Pembayaran diterima
  CONFIRMED  // Booking dikonfirmasi admin
  ACTIVE     // Sedang menyewa
  COMPLETED  // Sewa selesai
  CANCELLED  // Booking dibatalkan
  REJECTED   // Booking ditolak admin
  EXPIRED    // Booking expired
  CHECKED_IN // Sudah check-in
  CHECKED_OUT // Sudah check-out
}

enum ExtensionStatus {
  PENDING
  APPROVED
  REJECTED
}

enum PaymentStatus {
  PENDING
  SUCCESS
  FAILED
  CANCELLED
  REFUNDED
  PARTIAL_REFUND
}

enum TransactionType {
  BOOKING_PAYMENT // Pembayaran booking kos
  DEPOSIT         // Pembayaran deposit
  MONTHLY_RENT    // Pembayaran sewa bulanan
  EXTENSION       // Pembayaran perpanjangan
  REFUND          // Pengembalian dana
  FEE             // Biaya platform
  PENALTY         // Denda
}

enum ReviewStatus {
  ACTIVE
  HIDDEN
  REPORTED
  DELETED
}

enum NotificationType {
  BOOKING_CREATED
  BOOKING_CONFIRMED
  BOOKING_REJECTED
  PAYMENT_SUCCESS
  PAYMENT_FAILED
  CHECK_IN_REMINDER
  RENT_DUE_REMINDER
  BOOKING_EXPIRED
  REVIEW_RECEIVED
  SYSTEM_ANNOUNCEMENT
  MAINTENANCE_SCHEDULE
}

enum SettingType {
  STRING
  NUMBER
  BOOLEAN
  JSON
}

enum FileStatus {
  ACTIVE
  DELETED
  PROCESSING
}```
