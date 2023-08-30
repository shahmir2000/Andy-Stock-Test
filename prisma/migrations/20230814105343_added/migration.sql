/*
  Warnings:

  - You are about to drop the column `epsEstimate` on the `EarningsTrand` table. All the data in the column will be lost.
  - You are about to drop the column `revEstimate` on the `EarningsTrand` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EarningsTrand" DROP COLUMN "epsEstimate",
DROP COLUMN "revEstimate",
ADD COLUMN     "epsEstimateAvg" TEXT,
ADD COLUMN     "revenueEstimateAvg" TEXT;
