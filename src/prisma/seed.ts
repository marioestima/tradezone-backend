import { PrismaClient, PlanStatus } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.plan.createMany({
    data: [
      {
        name: "Normal",
        value: 12000,
        dailyProfitPct: 15,
        status: PlanStatus.OPEN,
      },
      {
        name: "Medium",
        value: 25000,
        dailyProfitPct: 15,
        status: PlanStatus.OPEN,
      },
      {
        name: "Premium",
        value: 50000,
        dailyProfitPct: 15,
        status: PlanStatus.OPEN,
      },
      {
        name: "Diamond",
        value: 100000,
        dailyProfitPct: 15,
        status: PlanStatus.OPEN,
      },
      {
        name: "Ruby",
        value: 200000,
        dailyProfitPct: 15,
        status: PlanStatus.OPEN,
      },
      {
        name: "Safira",
        value: 400000,
        dailyProfitPct: 15,
        status: PlanStatus.OPEN,
      },
      {
        name: "Supremo",
        value: 800000,
        dailyProfitPct: 15,
        status: PlanStatus.OPEN,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
