import { IInvestmentRepository } from "../repositories/interfaces/IInvestmentRepository";
import { IWalletRepository } from "../repositories/interfaces/IWalletRepository";
import {
  CreateInvestmentDTO,
  UpdateInvestmentDTO,
  IncrementInvestmentDTO,
} from "../dtos/InvestmentDTOs";
import { Investment, Wallet } from "@prisma/client";

export class InvestmentService {
  constructor(
    private investmentRepository: IInvestmentRepository,
    private walletRepository: IWalletRepository
  ) {}

  async createInvestment(data: CreateInvestmentDTO): Promise<Investment> {
    // Exemplo: alterar saldo ao criar investimento
    await this.walletRepository.updateBalance(data.userId, -data.amount);
    return this.investmentRepository.create(data);
  }

  async getActiveInvestments(data: Investment): Promise<Investment[]> {
    return this.investmentRepository.findActive(data.id);
  }

  async getInvestmentsByUser(userId: number): Promise<Investment[]> {
    return this.investmentRepository.findByUser(userId);
  }

  async incrementAccumulated(data: IncrementInvestmentDTO): Promise<Investment> {
    return this.investmentRepository.incrementAccumulated(
      data.investmentId,
      data.amount
    );
  }

  async updateInvestment(
    id: number,
    data: UpdateInvestmentDTO
  ): Promise<Investment> {
    return this.investmentRepository.update(id, { ...data });
  }

  // Método exemplo: Buscar carteira do usuário
  async getWalletByUser(userId: number): Promise<Wallet | null> {
    return this.walletRepository.findByUserId(userId);
  }

  // Método exemplo: Atualizar saldo da carteira
  async updateWalletBalance(userId: number, amount: number): Promise<Wallet> {
    return this.walletRepository.updateBalance(userId, amount);
  }
}