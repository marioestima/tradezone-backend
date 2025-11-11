// src/interfaces/ITransactionRepository.ts
import { Transaction } from "@prisma/client";

export interface ITransactionRepository {
  // Cria uma nova transação (depósito, lucro ou saque)
  create(data: {
    userId: number;
    type: "DEPOSIT" | "PROFIT" | "WITHDRAWAL";
    amount: number;
    fee?: number;
    note?: string;
  }): Promise<Transaction>;

  // Busca uma transação pelo ID
  findById(id: number): Promise<Transaction | null>;

  // Lista todas as transações de um usuário
  findByUser(userId: number): Promise<Transaction[]>;

  // Lista todas as transações de um usuário filtrando por tipo
  findByUserAndType(userId: number, type: "DEPOSIT" | "PROFIT" | "WITHDRAWAL"): Promise<Transaction[]>;

  // Atualiza uma transação (ex: nota ou taxa)
  update(id: number, data: { fee?: number; note?: string }): Promise<Transaction>;

  // Remove uma transação
  delete(id: number): Promise<void>;
}
