```
POST api/auth/register

request 
{
    "email": "user@example.com",
    "password": "securepassword",
    "profile": {
        "name": "John Doe",
        "phone": "+628123456789",
        "address": "Jl. Mawar No. 1, Jakarta"
    }
}


respon 201
{
    "success": true,
    "statusCode": 201,
    "message": "Pengguna berhasil terdaftar!",
    "data": {
        "user": {
            "id": 2,
            "email": "user@example.com",
            "role": "TENANT",
            "createdAt": "2025-05-26T04:40:56.028Z",
            "updatedAt": "2025-05-26T04:40:56.028Z",
            "profile": {
                "id": 1,
                "userId": 2,
                "name": "John Doe",
                "phone": "+628123456789",
                "address": "Jl. Mawar No. 1, Jakarta"
            }
        }
    }
}

respon 400
{
    "success": false,
    "statusCode": 400,
    "message": "Harap berikan semua kolom yang diperlukan (email dan kata sandi)."
}

respon 409
{
    "success": false,
    "statusCode": 409,
    "message": "Email sudah terdaftar. Gunakan email lain."
}



POST api/auth/login

request
{
   "email": "user@example.com",
   "password": "securepassword"
}


respon 200
{
    "success": true,
    "statusCode": 200,
    "message": "Berhasil Masuk!",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwicm9sZSI6IlRFTkFOVCIsImlhdCI6MTc0ODIzNDk4MiwiZXhwIjoxNzQ4MjM1NTgyfQ.5kq17-IdXeAxDlW5ThVYgkKk0T2CLkdLqwMXtjvpIEA",
        "user": {
            "id": 2,
            "email": "user@example.com",
            "role": "TENANT",
            "profile": {
                "name": "John Doe",
                "phone": "+628123456789",
                "address": "Jl. Mawar No. 1, Jakarta"
            }
        }
    }
}

respon 400
{
    "success": false,
    "statusCode": 400,
    "message": "Pastikan telah mengisi dengan benar dan lengkap."
}

respon 400
{
    "success": false,
    "statusCode": 400,
    "message": "Kesalahan Kredensial."
}


GET api/auth/refresh

respon 200
{
    "success": true,
    "statusCode": 200,
    "message": "Token akses baru berhasil dibuat!",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJmYXphYWJpeXl1MThAZ21haWwuY29tIiwicm9sZSI6IlRFTkFOVCIsImlhdCI6MTc0ODEzNDUzOSwiZXhwIjoxNzQ4MTM1MTM5fQ.FFgTDmpHkbmIvKgk4x4imGS0QEyFFSAq8z2Nta7ZLAs"
    }
}

respon 400
{
    "success": false,
    "statusCode": 400,
    "message": "Tidak ada refresh token yang ditemukan dalam cookie."
}


api/auth/logout

respon 200
{
    "success": true,
    "statusCode": 200,
    "message": "Berhasil keluar!"
}

respon 400
{
    "success": false,
    "statusCode": 400,
    "message": "Tidak ada refresh token yang ditemukan dalam cookie."
}
```