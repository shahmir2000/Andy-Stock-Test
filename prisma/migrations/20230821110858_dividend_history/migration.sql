-- CreateTable
CREATE TABLE "DividendHistory" (
    "id" SERIAL NOT NULL,
    "date" TEXT,
    "declarationDate" TEXT,
    "recordDate" TEXT,
    "paymentDate" TEXT,
    "period" TEXT,
    "value" TEXT,
    "unadjustedValue" TEXT,
    "currency" TEXT,
    "tickerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DividendHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DividendHistory" ADD CONSTRAINT "DividendHistory_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
