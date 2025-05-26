```
GET /api/search/properties?city=Bali&minPrice=5000&maxPrice=20000000
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Pencarian properti berhasil!",
    "data": [
        {
            "id": 5,
            "ownerId": 2,
            "name": "Villa Bulan",
            "description": "Villa Elegan dan Minimalis dengan pemandangan hutan.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 1000000,
            "totalRooms": 4,
            "availableRooms": 2,
            "status": "ACTIVE",
            "isArchived": false,
            "images": "",
            "createdAt": "2025-05-26T06:02:08.844Z",
            "updatedAt": "2025-05-26T06:03:44.338Z"
        },
        {
            "id": 1,
            "ownerId": 1,
            "name": "Villa Sunset 1",
            "description": "Villa mewah dengan pemandangan laut.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 5000000,
            "totalRooms": 3,
            "availableRooms": 1,
            "status": "ACTIVE",
            "isArchived": false,
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179598/1.1.jpg_1748179694553.jpg",
            "createdAt": "2025-05-25T13:28:17.110Z",
            "updatedAt": "2025-05-26T05:59:04.711Z"
        }
    ]
}




GET /api/search/cities
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Daftar kota berhasil diambil!",
    "data": [
        "Bali"
    ]
}


GET /api/search/price-range
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Rentang harga properti berhasil diambil!",
    "data": {
        "minPrice": 1000000,
        "maxPrice": 5000000
    }
}


GET /api/search/suggestions
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Saran pencarian berhasil diambil!",
    "data": [
        {
            "id": 5,
            "ownerId": 2,
            "name": "Villa Bulan",
            "description": "Villa Elegan dan Minimalis dengan pemandangan hutan.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 1000000,
            "totalRooms": 4,
            "availableRooms": 2,
            "status": "ACTIVE",
            "isArchived": false,
            "images": "",
            "createdAt": "2025-05-26T06:02:08.844Z",
            "updatedAt": "2025-05-26T06:03:44.338Z"
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
            "isArchived": false,
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179717/1.1.jpg_1748179813873.jpg",
            "createdAt": "2025-05-25T13:30:16.342Z",
            "updatedAt": "2025-05-25T13:30:16.342Z"
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
            "isArchived": false,
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179665/1.1.jpg_1748179761630.jpg",
            "createdAt": "2025-05-25T13:29:24.661Z",
            "updatedAt": "2025-05-25T23:24:59.739Z"
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
            "isArchived": false,
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179632/1.1.jpg_1748179728522.jpg",
            "createdAt": "2025-05-25T13:28:50.925Z",
            "updatedAt": "2025-05-25T23:49:02.953Z"
        },
        {
            "id": 1,
            "ownerId": 1,
            "name": "Villa Sunset 1",
            "description": "Villa mewah dengan pemandangan laut.",
            "address": "Jl. Pantai Indah No. 12, Bali",
            "city": "Bali",
            "price": 5000000,
            "totalRooms": 3,
            "availableRooms": 1,
            "status": "ACTIVE",
            "isArchived": false,
            "images": "https://res.cloudinary.com/dglcmrrhx/image/upload/v1748179598/1.1.jpg_1748179694553.jpg",
            "createdAt": "2025-05-25T13:28:17.110Z",
            "updatedAt": "2025-05-26T05:59:04.711Z"
        }
    ]
}
```