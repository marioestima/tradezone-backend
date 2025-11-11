// src/repositories/PrismaPlanRepository.ts
import { prisma } from "../../../prisma/client";
import { Plan } from "@prisma/client";
import { IPlanRepository } from "../interfaces/IPlanRepository";

export class PrismaPlanRepository implements IPlanRepository {
  async create(data: {
    name: string;
    value: number;
    dailyProfitPct: number;
  }): Promise<Plan> {
    return prisma.plan.create({ data });
  }

  async findById(id: number): Promise<Plan | null> {
    return prisma.plan.findUnique({ where: { id } });
  }

  async findAll(status?: "OPEN" | "CLOSED"): Promise<Plan[]> {
    if (status) {
      return prisma.plan.findMany({ where: { status } });
    }
    return prisma.plan.findMany();
  }

  async update(
    id: number,
    data: {
      name?: string;
      value?: number;
      dailyProfitPct?: number;
      status?: "OPEN" | "CLOSED";
    }
  ): Promise<Plan> {
    return prisma.plan.update({
      where: { id },
      data,
    });
  }

  async closePlan(id: number): Promise<Plan> {
    return prisma.plan.update({
      where: { id },
      data: { status: "CLOSED" },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.plan.delete({ where: { id } });
  }
}
