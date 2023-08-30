-- AlterTable
ALTER TABLE "Ticker" ADD COLUMN     "industriesId" INTEGER;

-- CreateTable
CREATE TABLE "Sectors" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Industries" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "sectorsId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Industries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticker" ADD CONSTRAINT "Ticker_industriesId_fkey" FOREIGN KEY ("industriesId") REFERENCES "Industries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Industries" ADD CONSTRAINT "Industries_sectorsId_fkey" FOREIGN KEY ("sectorsId") REFERENCES "Sectors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
