import { Role } from "@prisma/client";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone: number;
  role?: "INVESTOR" | "TRADER" | "ADMIN";
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  phone?: number;
  role?: "INVESTOR" | "TRADER" | "ADMIN";
}


export interface LoginUserDto {
  email: string,
  password: string
}