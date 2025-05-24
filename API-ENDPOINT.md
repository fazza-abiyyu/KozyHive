# Kos Platform API Endpoints

## 🔐 Authentication & Authorization

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/auth/register` | Register new user | Public |
| `POST` | `/api/auth/login` | User login | Public |
| `POST` | `/api/auth/logout` | User logout | Authenticated |
| `POST` | `/api/auth/refresh` | Refresh access token | Authenticated |
| `POST` | `/api/auth/forgot-password` | Send password reset email | Public |
| `POST` | `/api/auth/reset-password` | Reset password with token | Public |

## 👤 User Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/users/me` | Get current user profile | Authenticated |
| `PUT` | `/api/users/me` | Update current user | Authenticated |
| `DELETE` | `/api/users/me` | Delete current user account | Authenticated |
| `GET` | `/api/users` | Get all users (admin only) | Admin |
| `GET` | `/api/users/:id` | Get user by ID | Admin |
| `PUT` | `/api/users/:id` | Update user by ID | Admin |
| `DELETE` | `/api/users/:id` | Delete user by ID | Admin |

## 📋 Profile Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/profile` | Get current user profile | Authenticated |
| `POST` | `/api/profile` | Create user profile | Authenticated |
| `PUT` | `/api/profile` | Update user profile | Authenticated |
| `DELETE` | `/api/profile` | Delete user profile | Authenticated |

## 🏠 Property Management

### Public Property Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/properties` | Get all active properties (with filters) | Public |
| `GET` | `/api/properties/:id` | Get property details | Public |
| `GET` | `/api/properties/search` | Search properties | Public |
| `GET` | `/api/properties/cities` | Get available cities | Public |

### Owner Property Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/properties/my-properties` | Get owner's properties | Owner |
| `POST` | `/api/properties` | Create new property | Owner |
| `PUT` | `/api/properties/:id` | Update property | Owner |
| `DELETE` | `/api/properties/:id` | Delete property | Owner |
| `PATCH` | `/api/properties/:id/status` | Update property status | Owner |

### Admin Property Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/admin/properties` | Get all properties (admin) | Admin |
| `PATCH` | `/api/admin/properties/:id/approve` | Approve property | Admin |
| `PATCH` | `/api/admin/properties/:id/reject` | Reject property | Admin |

## 📅 Booking Management

### Tenant Booking Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/bookings/my-bookings` | Get tenant's bookings | Tenant |
| `POST` | `/api/bookings` | Create new booking | Tenant |
| `PUT` | `/api/bookings/:id` | Update booking (before confirmed) | Tenant |
| `DELETE` | `/api/bookings/:id` | Cancel booking | Tenant |
| `GET` | `/api/bookings/:id` | Get booking details | Tenant/Owner |

### Owner Booking Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/bookings/property-bookings` | Get bookings for owner's properties | Owner |
| `PATCH` | `/api/bookings/:id/confirm` | Confirm booking | Owner |
| `PATCH` | `/api/bookings/:id/reject` | Reject booking | Owner |
| `PATCH` | `/api/bookings/:id/activate` | Activate booking (tenant checked in) | Owner |
| `PATCH` | `/api/bookings/:id/complete` | Complete booking | Owner |

### Admin Booking Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/admin/bookings` | Get all bookings | Admin |
| `GET` | `/api/admin/bookings/stats` | Get booking statistics | Admin |

## 📋 Booking Logs

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/bookings/:id/logs` | Get booking logs | Tenant/Owner |
| `POST` | `/api/bookings/:id/logs` | Add booking log | Owner/Admin |

## 💳 Transaction Management

### Tenant Transaction Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/transactions/my-transactions` | Get tenant's transactions | Tenant |
| `GET` | `/api/transactions/:id` | Get transaction details | Tenant/Owner |
| `POST` | `/api/transactions/create-payment` | Create payment for booking | Tenant |
| `POST` | `/api/transactions/confirm-payment` | Confirm payment (webhook) | System |

### Owner Transaction Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/transactions/property-transactions` | Get transactions for owner's properties | Owner |
| `GET` | `/api/transactions/earnings` | Get owner's earnings summary | Owner |

### Admin Transaction Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/admin/transactions` | Get all transactions | Admin |
| `GET` | `/api/admin/transactions/stats` | Get transaction statistics | Admin |
| `POST` | `/api/admin/transactions/refund` | Process refund | Admin |

## 📊 Dashboard & Analytics

### Tenant Dashboard
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/dashboard/tenant` | Get tenant dashboard data | Tenant |
| `GET` | `/api/dashboard/tenant/stats` | Get tenant statistics | Tenant |

### Owner Dashboard
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/dashboard/owner` | Get owner dashboard data | Owner |
| `GET` | `/api/dashboard/owner/stats` | Get owner statistics | Owner |
| `GET` | `/api/dashboard/owner/revenue` | Get revenue analytics | Owner |

### Admin Dashboard
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/admin/dashboard` | Get admin dashboard data | Admin |
| `GET` | `/api/admin/stats` | Get platform statistics | Admin |
| `GET` | `/api/admin/analytics` | Get detailed analytics | Admin |

## 🔄 Utility Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/upload/image` | Upload property image | Owner |
| `DELETE` | `/api/upload/image/:id` | Delete uploaded image | Owner |
| `GET` | `/api/health` | Health check | Public |
| `GET` | `/api/version` | API version info | Public |

## 🎯 Search & Filter Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/search/properties` | Advanced property search | Public |
| `GET` | `/api/search/suggestions` | Search suggestions | Public |
| `GET` | `/api/filters/cities` | Get available cities | Public |
| `GET` | `/api/filters/price-range` | Get price range data | Public |

## 📱 Notification Endpoints (Optional)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/notifications` | Get user notifications | Authenticated |
| `PATCH` | `/api/notifications/:id/read` | Mark notification as read | Authenticated |
| `DELETE` | `/api/notifications/:id` | Delete notification | Authenticated |

## 🔧 System Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/webhooks/payment` | Payment gateway webhook | System |
| `GET` | `/api/system/status` | System status | Admin |
| `POST` | `/api/system/seed` | Seed database (dev only) | Admin |

---

## 📝 Query Parameters Examples

### Property Search
```
GET /api/properties?city=Jakarta&minPrice=1000000&maxPrice=5000000&page=1&limit=10
```

### Booking Filter
```
GET /api/bookings/my-bookings?status=ACTIVE&startDate=2024-01-01&endDate=2024-12-31
```

### Transaction Filter
```
GET /api/transactions/my-transactions?status=SUCCESS&type=BOOKING_PAYMENT&page=1
```

## 🔒 Access Levels
- **Public**: No authentication required
- **Authenticated**: Valid JWT token required
- **Tenant**: Role TENANT required
- **Owner**: Role OWNER required  
- **Admin**: Role ADMIN required
- **System**: Internal system calls (webhooks, etc.)

## 📋 Common Response Format
```json
{
  "success": true,
  "message": "Success message",
  "data": {},
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```
