```
USE Bearer Token

GET api/profile

respone 200
{
    "success": true,
    "statusCode": 200,
    "message": "Profile ditemukan!",
    "data": {
            "id": 1,
            "userId": 5,
            "name": "fazza abiyyu",
            "phone": "0812345677",
            "address": "Blater, Purbalingga"
    }
}


POST api/profile

request
{
    "name": "fazza abiyyu",
    "phone": "0812345677",
    "address": "Blater, Purbalingga"
}

respon 201
{
    "success": true,
    "statusCode": 201,
    "message": "Profile berhasil dibuat!",
    "data": {
            "id": 4,
            "userId": 5,
            "name": "fazza abiyyu",
            "phone": "0812345677",
            "address": "Blater, Purbalingga"
        }
}

respone 409
{
    "success": false,
    "statusCode": 409,
    "message": "Data sudah ada."
}


PUT api/profile
request
{
    "name": "fazza abiyyu",
    "phone": "08123434567",
    "address": "Blater, Banyumas"
}


respone 200
{
    "success": true,
    "statusCode": 200,
    "message": "Profile berhasil diperbarui!",
    "data": {
            "id": 5,
            "userId": 5,
            "name": "fazza abiyyu",
            "phone": "08123434567",
            "address": "Blater, Banyumas"
        }
}

DELETE api/profile

respone 200
{
    "success": true,
    "statusCode": 200,
    "message": "Profile berhasil dihapus!",
    "data": {
            "id": 5,
            "userId": 5,
            "name": "fazza abiyyu",
            "phone": "08123434567",
            "address": "Blater, Banyumas"
        }
}

respone 404
{
    "success": false,
    "statusCode": 404,
    "message": "Data yang ingin dihapus tidak ditemukan."
}
```