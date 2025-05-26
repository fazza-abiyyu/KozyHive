````
GET api/admin/properties?page=1&pagesize=1
{
    "success": true,
    "statusCode": 200,
    "message": "Data properti ditemukan!",
    "data": {
        "0": {
            "id": 1,
            "ownerId": 1,
            "name": " Villa Sunset",
            "description": " Villa mewah dengan pemandangan laut.",
            "address": " Jl. Pantai Indah No. 12, Bali",
            "city": " Bali",
            "price": 5000000,
            "totalRooms": 3,
            "availableRooms": 2,
            "status": "INACTIVE",
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748153398/1.1.jpg_1748153494269.jpg",
            "createdAt": "2025-05-25T06:11:36.870Z",
            "updatedAt": "2025-05-25T06:51:24.927Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        },
        "1": {
            "id": 2,
            "ownerId": 1,
            "name": "Villa Sunset 222",
            "description": "Villa mewah dengan pemandangan laut.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 5000000,
            "totalRooms": 3,
            "availableRooms": 2,
            "status": "INACTIVE",
            "images": "",
            "createdAt": "2025-05-25T06:17:01.154Z",
            "updatedAt": "2025-05-25T06:30:51.106Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        },
        "2": {
            "id": 3,
            "ownerId": 1,
            "name": "Villa Sunset",
            "description": "Villa mewah dengan pemandangan laut.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 5000000,
            "totalRooms": 3,
            "availableRooms": 1,
            "status": "ACTIVE",
            "images": "",
            "createdAt": "2025-05-25T06:18:21.127Z",
            "updatedAt": "2025-05-25T07:37:26.471Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": [
                {
                    "id": 3,
                    "tenantId": 1,
                    "ownerId": 1,
                    "propertyId": 3,
                    "checkInDate": "2025-06-01T14:00:00.000Z",
                    "duration": 4,
                    "monthlyPrice": 5000000,
                    "deposit": 500000,
                    "totalAmount": 20500000,
                    "status": "PENDING",
                    "notes": "Saya ingin memesan kamar dengan pemandangan terbaik.",
                    "paymentLink": null,
                    "createdAt": "2025-05-25T07:37:26.463Z",
                    "updatedAt": "2025-05-25T08:30:58.495Z"
                }
            ]
        }
    },
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 3,
        "totalPages": 1
    }
}


PATCH api/admin/properties/:id/approve
response 200
{
    "code": 200,
    "message": "Status properti berhasil diperbarui!",
    "data": {
        "id": 2,
        "ownerId": 1,
        "name": "Villa Sunset 2",
        "description": "Villa mewah dengan pemandangan laut.",
        "address": "Jl. Pantai Indah No. 12, Bali",
        "city": "Bali",
        "price": 5000000,
        "totalRooms": 4,
        "availableRooms": 2,
        "status": "ACTIVE",
        "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179632/1.1.jpg_1748179728522.jpg",
        "createdAt": "2025-05-25T13:28:50.925Z",
        "updatedAt": "2025-05-25T23:48:45.921Z"
    }
}


PATCH api/admin/properties/:id/reject
response 200
{
    "code": 200,
    "message": "Status properti berhasil diperbarui!",
    "data": {
        "id": 2,
        "ownerId": 1,
        "name": "Villa Sunset 2",
        "description": "Villa mewah dengan pemandangan laut.",
        "address": "Jl. Pantai Indah No. 12, Bali",
        "city": "Bali",
        "price": 5000000,
        "totalRooms": 4,
        "availableRooms": 2,
        "status": "DELETED",
        "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179632/1.1.jpg_1748179728522.jpg",
        "createdAt": "2025-05-25T13:28:50.925Z",
        "updatedAt": "2025-05-25T23:49:02.953Z"
    }
}