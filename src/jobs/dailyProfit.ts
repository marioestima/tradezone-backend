import cron from "node-cron";
import { PrismaInvestmentRepository } from "../repositories/prisma/investement-repository";
import { PrismaPlanRepository } from "../repositories/prisma/plan-repository";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();
const investmentRepo = new PrismaInvestmentRepository();
const planRepo = new PrismaPlanRepository();

// Rodar todos os dias às 00:00 no horário de Angola (UTC+1)
cron.schedule("0 1 * * *", async () => {
  console.log("🔁 Executando job: dailyProfit");

  try {
    const investments = await investmentRepo.findAllActive();

    for (const investment of investments) {
      const plan = await planRepo.findById(investment.planId);
      if (!plan) continue;

      // Converter tudo para Decimal de forma segura
      const dailyProfit = new Decimal(investment.amount)
        .mul(new Decimal(plan.dailyProfitPct))
        .div(new Decimal(100));

      // Impedir duplicação no mesmo dia
      const today = new Date().toISOString().split("T")[0];

      const exists = await prisma.dailyProfit.findFirst({
        where: {
          investmentId: investment.id,
          date: {
            gte: new Date(today + "T00:00:00"),
            lte: new Date(today + "T23:59:59"),
          },
        },
      });

      if (exists) {
        console.log(
          `⚠ Já existe lucro do dia para investimento #${investment.id}`
        );
        continue;
      }

      // Salvar lucro
      await prisma.dailyProfit.create({
        data: {
          investmentId: investment.id,
          profit: dailyProfit,
        },
      });

      // Atualizar acumulado
      await investmentRepo.update(investment.id, {
        accumulated: investment.accumulated.add(dailyProfit),
      });

      console.log(
        `💰 Investimento #${
          investment.id
        } => Lucro diário salvo: ${dailyProfit.toString()}`
      );
    }

    console.log("✅ Job dailyProfit concluído.");
  } catch (error: any) {
    console.error("❌ Erro ao executar dailyProfit:", error.message);
  }
});
