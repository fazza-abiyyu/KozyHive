// TypesModel.ts

export type Role = 'OWNER' | 'TENANT' | 'ADMIN';

export type PropertyStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';

export type BookingStatus =
    | 'PENDING'
    | 'CONFIRMED'
    | 'PAID'
    | 'ACTIVE'
    | 'COMPLETED'
    | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export type TransactionType =
    | 'BOOKING_PAYMENT'
    | 'DEPOSIT'
    | 'MONTHLY_RENT'
    | 'REFUND';

export interface User {
    id: number;
    email: string;
    role: Role;
    profile?: Profile | null;
    createdAt: Date;
    updatedAt: Date;
    tenantBookings?: Booking[];
    tenantTransactions?: Transaction[];
    properties?: Property[];
    ownerBookings?: Booking[];
    ownerTransactions?: Transaction[];
    refreshTokens?: RefreshToken[];
}

export interface RefreshToken {
    id: number;
    userId: number;
    user: User;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Profile {
    id: number;
    userId: number;
    name: string;
    phone: string;
    address: string;
    user: User;
}

export interface Property {
    id: number;
    ownerId: number;
    name: string;
    description: string;
    address: string;
    city: string;
    price: number;
    totalRooms: number;
    availableRooms: number;
    status: PropertyStatus;
    images?: string;
    createdAt: Date;
    updatedAt: Date;
    owner: User;
    bookings?: Booking[];
}

export interface Booking {
    id: number;
    tenantId: number;
    ownerId: number;
    propertyId: number;
    checkInDate: Date;
    duration: number;
    monthlyPrice: number;
    deposit: number;
    totalAmount: number;
    status: BookingStatus;
    notes?: string;
    paymentLink?: string;
    createdAt: Date;
    updatedAt: Date;
    tenant: User;
    owner: User;
    property: Property;
    transaction?: Transaction;
    bookingLogs?: BookingLog[];
}

export interface BookingLog {
    id: number;
    bookingId: number;
    status: BookingStatus;
    description?: string;
    createdAt: Date;
    booking: Booking;
}

export interface Transaction {
    id: number;
    bookingId: number;
    tenantId: number;
    ownerId: number;
    status: PaymentStatus;
    type: TransactionType;
    amount: number;
    adminFee: number;
    netAmount: number;
    paymentMethod?: string;
    paymentId?: string;
    notes?: string;
    paymentDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    booking: Booking;
    tenant: User;
    owner: User;
}

