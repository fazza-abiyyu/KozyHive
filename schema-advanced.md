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
  role      Role     @default(USER)
  status    UserStatus @default(ACTIVE)
  avatar    String?
  emailVerifiedAt DateTime?
  lastLoginAt     DateTime?
  deletedAt       DateTime? // Soft delete
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  profile   Profile?
  refreshTokens RefreshToken[]
  deviceTokens  DeviceToken[]
  passwordResets PasswordReset[]

  // User (tenant) relations
  bookings       Booking[]     @relation("TenantBookings")
  transactions   Transaction[] @relation("TenantTransactions")
  reviews        Review[]      
  notifications  Notification[] @relation("UserNotifications")
  favoriteProperties PropertyFavorite[]

  // Admin (owner) relations
  properties     Property[]
  adminBookings  Booking[]     @relation("OwnerBookings")
  adminTransactions Transaction[] @relation("OwnerTransactions")
  adminNotifications Notification[] @relation("AdminNotifications")

  @@index([email])
  @@index([role, status])
  @@map("users")
}

model Profile {
  id       Int     @id @default(autoincrement())
  userId   Int     @unique
  firstName    String
  lastName     String?
  phone        String?
  address      String?
  city         String?
  province     String?
  postalCode   String?
  idNumber     String? @unique // KTP/ID number
  dateOfBirth  DateTime?
  gender       Gender?
  occupation   String?
  emergencyContactName String?
  emergencyContactPhone String?
  bio          String? @db.Text
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([phone])
  @@map("profiles")
}

model RefreshToken {
  id           Int      @id @default(autoincrement())
  userId       Int
  token        String   @unique @db.VarChar(500)
  expiresAt    DateTime
  isRevoked    Boolean  @default(false)
  createdAt    DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("refresh_tokens")
}

model PasswordReset {
  id        Int      @id @default(autoincrement())
  userId    Int
  token     String   @unique
  expiresAt DateTime
  isUsed    Boolean  @default(false)
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([token])
  @@map("password_resets")
}

model DeviceToken {
  id           Int      @id @default(autoincrement())
  userId       Int
  token        String   @unique
  deviceType   DeviceType
  deviceId     String?
  appVersion   String?
  isActive     Boolean  @default(true)
  lastUsedAt   DateTime @default(now())
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, isActive])
  @@map("device_tokens")
}

// ================================
// PROPERTY MANAGEMENT
// ================================

model Property {
  id          Int      @id @default(autoincrement())
  ownerId     Int
  name        String
  slug        String   @unique
  description String   @db.Text
  address     String   @db.Text
  city        String
  province    String
  postalCode  String?
  latitude    Decimal? @db.Decimal(10, 8)
  longitude   Decimal? @db.Decimal(11, 8)
  
  // Property details
  propertyType PropertyType @default(KOS)
  targetGender Gender?
  facilities   Json? // Array of facility objects
  rules        Json? // Array of rule objects
  images       Json? // Array of image URLs
  contactInfo  Json? // Contact information object
  nearbyPlaces Json? // Array of nearby places
  
  // Business info
  minPrice     Decimal @db.Decimal(10, 2)
  maxPrice     Decimal @db.Decimal(10, 2)
  totalRooms   Int     @default(0)
  availableRooms Int   @default(0)
  
  // Status and ratings
  status       PropertyStatus @default(DRAFT)
  isVerified   Boolean @default(false)
  verifiedAt   DateTime?
  verifiedBy   Int?
  rating       Decimal? @db.Decimal(3, 2) @default(0)
  totalReviews Int     @default(0)
  totalViews   Int     @default(0)
  
  // SEO and marketing
  metaTitle       String?
  metaDescription String? @db.Text
  tags           Json? // Array of tags
  
  deletedAt    DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  // Relations
  owner        User              @relation(fields: [ownerId], references: [id])
  rooms        Room[]
  reviews      Review[]
  bookings     Booking[]
  favorites    PropertyFavorite[]
  amenities    PropertyAmenity[]
  images_rel   PropertyImage[]

  @@index([ownerId])
  @@index([city, status])
  @@index([status, isVerified])
  @@index([rating])
  @@fulltext([name, description])
  @@map("properties")
}

