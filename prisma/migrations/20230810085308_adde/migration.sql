/*
  Warnings:

  - A unique constraint covering the columns `[ticker]` on the table `Ticker` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TTM" ADD COLUMN     "founded" TEXT,
ADD COLUMN     "incomeTaxExpense" TEXT,
ADD COLUMN     "industry" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ticker_ticker_key" ON "Ticker"("ticker");
