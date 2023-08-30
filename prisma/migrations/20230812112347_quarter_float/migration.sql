/*
  Warnings:

  - The `quater` column on the `RatiosAndMetrics` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "RatiosAndMetrics" DROP COLUMN "quater",
ADD COLUMN     "quater" DOUBLE PRECISION;
