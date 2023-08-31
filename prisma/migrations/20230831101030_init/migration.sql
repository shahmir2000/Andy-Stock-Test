-- CreateEnum
CREATE TYPE "Type" AS ENUM ('QUARTERLY', 'YEARLY');

-- CreateTable
CREATE TABLE "lastTicker" (
    "id" SERIAL NOT NULL,
    "lastActiveTicker" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lastTicker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticker" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT,
    "company" TEXT,
    "industriesId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TTM" (
    "id" SERIAL NOT NULL,
    "premarketPrice" DOUBLE PRECISION,
    "priceChnage" DOUBLE PRECISION,
    "StrongBuy" DOUBLE PRECISION,
    "TargetPrice" DOUBLE PRECISION,
    "Buy" DOUBLE PRECISION,
    "Hold" DOUBLE PRECISION,
    "Sell" DOUBLE PRECISION,
    "StrongSell" DOUBLE PRECISION,
    "MostRecentQuarter" TEXT,
    "earningsDate" TEXT,
    "sharesOutTTM" DOUBLE PRECISION,
    "preMarketDate" TEXT,
    "industry" TEXT,
    "pbRatio" DOUBLE PRECISION,
    "founded" DOUBLE PRECISION,
    "TotalShareholderReturn" DOUBLE PRECISION,
    "incomeTaxExpense" DOUBLE PRECISION,
    "fcfGrowthThreeYears" DOUBLE PRECISION,
    "fcfGrowthFiveYears" DOUBLE PRECISION,
    "forwardPe" DOUBLE PRECISION,
    "returnOnEquity5Year" DOUBLE PRECISION,
    "returnOnAssets5Year" DOUBLE PRECISION,
    "returnOnCapital5Year" DOUBLE PRECISION,
    "lastSplitDate" TEXT,
    "lastStockSplit" TEXT,
    "lastStockSplitRatio" TEXT,
    "shortPercentFloat" DOUBLE PRECISION,
    "float" DOUBLE PRECISION,
    "shortRatio" DOUBLE PRECISION,
    "shortPercentShare" DOUBLE PRECISION,
    "beta1Year" DOUBLE PRECISION,
    "epsGrowth3Year" DOUBLE PRECISION,
    "epsGrowth5Year" DOUBLE PRECISION,
    "netIncomeGrowth3Year" DOUBLE PRECISION,
    "netIncomeGrowth5Year" DOUBLE PRECISION,
    "operatingIncomeGrowth3Year" DOUBLE PRECISION,
    "operatingIncomeGrowth5Year" DOUBLE PRECISION,
    "grossProfit3Year" DOUBLE PRECISION,
    "grossProfit5Year" DOUBLE PRECISION,
    "revenueGrowth3Year" DOUBLE PRECISION,
    "revenueGrowth5Year" DOUBLE PRECISION,
    "ipoDate" TEXT,
    "employees" DOUBLE PRECISION,
    "premarketPercentageChg" DOUBLE PRECISION,
    "priceTargetPercentage" DOUBLE PRECISION,
    "previousClose" DOUBLE PRECISION,
    "anaylystRating" DOUBLE PRECISION,
    "analystCount" DOUBLE PRECISION,
    "priceChange1Day" DOUBLE PRECISION,
    "priceChange1Week" DOUBLE PRECISION,
    "priceChange1Month" DOUBLE PRECISION,
    "priceChange6Month" DOUBLE PRECISION,
    "priceChange1Year" DOUBLE PRECISION,
    "priceChangeThisYear" DOUBLE PRECISION,
    "priceChange3Year" DOUBLE PRECISION,
    "priceChange5Year" DOUBLE PRECISION,
    "priceChange10Year" DOUBLE PRECISION,
    "priceChange52WeekHigh" DOUBLE PRECISION,
    "priceChange52WeekLow" DOUBLE PRECISION,
    "RevOverEmployees" DOUBLE PRECISION,
    "piotroskiFScore" DOUBLE PRECISION,
    "revGrowthNextYear" DOUBLE PRECISION,
    "revGrowthThisYear" DOUBLE PRECISION,
    "InvTurnover" DOUBLE PRECISION,
    "PayoutFreq" DOUBLE PRECISION,
    "AltmanZScore" DOUBLE PRECISION,
    "revGrowthThisQuarter" DOUBLE PRECISION,
    "revGrowthNextQuarter" DOUBLE PRECISION,
    "shareholderYield" DOUBLE PRECISION,
    "relativeVolume" DOUBLE PRECISION,
    "averageVolume" DOUBLE PRECISION,
    "epsGrowthNextQuarter" DOUBLE PRECISION,
    "epsGrowthThisQuarter" DOUBLE PRECISION,
    "epsGrowthNextYear" DOUBLE PRECISION,
    "epsGrowthThisYear" DOUBLE PRECISION,
    "cashOverMarketCap" DOUBLE PRECISION,
    "financialReportDate" TEXT,
    "volume" DOUBLE PRECISION,
    "dividend" DOUBLE PRECISION,
    "netCashOverDebtGrowth" DOUBLE PRECISION,
    "lastClosePrice" DOUBLE PRECISION,
    "evOverEbitda" DOUBLE PRECISION,
    "evOverEarnings" DOUBLE PRECISION,
    "forwardEvOverSales" DOUBLE PRECISION,
    "pegRatio" DOUBLE PRECISION,
    "forwardPs" DOUBLE PRECISION,
    "taxOverRevenue" DOUBLE PRECISION,
    "quickRatio" DOUBLE PRECISION,
    "profOverEmployee" DOUBLE PRECISION,
    "ExDividendDate" TEXT,
    "sharesInstitutions" DOUBLE PRECISION,
    "sharesInsiders" DOUBLE PRECISION,
    "operatingMargin" DOUBLE PRECISION,
    "sector" TEXT,
    "country" TEXT,
    "exchange" TEXT,
    "grossProfit" DOUBLE PRECISION,
    "costOfRevenue" DOUBLE PRECISION,
    "sellingGeneralAdministrative" DOUBLE PRECISION,
    "researchDevelopment" DOUBLE PRECISION,
    "totalOperatingExpenses" DOUBLE PRECISION,
    "interestExpense" DOUBLE PRECISION,
    "incomeBeforeTax" DOUBLE PRECISION,
    "incomeTax" DOUBLE PRECISION,
    "netIncome" DOUBLE PRECISION,
    "epsActual" DOUBLE PRECISION,
    "dilutedEspActual" DOUBLE PRECISION,
    "dividendShare" DOUBLE PRECISION,
    "profitMargin" DOUBLE PRECISION,
    "ebitda" DOUBLE PRECISION,
    "ebitdaMargin" DOUBLE PRECISION,
    "ebit" DOUBLE PRECISION,
    "ebitMargin" DOUBLE PRECISION,
    "depreciationAndAmortization" DOUBLE PRECISION,
    "freeCashFlowMargin" DOUBLE PRECISION,
    "grossMargin" DOUBLE PRECISION,
    "cashAndEquivalents" DOUBLE PRECISION,
    "shortTermInvestments" DOUBLE PRECISION,
    "cashAndCashEquivalents" DOUBLE PRECISION,
    "cashAndShortTermInvestments" DOUBLE PRECISION,
    "receivables" DOUBLE PRECISION,
    "inventory" DOUBLE PRECISION,
    "otherCurrentAssets" DOUBLE PRECISION,
    "totalCurrentAssets" DOUBLE PRECISION,
    "propertyPlantAndEquipment" DOUBLE PRECISION,
    "longTermInvestments" DOUBLE PRECISION,
    "goodWillAndIntangibleAssets" DOUBLE PRECISION,
    "otherLongTermAssets" DOUBLE PRECISION,
    "totalLongTernAssets" DOUBLE PRECISION,
    "totalAssets" DOUBLE PRECISION,
    "accountsPayable" DOUBLE PRECISION,
    "deferredRevenue" DOUBLE PRECISION,
    "currentDebt" DOUBLE PRECISION,
    "otherCurrentLiabilities" DOUBLE PRECISION,
    "totalCurrentLiabilities" DOUBLE PRECISION,
    "longTernDebt" DOUBLE PRECISION,
    "totalLongTermLiabilities" DOUBLE PRECISION,
    "totalLiabilities" DOUBLE PRECISION,
    "totalDebt" DOUBLE PRECISION,
    "commonStock" DOUBLE PRECISION,
    "retainedEarnings" DOUBLE PRECISION,
    "comprehensiveIncome" DOUBLE PRECISION,
    "shareHoldersEquity" DOUBLE PRECISION,
    "totalLiabilitiesAndEquity" DOUBLE PRECISION,
    "netCashOverDebt" DOUBLE PRECISION,
    "netCashperShare" DOUBLE PRECISION,
    "workingCapital" DOUBLE PRECISION,
    "bookValuePerShare" DOUBLE PRECISION,
    "shareBasedCompensation" DOUBLE PRECISION,
    "otherOperatingActivities" DOUBLE PRECISION,
    "operatingCashFlow" DOUBLE PRECISION,
    "capitalExpenditures" DOUBLE PRECISION,
    "otherInvestingActivities" DOUBLE PRECISION,
    "investingCashFlow" DOUBLE PRECISION,
    "dividendPaid" DOUBLE PRECISION,
    "shareIssuanceOverRepurchase" DOUBLE PRECISION,
    "otherFinanceActivities" DOUBLE PRECISION,
    "financeCashFlow" DOUBLE PRECISION,
    "netCashFlow" DOUBLE PRECISION,
    "freeCashFlow" DOUBLE PRECISION,
    "freeCashFlowPerShare" DOUBLE PRECISION,
    "marketCapitalization" DOUBLE PRECISION,
    "enterpriseValue" DOUBLE PRECISION,
    "peRatio" DOUBLE PRECISION,
    "psRatio" DOUBLE PRECISION,
    "pOverFcfRatio" DOUBLE PRECISION,
    "pOverOcfRatio" DOUBLE PRECISION,
    "evOverSalesRatio" DOUBLE PRECISION,
    "evEbitdaRatio" DOUBLE PRECISION,
    "evEbitRatio" DOUBLE PRECISION,
    "evFcfRatio" DOUBLE PRECISION,
    "debtOverEquityRatio" DOUBLE PRECISION,
    "debtOverEbitdaRatio" DOUBLE PRECISION,
    "debtFcfRatio" DOUBLE PRECISION,
    "currentRatio" DOUBLE PRECISION,
    "assetTurnover" DOUBLE PRECISION,
    "returnOnEquity" DOUBLE PRECISION,
    "returnOnAssets" DOUBLE PRECISION,
    "returnOnCapital" DOUBLE PRECISION,
    "fcfYield" DOUBLE PRECISION,
    "payoutRatio" DOUBLE PRECISION,
    "revenueGrowthYOY" DOUBLE PRECISION,
    "netIncomeGrowthQ" DOUBLE PRECISION,
    "netIncomeGrowthY" DOUBLE PRECISION,
    "researchDevelopmentOverRevenueQ" DOUBLE PRECISION,
    "researchDevelopmentOverRevenueY" DOUBLE PRECISION,
    "dividendYieldQ" DOUBLE PRECISION,
    "dividendYieldY" DOUBLE PRECISION,
    "grossProfitGrowthQ" DOUBLE PRECISION,
    "grossProfitGrowthY" DOUBLE PRECISION,
    "fcfGrowthQ" DOUBLE PRECISION,
    "fcfGrowthY" DOUBLE PRECISION,
    "totalCashY" DOUBLE PRECISION,
    "totalCashQ" DOUBLE PRECISION,
    "priceOverFcfRatioQ" DOUBLE PRECISION,
    "priceOverFcfRatioY" DOUBLE PRECISION,
    "debtOverFcfQ" DOUBLE PRECISION,
    "debtOverFcfY" DOUBLE PRECISION,
    "evOverSalesYearly" DOUBLE PRECISION,
    "evOverSalesQuat" DOUBLE PRECISION,
    "evOverEbitQuat" DOUBLE PRECISION,
    "evOverEbitYearly" DOUBLE PRECISION,
    "evOverFcfQuat" DOUBLE PRECISION,
    "evOverFcfYearly" DOUBLE PRECISION,
    "buybackYieldQuat" DOUBLE PRECISION,
    "buybackYieldYearly" DOUBLE PRECISION,
    "earningYieldQ" DOUBLE PRECISION,
    "earningYieldY" DOUBLE PRECISION,
    "dividendGrowth" DOUBLE PRECISION,
    "cashGrowth" DOUBLE PRECISION,
    "debtGorwth" DOUBLE PRECISION,
    "marketCapGrowth" DOUBLE PRECISION,
    "epsGrowth" DOUBLE PRECISION,
    "operatingIncome" DOUBLE PRECISION,
    "opIncomeGrowthQuat" DOUBLE PRECISION,
    "opIncomeGrowthYearly" DOUBLE PRECISION,
    "revenueTTM" DOUBLE PRECISION,
    "revenueGrowthYearly" DOUBLE PRECISION,
    "revenueGrowthQuat" DOUBLE PRECISION,
    "sharesChangeYearly" DOUBLE PRECISION,
    "sharesChangeQuarterly" DOUBLE PRECISION,
    "tickerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TTM_pkey" PRIMARY KEY ("id")
);

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
    "IsDelisted" BOOLEAN,
    "Description" TEXT,
    "Address" TEXT,
    "Phone" TEXT,
    "WebURL" TEXT,
    "FullTimeEmployees" DOUBLE PRECISION,
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

-- CreateTable
CREATE TABLE "Earnings" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "date" TEXT,
    "earningsQuat" DOUBLE PRECISION,
    "epsActual" DOUBLE PRECISION,
    "earningYield" DOUBLE PRECISION,
    "epsGrowth" DOUBLE PRECISION,
    "peRatio" DOUBLE PRECISION,
    "epsEstimate" DOUBLE PRECISION,
    "tickerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Earnings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarningsTrand" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "date" TEXT,
    "marketCap" DOUBLE PRECISION,
    "reportDate" TEXT,
    "beforeAfterMarket" TEXT,
    "epsEstimateAvg" DOUBLE PRECISION,
    "epsEstimate" DOUBLE PRECISION,
    "revenueDifference" DOUBLE PRECISION,
    "revenueEstimateAvg" DOUBLE PRECISION,
    "epsActual" DOUBLE PRECISION,
    "totalRevenue" DOUBLE PRECISION,
    "epsDifference" DOUBLE PRECISION,
    "epsSurprisePercent" DOUBLE PRECISION,
    "revenueSurprisePercent" DOUBLE PRECISION,
    "tickerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EarningsTrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dividend" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "date" TEXT,
    "dividendYield" DOUBLE PRECISION,
    "dividendShare" DOUBLE PRECISION,
    "payoutRatio" DOUBLE PRECISION,
    "tickerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dividend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DividendHistory" (
    "id" SERIAL NOT NULL,
    "date" TEXT,
    "declarationDate" TEXT,
    "recordDate" TEXT,
    "paymentDate" TEXT,
    "period" TEXT,
    "value" DOUBLE PRECISION,
    "unadjustedValue" DOUBLE PRECISION,
    "currency" TEXT,
    "tickerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DividendHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatiosAndMetrics" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "date" TEXT,
    "quater" TEXT,
    "marketCap" DOUBLE PRECISION,
    "evOverSalesRatio" DOUBLE PRECISION,
    "evOverEbitda" DOUBLE PRECISION,
    "TotalShareholderReturn" DOUBLE PRECISION,
    "marketCapGrowth" DOUBLE PRECISION,
    "pOverOcfRatio" DOUBLE PRECISION,
    "enterpriseValue" DOUBLE PRECISION,
    "evOverEbit" DOUBLE PRECISION,
    "evOverSales" DOUBLE PRECISION,
    "evOverFcf" DOUBLE PRECISION,
    "fcfYield" DOUBLE PRECISION,
    "buybackYield" DOUBLE PRECISION,
    "tickerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RatiosAndMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashFlow" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "freeCashFlowMargin" DOUBLE PRECISION,
    "freeCashFlowPerShare" DOUBLE PRECISION,
    "otherOperatingActivities" DOUBLE PRECISION,
    "financingCashFlow" DOUBLE PRECISION,
    "salePurchaseOfStock" DOUBLE PRECISION,
    "otherFinancingActivities" DOUBLE PRECISION,
    "changeToInventory" DOUBLE PRECISION,
    "depreciationAndAmortization" DOUBLE PRECISION,
    "operatingCashFlowGrowth" DOUBLE PRECISION,
    "capitalExpenditures" DOUBLE PRECISION,
    "date" TEXT,
    "priceOverFcfRatio" DOUBLE PRECISION,
    "finCashFlow" DOUBLE PRECISION,
    "invCashFlow" DOUBLE PRECISION,
    "sharedBasedCompensation" DOUBLE PRECISION,
    "operatingCashFlow" DOUBLE PRECISION,
    "fcfGrowth" DOUBLE PRECISION,
    "fcfOverShare" DOUBLE PRECISION,
    "netCashFlow" DOUBLE PRECISION,
    "freeCashFlow" DOUBLE PRECISION,
    "returnOnEquity" DOUBLE PRECISION,
    "returnOnAssets" DOUBLE PRECISION,
    "tickerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CashFlow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncomeStatement" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "sellingGeneralAdministrative" DOUBLE PRECISION,
    "freeCashFlowPerShare" DOUBLE PRECISION,
    "CashFlowMargin" DOUBLE PRECISION,
    "interestExpense" DOUBLE PRECISION,
    "totalOperatingExpenses" DOUBLE PRECISION,
    "incomeTaxExpense" DOUBLE PRECISION,
    "sharesOutDiluted" DOUBLE PRECISION,
    "costOfRevenue" DOUBLE PRECISION,
    "incomeBeforeTax" DOUBLE PRECISION,
    "epsActual" DOUBLE PRECISION,
    "dividendGrowth" DOUBLE PRECISION,
    "depreciationAndAmortization" DOUBLE PRECISION,
    "ebitdaGrowth" DOUBLE PRECISION,
    "date" TEXT,
    "netIncome" DOUBLE PRECISION,
    "epsGrowth" DOUBLE PRECISION,
    "netIncomeGrowth" DOUBLE PRECISION,
    "operatingIncome" DOUBLE PRECISION,
    "opIncomeGrowth" DOUBLE PRECISION,
    "grossProfit" DOUBLE PRECISION,
    "ebit" DOUBLE PRECISION,
    "ebitda" DOUBLE PRECISION,
    "grossProfitGrowth" DOUBLE PRECISION,
    "totalRevenue" DOUBLE PRECISION,
    "revenueGrowth" DOUBLE PRECISION,
    "grossMargin" DOUBLE PRECISION,
    "operatingMargin" DOUBLE PRECISION,
    "profitMargin" DOUBLE PRECISION,
    "fcfMargin" DOUBLE PRECISION,
    "ebitdaMargin" DOUBLE PRECISION,
    "ebitMargin" DOUBLE PRECISION,
    "researchDevelopment" DOUBLE PRECISION,
    "researchDevelopmentOverRevenue" DOUBLE PRECISION,
    "psRatio" DOUBLE PRECISION,
    "tickerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncomeStatement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalanceSheet" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "date" TEXT,
    "deferredLongTermLiab" DOUBLE PRECISION,
    "cashAndEquivalents" DOUBLE PRECISION,
    "shortTermInvestments" DOUBLE PRECISION,
    "cashAndShortTermInvestments" DOUBLE PRECISION,
    "cashGrowth" DOUBLE PRECISION,
    "netReceivables" DOUBLE PRECISION,
    "inventory" DOUBLE PRECISION,
    "otherCurrentAssets" DOUBLE PRECISION,
    "totalCurrentAssets" DOUBLE PRECISION,
    "debtGrowth" DOUBLE PRECISION,
    "longTermInvestments" DOUBLE PRECISION,
    "accountsPayable" DOUBLE PRECISION,
    "otherCurrentLiab" DOUBLE PRECISION,
    "longTermDebtTotal" DOUBLE PRECISION,
    "totalCurrentLiabilities" DOUBLE PRECISION,
    "shortTermDebt" DOUBLE PRECISION,
    "otherAssets" DOUBLE PRECISION,
    "nonCurrentAssetsTotal" DOUBLE PRECISION,
    "currentDeferredRevenue" DOUBLE PRECISION,
    "liabilitiesAndStockholdersEquity" DOUBLE PRECISION,
    "totalStockholderEquity" DOUBLE PRECISION,
    "retainedEarnings" DOUBLE PRECISION,
    "accumulatedOtherComprehensiveIncome" DOUBLE PRECISION,
    "commonStock" DOUBLE PRECISION,
    "goodWillAndIntangibleAssets" DOUBLE PRECISION,
    "propertyPlantAndEquipmentNet" DOUBLE PRECISION,
    "netWorkingCapital" DOUBLE PRECISION,
    "bookValue" DOUBLE PRECISION,
    "netCashPerShare" DOUBLE PRECISION,
    "sharesOut" DOUBLE PRECISION,
    "netCashOverDebt" DOUBLE PRECISION,
    "totalCash" DOUBLE PRECISION,
    "totalDebt" DOUBLE PRECISION,
    "currentRatio" DOUBLE PRECISION,
    "totalAssets" DOUBLE PRECISION,
    "totalLiab" DOUBLE PRECISION,
    "pbRatio" DOUBLE PRECISION,
    "debtOverEquity" DOUBLE PRECISION,
    "debtOverEbitda" DOUBLE PRECISION,
    "debtOverFcf" DOUBLE PRECISION,
    "shareHolderEquity" DOUBLE PRECISION,
    "workingCapital" DOUBLE PRECISION,
    "assetTurnover" DOUBLE PRECISION,
    "returnOnCapital" DOUBLE PRECISION,
    "netCashOverDebtGrowth" DOUBLE PRECISION,
    "priceOverFcfRatio" DOUBLE PRECISION,
    "tickerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BalanceSheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sectors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "Ticker_ticker_key" ON "Ticker"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "TTM_tickerId_key" ON "TTM"("tickerId");

-- CreateIndex
CREATE UNIQUE INDEX "General_tickerId_key" ON "General"("tickerId");

-- CreateIndex
CREATE UNIQUE INDEX "Sectors_name_key" ON "Sectors"("name");

-- AddForeignKey
ALTER TABLE "Ticker" ADD CONSTRAINT "Ticker_industriesId_fkey" FOREIGN KEY ("industriesId") REFERENCES "Industries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TTM" ADD CONSTRAINT "TTM_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "General" ADD CONSTRAINT "General_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Officers" ADD CONSTRAINT "Officers_generalId_fkey" FOREIGN KEY ("generalId") REFERENCES "General"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Earnings" ADD CONSTRAINT "Earnings_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningsTrand" ADD CONSTRAINT "EarningsTrand_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dividend" ADD CONSTRAINT "Dividend_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DividendHistory" ADD CONSTRAINT "DividendHistory_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatiosAndMetrics" ADD CONSTRAINT "RatiosAndMetrics_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashFlow" ADD CONSTRAINT "CashFlow_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeStatement" ADD CONSTRAINT "IncomeStatement_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceSheet" ADD CONSTRAINT "BalanceSheet_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Industries" ADD CONSTRAINT "Industries_sectorsId_fkey" FOREIGN KEY ("sectorsId") REFERENCES "Sectors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
