// src/repositories/interfaces/IWalletRepository.ts
import { Wallet } from "@prisma/client";

export interface IWalletRepository {
  findByUserId(userId: number): Promise<Wallet | null>;
  updateBalance(userId: number, amount: number): Promise<Wallet>;
}
  