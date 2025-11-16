import { Deposit, DepositStatus } from "@prisma/client";

export interface IDepositRepository {
  create(
    userId: number,
    walletId: number,
    amount: number,
    receiptUrl?: string
  ): Promise<Deposit>;
  updateStatus(id: number, status: DepositStatus): Promise<Deposit>;
  findPending(): Promise<Deposit[]>;
  findByUser(userId: number): Promise<Deposit[]>;
}
