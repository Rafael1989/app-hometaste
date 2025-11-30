export interface User {
  id: number;
  name: string;
  email: string;
  role: 'CLIENTE' | 'COZINHEIRA' | 'ENTREGADOR';
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'CLIENTE' | 'COZINHEIRA' | 'ENTREGADOR';
  phone?: string;
  address?: string;
}
