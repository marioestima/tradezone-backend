// src/repositories/prisma/PrismaWalletRepository.ts
import { prisma } from "../../../prisma/client";
import { Wallet } from "@prisma/client";
import { IWalletRepository } from "../interfaces/IWalletRepository";

export class PrismaWalletRepository implements IWalletRepository {
  async findByUserId(userId: number): Promise<Wallet | null> {
    return prisma.wallet.findUnique({ where: { userId } });
  }

  async updateBalance(userId: number, amount: number): Promise<Wallet> {
    return prisma.wallet.update({
      where: { userId },
      data: {
        balance: { increment: amount },
      },
    });
  }
}
