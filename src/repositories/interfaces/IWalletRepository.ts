// src/repositories/interfaces/IWalletRepository.ts
import { Wallet } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface IWalletRepository {
  findByUserId(userId: number): Promise<Wallet | null>;
  updateBalance(userId: number, amount: Decimal): Promise<Wallet>;
}
