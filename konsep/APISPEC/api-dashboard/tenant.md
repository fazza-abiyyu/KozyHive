```
GET /api/dashboard/tenant
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Data dashboard tenant berhasil diambil!",
    "data": {
        "totalBookings": 2,
        "totalTransactions": 2,
        "activeBookings": []
    }
}


GET /api/dashboard/tenant/stats
{
    "success": true,
    "statusCode": 200,
    "message": "Statistik tenant berhasil diambil!",
    "data": {
        "successfulTransactions": 2,
        "totalSpent": 27200000
    }
}

```