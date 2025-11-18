import { prisma } from "../../prisma/client";
import { User, Role } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";

export class PrismaUserRepository implements IUserRepository {
  async create(data: {
    name: string;
    email: string;
    password: string;
    role?: Role;
    phone: string;
  }): Promise<User> {
    return prisma.user.create({ data });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async update(
    id: number,
    data: { name?: string; email?: string; password?: string; role?: Role }
  ): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany({ orderBy: { name: "asc" } });
  }
}
