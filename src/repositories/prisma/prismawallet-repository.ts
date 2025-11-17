// src/repositories/prisma/PrismaWalletRepository.ts
import { PrismaClient, Wallet } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { IWalletRepository } from "../interfaces/IWalletRepository";

const prisma = new PrismaClient();

export class PrismaWalletRepository implements IWalletRepository {
  async findByUserId(userId: number): Promise<Wallet | null> {
    return prisma.wallet.findUnique({
      where: { userId },
    });
  }

  async updateBalance(userId: number, amount: number): Promise<Wallet> {
    return prisma.wallet.update({
      where: { userId },
      data: {
        balance: { increment: amount }, // aceita Decimal
      },
    });
  }
}
