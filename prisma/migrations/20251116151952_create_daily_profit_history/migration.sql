-- CreateTable
CREATE TABLE "DailyProfit" (
    "id" SERIAL NOT NULL,
    "investmentId" INTEGER NOT NULL,
    "profit" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyProfit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyProfit" ADD CONSTRAINT "DailyProfit_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
