-- CreateTable
CREATE TABLE "General" (
    "id" SERIAL NOT NULL,
    "Type" TEXT,
    "Name" TEXT,
    "Exchange" TEXT,
    "CurrencyCode" TEXT,
    "CurrencyName" TEXT,
    "CurrencySymbol" TEXT,
    "CountryName" TEXT,
    "CountryISO" TEXT,
    "OpenFigi" TEXT,
    "ISIN" TEXT,
    "LEI" TEXT,
    "PrimaryTicker" TEXT,
    "CUSIP" TEXT,
    "CIK" TEXT,
    "EmployerIdNumber" TEXT,
    "FiscalYearEnd" TEXT,
    "IPODate" TEXT,
    "InternationalDomestic" TEXT,
    "Sector" TEXT,
    "Industry" TEXT,
    "GicSector" TEXT,
    "GicGroup" TEXT,
    "GicIndustry" TEXT,
    "GicSubIndustry" TEXT,
    "HomeCategory" TEXT,
    "IsDelisted" TEXT,
    "Description" TEXT,
    "Address" TEXT,
    "Phone" TEXT,
    "WebURL" TEXT,
    "FullTimeEmployees" TEXT,
    "tickerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "General_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Officers" (
    "id" SERIAL NOT NULL,
    "Name" TEXT,
    "Title" TEXT,
    "YearBorn" TEXT,
    "generalId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Officers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "General_tickerId_key" ON "General"("tickerId");

-- AddForeignKey
ALTER TABLE "General" ADD CONSTRAINT "General_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Officers" ADD CONSTRAINT "Officers_generalId_fkey" FOREIGN KEY ("generalId") REFERENCES "General"("id") ON DELETE SET NULL ON UPDATE CASCADE;