model Room {
  id           Int      @id @default(autoincrement())
  propertyId   Int
  roomNumber   String
  name         String?
  roomType     RoomType
  
  // Pricing
  price        Decimal  @db.Decimal(10, 2)
  deposit      Decimal  @db.Decimal(10, 2) @default(0)
  adminFee     Decimal  @db.Decimal(10, 2) @default(0)
  
  // Room details
  size         Decimal? @db.Decimal(5, 2) // in m²
  floor        Int?
  capacity     Int      @default(1)
  facilities   Json?    // Room-specific facilities
  images       Json?    // Room images
  description  String?  @db.Text
  
  // Availability
  isAvailable  Boolean  @default(true)
  status       RoomStatus @default(AVAILABLE)
  availableFrom DateTime?
  
  deletedAt    DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  // Relations
  property     Property  @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  bookings     Booking[]
  images_rel   RoomImage[]

  @@unique([propertyId, roomNumber])
  @@index([propertyId, status])
  @@index([status, isAvailable])
  @@index([price])
  @@map("rooms")
}

// ================================
// BOOKING MANAGEMENT
// ================================

model Booking {
  id             String   @id @default(cuid())
  bookingNumber  String   @unique
  
  // Parties
  tenantId       Int
  ownerId        Int
  propertyId     Int
  roomId         Int
  
  // Booking details
  checkInDate    DateTime
  checkOutDate   DateTime?
  duration       Int      // Duration in months
  
  // Pricing
  monthlyPrice   Decimal  @db.Decimal(10, 2)
  deposit        Decimal  @db.Decimal(10, 2)
  adminFee       Decimal  @db.Decimal(10, 2) @default(0)
  totalAmount    Decimal  @db.Decimal(10, 2)
  paidAmount     Decimal  @db.Decimal(10, 2) @default(0)
  
  // Status and workflow
  status         BookingStatus @default(PENDING)
  paymentStatus  PaymentStatus @default(PENDING)
  paymentDueDate DateTime?
  
  // Additional info
  notes          String?  @db.Text
  specialRequests String? @db.Text
  rejectionReason String? @db.Text
  cancellationReason String? @db.Text
  
  // Timestamps
  expiresAt      DateTime?
  confirmedAt    DateTime?
  cancelledAt    DateTime?
  checkedInAt    DateTime?
  checkedOutAt   DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  // Relations
  tenant       User      @relation("TenantBookings", fields: [tenantId], references: [id])
  owner        User      @relation("OwnerBookings", fields: [ownerId], references: [id])
  property     Property  @relation(fields: [propertyId], references: [id])
  room         Room      @relation(fields: [roomId], references: [id])
  
  transactions Transaction[]
  extensions   BookingExtension[]
  logs         BookingLog[]
  documents    BookingDocument[]

  @@index([tenantId])
  @@index([ownerId])
  @@index([propertyId])
  @@index([roomId])
  @@index([status])
  @@index([checkInDate, checkOutDate])
  @@map("bookings")
}

model BookingExtension {
  id              String   @id @default(cuid())
  bookingId       String
  
  extensionMonths Int
  newCheckOutDate DateTime
  extensionAmount Decimal  @db.Decimal(10, 2)
  
  status          ExtensionStatus @default(PENDING)
  reason          String? @db.Text
  rejectionReason String? @db.Text
  
  requestedAt     DateTime @default(now())
  processedAt     DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)

  @@index([bookingId])
  @@map("booking_extensions")
}

model BookingLog {
  id          Int      @id @default(autoincrement())
  bookingId   String
  
  action      BookingAction
  fromStatus  BookingStatus?
  toStatus    BookingStatus?
  description String?  @db.Text
  metadata    Json?    // Additional data
  
  performedBy Int?     // User who performed the action
  ipAddress   String?
  userAgent   String?  @db.Text
  
  createdAt   DateTime @default(now())

  booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)

  @@index([bookingId])
  @@index([action])
  @@map("booking_logs")
}

model BookingDocument {
  id        Int      @id @default(autoincrement())
  bookingId String
  
  type      DocumentType
  name      String
  fileName  String
  filePath  String
  fileSize  Int
  mimeType  String
  
  uploadedBy Int
  uploadedAt DateTime @default(now())

  booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)

  @@index([bookingId])
  @@map("booking_documents")
}

