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
status: ACTIVE
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
            "status": "ACTIVE",
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748153398/1.1.jpg_1748153494269.jpg",
            "createdAt": "2025-05-25T06:11:36.870Z",
            "updatedAt": "2025-05-25T06:11:36.870Z",
            "owner": {
                "id": 1,
                "email": "fazaabiyyu15@gmail.com"
            },
            "bookings": []
        }
    },
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 1,
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


GET http://localhost:3000/api/properties/search?q=Sunset&page=1&pagesize=1

response 200
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

```