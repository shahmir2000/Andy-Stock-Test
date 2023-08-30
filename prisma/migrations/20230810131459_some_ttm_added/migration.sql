/*
  Warnings:

  - You are about to drop the column `netIncomeGrowth` on the `TTM` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TTM" DROP COLUMN "netIncomeGrowth",
ADD COLUMN     "buybackYieldQuat" TEXT,
ADD COLUMN     "buybackYieldYearly" TEXT,
ADD COLUMN     "debtOverFcfQ" TEXT,
ADD COLUMN     "debtOverFcfY" TEXT,
ADD COLUMN     "dividendYieldQ" TEXT,
ADD COLUMN     "dividendYieldY" TEXT,
ADD COLUMN     "earningYieldQ" TEXT,
ADD COLUMN     "earningYieldY" TEXT,
ADD COLUMN     "evOverEbitQuat" TEXT,
ADD COLUMN     "evOverEbitYearly" TEXT,
ADD COLUMN     "evOverFcfQuat" TEXT,
ADD COLUMN     "evOverFcfYearly" TEXT,
ADD COLUMN     "evOverSalesQuat" TEXT,
ADD COLUMN     "evOverSalesYearly" TEXT,
ADD COLUMN     "fcfGrowthQ" TEXT,
ADD COLUMN     "fcfGrowthY" TEXT,
ADD COLUMN     "grossProfitGrowthQ" TEXT,
ADD COLUMN     "grossProfitGrowthY" TEXT,
ADD COLUMN     "netIncomeGrowthQ" TEXT,
ADD COLUMN     "netIncomeGrowthY" TEXT,
ADD COLUMN     "priceOverFcfRatioQ" TEXT,
ADD COLUMN     "priceOverFcfRatioY" TEXT,
ADD COLUMN     "researchDevelopmentOverRevenueQ" TEXT,
ADD COLUMN     "researchDevelopmentOverRevenueY" TEXT,
ADD COLUMN     "totalCashQ" TEXT,
ADD COLUMN     "totalCashY" TEXT;
