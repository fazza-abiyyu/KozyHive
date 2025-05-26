```
GET api/bookings/:id/logs

response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Data riwayat pemesanan ditemukan!",
    "data": [
        {
            "id": 1,
            "bookingId": 1,
            "status": "ACTIVE",
            "description": "Status booking berubah menjadi ACTIVE",
            "createdAt": "2025-05-26T00:10:58.723Z"
        }
    ]
}


POST api/bookings/:id/logs
response 200
{
    "success": true,
    "statusCode": 201,
    "message": "Riwayar pesanan berhasil dibuat!",
    "data": {
        "id": 2,
        "bookingId": 1,
        "status": "COMPLETED",
        "description": "Booking telah dikonfirmasi oleh pemilik properti.",
        "createdAt": "2025-05-26T00:45:40.684Z"
    }
}
```