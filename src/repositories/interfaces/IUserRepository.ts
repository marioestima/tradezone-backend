// src/interfaces/IUserRepository.ts
import { User, Role } from "@prisma/client";

export interface IUserRepository {
  // Cria um novo usuário
  create(data: { name: string; email: string; password: string; phone: number; role?: Role }): Promise<User>;

  // Busca um usuário pelo ID
  findById(id: number): Promise<User | null>;

  // Busca um usuário pelo email
  findByEmail(email: string): Promise<User | null>;

  // Atualiza informações de um usuário
  update(
    id: number,
    data: { name?: string; email?: string; password?: string; role?: Role }
  ): Promise<User>;

  // Remove um usuário
  delete(id: number): Promise<void>;

  // Lista todos os usuários
  findAll(): Promise<User[]>;
}
