// services/daily-profit-service.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DailyProfitService {
  async getUserDailyProfits(userId: number) {
    try {
      return await prisma.dailyProfit.findMany({
        where: {
          investment: {
            userId: userId,
          },
        },
        include: {
          investment: true, // cuidado se o relacionamento não existir
        },
        orderBy: { date: "desc" },
      });
    } catch (error) {
      console.error("Erro em getUserDailyProfits:", error);
      return [];
    }
  }

  async getTotalDailyProfit(userId: number) {
    try {
      const result = await prisma.dailyProfit.aggregate({
        where: { investment: { userId } },
        _sum: { profit: true },
      });

      return result._sum.profit || 0;
    } catch (error) {
      console.error("Erro em getTotalDailyProfit:", error);
      return 0;
    }
  }

  async getLast7DaysProfit(userId: number) {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      return await prisma.dailyProfit.groupBy({
        by: ["date"],
        where: {
          investment: { userId },
          date: { gte: sevenDaysAgo },
        },
        _sum: { profit: true },
        orderBy: { date: "asc" },
      });
    } catch (error) {
      console.error("Erro em getLast7DaysProfit:", error);
      return [];
    }
  }
}
