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
```