// ================================
// PAYMENT & TRANSACTION
// ================================

model Transaction {
  id            String   @id @default(cuid())
  referenceId   String   @unique
  
  // Parties
  payerId       Int
  payeeId       Int
  bookingId     String?
  
  // Transaction details
  type          TransactionType
  status        PaymentStatus @default(PENDING)
  amount        Decimal  @db.Decimal(12, 2)
  adminFee      Decimal  @db.Decimal(12, 2) @default(0)
  netAmount     Decimal  @db.Decimal(12, 2)
  currency      String   @default("IDR")
  
  // Payment gateway
  paymentMethod    String?
  paymentGateway   String?
  gatewayTxnId     String?
  gatewayResponse  Json?
  
  // Status tracking
  paidAt           DateTime?
  failedAt         DateTime?
  cancelledAt      DateTime?
  refundedAt       DateTime?
  refundAmount     Decimal? @db.Decimal(12, 2)
  
  description      String?  @db.Text
  notes           String?  @db.Text
  metadata        Json?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  payer   User     @relation("TenantTransactions", fields: [payerId], references: [id])
  payee   User     @relation("OwnerTransactions", fields: [payeeId], references: [id])
  booking Booking? @relation(fields: [bookingId], references: [id])

  @@index([payerId])
  @@index([payeeId])
  @@index([bookingId])
  @@index([status])
  @@index([type])
  @@map("transactions")
}

// ================================
// REVIEW & RATING
// ================================

model Review {
  id         Int      @id @default(autoincrement())
  userId     Int
  propertyId Int
  bookingId  String?
  
  rating     Int      // 1-5 stars
  title      String?
  comment    String   @db.Text
  images     Json?    // Review images
  
  // Review aspects (optional detailed ratings)
  cleanlinessRating Int?
  locationRating    Int?
  valueRating       Int?
  serviceRating     Int?
  
  isAnonymous Boolean @default(false)
  status      ReviewStatus @default(PUBLISHED)
  
  // Engagement
  helpfulCount Int @default(0)
  reportCount  Int @default(0)
  
  // Admin moderation
  moderatedBy  Int?
  moderatedAt  DateTime?
  moderationNote String? @db.Text
  
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  user     User     @relation(fields: [userId], references: [id])
  property Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)

  @@unique([userId, propertyId]) // One review per user per property
  @@index([propertyId, status])
  @@index([rating])
  @@map("reviews")
}

// ================================
// SUPPORTING MODELS
// ================================

model PropertyFavorite {
  id         Int @id @default(autoincrement())
  userId     Int
  propertyId Int
  createdAt  DateTime @default(now())

  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  property Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)

  @@unique([userId, propertyId])
  @@map("property_favorites")
}

model PropertyAmenity {
  id         Int @id @default(autoincrement())
  propertyId Int
  name       String
  category   AmenityCategory
  icon       String?
  isHighlight Boolean @default(false)

  property Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)

  @@index([propertyId])
  @@map("property_amenities")
}

model PropertyImage {
  id         Int @id @default(autoincrement())
  propertyId Int
  url        String
  caption    String?
  sortOrder  Int @default(0)
  isMain     Boolean @default(false)

  property Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)

  @@index([propertyId])
  @@map("property_images")
}

model RoomImage {
  id        Int @id @default(autoincrement())
  roomId    Int
  url       String
  caption   String?
  sortOrder Int @default(0)
  isMain    Boolean @default(false)

  room Room @relation(fields: [roomId], references: [id], onDelete: Cascade)

  @@index([roomId])
  @@map("room_images")
}

model Notification {
  id          Int      @id @default(autoincrement())
  userId      Int?     // Null for broadcast notifications
  adminId     Int?     // For admin-specific notifications
  
  type        NotificationType
  title       String
  message     String   @db.Text
  data        Json?    // Additional notification data
  
  // Channels
  inApp       Boolean  @default(true)
  email       Boolean  @default(false)
  push        Boolean  @default(false)
  sms         Boolean  @default(false)
  
  // Status
  isRead      Boolean  @default(false)
  readAt      DateTime?
  
  // Scheduling
  scheduledFor DateTime?
  sentAt       DateTime?
  
  createdAt   DateTime @default(now())

  user  User? @relation("UserNotifications", fields: [userId], references: [id], onDelete: Cascade)
  admin User? @relation("AdminNotifications", fields: [adminId], references: [id], onDelete: Cascade)

  @@index([userId, isRead])
  @@index([type])
  @@map("notifications")
}

