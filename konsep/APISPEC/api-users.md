```
GET api/users
response
{
    "success": true,
    "statusCode": 200,
    "message": "Data user ditemukan!",
    "data": [
        {
            "id": 1,
            "email": "fazaabiyyu15@gmail.com",
            "password": "$2b$10$Yv8EGSvYf8agB6Qgbs.DyudN3xvAOdhIEjWXzuPqF44dlodGtPMXy",
            "role": "ADMIN",
            "createdAt": "2025-05-25T13:25:53.257Z",
            "updatedAt": "2025-05-25T13:25:53.257Z",
            "profile": null
        }
    ],
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


GET api/users/:id

response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Pengguna ditemukan!",
    "data": {
        "id": 1,
        "email": "fazaabiyyu15@gmail.com",
        "role": "ADMIN",
        "createdAt": "2025-05-25T13:25:53.257Z",
        "updatedAt": "2025-05-25T13:25:53.257Z",
        "profile": null,
        "tenantBookings": [
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
        ],
        "tenantTransactions": [],
        "properties": [
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
                "updatedAt": "2025-05-25T13:32:16.942Z"
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
                "updatedAt": "2025-05-25T23:49:02.953Z"
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
                "updatedAt": "2025-05-25T23:24:59.739Z"
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
                "updatedAt": "2025-05-25T13:30:16.342Z"
            }
        ],
        "ownerBookings": [
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
        ],
        "ownerTransactions": []
    }
}

response 403
{
    "success": false,
    "statusCode": 403,
    "message": "Forbidden - Anda tidak memiliki akses."
}


PUT api/users/:id
{
    "email": "fazza_abiyyu@qq.com",
    "password": "admin123",
    "role": "ADMIN"
}


response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Pengguna berhasil diubah!",
    "data": {
            "id": 8,
            "email": "fazza_abiyyu@qq.com",
            "password": "admin123",
            "role": "TENANT",
            "createdAt": "2025-05-25T01:01:58.769Z",
            "updatedAt": "2025-05-25T03:45:03.391Z"
        }
}

response 403
{
    "success": false,
    "statusCode": 403,
    "message": "Forbidden - Anda tidak memiliki akses."
}


DELETE api/users/:id
reponse 200
{
    "success": true,
    "statusCode": 200,
    "message": "Pengguna berhasil dihapus!",
    "data": {
            "id": 8,
            "email": "fazza_abiyyu@qq.com",
            "password": "$2b$10$uOhx8XaWNmixU5HMT7bWAOjqNhAs4DJuRIn.tMO71Pc9thiDVtJxa",
            "role": "ADMIN",
            "createdAt": "2025-05-25T01:01:58.769Z",
            "updatedAt": "2025-05-25T03:50:39.300Z"
        }
}

response 404
{
    "success": false,
    "statusCode": 404,
    "message": "Data tidak ditemukan."
}

response 403
{
    "success": false,
    "statusCode": 403,
    "message": "Forbidden - Anda tidak memiliki akses."
}


GET api/users/me
response


PUT api/users/me

request
{
    "email": "fazaabiyyu15@gmail.com",
    "password": "admin123",
    "role": "ADMIN"
}

response 201
{
    "success": true,
    "statusCode": 200,
    "message": "Pengguna berhasil diubah!",
    "data": {
        "id": 1,
        "email": "fazaabiyyu15@gmail.com",
        "password": "$2b$10$p3gnN6AmT1zKGESncLfGY.U/Oh5mzllzzlgCJE8zS6tZz9PAxQrGm",
        "role": "ADMIN",
        "createdAt": "2025-05-25T00:02:57.645Z",
        "updatedAt": "2025-05-25T04:18:46.345Z"
    }
}
```