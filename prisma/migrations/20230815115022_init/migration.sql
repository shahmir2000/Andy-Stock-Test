/*
  Warnings:

  - You are about to drop the column `cashAndCashEquivalents` on the `BalanceSheet` table. All the data in the column will be lost.
  - You are about to drop the column `goodWillAndIntangibleAsset` on the `BalanceSheet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BalanceSheet" DROP COLUMN "cashAndCashEquivalents",
DROP COLUMN "goodWillAndIntangibleAsset",
ADD COLUMN     "cashAndEquivalents" TEXT,
ADD COLUMN     "deferredLongTermLiab" TEXT,
ADD COLUMN     "goodWillAndIntangibleAssets" TEXT;
