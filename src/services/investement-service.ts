// src/services/InvestmentService.ts
import { IInvestmentRepository } from "../repositories/interfaces/IInvestmentRepository";
import {
  CreateInvestmentDTO,
  UpdateInvestmentDTO,
  IncrementInvestmentDTO,
} from "../dtos/InvestmentDTOs";
import { Investment } from "@prisma/client";

export class InvestmentService {
  constructor(private investmentRepository: IInvestmentRepository) {}

  async createInvestment(data: CreateInvestmentDTO): Promise<Investment> {
    return this.investmentRepository.create(data);
  }

  async getActiveInvestments(data: Investment): Promise<Investment[]> {
    return this.investmentRepository.findActive(data.id);
  }

  async getInvestmentsByUser(userId: number): Promise<Investment[]> {
    return this.investmentRepository.findByUser(userId);
  }

  async incrementAccumulated(
    data: IncrementInvestmentDTO
  ): Promise<Investment> {
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
}
