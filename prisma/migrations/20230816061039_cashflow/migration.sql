/*
  Warnings:

  - Added the required column `DilutedEpsTTM` to the `TTM` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IncomeStatement" ADD COLUMN     "CashFlowMargin" TEXT,
ADD COLUMN     "dividendGrowth" TEXT,
ADD COLUMN     "epsActual" TEXT;

-- AlterTable
ALTER TABLE "TTM" ADD COLUMN     "DilutedEpsTTM" TEXT NOT NULL;
