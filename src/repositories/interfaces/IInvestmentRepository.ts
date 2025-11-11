import { Investment } from "@prisma/client";

export interface IInvestmentRepository {
  create(data: {
    userId: number;
    planId: number;
    amount: number;
  }): Promise<Investment>;

  findActive(userId: number): Promise<Investment[]>;

  incrementAccumulated(id: number, amount: number): Promise<Investment>;

  findByUser(userId: number): Promise<Investment[]>;

  update(amout: number, active: boolean): Promise<Investment>;
}
