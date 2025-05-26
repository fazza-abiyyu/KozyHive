```
POST /api/transactions/create-payment
request
{
    "bookingId": 3,
    "paymentMethod": "BANK_TRANSFER",
    "notes": "Pembayaran untuk sewa kamar hutan."
}


response 201
{
    "success": true,
    "statusCode": 201,
    "message": "Pembayaran berhasil dibuat!",
    "data": {
        "id": 4,
        "bookingId": 3,
        "tenantId": 2,
        "ownerId": 2,
        "status": "PENDING",
        "type": "BOOKING_PAYMENT",
        "amount": 6200000,
        "adminFee": 310000,
        "netAmount": 5890000,
        "paymentMethod": "BANK_TRANSFER",
        "paymentId": null,
        "notes": "Pembayaran untuk sewa kamar hutan.",
        "paymentDate": null,
        "createdAt": "2025-05-26T06:04:21.814Z",
        "updatedAt": "2025-05-26T06:04:21.814Z"
    }
}


POST /api/transactions/confirm-payment
request
{
    "bookingId": 3,
    "status": "SUCCESS",
    "paymentId": "PG-I5684459",
    "paymentDate": "2025-06-26T12:30:00.000Z"
}


response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Pembayaran berhasil dikonfirmasi!",
    "data": {
        "id": 4,
        "bookingId": 3,
        "tenantId": 2,
        "ownerId": 2,
        "status": "SUCCESS",
        "type": "BOOKING_PAYMENT",
        "amount": 6200000,
        "adminFee": 310000,
        "netAmount": 5890000,
        "paymentMethod": "BANK_TRANSFER",
        "paymentId": "PG-I5684459",
        "notes": "Pembayaran untuk sewa kamar hutan.",
        "paymentDate": "2025-05-26T06:04:42.759Z",
        "createdAt": "2025-05-26T06:04:21.814Z",
        "updatedAt": "2025-05-26T06:04:42.761Z"
    }
}

GET /api/transactions/property-transactions?page=1&pagesize=10
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Data properti ditemukan!",
    "data": [
        {
            "id": 1,
            "bookingId": 1,
            "tenantId": 1,
            "ownerId": 1,
            "status": "SUCCESS",
            "type": "BOOKING_PAYMENT",
            "amount": 30500000,
            "adminFee": 1525000,
            "netAmount": 28975000,
            "paymentMethod": "BANK_TRANSFER",
            "paymentId": "PG-20250526",
            "notes": "Pembayaran untuk booking",
            "paymentDate": "2025-05-26T05:43:43.196Z",
            "createdAt": "2025-05-26T05:42:37.556Z",
            "updatedAt": "2025-05-26T05:43:43.547Z",
            "booking": {
                "id": 1,
                "tenantId": 1,
                "ownerId": 1,
                "propertyId": 3,
                "checkInDate": "2025-06-01T14:00:00.000Z",
                "duration": 6,
                "monthlyPrice": 5000000,
                "deposit": 500000,
                "totalAmount": 30500000,
                "status": "ACTIVE",
                "notes": "Saya ingin memesan kamar dengan pemandangan terbaik.",
                "paymentLink": null,
                "createdAt": "2025-05-25T13:44:12.000Z",
                "updatedAt": "2025-05-26T00:10:59.002Z"
            },
            "tenant": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            }
        },
        {
            "id": 3,
            "bookingId": 2,
            "tenantId": 2,
            "ownerId": 1,
            "status": "SUCCESS",
            "type": "BOOKING_PAYMENT",
            "amount": 21000000,
            "adminFee": 1050000,
            "netAmount": 19950000,
            "paymentMethod": "BANK_TRANSFER",
            "paymentId": "PG-I91821",
            "notes": "Pembayaran untuk sewa kamar",
            "paymentDate": "2025-05-26T06:00:02.507Z",
            "createdAt": "2025-05-26T05:59:22.075Z",
            "updatedAt": "2025-05-26T06:00:02.509Z",
            "booking": {
                "id": 2,
                "tenantId": 2,
                "ownerId": 1,
                "propertyId": 1,
                "checkInDate": "2025-06-01T14:00:00.000Z",
                "duration": 4,
                "monthlyPrice": 5000000,
                "deposit": 1000000,
                "totalAmount": 21000000,
                "status": "PENDING",
                "notes": "Saya ingin memesan kamar dengan WC terbaik.",
                "paymentLink": null,
                "createdAt": "2025-05-26T05:59:04.707Z",
                "updatedAt": "2025-05-26T05:59:04.707Z"
            },
            "tenant": {
                "id": 2,
                "email": "user@example.com"
            }
        }
    ],
    "meta": {
        "page": 10,
        "limit": 10,
        "total": 2,
        "totalPages": 1
    }
}


GET /api/transactions/earnings
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Ringkasan pendapatan berhasil diambil!",
    "data": {
        "totalEarnings": 48925000
    }
}


GET /api/transactions/:id
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Detail transaksi berhasil diambil!",
    "data": {
        "id": 3,
        "bookingId": 2,
        "tenantId": 2,
        "ownerId": 1,
        "status": "SUCCESS",
        "type": "BOOKING_PAYMENT",
        "amount": 21000000,
        "adminFee": 1050000,
        "netAmount": 19950000,
        "paymentMethod": "BANK_TRANSFER",
        "paymentId": "PG-I91821",
        "notes": "Pembayaran untuk sewa kamar",
        "paymentDate": "2025-05-26T06:00:02.507Z",
        "createdAt": "2025-05-26T05:59:22.075Z",
        "updatedAt": "2025-05-26T06:00:02.509Z",
        "booking": {
            "id": 2,
            "tenantId": 2,
            "ownerId": 1,
            "propertyId": 1,
            "checkInDate": "2025-06-01T14:00:00.000Z",
            "duration": 4,
            "monthlyPrice": 5000000,
            "deposit": 1000000,
            "totalAmount": 21000000,
            "status": "PENDING",
            "notes": "Saya ingin memesan kamar dengan WC terbaik.",
            "paymentLink": null,
            "createdAt": "2025-05-26T05:59:04.707Z",
            "updatedAt": "2025-05-26T05:59:04.707Z"
        },
        "tenant": {
            "id": 2,
            "email": "user@example.com",
            "profile": {
                "name": "John Doe",
                "phone": "+628123456789",
                "address": "Jl. Mawar No. 1, Jakarta"
            }
        },
        "owner": {
            "id": 1,
            "email": "fazaabiyyu15@gmail.com",
            "profile": null
        }
    }
}
```