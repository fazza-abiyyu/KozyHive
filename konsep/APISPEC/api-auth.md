```
POST api/auth/register

request 
{
    "email": "fazaabiyyu20@gmail.com",
    "password": "admin123"
}

respon 201
{
    "success": true,
    "statusCode": 201,
    "message": "Pengguna berhasil terdaftar!",
    "data": {
        "user": {
            "id": 8,
            "email": "fazaabiyyu15@gmail.com",
            "role": "TENANT",
            "createdAt": "2025-05-25T01:01:58.769Z",
            "updatedAt": "2025-05-25T01:01:58.769Z"
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
    "email": "fazaabiyyu18@gmail.com",
    "password": "admin123"
}


respon 200
{
    "success": true,
    "statusCode": 200,
    "message": "Berhasil Masuk!",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJmYXphYWJpeXl1MThAZ21haWwuY29tIiwicm9sZSI6IlRFTkFOVCIsImlhdCI6MTc0ODEzNDUzNSwiZXhwIjoxNzQ4MTM1MTM1fQ.I-c1L6FTRiz1ALao3x50g53Q_3VG_v_FhbZy7Aj_6iw",
        "user": {
            "id": 5,
            "email": "fazaabiyyu18@gmail.com",
            "role": "TENANT"
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