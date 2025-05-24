# API Specification - Authentication Endpoints

## Base URL
```
https://api.kosapp.com/api/auth
```

## Common Headers
```
Content-Type: application/json
Accept: application/json
Authorization: Bearer {access_token} // untuk protected endpoints
```

---

## 1. Register User

### `POST /register`

Register user baru (USER atau ADMIN)

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "USER", // "USER" | "ADMIN"
  "profile": {
    "name": "John Doe",
    "phone": "+6281234567890",
    "address": "Jakarta Selatan",
    "idNumber": "1234567890123456", // optional
    "dateOfBirth": "1995-01-15", // optional, format: YYYY-MM-DD
    "gender": "MALE", // optional, "MALE" | "FEMALE" | "OTHER"
    "occupation": "Software Engineer", // optional
    "emergencyContact": "Jane Doe", // optional
    "emergencyPhone": "+6281234567891" // optional
  }
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "role": "USER",
      "status": "ACTIVE",
      "avatar": null,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "profile": {
        "id": 1,
        "name": "John Doe",
        "phone": "+6281234567890",
        "address": "Jakarta Selatan",
        "idNumber": "1234567890123456",
        "dateOfBirth": "1995-01-15T00:00:00.000Z",
        "gender": "MALE",
        "occupation": "Software Engineer",
        "emergencyContact": "Jane Doe",
        "emergencyPhone": "+6281234567891"
      }
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600 // seconds
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation error",
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

### `POST /login`

Login user dengan email dan password

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": true // optional, default: false
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "role": "USER",
      "status": "ACTIVE",
      "avatar": "https://api.kosapp.com/uploads/avatars/user1.jpg",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "lastLogin": "2024-01-16T08:30:00.000Z",
      "profile": {
        "id": 1,
        "name": "John Doe",
        "phone": "+6281234567890",
        "address": "Jakarta Selatan"
      }
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600 // seconds
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials",
  "code": "INVALID_CREDENTIALS"
}
```

**Error Response (423):**
```json
{
  "success": false,
  "message": "Account is locked due to multiple failed login attempts",
  "code": "ACCOUNT_LOCKED",
  "data": {
    "lockedUntil": "2024-01-16T09:00:00.000Z",
    "remainingTime": 1800 // seconds
  }
}
```

---

## 3. Refresh Token

### `POST /refresh`

Refresh access token menggunakan refresh token

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
  "message": "Token refreshed successfully",
  "data": {
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600 // seconds
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid or expired refresh token",
  "code": "INVALID_REFRESH_TOKEN"
}
```

---

## 4. Logout User

### `POST /logout`
**Headers:** `Authorization: Bearer {access_token}`

Logout user dan invalidate tokens

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // optional
  "logoutFromAllDevices": false // optional, default: false
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Unauthorized",
  "code": "UNAUTHORIZED"
}
```

---

## 5. Forgot Password

### `POST /forgot-password`

Request reset password, kirim email dengan reset link

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset link has been sent to your email",
  "data": {
    "email": "user@example.com",
    "expiresIn": 3600 // seconds
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Email not found",
  "code": "EMAIL_NOT_FOUND"
}
```

**Error Response (429):**
```json
{
  "success": false,
  "message": "Too many password reset requests. Please try again later",
  "code": "TOO_MANY_REQUESTS",
  "data": {
    "retryAfter": 300 // seconds
  }
}
```

---

## 6. Reset Password

### `POST /reset-password`

Reset password menggunakan token dari email

**Request Body:**
```json
{
  "token": "abc123def456ghi789",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password has been reset successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid or expired reset token",
  "code": "INVALID_RESET_TOKEN"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "newPassword",
      "message": "Password must be at least 8 characters"
    },
    {
      "field": "confirmPassword",
      "message": "Passwords do not match"
    }
  ]
}
```

---

## 7. Change Password

### `POST /change-password`
**Headers:** `Authorization: Bearer {access_token}`

Ubah password user yang sedang login

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Current password is incorrect",
  "code": "INVALID_CURRENT_PASSWORD"
}
```

---

## 8. Verify Email

### `POST /verify-email`

Verifikasi email user (jika diperlukan)

**Request Body:**
```json
{
  "token": "abc123def456ghi789"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid or expired verification token",
  "code": "INVALID_VERIFICATION_TOKEN"
}
```

---

## 9. Resend Verification Email

### `POST /resend-verification`
**Headers:** `Authorization: Bearer {access_token}`

Kirim ulang email verifikasi

**Request Body:**
```json
{
  "email": "user@example.com" // optional, default: current user email
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Verification email has been sent"
}
```

---

## 10. Get Current User

### `GET /me`
**Headers:** `Authorization: Bearer {access_token}`

Get informasi user yang sedang login

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "role": "USER",
      "status": "ACTIVE",
      "avatar": "https://api.kosapp.com/uploads/avatars/user1.jpg",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-16T08:30:00.000Z",
      "lastLogin": "2024-01-16T08:30:00.000Z",
      "profile": {
        "id": 1,
        "name": "John Doe",
        "phone": "+6281234567890",
        "address": "Jakarta Selatan",
        "idNumber": "1234567890123456",
        "dateOfBirth": "1995-01-15T00:00:00.000Z",
        "gender": "MALE",
        "occupation": "Software Engineer",
        "emergencyContact": "Jane Doe",
        "emergencyPhone": "+6281234567891"
      }
    }
  }
}
```

---

## Common Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized",
  "code": "UNAUTHORIZED"
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "message": "Access denied",
  "code": "ACCESS_DENIED"
}
```

### 429 - Too Many Requests
```json
{
  "success": false,
  "message": "Too many requests",
  "code": "RATE_LIMIT_EXCEEDED",
  "data": {
    "retryAfter": 60 // seconds
  }
}
```

### 500 - Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "code": "INTERNAL_ERROR"
}
```

---

## Security Features

### Rate Limiting
- Login: 5 attempts per 15 minutes per IP
- Registration: 3 attempts per hour per IP
- Password reset: 1 attempt per 5 minutes per email
- Forgot password: 3 attempts per hour per email

### Token Information
- **Access Token**: JWT, expires in 1 hour
- **Refresh Token**: JWT, expires in 30 days
- **Reset Token**: Random string, expires in 1 hour
- **Verification Token**: Random string, expires in 24 hours

### Password Requirements
- Minimum 8 characters
- Must contain at least 1 uppercase letter
- Must contain at least 1 lowercase letter
- Must contain at least 1 number
- Must contain at least 1 special character

### Account Lockout
- Account locked after 5 failed login attempts
- Lockout duration: 30 minutes
- Automatic unlock after duration expires
