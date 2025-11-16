import { prisma } from "../../prisma/client";
import { IDepositRepository } from "../interfaces/IDepositRepository";
import { Deposit, DepositStatus } from "@prisma/client";

export class PrismaDepositRepository implements IDepositRepository {
  async create(
    userId: number,
    walletId: number,
    amount: number,
    receiptUrl?: string
  ): Promise<Deposit> {
    return prisma.deposit.create({
      data: { userId, walletId, amount, receiptUrl },
    });
  }

  async updateStatus(id: number, status: DepositStatus): Promise<Deposit> {
    return prisma.deposit.update({
      where: { id },
      data: { status },
    });
  }

  async findPending(): Promise<Deposit[]> {
    return prisma.deposit.findMany({ where: { status: "PENDING" } });
  }

  async findByUser(userId: number): Promise<Deposit[]> {
    return prisma.deposit.findMany({ where: { userId } });
  }
}
