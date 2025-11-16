-- CreateEnum
CREATE TYPE "DepositStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Deposit" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "walletId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" "DepositStatus" NOT NULL DEFAULT 'PENDING',
    "receiptUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
