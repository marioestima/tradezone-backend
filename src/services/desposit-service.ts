import { IDepositRepository } from "../repositories/interfaces/IDepositRepository";
import { IWalletRepository } from "../repositories/interfaces/IWalletRepository";

export class DepositService {
  constructor(
    private depositRepo: IDepositRepository,
    private walletRepo: IWalletRepository
  ) {}

  async requestDeposit(userId: number, amount: number, receiptUrl?: string) {
    const wallet = await this.walletRepo.findByUserId(userId);

    if (!wallet) throw new Error("Wallet not found");

    return this.depositRepo.create(userId, wallet.id, amount, receiptUrl);
  }

  async approveDeposit(id: number) {
    const deposit = await this.depositRepo.updateStatus(id, "APPROVED");
    await this.walletRepo.updateBalance(deposit.walletId, deposit.amount);
    return deposit;
  }

  async rejectDeposit(id: number) {
    return this.depositRepo.updateStatus(id, "REJECTED");
  }
}
