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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TTM" (
    "id" SERIAL NOT NULL,
    "premarketPrice" TEXT,
    "fcfGrowthThreeYears" TEXT,
    "fcfGrowthFiveYears" TEXT,
    "forwardPe" TEXT,
    "returnOnEquity5Year" TEXT,
    "returnOnAssets5Year" TEXT,
    "returnOnCapital5Year" TEXT,
    "lastSplitDate" TEXT,
    "lastStockSplit" TEXT,
    "lastStockSplitRatio" TEXT,
    "float" TEXT,
    "shortRatio" TEXT,
    "shortPercentShare" TEXT,
    "beta1Year" TEXT,
    "epsGrowth3Year" TEXT,
    "epsGrowth5Year" TEXT,
    "netIncomeGrowth3Year" TEXT,
    "netIncomeGrowth5Year" TEXT,
    "operatingIncomeGrowth3Year" TEXT,
    "operatingIncomeGrowth5Year" TEXT,
    "grossProfit3Year" TEXT,
    "grossProfit5Year" TEXT,
    "revenueGrowth3Year" TEXT,
    "revenueGrowth5Year" TEXT,
    "ipoDate" TEXT,
    "employees" TEXT,
    "premarketPercentageChg" TEXT,
    "priceTargetPercentage" TEXT,
    "previousClose" TEXT,
    "anaylystRating" TEXT,
    "analystCount" TEXT,
    "priceChange1Day" TEXT,
    "priceChange1Week" TEXT,
    "priceChange1Month" TEXT,
    "priceChange6Month" TEXT,
    "priceChange1Year" TEXT,
    "priceChangeThisYear" TEXT,
    "priceChange3Year" TEXT,
    "priceChange5Year" TEXT,
    "priceChange10Year" TEXT,
    "priceChange52WeekHigh" TEXT,
    "priceChange52WeekLow" TEXT,
    "RevOverEmployees" TEXT,
    "piotroskiFScore" TEXT,
    "revGrowthNextYear" TEXT,
    "revGrowthThisYear" TEXT,
    "InvTurnover" TEXT,
    "PayoutFreq" TEXT,
    "AltmanZScore" TEXT,
    "revGrowthThisQuarter" TEXT,
    "revGrowthNextQuarter" TEXT,
    "shareholderYield" TEXT,
    "relativeVolume" TEXT,
    "averageVolume" TEXT,
    "epsGrowthNextQuarter" TEXT,
    "epsGrowthThisQuarter" TEXT,
    "epsGrowthNextYear" TEXT,
    "epsGrowthThisYear" TEXT,
    "cashOverMarketCap" TEXT,
    "financialReportDate" TEXT,
    "volume" TEXT,
    "dividend" TEXT,
    "netCashOverDebtGrowth" TEXT,
    "lastClosePrice" TEXT,
    "evOverEbitda" TEXT,
    "evOverEarnings" TEXT,
    "forwardEvOverSales" TEXT,
    "pegRatio" TEXT,
    "taxOverRevenue" TEXT,
    "quickRatio" TEXT,
    "profOverEmployee" TEXT,
    "ExDividendDate" TEXT,
    "sharesInstitutions" TEXT,
    "sharesInsiders" TEXT,
    "operatingMargin" TEXT,
    "sector" TEXT,
    "country" TEXT,
    "exchange" TEXT,
    "grossProfit" TEXT,
    "costOfRevenue" TEXT,
    "sellingGeneralAdministrative" TEXT,
    "researchDevelopment" TEXT,
    "totalOperatingExpenses" TEXT,
    "interestExpense" TEXT,
    "incomeBeforeTax" TEXT,
    "incomeTax" TEXT,
    "netIncome" TEXT,
    "epsActual" TEXT,
    "dilutedEspActual" TEXT,
    "dividendShare" TEXT,
    "profitMargin" TEXT,
    "ebitda" TEXT,
    "ebitdaMargin" TEXT,
    "ebit" TEXT,
    "ebitMargin" TEXT,
    "depreciationAndAmortization" TEXT,
    "freeCashFlowMargin" TEXT,
    "grossMargin" TEXT,
    "cashAndEquivalents" TEXT,
    "shortTermInvestments" TEXT,
    "cashAndCashEquivalents" TEXT,
    "cashAndShortTermInvestments" TEXT,
    "receivables" TEXT,
    "inventory" TEXT,
    "otherCurrentAssets" TEXT,
    "totalCurrentAssets" TEXT,
    "propertyPlantAndEquipment" TEXT,
    "longTermInvestments" TEXT,
    "goodWillAndIntangibleAssets" TEXT,
    "otherLongTermAssets" TEXT,
    "totalLongTernAssets" TEXT,
    "totalAssets" TEXT,
    "accountsPayable" TEXT,
    "deferredRevenue" TEXT,
    "currentDebt" TEXT,
    "otherCurrentLiabilities" TEXT,
    "totalCurrentLiabilities" TEXT,
    "longTernDebt" TEXT,
    "totalLongTermLiabilities" TEXT,
    "totalLiabilities" TEXT,
    "totalDebt" TEXT,
    "commonStock" TEXT,
    "retainedEarnings" TEXT,
    "comprehensiveIncome" TEXT,
    "shareHoldersEquity" TEXT,
    "totalLiabilitiesAndEquity" TEXT,
    "netCashOverDebt" TEXT,
    "netCashperShare" TEXT,
    "workingCapital" TEXT,
    "bookValuePerShare" TEXT,
    "shareBasedCompensation" TEXT,
    "otherOperatingActivities" TEXT,
    "operatingCashFlow" TEXT,
    "capitalExpenditures" TEXT,
    "otherInvestingActivities" TEXT,
    "investingCashFlow" TEXT,
    "dividendPaid" TEXT,
    "shareIssuanceOverRepurchase" TEXT,
    "otherFinanceActivities" TEXT,
    "financeCashFlow" TEXT,
    "netCashFlow" TEXT,
    "freeCashFlow" TEXT,
    "freeCashFlowPerShare" TEXT,
    "marketCapitalization" TEXT,
    "enterpriseValue" TEXT,
    "peRatio" TEXT,
    "psRatio" TEXT,
    "pOverFcfRatio" TEXT,
    "pOverOcfRatio" TEXT,
    "evOverSalesRatio" TEXT,
    "evEbitdaRatio" TEXT,
    "evEbitRatio" TEXT,
    "evFcfRatio" TEXT,
    "debtOverEquityRatio" TEXT,
    "debtOverEbitdaRatio" TEXT,
    "debtFcfRatio" TEXT,
    "currentRatio" TEXT,
    "assetTurnover" TEXT,
    "returnOnEquity" TEXT,
    "returnOnAssets" TEXT,
    "returnOnCapital" TEXT,
    "fcfYield" TEXT,
    "payoutRatio" TEXT,
    "revenueGrowthYOY" TEXT,
    "netIncomeGrowth" TEXT,
    "dividendGrowth" TEXT,
    "cashGrowth" TEXT,
    "debtGorwth" TEXT,
    "marketCapGrowth" TEXT,
    "epsGrowth" TEXT,
    "operatingIncome" TEXT,
    "opIncomeGrowthQuat" TEXT,
    "opIncomeGrowthYearly" TEXT,
    "revenueTTM" TEXT,
    "revenueGrowthYearly" TEXT,
    "revenueGrowthQuat" TEXT,
    "sharesChangeYearly" TEXT,
    "sharesChangeQuarterly" TEXT,
    "tickerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TTM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Earnings" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "date" TEXT,
    "earningsQuat" TEXT,
    "epsActual" TEXT,
    "earningYield" TEXT,
    "epsGrowth" TEXT,
    "peRatio" TEXT,
    "epsEstimate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tickerId" INTEGER,

    CONSTRAINT "Earnings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dividend" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "date" TEXT,
    "dividendYield" TEXT,
    "tickerId" INTEGER,
    "payoutRatio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dividend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatiosAndMetrics" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "date" TEXT,
    "quater" TEXT,
    "marketCap" TEXT,
    "enterpriseValue" TEXT,
    "evOverEbit" TEXT,
    "evOverSales" TEXT,
    "evOverFcf" TEXT,
    "fcfYield" TEXT,
    "buybackYield" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tickerId" INTEGER,

    CONSTRAINT "RatiosAndMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashFlow" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "date" TEXT,
    "priceOverFcfRatio" TEXT,
    "finCashFlow" TEXT,
    "invCashFlow" TEXT,
    "sharedBasedCompensation" TEXT,
    "operatingCashFlow" TEXT,
    "fcfGrowth" TEXT,
    "fcfOverShare" TEXT,
    "netCashFlow" TEXT,
    "freeCashFlow" TEXT,
    "returnOnEquity" TEXT,
    "returnOnAssets" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tickerId" INTEGER,

    CONSTRAINT "CashFlow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncomeStatement" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "date" TEXT,
    "netIncome" TEXT,
    "netIncomeGrowth" TEXT,
    "operatingIncome" TEXT,
    "opIncomeGrowth" TEXT,
    "grossProfit" TEXT,
    "ebit" TEXT,
    "ebitda" TEXT,
    "grossProfitGrowth" TEXT,
    "totalRevenue" TEXT,
    "revenueGrowth" TEXT,
    "grossMargin" TEXT,
    "operatingMargin" TEXT,
    "profitMargin" TEXT,
    "fcfMargin" TEXT,
    "ebitdaMargin" TEXT,
    "ebitMargin" TEXT,
    "researchDevelopment" TEXT,
    "researchDevelopmentOverRevenue" TEXT,
    "psRatio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tickerId" INTEGER,

    CONSTRAINT "IncomeStatement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalanceSheet" (
    "id" SERIAL NOT NULL,
    "Type" "Type" NOT NULL,
    "date" TEXT,
    "netCashOverDebt" TEXT,
    "totalCash" TEXT,
    "totalDebt" TEXT,
    "currentRatio" TEXT,
    "totalAssets" TEXT,
    "totalLiab" TEXT,
    "pbRatio" TEXT,
    "debtOverEquity" TEXT,
    "debtOverEbitda" TEXT,
    "debtOverFcf" TEXT,
    "shareHolderEquity" TEXT,
    "workingCapital" TEXT,
    "assetTurnover" TEXT,
    "returnOnCapital" TEXT,
    "netCashOverDebtGrowth" TEXT,
    "priceOverFcfRatio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tickerId" INTEGER,

    CONSTRAINT "BalanceSheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TTM_tickerId_key" ON "TTM"("tickerId");

-- AddForeignKey
ALTER TABLE "TTM" ADD CONSTRAINT "TTM_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Earnings" ADD CONSTRAINT "Earnings_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dividend" ADD CONSTRAINT "Dividend_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatiosAndMetrics" ADD CONSTRAINT "RatiosAndMetrics_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashFlow" ADD CONSTRAINT "CashFlow_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeStatement" ADD CONSTRAINT "IncomeStatement_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceSheet" ADD CONSTRAINT "BalanceSheet_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
