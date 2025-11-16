// services/daily-profit-service.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DailyProfitService {
  async getUserDailyProfits(userId: number) {
    return prisma.dailyProfit.findMany({
      where: {
        investment: {
          userId: userId,
        },
      },
      include: {
        investment: true,
      },
      orderBy: { date: "desc" },
    });
  }

  async getTotalDailyProfit(userId: number) {
    const result = await prisma.dailyProfit.aggregate({
      where: {
        investment: { userId },
      },
      _sum: { profit: true },
    });

    return result._sum.profit || 0;
  }

  async getLast7DaysProfit(userId: number) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return prisma.dailyProfit.groupBy({
      by: ["date"],
      where: {
        investment: {
          userId: userId,
        },
        date: {
          gte: sevenDaysAgo,
        },
      },
      _sum: {
        profit: true,
      },
      orderBy: {
        date: "asc",
      },
    });
  }
}
