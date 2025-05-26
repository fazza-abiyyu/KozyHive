```
POST api/properties

request
Form Data : 
[
ownerId: 1
name: Villa Sunset
description: Villa mewah dengan pemandangan laut.
address: Jl. Pantai Indah No. 12, Bali
city: Bali
price: 5000000
totalRooms: 3
availableRooms: 2
images: file.jpg
]

Response 201
{
    "code": 201,
    "message": "Properti berhasil ditambahkan!",
    "data": {
        "id": 1,
        "ownerId": 1,
        "name": " Villa Sunset",
        "description": " Villa mewah dengan pemandangan laut.",
        "address": " Jl. Pantai Indah No. 12, Bali",
        "city": " Bali",
        "price": 5000000,
        "totalRooms": 3,
        "availableRooms": 2,
        "status": "ACTIVE",
        "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748153398/1.1.jpg_1748153494269.jpg",
        "createdAt": "2025-05-25T06:11:36.870Z",
        "updatedAt": "2025-05-25T06:11:36.870Z"
    }
}


GET api/properties/my-properties
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Data properti ditemukan!",
    "data": [
        {
            "id": 1,
            "ownerId": 1,
            "name": "Villa Sunset 1",
            "description": "Villa mewah dengan pemandangan laut.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 5000000,
            "totalRooms": 3,
            "availableRooms": 2,
            "status": "ACTIVE",
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179598/1.1.jpg_1748179694553.jpg",
            "createdAt": "2025-05-25T13:28:17.110Z",
            "updatedAt": "2025-05-25T13:32:16.942Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        },
        {
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
            "updatedAt": "2025-05-25T23:49:02.953Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        },
        {
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
            "updatedAt": "2025-05-25T23:24:59.739Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": [
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
                    "updatedAt": "2025-05-26T00:10:59.002Z"
                }
            ]
        },
        {
            "id": 4,
            "ownerId": 1,
            "name": "Villa Sunset 4",
            "description": "Villa mewah dengan pemandangan laut.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 5000000,
            "totalRooms": 3,
            "availableRooms": 2,
            "status": "INACTIVE",
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179717/1.1.jpg_1748179813873.jpg",
            "createdAt": "2025-05-25T13:30:16.342Z",
            "updatedAt": "2025-05-25T13:30:16.342Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 4,
        "totalPages": 1
    }
}

response 403
{
    "success": false,
    "statusCode": 403,
    "message": "Forbidden - Anda tidak memiliki akses."
}


PUT /api/properties/:id
request 
Form Data : 
[
ownerId: 1
name: Villa Sunset 222
description: Villa mewah dengan pemandangan laut.
address: Jl. Pantai Indah No. 12, Bali
city: Bali
price: 5000000
totalRooms: 3
availableRooms: 2
status:INACTIVE
]


response 200
{
    "code": 200,
    "message": "Properti berhasil diperbarui!",
    "data": {
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
        "updatedAt": "2025-05-25T06:30:51.106Z"
    }
}


response 403
{
    "success": false,
    "statusCode": 403,
    "message": "Forbidden - Anda tidak memiliki akses."
}


GET /api/properties/:id

response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Pengguna ditemukan!",
    "data": {
        "id": 1,
        "ownerId": 1,
        "name": " Villa Sunset",
        "description": " Villa mewah dengan pemandangan laut.",
        "address": " Jl. Pantai Indah No. 12, Bali",
        "city": " Bali",
        "price": 5000000,
        "totalRooms": 3,
        "availableRooms": 2,
        "status": "ACTIVE",
        "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748153398/1.1.jpg_1748153494269.jpg",
        "createdAt": "2025-05-25T06:11:36.870Z",
        "updatedAt": "2025-05-25T06:11:36.870Z"
    }
}

response 403
{
    "success": false,
    "statusCode": 403,
    "message": "Forbidden - Anda tidak memiliki akses."
}

DELETE /api/properties/:id


PATCH api/properties/:id/status

request
{
    "status": "INACTIVE"
}


response 200
{
    "code": 200,
    "message": "Status properti berhasil diperbarui!",
    "data": {
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
        "updatedAt": "2025-05-25T06:51:24.927Z"
    }
}


GET http://localhost:3000/api/properties/cities?c=Bali&page=1&pagesize=1

{
    "success": true,
    "statusCode": 200,
    "message": "Data properti ditemukan!",
    "data": [
        {
            "id": 1,
            "ownerId": 1,
            "name": "Villa Sunset 1",
            "description": "Villa mewah dengan pemandangan laut.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 5000000,
            "totalRooms": 3,
            "availableRooms": 2,
            "status": "ACTIVE",
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179598/1.1.jpg_1748179694553.jpg",
            "createdAt": "2025-05-25T13:28:17.110Z",
            "updatedAt": "2025-05-25T13:32:16.942Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        },
        {
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
            "updatedAt": "2025-05-25T23:49:02.953Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        },
        {
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
            "updatedAt": "2025-05-25T23:24:59.739Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": [
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
                    "updatedAt": "2025-05-26T00:10:59.002Z"
                }
            ]
        },
        {
            "id": 4,
            "ownerId": 1,
            "name": "Villa Sunset 4",
            "description": "Villa mewah dengan pemandangan laut.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 5000000,
            "totalRooms": 3,
            "availableRooms": 2,
            "status": "INACTIVE",
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179717/1.1.jpg_1748179813873.jpg",
            "createdAt": "2025-05-25T13:30:16.342Z",
            "updatedAt": "2025-05-25T13:30:16.342Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 4,
        "totalPages": 1
    }
}


GET http://localhost:3000/api/properties/search?q=Sunset&page=1&pagesize=1

response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Data properti ditemukan!",
    "data": [
        {
            "id": 1,
            "ownerId": 1,
            "name": "Villa Sunset 1",
            "description": "Villa mewah dengan pemandangan laut.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 5000000,
            "totalRooms": 3,
            "availableRooms": 2,
            "status": "ACTIVE",
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179598/1.1.jpg_1748179694553.jpg",
            "createdAt": "2025-05-25T13:28:17.110Z",
            "updatedAt": "2025-05-25T13:32:16.942Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        },
        {
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
            "updatedAt": "2025-05-25T23:49:02.953Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        },
        {
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
            "updatedAt": "2025-05-25T23:24:59.739Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": [
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
                    "updatedAt": "2025-05-26T00:10:59.002Z"
                }
            ]
        },
        {
            "id": 4,
            "ownerId": 1,
            "name": "Villa Sunset 4",
            "description": "Villa mewah dengan pemandangan laut.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 5000000,
            "totalRooms": 3,
            "availableRooms": 2,
            "status": "INACTIVE",
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179717/1.1.jpg_1748179813873.jpg",
            "createdAt": "2025-05-25T13:30:16.342Z",
            "updatedAt": "2025-05-25T13:30:16.342Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 4,
        "totalPages": 1
    }
}


GET /api/properties/:id
{
    "success": true,
    "statusCode": 200,
    "message": "Properti ditemukan!",
    "data": {
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
        "updatedAt": "2025-05-25T07:37:26.471Z"
    }
}


GET /api/properties?page=1&pagesize=1
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Data properti ditemukan!",
    "data": [
        {
            "id": 1,
            "ownerId": 1,
            "name": "Villa Sunset 1",
            "description": "Villa mewah dengan pemandangan laut.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 5000000,
            "totalRooms": 3,
            "availableRooms": 2,
            "status": "ACTIVE",
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179598/1.1.jpg_1748179694553.jpg",
            "createdAt": "2025-05-25T13:28:17.110Z",
            "updatedAt": "2025-05-25T13:32:16.942Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        },
        {
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
            "updatedAt": "2025-05-25T23:49:02.953Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        },
        {
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
            "updatedAt": "2025-05-25T23:24:59.739Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": [
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
                    "updatedAt": "2025-05-26T00:10:59.002Z"
                }
            ]
        },
        {
            "id": 4,
            "ownerId": 1,
            "name": "Villa Sunset 4",
            "description": "Villa mewah dengan pemandangan laut.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 5000000,
            "totalRooms": 3,
            "availableRooms": 2,
            "status": "INACTIVE",
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179717/1.1.jpg_1748179813873.jpg",
            "createdAt": "2025-05-25T13:30:16.342Z",
            "updatedAt": "2025-05-25T13:30:16.342Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        }
    ],
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 4,
        "totalPages": 1
    }
}

```