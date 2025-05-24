# Authentication API - Request & Response Specifications

## 1. Register User

### `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "name": "John Doe",
  "phone": "081234567890",
  "address": "Jl. Sudirman No. 123, Jakarta",
  "role": "TENANT" // Optional, default: TENANT
}
```

**Validation Rules:**
- `email`: Required, valid email format, unique
- `password`: Required, min 8 characters, must contain letters and numbers
- `confirmPassword`: Required, must match password
- `name`: Required, min 2 characters
- `phone`: Required, valid phone format
- `address`: Required, min 10 characters
- `role`: Optional, enum [TENANT, OWNER]

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "john@example.com",
      "role": "TENANT",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "profile": {
      "id": 1,
      "name": "John Doe",
      "phone": "081234567890",
      "address": "Jl. Sudirman No. 123, Jakarta"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email already exists"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

---

## 2. Login User

### `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `password`: Required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "john@example.com",
      "role": "TENANT",
      "profile": {
        "name": "John Doe",
        "phone": "081234567890",
        "address": "Jl. Sudirman No. 123, Jakarta"
      }
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password",
  "error": "INVALID_CREDENTIALS"
}
```

**Error Response (403) - Account Locked:**
```json
{
  "success": false,
  "message": "Account is temporarily locked due to multiple failed login attempts",
  "error": "ACCOUNT_LOCKED"
}
```

---

## 3. Logout User

### `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid or expired token",
  "error": "INVALID_TOKEN"
}
```

---

## 4. Refresh Token

### `POST /api/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validation Rules:**
- `refreshToken`: Required, valid JWT format

**Success Response (200):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid or expired refresh token",
  "error": "INVALID_REFRESH_TOKEN"
}
```

---

## 5. Forgot Password

### `POST /api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Validation Rules:**
- `email`: Required, valid email format

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset instructions have been sent to your email",
  "data": {
    "email": "john@example.com",
    "sentAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "No account found with this email address",
  "error": "EMAIL_NOT_FOUND"
}
```

**Rate Limited Response (429):**
```json
{
  "success": false,
  "message": "Too many password reset requests. Please try again later",
  "error": "RATE_LIMITED",
  "retryAfter": 300
}
```

---

## 6. Reset Password

### `POST /api/auth/reset-password`

**Request Body:**
```json
{
  "token": "abc123def456ghi789",
  "password": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Validation Rules:**
- `token`: Required, valid reset token
- `password`: Required, min 8 characters, must contain letters and numbers
- `confirmPassword`: Required, must match password

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "john@example.com"
    },
    "resetAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400) - Invalid Token:**
```json
{
  "success": false,
  "message": "Invalid or expired reset token",
  "error": "INVALID_RESET_TOKEN"
}
```

**Error Response (400) - Token Expired:**
```json
{
  "success": false,
  "message": "Reset token has expired. Please request a new one",
  "error": "TOKEN_EXPIRED"
}
```

---

## Common Error Responses

### 422 - Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address",
      "code": "INVALID_EMAIL"
    },
    {
      "field": "password",
      "message": "Password must contain at least one letter and one number",
      "code": "WEAK_PASSWORD"
    }
  ]
}
```

### 500 - Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "INTERNAL_ERROR",
  "requestId": "req_1234567890"
}
```

### 503 - Service Unavailable
```json
{
  "success": false,
  "message": "Service temporarily unavailable",
  "error": "SERVICE_UNAVAILABLE"
}
```

---

## Security Notes

### JWT Token Structure
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": 1,
    "email": "john@example.com",
    "role": "TENANT",
    "iat": 1642248600,
    "exp": 1642252200
  }
}
```

### Password Requirements
- Minimum 8 characters
- Must contain at least one letter
- Must contain at least one number
- Special characters recommended but not required

### Rate Limiting
- Login attempts: 5 per 15 minutes per IP
- Password reset: 3 per hour per email
- Registration: 10 per hour per IP

### Token Expiry
- Access Token: 1 hour (3600 seconds)
- Refresh Token: 7 days (604800 seconds)
- Reset Token: 1 hour (3600 seconds)

### Headers Required for Protected Endpoints
```
Authorization: Bearer <access_token>
Content-Type: application/json
```
