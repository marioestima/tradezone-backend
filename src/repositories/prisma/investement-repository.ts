// src/repositories/prisma/PrismaInvestmentRepository.ts

import { prisma } from "../../../prisma/client";
import { Investment } from "@prisma/client";
import { IInvestmentRepository } from "../../repositories/interfaces/IInvestmentRepository";

export class PrismaInvestmentRepository implements IInvestmentRepository {
  // Cria um novo investimento
  async create(data: {
    userId: number;
    planId: number;
    amount: number;
  }): Promise<Investment> {
    return prisma.investment.create({ data });
  }

  // Busca um investimento pelo ID
  async findById(id: number): Promise<Investment | null> {
    return prisma.investment.findUnique({ where: { id } });
  }

  // Retorna investimentos ativos de um usuário
  async findActive(userId: number): Promise<Investment[]> {
    return prisma.investment.findMany({ where: { userId, active: true } });
  }

  // Incrementa o valor acumulado (lucros)
  async incrementAccumulated(id: number, amount: number): Promise<Investment> {
    return prisma.investment.update({
      where: { id },
      data: { accumulated: { increment: amount } },
    });
  }

  // Retorna todos os investimentos de um usuário
  async findByUser(userId: number): Promise<Investment[]> {
    return prisma.investment.findMany({ where: { userId } });
  }

  // Atualiza um investimento (ex: desativar, alterar valor etc.)
  async update(
    id: number,
    data: { amount?: number; active?: boolean }
  ): Promise<Investment> {
    return prisma.investment.update({
      where: { id },
      data,
    });
  }
}
