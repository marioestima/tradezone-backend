// src/dtos/InvestmentDTOs.ts

export interface CreateInvestmentDTO {
  userId: number;
  planId: number;
  amount: number;
}

export interface UpdateInvestmentDTO {
  amount?: number;
  active?: boolean;
}

export interface IncrementInvestmentDTO {
  investmentId: number;
  amount: number;
}
