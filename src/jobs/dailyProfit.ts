import cron from "node-cron";
import { PrismaInvestmentRepository } from "../repositories/prisma/investement-repository";
import { PrismaPlanRepository } from "../repositories/prisma/plan-repository";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();
const investmentRepo = new PrismaInvestmentRepository();
const planRepo = new PrismaPlanRepository();

cron.schedule("0 0 * * *", async () => {
  console.log("🔁 Executando job: dailyProfit");

  try {
    const investments = await investmentRepo.findAllActive();

    for (const investment of investments) {
      const plan = await planRepo.findById(investment.planId);
      if (!plan) continue;

      const dailyProfit = investment.amount
        .mul(new Decimal(plan.dailyProfitPct))
        .div(new Decimal(100));

      await investmentRepo.update(investment.id, {
        accumulated: investment.accumulated.add(dailyProfit),
      });

      await prisma.dailyProfit.create({
        data: {
          investmentId: investment.id,
          profit: dailyProfit,
          date: new Date(),
        },
      });

      console.log(
        `💰 Investimento #${
          investment.id
        } => Lucro diário salvo: ${dailyProfit.toString()} Kz`
      );
    }

    console.log("✅ Job dailyProfit concluído.");
  } catch (error: any) {
    console.error("❌ Erro ao executar dailyProfit:", error.message);
  }
});
