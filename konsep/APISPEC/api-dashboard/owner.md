```
GET /api/dashboard/owner
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Data dashboard owner berhasil diambil!",
    "data": {
        "totalProperties": 1,
        "totalBookings": 1,
        "totalTransactions": 1
    }
}


GET /api/dashboard/owner/stats
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Statistik transaksi owner berhasil diambil!",
    "data": {
        "successfulTransactions": 1,
        "totalRevenue": 5890000
    }
}


GET /api/dashboard/owner/revenue
response 200
{
    "success": true,
    "statusCode": 200,
    "message": "Analitik pendapatan berhasil diambil!",
    "data": {
        "revenueByMonth": [
            {
                "_sum": {
                    "netAmount": 5890000
                },
                "paymentDate": "2025-05-26T06:04:42.759Z"
            }
        ]
    }
}
```