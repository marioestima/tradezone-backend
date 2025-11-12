import { PrismaTransactionRepository } from "../repositories/prisma/transation-repository";
import { Transaction } from "@prisma/client";

export class TransactionService {
  constructor(private transactionRepository: PrismaTransactionRepository) {}

  async createTransaction(data: {
    userId: number;
    type: "DEPOSIT" | "PROFIT" | "WITHDRAWAL";
    amount: number;
    fee?: number;
    note?: string;
  }): Promise<Transaction> {
    return this.transactionRepository.create(data);
  }

  async getTransactionById(id: number): Promise<Transaction | null> {
    return this.transactionRepository.findById(id);
  }

  async getTransactionsByUser(userId: number): Promise<Transaction[]> {
    return this.transactionRepository.findByUser(userId);
  }

  async getTransactionsByUserAndType(
    userId: number,
    type: "DEPOSIT" | "PROFIT" | "WITHDRAWAL"
  ): Promise<Transaction[]> {
    return this.transactionRepository.findByUserAndType(userId, type);
  }

  async updateTransaction(
    id: number,
    data: { fee?: number; note?: string }
  ): Promise<Transaction> {
    return this.transactionRepository.update(id, data);
  }

  async deleteTransaction(id: number): Promise<void> {
    return this.transactionRepository.delete(id);
  }
}
