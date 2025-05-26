// ================================
// LOGIN TYPES
// ================================
export interface LoginRequest {
    email: string;
    password: string;
}

// ================================
// REGISTER TYPES
// ================================
export interface RegisterRequest {
    email: string;
    password: string;
    profile?: {
        name: string;
        phone: string;
        address: string;
    };
}
