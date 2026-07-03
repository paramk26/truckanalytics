export interface LoginResponse {
    access_token: string;
    token_type: string;
    role: string;
}

export interface User {
    sub: string;
    role: "ADMIN" | "VIEWER";
    exp: number;
}