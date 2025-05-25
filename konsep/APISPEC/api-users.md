```
GET api/users
response
{
    "success": true,
    "statusCode": 200,
    "message": "Data user ditemukan!",
    "data": {
        "0": {
            "id": 1,
            "email": "fazaabiyyu20@gmail.com",
            "password": "$2b$10$aPdm9bmJj4vogFURa0oPjeracZ2fzORKSDogRGsOg1iXiiN6tvLim",
            "role": "ADMIN",
            "createdAt": "2025-05-25T00:02:57.645Z",
            "updatedAt": "2025-05-25T00:02:57.645Z",
            "profile": null
        },
        "1": {
            "id": 5,
            "email": "fazaabiyyu18@gmail.com",
            "password": "$2b$10$4avloT8.iRZDujQz/DUY0OVQwkTOK2EgTY9TW3NLhhtb0MB7bo8I2",
            "role": "TENANT",
            "createdAt": "2025-05-25T00:08:31.412Z",
            "updatedAt": "2025-05-25T00:08:31.412Z",
            "profile": {
                "id": 6,
                "userId": 5,
                "name": "fazza abiyyu",
                "phone": "08123434567",
                "address": "Blater, Purbalingga"
            }
        }
    },
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 2,
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
            "email": "fazaabiyyu20@gmail.com",
            "role": "ADMIN",
            "createdAt": "2025-05-25T00:02:57.645Z",
            "updatedAt": "2025-05-25T00:02:57.645Z",
            "profile": null,
            "tenantBookings": [],
            "tenantTransactions": [],
            "properties": [],
            "ownerBookings": [],
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