/*
  Warnings:

  - You are about to drop the column `totalStockholderEquit` on the `BalanceSheet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BalanceSheet" DROP COLUMN "totalStockholderEquit",
ADD COLUMN     "totalStockholderEquity" TEXT;
