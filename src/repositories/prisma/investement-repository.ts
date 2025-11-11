import { prisma } from "../../../prisma/client";
import { Investment } from "@prisma/client";
import { IInvestmentRepository } from "../../repositories/interfaces/ IInvestmentRepository";

export class PrismaInvestmentRepository implements IInvestmentRepository {
  async create(data: {
    userId: number;
    planId: number;
    amount: number;
  }): Promise<Investment> {
    return prisma.investment.create({ data });
  }

  async findById(id: number): Promise<Investment | null> {
    return prisma.investment.findUnique({ where: { id } });
  }

  async findActive(userId: number): Promise<Investment[]> {
    return prisma.investment.findMany({ where: { userId, active: true } });
  }

  async incrementAccumulated(id: number, amount: number): Promise<Investment> {
    return prisma.investment.update({
      where: { id },
      data: { accumulated: { increment: amount } },
    });
  }

  async findByUser(userId: number): Promise<Investment[]> {
    return prisma.investment.findMany({ where: { userId } });
  }
}
