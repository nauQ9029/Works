export type UserRole = "customer" | "mechanic" | "garage";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  skills?: string[];
  birthday?: string;
  experience?: string;
  garageName?: string;
  address?: string;
  services?: string[];
  workingHours?: string;
  priceRange?: string;
  mechanicCount?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  token: string;
  role: UserRole;
  name: string;
  username: string;
  email: string;
  phone: string;
  birthday?: string;
  language?: string;
  rating?: number;
  avatar?: string;
}