model SystemSetting {
  id          Int      @id @default(autoincrement())
  key         String   @unique
  value       String   @db.Text
  valueType   SettingType @default(STRING)
  category    String?
  description String?  @db.Text
  isPublic    Boolean  @default(false)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([category])
  @@map("system_settings")
}

model ActivityLog {
  id         Int      @id @default(autoincrement())
  userId     Int?
  action     String
  entity     String   // Table/model name
  entityId   String?  // ID of the affected entity
  oldValues  Json?    // Previous values
  newValues  Json?    // New values
  ipAddress  String?
  userAgent  String?  @db.Text
  
  createdAt  DateTime @default(now())

  @@index([userId])
  @@index([entity, entityId])
  @@index([action])
  @@map("activity_logs")
}

// ================================
// ENUMS
// ================================

enum Role {
  USER    // Tenant/renter
  ADMIN   // Property owner/manager
  SUPER_ADMIN // Platform administrator
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  PENDING_VERIFICATION
  DEACTIVATED
}

enum Gender {
  MALE
  FEMALE
  OTHER
}

enum DeviceType {
  IOS
  ANDROID
  WEB
  DESKTOP
}

enum PropertyType {
  KOS
  APARTMENT
  BOARDING_HOUSE
  SHARED_HOUSE
}

enum PropertyStatus {
  DRAFT
  PENDING_REVIEW
  ACTIVE
  INACTIVE
  SUSPENDED
  REJECTED
}

enum RoomType {
  SINGLE
  SHARED
  DELUXE
  STANDARD
  SUITE
  STUDIO
}

enum RoomStatus {
  AVAILABLE
  OCCUPIED
  MAINTENANCE
  RESERVED
  BLOCKED
}

enum BookingStatus {
  PENDING
  CONFIRMED
  PAID
  ACTIVE
  COMPLETED
  CANCELLED
  REJECTED
  EXPIRED
  CHECKED_IN
  CHECKED_OUT
}

enum PaymentStatus {
  PENDING
  PROCESSING
  SUCCESS
  FAILED
  CANCELLED
  REFUNDED
  PARTIAL_REFUND
  EXPIRED
}

enum ExtensionStatus {
  PENDING
  APPROVED
  REJECTED
  EXPIRED
}

enum TransactionType {
  BOOKING_PAYMENT
  DEPOSIT
  MONTHLY_RENT
  EXTENSION_PAYMENT
  REFUND
  ADMIN_FEE
  PENALTY
  UTILITY_BILL
}

enum BookingAction {
  CREATED
  CONFIRMED
  PAID
  CHECKED_IN
  CHECKED_OUT
  EXTENDED
  CANCELLED
  REJECTED
  EXPIRED
}

enum DocumentType {
  CONTRACT
  IDENTITY_CARD
  PAYMENT_PROOF
  DAMAGE_REPORT
  OTHER
}

enum ReviewStatus {
  DRAFT
  PUBLISHED
  HIDDEN
  FLAGGED
  DELETED
}

enum NotificationType {
  BOOKING_CREATED
  BOOKING_CONFIRMED
  BOOKING_REJECTED
  PAYMENT_SUCCESS
  PAYMENT_FAILED
  PAYMENT_REMINDER
  CHECK_IN_REMINDER
  RENT_DUE
  BOOKING_EXPIRED
  REVIEW_REQUEST
  REVIEW_RECEIVED
  PROPERTY_UPDATE
  SYSTEM_MAINTENANCE
  ACCOUNT_UPDATE
  PROMOTION
}

enum AmenityCategory {
  BASIC
  BATHROOM
  KITCHEN
  LIVING
  SECURITY
  CONNECTIVITY
  RECREATION
  PARKING
  SERVICE
}

enum SettingType {
  STRING
  NUMBER
  BOOLEAN
  JSON
  ARRAY
}
```
