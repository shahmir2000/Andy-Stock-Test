-- CreateTable
CREATE TABLE "EarningsTrand" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "date" TEXT,
    "epsEstimate" TEXT,
    "revEstimate" TEXT,
    "tickerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EarningsTrand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EarningsTrand" ADD CONSTRAINT "EarningsTrand_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
