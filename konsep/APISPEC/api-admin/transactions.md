```
GET /api/admin/transactions?page=1&pagesize=1
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Data pesanan ditemukan!",
    "data": [
        {
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
            "updatedAt": "2025-05-26T06:04:42.761Z",
            "booking": {
                "id": 3,
                "tenantId": 2,
                "ownerId": 2,
                "propertyId": 5,
                "checkInDate": "2025-06-01T14:00:00.000Z",
                "duration": 6,
                "monthlyPrice": 1000000,
                "deposit": 200000,
                "totalAmount": 6200000,
                "status": "PENDING",
                "notes": "Saya ingin memesan kamar dengan pemandangan hutan.",
                "paymentLink": null,
                "createdAt": "2025-05-26T06:03:44.330Z",
                "updatedAt": "2025-05-26T06:03:44.330Z"
            },
            "tenant": {
                "id": 2,
                "email": "user@example.com"
            },
            "owner": {
                "id": 2,
                "email": "user@example.com"
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
            },
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            }
        },
        {
            "id": 1,
            "bookingId": 1,
            "tenantId": 1,
            "ownerId": 1,
            "status": "FAILED",
            "type": "BOOKING_PAYMENT",
            "amount": 30500000,
            "adminFee": 1525000,
            "netAmount": 28975000,
            "paymentMethod": "BANK_TRANSFER",
            "paymentId": "PG-20250526",
            "notes": "Refund telah diproses oleh admin.",
            "paymentDate": "2025-05-26T05:43:43.196Z",
            "createdAt": "2025-05-26T05:42:37.556Z",
            "updatedAt": "2025-05-26T06:28:51.340Z",
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
            },
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            }
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 3,
        "totalPages": 1
    }
}


GET /api/admin/transactions/stats
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Statistik transaksi berhasil diambil!",
    "data": {
        "totalTransactions": 3,
        "totalRevenue": 25840000,
        "successfulTransactions": 2,
        "failedTransactions": 1
    }
}



POST /api/admin/transactions/refund
request
{
    "transactionId": 1,
    "reason": "Pembayaran gagal, dana dikembalikan ke tenant."
}


response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Refund berhasil diproses!",
    "data": {
        "id": 1,
        "bookingId": 1,
        "tenantId": 1,
        "ownerId": 1,
        "status": "FAILED",
        "type": "BOOKING_PAYMENT",
        "amount": 30500000,
        "adminFee": 1525000,
        "netAmount": 28975000,
        "paymentMethod": "BANK_TRANSFER",
        "paymentId": "PG-20250526",
        "notes": "Refund telah diproses oleh admin.",
        "paymentDate": "2025-05-26T05:43:43.196Z",
        "createdAt": "2025-05-26T05:42:37.556Z",
        "updatedAt": "2025-05-26T06:28:51.340Z"
    }
}

```