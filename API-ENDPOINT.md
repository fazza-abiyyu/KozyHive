# API Endpoints - Aplikasi Kos-kosan

## 🔐 Authentication & Authorization

### Auth
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request reset password
- `POST /api/auth/reset-password` - Reset password dengan token

### Profile Management
- `GET /api/profile` - Get profile user yang sedang login
- `PUT /api/profile` - Update profile user
- `POST /api/profile/upload-avatar` - Upload foto profil
- `DELETE /api/profile/avatar` - Hapus foto profil

---

## 🏠 Kos Property Management (Admin Only)

### Kos Properties
- `GET /api/admin/properties` - Get semua properti kos milik admin
- `POST /api/admin/properties` - Buat properti kos baru
- `GET /api/admin/properties/:id` - Get detail properti kos
- `PUT /api/admin/properties/:id` - Update properti kos
- `DELETE /api/admin/properties/:id` - Hapus properti kos
- `PATCH /api/admin/properties/:id/status` - Update status properti (active/inactive)

### Kos Rooms Management
- `GET /api/admin/properties/:propertyId/rooms` - Get semua kamar dalam properti
- `POST /api/admin/properties/:propertyId/rooms` - Buat kamar baru
- `GET /api/admin/rooms/:id` - Get detail kamar
- `PUT /api/admin/rooms/:id` - Update kamar
- `DELETE /api/admin/rooms/:id` - Hapus kamar
- `PATCH /api/admin/rooms/:id/status` - Update status ketersediaan kamar
- `POST /api/admin/rooms/:id/images` - Upload gambar kamar
- `DELETE /api/admin/rooms/:id/images/:imageId` - Hapus gambar kamar

---

## 🔍 Public Search & Browse (User)

### Property Search
- `GET /api/properties` - Search dan filter properti kos
- `GET /api/properties/:id` - Get detail properti kos (public)
- `GET /api/properties/:id/rooms` - Get kamar yang tersedia dalam properti
- `GET /api/rooms/:id` - Get detail kamar (public)

### Location & Filters
- `GET /api/cities` - Get daftar kota yang tersedia
- `GET /api/properties/nearby` - Get kos terdekat berdasarkan koordinat
- `GET /api/properties/search` - Advanced search dengan multiple filter

---

## 📝 Booking Management

### User Bookings
- `GET /api/bookings` - Get semua booking user
- `POST /api/bookings` - Buat booking baru
- `GET /api/bookings/:id` - Get detail booking
- `PUT /api/bookings/:id` - Update booking (jika masih pending)
- `DELETE /api/bookings/:id` - Cancel booking
- `GET /api/bookings/:id/logs` - Get history log booking

### Admin Booking Management
- `GET /api/admin/bookings` - Get semua booking untuk properti admin
- `GET /api/admin/bookings/:id` - Get detail booking
- `PATCH /api/admin/bookings/:id/confirm` - Konfirmasi booking
- `PATCH /api/admin/bookings/:id/reject` - Tolak booking
- `PATCH /api/admin/bookings/:id/checkin` - Proses check-in penyewa
- `PATCH /api/admin/bookings/:id/checkout` - Proses check-out penyewa
- `POST /api/admin/bookings/:id/extend` - Perpanjang masa sewa

---

## 💰 Payment & Transactions

### Payment Processing
- `POST /api/bookings/:id/payment` - Inisiasi pembayaran booking
- `GET /api/bookings/:id/payment/status` - Cek status pembayaran
- `POST /api/payments/webhook` - Webhook dari payment gateway
- `POST /api/payments/verify` - Verifikasi pembayaran manual

### Transaction Management
- `GET /api/transactions` - Get riwayat transaksi user
- `GET /api/transactions/:id` - Get detail transaksi
- `GET /api/admin/transactions` - Get riwayat transaksi admin
- `POST /api/admin/transactions/:id/refund` - Proses refund

---

## 📊 Dashboard & Analytics

### User Dashboard
- `GET /api/dashboard/user` - Dashboard user (booking aktif, riwayat, dll)
- `GET /api/dashboard/user/stats` - Statistik user
- `GET /api/dashboard/user/notifications` - Notifikasi user

### Admin Dashboard
- `GET /api/dashboard/admin` - Dashboard admin
- `GET /api/dashboard/admin/stats` - Statistik properti dan booking
- `GET /api/dashboard/admin/revenue` - Laporan pendapatan
- `GET /api/dashboard/admin/occupancy` - Tingkat hunian kamar
- `GET /api/dashboard/admin/notifications` - Notifikasi admin

---

## 🔔 Notifications

### Notification Management
- `GET /api/notifications` - Get semua notifikasi
- `PATCH /api/notifications/:id/read` - Mark notifikasi sebagai dibaca
- `PATCH /api/notifications/read-all` - Mark semua notifikasi sebagai dibaca
- `DELETE /api/notifications/:id` - Hapus notifikasi

---

## ⭐ Reviews & Ratings (Optional)

### Review Management
- `GET /api/properties/:id/reviews` - Get review properti
- `POST /api/bookings/:id/review` - Buat review setelah checkout
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Hapus review
- `GET /api/admin/reviews` - Get semua review untuk properti admin

---

## 🛠️ Admin Management

### User Management (Super Admin)
- `GET /api/admin/users` - Get semua user
- `GET /api/admin/users/:id` - Get detail user
- `PATCH /api/admin/users/:id/status` - Update status user
- `DELETE /api/admin/users/:id` - Hapus user

### System Settings
- `GET /api/admin/settings` - Get pengaturan sistem
- `PUT /api/admin/settings` - Update pengaturan sistem
- `GET /api/admin/reports` - Generate laporan sistem

---

## 📱 Mobile App Support

### App Configuration
- `GET /api/config` - Get konfigurasi aplikasi
- `GET /api/version` - Get versi API dan app
- `POST /api/device/register` - Register device untuk push notification

---

## 🔧 Utilities

### File Upload
- `POST /api/upload/image` - Upload gambar umum
- `POST /api/upload/document` - Upload dokumen
- `DELETE /api/upload/:fileId` - Hapus file

### Geocoding
- `GET /api/geocode` - Convert alamat ke koordinat
- `GET /api/reverse-geocode` - Convert koordinat ke alamat

### Health Check
- `GET /api/health` - Health check API
- `GET /api/status` - Status sistem

---

## Query Parameters Examples

### Property Search (`GET /api/properties`)
```
?city=Jakarta
&minPrice=500000
&maxPrice=2000000
&roomType=SINGLE
&facilities=wifi,ac,parking
&page=1
&limit=10
&sortBy=price
&sortOrder=asc
```

### Nearby Search (`GET /api/properties/nearby`)
```
?lat=-6.200000
&lng=106.816666
&radius=5
&limit=20
```

### Admin Bookings (`GET /api/admin/bookings`)
```
?status=PENDING
&dateFrom=2024-01-01
&dateTo=2024-12-31
&propertyId=1
&page=1
&limit=20
```
