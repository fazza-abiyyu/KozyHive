```
GET api/admin/bookings?page=1&pagesize=1
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Data pesanan ditemukan!",
    "data": [
        {
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
            "updatedAt": "2025-05-26T00:10:59.002Z",
            "property": {
                "id": 3,
                "ownerId": 1,
                "name": "Villa Sunset 3",
                "description": "Villa mewah dengan pemandangan laut.",
                "address": "Jl. Pantai Indah No. 12, Bali",
                "city": "Bali",
                "price": 5000000,
                "totalRooms": 3,
                "availableRooms": 1,
                "status": "DELETED",
                "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179665/1.1.jpg_1748179761630.jpg",
                "createdAt": "2025-05-25T13:29:24.661Z",
                "updatedAt": "2025-05-25T23:24:59.739Z"
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
        "total": 1,
        "totalPages": 1
    }
}


GET api/admin/bookings/stats
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Data statistik booking berhasil diambil!",
    "data": {
        "totalBookings": 1,
        "totalRevenuePaid": 0,
        "totalRevenueCompleted": 30500000,
        "totalDeposit": 500000,
        "totalTenants": 1,
        "totalOwners": 1,
        "pendingBookings": 0,
        "confirmedBookings": 0,
        "activeBookings": 0,
        "completedBookings": 1,
        "cancelledBookings": 0
    }
}
```