// src/repositories/PrismaTransactionRepository.ts
import { prisma } from "../../prisma/client";
import { Transaction } from "@prisma/client";
import { ITransactionRepository } from "../interfaces/ITransactionRepository";

export class PrismaTransactionRepository implements ITransactionRepository {
  async create(data: {
    userId: number;
    type: "DEPOSIT" | "PROFIT" | "WITHDRAWAL";
    amount: number;
    fee?: number;
    note?: string;
  }): Promise<Transaction> {
    return prisma.transaction.create({ data });
  }

  async findById(id: number): Promise<Transaction | null> {
    return prisma.transaction.findUnique({ where: { id } });
  }

  async findByUser(userId: number): Promise<Transaction[]> {
    return prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByUserAndType(
    userId: number,
    type: "DEPOSIT" | "PROFIT" | "WITHDRAWAL"
  ): Promise<Transaction[]> {
    return prisma.transaction.findMany({
      where: { userId, type },
      orderBy: { createdAt: "desc" },
    });
  }

  async update(
    id: number,
    data: { fee?: number; note?: string }
  ): Promise<Transaction> {
    return prisma.transaction.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.transaction.delete({ where: { id } });
  }
}
