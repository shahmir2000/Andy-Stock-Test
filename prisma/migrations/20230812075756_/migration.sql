/*
  Warnings:

  - The `netCashOverDebt` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalCash` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalDebt` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `currentRatio` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalAssets` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalLiab` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pbRatio` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `debtOverEquity` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `debtOverEbitda` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `debtOverFcf` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `shareHolderEquity` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `workingCapital` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `assetTurnover` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `returnOnCapital` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netCashOverDebtGrowth` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceOverFcfRatio` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sharesOut` column on the `BalanceSheet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceOverFcfRatio` column on the `CashFlow` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `finCashFlow` column on the `CashFlow` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `invCashFlow` column on the `CashFlow` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sharedBasedCompensation` column on the `CashFlow` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `operatingCashFlow` column on the `CashFlow` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fcfGrowth` column on the `CashFlow` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fcfOverShare` column on the `CashFlow` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netCashFlow` column on the `CashFlow` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `freeCashFlow` column on the `CashFlow` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `returnOnEquity` column on the `CashFlow` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `returnOnAssets` column on the `CashFlow` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dividendYield` column on the `Dividend` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `payoutRatio` column on the `Dividend` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dividendShare` column on the `Dividend` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `earningsQuat` column on the `Earnings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `epsActual` column on the `Earnings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `earningYield` column on the `Earnings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `epsGrowth` column on the `Earnings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `peRatio` column on the `Earnings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `epsEstimate` column on the `Earnings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netIncome` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netIncomeGrowth` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `operatingIncome` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `opIncomeGrowth` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `grossProfit` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ebit` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ebitda` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `grossProfitGrowth` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalRevenue` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revenueGrowth` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `grossMargin` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `operatingMargin` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `profitMargin` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fcfMargin` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ebitdaMargin` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ebitMargin` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `researchDevelopment` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `researchDevelopmentOverRevenue` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `psRatio` column on the `IncomeStatement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `quater` column on the `RatiosAndMetrics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `marketCap` column on the `RatiosAndMetrics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `enterpriseValue` column on the `RatiosAndMetrics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evOverEbit` column on the `RatiosAndMetrics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evOverSales` column on the `RatiosAndMetrics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evOverFcf` column on the `RatiosAndMetrics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fcfYield` column on the `RatiosAndMetrics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `buybackYield` column on the `RatiosAndMetrics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `premarketPrice` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fcfGrowthThreeYears` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fcfGrowthFiveYears` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `forwardPe` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `returnOnEquity5Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `returnOnAssets5Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `returnOnCapital5Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `lastSplitDate` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `float` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `shortRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `shortPercentShare` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `beta1Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `epsGrowth3Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `epsGrowth5Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netIncomeGrowth3Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netIncomeGrowth5Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `operatingIncomeGrowth3Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `operatingIncomeGrowth5Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `grossProfit3Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `grossProfit5Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revenueGrowth3Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revenueGrowth5Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `employees` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `premarketPercentageChg` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceTargetPercentage` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `previousClose` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `anaylystRating` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `analystCount` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceChange1Day` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceChange1Week` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceChange1Month` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceChange6Month` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceChange1Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceChangeThisYear` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceChange3Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceChange5Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceChange10Year` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceChange52WeekHigh` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceChange52WeekLow` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `RevOverEmployees` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `piotroskiFScore` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revGrowthNextYear` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revGrowthThisYear` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `InvTurnover` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `PayoutFreq` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `AltmanZScore` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revGrowthThisQuarter` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revGrowthNextQuarter` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `shareholderYield` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `relativeVolume` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `averageVolume` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `epsGrowthNextQuarter` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `epsGrowthThisQuarter` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `epsGrowthNextYear` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `epsGrowthThisYear` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cashOverMarketCap` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `financialReportDate` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `volume` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dividend` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netCashOverDebtGrowth` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `lastClosePrice` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evOverEbitda` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evOverEarnings` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `forwardEvOverSales` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pegRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `taxOverRevenue` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `quickRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `profOverEmployee` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ExDividendDate` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sharesInstitutions` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sharesInsiders` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `operatingMargin` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `grossProfit` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `costOfRevenue` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sellingGeneralAdministrative` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `researchDevelopment` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalOperatingExpenses` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `interestExpense` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `incomeBeforeTax` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `incomeTax` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netIncome` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `epsActual` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dilutedEspActual` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dividendShare` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `profitMargin` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ebitda` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ebitdaMargin` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ebit` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ebitMargin` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `depreciationAndAmortization` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `freeCashFlowMargin` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `grossMargin` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cashAndEquivalents` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `shortTermInvestments` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cashAndCashEquivalents` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cashAndShortTermInvestments` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `receivables` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `inventory` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `otherCurrentAssets` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalCurrentAssets` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `propertyPlantAndEquipment` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `longTermInvestments` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `goodWillAndIntangibleAssets` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `otherLongTermAssets` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalLongTernAssets` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalAssets` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `accountsPayable` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deferredRevenue` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `currentDebt` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `otherCurrentLiabilities` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalCurrentLiabilities` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `longTernDebt` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalLongTermLiabilities` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalLiabilities` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalDebt` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `commonStock` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `retainedEarnings` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `comprehensiveIncome` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `shareHoldersEquity` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalLiabilitiesAndEquity` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netCashOverDebt` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netCashperShare` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `workingCapital` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bookValuePerShare` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `shareBasedCompensation` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `otherOperatingActivities` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `operatingCashFlow` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `capitalExpenditures` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `otherInvestingActivities` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `investingCashFlow` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dividendPaid` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `shareIssuanceOverRepurchase` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `otherFinanceActivities` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `financeCashFlow` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netCashFlow` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `freeCashFlow` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `freeCashFlowPerShare` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `marketCapitalization` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `enterpriseValue` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `peRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `psRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pOverFcfRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pOverOcfRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evOverSalesRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evEbitdaRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evEbitRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evFcfRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `debtOverEquityRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `debtOverEbitdaRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `debtFcfRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `currentRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `assetTurnover` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `returnOnEquity` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `returnOnAssets` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `returnOnCapital` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fcfYield` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `payoutRatio` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revenueGrowthYOY` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dividendGrowth` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cashGrowth` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `debtGorwth` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `marketCapGrowth` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `epsGrowth` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `operatingIncome` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `opIncomeGrowthQuat` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `opIncomeGrowthYearly` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revenueTTM` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revenueGrowthYearly` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `revenueGrowthQuat` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sharesChangeYearly` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sharesChangeQuarterly` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `preMarketDate` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sharesOutTTM` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `incomeTaxExpense` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `forwardPs` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `shortPercentFloat` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `buybackYieldQuat` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `buybackYieldYearly` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `debtOverFcfQ` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `debtOverFcfY` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dividendYieldQ` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dividendYieldY` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `earningYieldQ` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `earningYieldY` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evOverEbitQuat` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evOverEbitYearly` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evOverFcfQuat` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evOverFcfYearly` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evOverSalesQuat` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `evOverSalesYearly` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fcfGrowthQ` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fcfGrowthY` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `grossProfitGrowthQ` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `grossProfitGrowthY` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netIncomeGrowthQ` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `netIncomeGrowthY` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceOverFcfRatioQ` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priceOverFcfRatioY` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `researchDevelopmentOverRevenueQ` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `researchDevelopmentOverRevenueY` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalCashQ` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalCashY` column on the `TTM` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "BalanceSheet" DROP COLUMN "netCashOverDebt",
ADD COLUMN     "netCashOverDebt" DOUBLE PRECISION,
DROP COLUMN "totalCash",
ADD COLUMN     "totalCash" DOUBLE PRECISION,
DROP COLUMN "totalDebt",
ADD COLUMN     "totalDebt" DOUBLE PRECISION,
DROP COLUMN "currentRatio",
ADD COLUMN     "currentRatio" DOUBLE PRECISION,
DROP COLUMN "totalAssets",
ADD COLUMN     "totalAssets" DOUBLE PRECISION,
DROP COLUMN "totalLiab",
ADD COLUMN     "totalLiab" DOUBLE PRECISION,
DROP COLUMN "pbRatio",
ADD COLUMN     "pbRatio" DOUBLE PRECISION,
DROP COLUMN "debtOverEquity",
ADD COLUMN     "debtOverEquity" DOUBLE PRECISION,
DROP COLUMN "debtOverEbitda",
ADD COLUMN     "debtOverEbitda" DOUBLE PRECISION,
DROP COLUMN "debtOverFcf",
ADD COLUMN     "debtOverFcf" DOUBLE PRECISION,
DROP COLUMN "shareHolderEquity",
ADD COLUMN     "shareHolderEquity" DOUBLE PRECISION,
DROP COLUMN "workingCapital",
ADD COLUMN     "workingCapital" DOUBLE PRECISION,
DROP COLUMN "assetTurnover",
ADD COLUMN     "assetTurnover" DOUBLE PRECISION,
DROP COLUMN "returnOnCapital",
ADD COLUMN     "returnOnCapital" DOUBLE PRECISION,
DROP COLUMN "netCashOverDebtGrowth",
ADD COLUMN     "netCashOverDebtGrowth" DOUBLE PRECISION,
DROP COLUMN "priceOverFcfRatio",
ADD COLUMN     "priceOverFcfRatio" DOUBLE PRECISION,
DROP COLUMN "sharesOut",
ADD COLUMN     "sharesOut" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "CashFlow" DROP COLUMN "priceOverFcfRatio",
ADD COLUMN     "priceOverFcfRatio" DOUBLE PRECISION,
DROP COLUMN "finCashFlow",
ADD COLUMN     "finCashFlow" DOUBLE PRECISION,
DROP COLUMN "invCashFlow",
ADD COLUMN     "invCashFlow" DOUBLE PRECISION,
DROP COLUMN "sharedBasedCompensation",
ADD COLUMN     "sharedBasedCompensation" DOUBLE PRECISION,
DROP COLUMN "operatingCashFlow",
ADD COLUMN     "operatingCashFlow" DOUBLE PRECISION,
DROP COLUMN "fcfGrowth",
ADD COLUMN     "fcfGrowth" DOUBLE PRECISION,
DROP COLUMN "fcfOverShare",
ADD COLUMN     "fcfOverShare" DOUBLE PRECISION,
DROP COLUMN "netCashFlow",
ADD COLUMN     "netCashFlow" DOUBLE PRECISION,
DROP COLUMN "freeCashFlow",
ADD COLUMN     "freeCashFlow" DOUBLE PRECISION,
DROP COLUMN "returnOnEquity",
ADD COLUMN     "returnOnEquity" DOUBLE PRECISION,
DROP COLUMN "returnOnAssets",
ADD COLUMN     "returnOnAssets" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Dividend" DROP COLUMN "dividendYield",
ADD COLUMN     "dividendYield" DOUBLE PRECISION,
DROP COLUMN "payoutRatio",
ADD COLUMN     "payoutRatio" DOUBLE PRECISION,
DROP COLUMN "dividendShare",
ADD COLUMN     "dividendShare" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Earnings" DROP COLUMN "earningsQuat",
ADD COLUMN     "earningsQuat" DOUBLE PRECISION,
DROP COLUMN "epsActual",
ADD COLUMN     "epsActual" DOUBLE PRECISION,
DROP COLUMN "earningYield",
ADD COLUMN     "earningYield" DOUBLE PRECISION,
DROP COLUMN "epsGrowth",
ADD COLUMN     "epsGrowth" DOUBLE PRECISION,
DROP COLUMN "peRatio",
ADD COLUMN     "peRatio" DOUBLE PRECISION,
DROP COLUMN "epsEstimate",
ADD COLUMN     "epsEstimate" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "IncomeStatement" DROP COLUMN "netIncome",
ADD COLUMN     "netIncome" DOUBLE PRECISION,
DROP COLUMN "netIncomeGrowth",
ADD COLUMN     "netIncomeGrowth" DOUBLE PRECISION,
DROP COLUMN "operatingIncome",
ADD COLUMN     "operatingIncome" DOUBLE PRECISION,
DROP COLUMN "opIncomeGrowth",
ADD COLUMN     "opIncomeGrowth" DOUBLE PRECISION,
DROP COLUMN "grossProfit",
ADD COLUMN     "grossProfit" DOUBLE PRECISION,
DROP COLUMN "ebit",
ADD COLUMN     "ebit" DOUBLE PRECISION,
DROP COLUMN "ebitda",
ADD COLUMN     "ebitda" DOUBLE PRECISION,
DROP COLUMN "grossProfitGrowth",
ADD COLUMN     "grossProfitGrowth" DOUBLE PRECISION,
DROP COLUMN "totalRevenue",
ADD COLUMN     "totalRevenue" DOUBLE PRECISION,
DROP COLUMN "revenueGrowth",
ADD COLUMN     "revenueGrowth" DOUBLE PRECISION,
DROP COLUMN "grossMargin",
ADD COLUMN     "grossMargin" DOUBLE PRECISION,
DROP COLUMN "operatingMargin",
ADD COLUMN     "operatingMargin" DOUBLE PRECISION,
DROP COLUMN "profitMargin",
ADD COLUMN     "profitMargin" DOUBLE PRECISION,
DROP COLUMN "fcfMargin",
ADD COLUMN     "fcfMargin" DOUBLE PRECISION,
DROP COLUMN "ebitdaMargin",
ADD COLUMN     "ebitdaMargin" DOUBLE PRECISION,
DROP COLUMN "ebitMargin",
ADD COLUMN     "ebitMargin" DOUBLE PRECISION,
DROP COLUMN "researchDevelopment",
ADD COLUMN     "researchDevelopment" DOUBLE PRECISION,
DROP COLUMN "researchDevelopmentOverRevenue",
ADD COLUMN     "researchDevelopmentOverRevenue" DOUBLE PRECISION,
DROP COLUMN "psRatio",
ADD COLUMN     "psRatio" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "RatiosAndMetrics" DROP COLUMN "quater",
ADD COLUMN     "quater" DOUBLE PRECISION,
DROP COLUMN "marketCap",
ADD COLUMN     "marketCap" DOUBLE PRECISION,
DROP COLUMN "enterpriseValue",
ADD COLUMN     "enterpriseValue" DOUBLE PRECISION,
DROP COLUMN "evOverEbit",
ADD COLUMN     "evOverEbit" DOUBLE PRECISION,
DROP COLUMN "evOverSales",
ADD COLUMN     "evOverSales" DOUBLE PRECISION,
DROP COLUMN "evOverFcf",
ADD COLUMN     "evOverFcf" DOUBLE PRECISION,
DROP COLUMN "fcfYield",
ADD COLUMN     "fcfYield" DOUBLE PRECISION,
DROP COLUMN "buybackYield",
ADD COLUMN     "buybackYield" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TTM" DROP COLUMN "premarketPrice",
ADD COLUMN     "premarketPrice" DOUBLE PRECISION,
DROP COLUMN "fcfGrowthThreeYears",
ADD COLUMN     "fcfGrowthThreeYears" DOUBLE PRECISION,
DROP COLUMN "fcfGrowthFiveYears",
ADD COLUMN     "fcfGrowthFiveYears" DOUBLE PRECISION,
DROP COLUMN "forwardPe",
ADD COLUMN     "forwardPe" DOUBLE PRECISION,
DROP COLUMN "returnOnEquity5Year",
ADD COLUMN     "returnOnEquity5Year" DOUBLE PRECISION,
DROP COLUMN "returnOnAssets5Year",
ADD COLUMN     "returnOnAssets5Year" DOUBLE PRECISION,
DROP COLUMN "returnOnCapital5Year",
ADD COLUMN     "returnOnCapital5Year" DOUBLE PRECISION,
DROP COLUMN "lastSplitDate",
ADD COLUMN     "lastSplitDate" DOUBLE PRECISION,
DROP COLUMN "float",
ADD COLUMN     "float" DOUBLE PRECISION,
DROP COLUMN "shortRatio",
ADD COLUMN     "shortRatio" DOUBLE PRECISION,
DROP COLUMN "shortPercentShare",
ADD COLUMN     "shortPercentShare" DOUBLE PRECISION,
DROP COLUMN "beta1Year",
ADD COLUMN     "beta1Year" DOUBLE PRECISION,
DROP COLUMN "epsGrowth3Year",
ADD COLUMN     "epsGrowth3Year" DOUBLE PRECISION,
DROP COLUMN "epsGrowth5Year",
ADD COLUMN     "epsGrowth5Year" DOUBLE PRECISION,
DROP COLUMN "netIncomeGrowth3Year",
ADD COLUMN     "netIncomeGrowth3Year" DOUBLE PRECISION,
DROP COLUMN "netIncomeGrowth5Year",
ADD COLUMN     "netIncomeGrowth5Year" DOUBLE PRECISION,
DROP COLUMN "operatingIncomeGrowth3Year",
ADD COLUMN     "operatingIncomeGrowth3Year" DOUBLE PRECISION,
DROP COLUMN "operatingIncomeGrowth5Year",
ADD COLUMN     "operatingIncomeGrowth5Year" DOUBLE PRECISION,
DROP COLUMN "grossProfit3Year",
ADD COLUMN     "grossProfit3Year" DOUBLE PRECISION,
DROP COLUMN "grossProfit5Year",
ADD COLUMN     "grossProfit5Year" DOUBLE PRECISION,
DROP COLUMN "revenueGrowth3Year",
ADD COLUMN     "revenueGrowth3Year" DOUBLE PRECISION,
DROP COLUMN "revenueGrowth5Year",
ADD COLUMN     "revenueGrowth5Year" DOUBLE PRECISION,
DROP COLUMN "employees",
ADD COLUMN     "employees" DOUBLE PRECISION,
DROP COLUMN "premarketPercentageChg",
ADD COLUMN     "premarketPercentageChg" DOUBLE PRECISION,
DROP COLUMN "priceTargetPercentage",
ADD COLUMN     "priceTargetPercentage" DOUBLE PRECISION,
DROP COLUMN "previousClose",
ADD COLUMN     "previousClose" DOUBLE PRECISION,
DROP COLUMN "anaylystRating",
ADD COLUMN     "anaylystRating" DOUBLE PRECISION,
DROP COLUMN "analystCount",
ADD COLUMN     "analystCount" DOUBLE PRECISION,
DROP COLUMN "priceChange1Day",
ADD COLUMN     "priceChange1Day" DOUBLE PRECISION,
DROP COLUMN "priceChange1Week",
ADD COLUMN     "priceChange1Week" DOUBLE PRECISION,
DROP COLUMN "priceChange1Month",
ADD COLUMN     "priceChange1Month" DOUBLE PRECISION,
DROP COLUMN "priceChange6Month",
ADD COLUMN     "priceChange6Month" DOUBLE PRECISION,
DROP COLUMN "priceChange1Year",
ADD COLUMN     "priceChange1Year" DOUBLE PRECISION,
DROP COLUMN "priceChangeThisYear",
ADD COLUMN     "priceChangeThisYear" DOUBLE PRECISION,
DROP COLUMN "priceChange3Year",
ADD COLUMN     "priceChange3Year" DOUBLE PRECISION,
DROP COLUMN "priceChange5Year",
ADD COLUMN     "priceChange5Year" DOUBLE PRECISION,
DROP COLUMN "priceChange10Year",
ADD COLUMN     "priceChange10Year" DOUBLE PRECISION,
DROP COLUMN "priceChange52WeekHigh",
ADD COLUMN     "priceChange52WeekHigh" DOUBLE PRECISION,
DROP COLUMN "priceChange52WeekLow",
ADD COLUMN     "priceChange52WeekLow" DOUBLE PRECISION,
DROP COLUMN "RevOverEmployees",
ADD COLUMN     "RevOverEmployees" DOUBLE PRECISION,
DROP COLUMN "piotroskiFScore",
ADD COLUMN     "piotroskiFScore" DOUBLE PRECISION,
DROP COLUMN "revGrowthNextYear",
ADD COLUMN     "revGrowthNextYear" DOUBLE PRECISION,
DROP COLUMN "revGrowthThisYear",
ADD COLUMN     "revGrowthThisYear" DOUBLE PRECISION,
DROP COLUMN "InvTurnover",
ADD COLUMN     "InvTurnover" DOUBLE PRECISION,
DROP COLUMN "PayoutFreq",
ADD COLUMN     "PayoutFreq" DOUBLE PRECISION,
DROP COLUMN "AltmanZScore",
ADD COLUMN     "AltmanZScore" DOUBLE PRECISION,
DROP COLUMN "revGrowthThisQuarter",
ADD COLUMN     "revGrowthThisQuarter" DOUBLE PRECISION,
DROP COLUMN "revGrowthNextQuarter",
ADD COLUMN     "revGrowthNextQuarter" DOUBLE PRECISION,
DROP COLUMN "shareholderYield",
ADD COLUMN     "shareholderYield" DOUBLE PRECISION,
DROP COLUMN "relativeVolume",
ADD COLUMN     "relativeVolume" DOUBLE PRECISION,
DROP COLUMN "averageVolume",
ADD COLUMN     "averageVolume" DOUBLE PRECISION,
DROP COLUMN "epsGrowthNextQuarter",
ADD COLUMN     "epsGrowthNextQuarter" DOUBLE PRECISION,
DROP COLUMN "epsGrowthThisQuarter",
ADD COLUMN     "epsGrowthThisQuarter" DOUBLE PRECISION,
DROP COLUMN "epsGrowthNextYear",
ADD COLUMN     "epsGrowthNextYear" DOUBLE PRECISION,
DROP COLUMN "epsGrowthThisYear",
ADD COLUMN     "epsGrowthThisYear" DOUBLE PRECISION,
DROP COLUMN "cashOverMarketCap",
ADD COLUMN     "cashOverMarketCap" DOUBLE PRECISION,
DROP COLUMN "financialReportDate",
ADD COLUMN     "financialReportDate" DOUBLE PRECISION,
DROP COLUMN "volume",
ADD COLUMN     "volume" DOUBLE PRECISION,
DROP COLUMN "dividend",
ADD COLUMN     "dividend" DOUBLE PRECISION,
DROP COLUMN "netCashOverDebtGrowth",
ADD COLUMN     "netCashOverDebtGrowth" DOUBLE PRECISION,
DROP COLUMN "lastClosePrice",
ADD COLUMN     "lastClosePrice" DOUBLE PRECISION,
DROP COLUMN "evOverEbitda",
ADD COLUMN     "evOverEbitda" DOUBLE PRECISION,
DROP COLUMN "evOverEarnings",
ADD COLUMN     "evOverEarnings" DOUBLE PRECISION,
DROP COLUMN "forwardEvOverSales",
ADD COLUMN     "forwardEvOverSales" DOUBLE PRECISION,
DROP COLUMN "pegRatio",
ADD COLUMN     "pegRatio" DOUBLE PRECISION,
DROP COLUMN "taxOverRevenue",
ADD COLUMN     "taxOverRevenue" DOUBLE PRECISION,
DROP COLUMN "quickRatio",
ADD COLUMN     "quickRatio" DOUBLE PRECISION,
DROP COLUMN "profOverEmployee",
ADD COLUMN     "profOverEmployee" DOUBLE PRECISION,
DROP COLUMN "ExDividendDate",
ADD COLUMN     "ExDividendDate" DOUBLE PRECISION,
DROP COLUMN "sharesInstitutions",
ADD COLUMN     "sharesInstitutions" DOUBLE PRECISION,
DROP COLUMN "sharesInsiders",
ADD COLUMN     "sharesInsiders" DOUBLE PRECISION,
DROP COLUMN "operatingMargin",
ADD COLUMN     "operatingMargin" DOUBLE PRECISION,
DROP COLUMN "grossProfit",
ADD COLUMN     "grossProfit" DOUBLE PRECISION,
DROP COLUMN "costOfRevenue",
ADD COLUMN     "costOfRevenue" DOUBLE PRECISION,
DROP COLUMN "sellingGeneralAdministrative",
ADD COLUMN     "sellingGeneralAdministrative" DOUBLE PRECISION,
DROP COLUMN "researchDevelopment",
ADD COLUMN     "researchDevelopment" DOUBLE PRECISION,
DROP COLUMN "totalOperatingExpenses",
ADD COLUMN     "totalOperatingExpenses" DOUBLE PRECISION,
DROP COLUMN "interestExpense",
ADD COLUMN     "interestExpense" DOUBLE PRECISION,
DROP COLUMN "incomeBeforeTax",
ADD COLUMN     "incomeBeforeTax" DOUBLE PRECISION,
DROP COLUMN "incomeTax",
ADD COLUMN     "incomeTax" DOUBLE PRECISION,
DROP COLUMN "netIncome",
ADD COLUMN     "netIncome" DOUBLE PRECISION,
DROP COLUMN "epsActual",
ADD COLUMN     "epsActual" DOUBLE PRECISION,
DROP COLUMN "dilutedEspActual",
ADD COLUMN     "dilutedEspActual" DOUBLE PRECISION,
DROP COLUMN "dividendShare",
ADD COLUMN     "dividendShare" DOUBLE PRECISION,
DROP COLUMN "profitMargin",
ADD COLUMN     "profitMargin" DOUBLE PRECISION,
DROP COLUMN "ebitda",
ADD COLUMN     "ebitda" DOUBLE PRECISION,
DROP COLUMN "ebitdaMargin",
ADD COLUMN     "ebitdaMargin" DOUBLE PRECISION,
DROP COLUMN "ebit",
ADD COLUMN     "ebit" DOUBLE PRECISION,
DROP COLUMN "ebitMargin",
ADD COLUMN     "ebitMargin" DOUBLE PRECISION,
DROP COLUMN "depreciationAndAmortization",
ADD COLUMN     "depreciationAndAmortization" DOUBLE PRECISION,
DROP COLUMN "freeCashFlowMargin",
ADD COLUMN     "freeCashFlowMargin" DOUBLE PRECISION,
DROP COLUMN "grossMargin",
ADD COLUMN     "grossMargin" DOUBLE PRECISION,
DROP COLUMN "cashAndEquivalents",
ADD COLUMN     "cashAndEquivalents" DOUBLE PRECISION,
DROP COLUMN "shortTermInvestments",
ADD COLUMN     "shortTermInvestments" DOUBLE PRECISION,
DROP COLUMN "cashAndCashEquivalents",
ADD COLUMN     "cashAndCashEquivalents" DOUBLE PRECISION,
DROP COLUMN "cashAndShortTermInvestments",
ADD COLUMN     "cashAndShortTermInvestments" DOUBLE PRECISION,
DROP COLUMN "receivables",
ADD COLUMN     "receivables" DOUBLE PRECISION,
DROP COLUMN "inventory",
ADD COLUMN     "inventory" DOUBLE PRECISION,
DROP COLUMN "otherCurrentAssets",
ADD COLUMN     "otherCurrentAssets" DOUBLE PRECISION,
DROP COLUMN "totalCurrentAssets",
ADD COLUMN     "totalCurrentAssets" DOUBLE PRECISION,
DROP COLUMN "propertyPlantAndEquipment",
ADD COLUMN     "propertyPlantAndEquipment" DOUBLE PRECISION,
DROP COLUMN "longTermInvestments",
ADD COLUMN     "longTermInvestments" DOUBLE PRECISION,
DROP COLUMN "goodWillAndIntangibleAssets",
ADD COLUMN     "goodWillAndIntangibleAssets" DOUBLE PRECISION,
DROP COLUMN "otherLongTermAssets",
ADD COLUMN     "otherLongTermAssets" DOUBLE PRECISION,
DROP COLUMN "totalLongTernAssets",
ADD COLUMN     "totalLongTernAssets" DOUBLE PRECISION,
DROP COLUMN "totalAssets",
ADD COLUMN     "totalAssets" DOUBLE PRECISION,
DROP COLUMN "accountsPayable",
ADD COLUMN     "accountsPayable" DOUBLE PRECISION,
DROP COLUMN "deferredRevenue",
ADD COLUMN     "deferredRevenue" DOUBLE PRECISION,
DROP COLUMN "currentDebt",
ADD COLUMN     "currentDebt" DOUBLE PRECISION,
DROP COLUMN "otherCurrentLiabilities",
ADD COLUMN     "otherCurrentLiabilities" DOUBLE PRECISION,
DROP COLUMN "totalCurrentLiabilities",
ADD COLUMN     "totalCurrentLiabilities" DOUBLE PRECISION,
DROP COLUMN "longTernDebt",
ADD COLUMN     "longTernDebt" DOUBLE PRECISION,
DROP COLUMN "totalLongTermLiabilities",
ADD COLUMN     "totalLongTermLiabilities" DOUBLE PRECISION,
DROP COLUMN "totalLiabilities",
ADD COLUMN     "totalLiabilities" DOUBLE PRECISION,
DROP COLUMN "totalDebt",
ADD COLUMN     "totalDebt" DOUBLE PRECISION,
DROP COLUMN "commonStock",
ADD COLUMN     "commonStock" DOUBLE PRECISION,
DROP COLUMN "retainedEarnings",
ADD COLUMN     "retainedEarnings" DOUBLE PRECISION,
DROP COLUMN "comprehensiveIncome",
ADD COLUMN     "comprehensiveIncome" DOUBLE PRECISION,
DROP COLUMN "shareHoldersEquity",
ADD COLUMN     "shareHoldersEquity" DOUBLE PRECISION,
DROP COLUMN "totalLiabilitiesAndEquity",
ADD COLUMN     "totalLiabilitiesAndEquity" DOUBLE PRECISION,
DROP COLUMN "netCashOverDebt",
ADD COLUMN     "netCashOverDebt" DOUBLE PRECISION,
DROP COLUMN "netCashperShare",
ADD COLUMN     "netCashperShare" DOUBLE PRECISION,
DROP COLUMN "workingCapital",
ADD COLUMN     "workingCapital" DOUBLE PRECISION,
DROP COLUMN "bookValuePerShare",
ADD COLUMN     "bookValuePerShare" DOUBLE PRECISION,
DROP COLUMN "shareBasedCompensation",
ADD COLUMN     "shareBasedCompensation" DOUBLE PRECISION,
DROP COLUMN "otherOperatingActivities",
ADD COLUMN     "otherOperatingActivities" DOUBLE PRECISION,
DROP COLUMN "operatingCashFlow",
ADD COLUMN     "operatingCashFlow" DOUBLE PRECISION,
DROP COLUMN "capitalExpenditures",
ADD COLUMN     "capitalExpenditures" DOUBLE PRECISION,
DROP COLUMN "otherInvestingActivities",
ADD COLUMN     "otherInvestingActivities" DOUBLE PRECISION,
DROP COLUMN "investingCashFlow",
ADD COLUMN     "investingCashFlow" DOUBLE PRECISION,
DROP COLUMN "dividendPaid",
ADD COLUMN     "dividendPaid" DOUBLE PRECISION,
DROP COLUMN "shareIssuanceOverRepurchase",
ADD COLUMN     "shareIssuanceOverRepurchase" DOUBLE PRECISION,
DROP COLUMN "otherFinanceActivities",
ADD COLUMN     "otherFinanceActivities" DOUBLE PRECISION,
DROP COLUMN "financeCashFlow",
ADD COLUMN     "financeCashFlow" DOUBLE PRECISION,
DROP COLUMN "netCashFlow",
ADD COLUMN     "netCashFlow" DOUBLE PRECISION,
DROP COLUMN "freeCashFlow",
ADD COLUMN     "freeCashFlow" DOUBLE PRECISION,
DROP COLUMN "freeCashFlowPerShare",
ADD COLUMN     "freeCashFlowPerShare" DOUBLE PRECISION,
DROP COLUMN "marketCapitalization",
ADD COLUMN     "marketCapitalization" DOUBLE PRECISION,
DROP COLUMN "enterpriseValue",
ADD COLUMN     "enterpriseValue" DOUBLE PRECISION,
DROP COLUMN "peRatio",
ADD COLUMN     "peRatio" DOUBLE PRECISION,
DROP COLUMN "psRatio",
ADD COLUMN     "psRatio" DOUBLE PRECISION,
DROP COLUMN "pOverFcfRatio",
ADD COLUMN     "pOverFcfRatio" DOUBLE PRECISION,
DROP COLUMN "pOverOcfRatio",
ADD COLUMN     "pOverOcfRatio" DOUBLE PRECISION,
DROP COLUMN "evOverSalesRatio",
ADD COLUMN     "evOverSalesRatio" DOUBLE PRECISION,
DROP COLUMN "evEbitdaRatio",
ADD COLUMN     "evEbitdaRatio" DOUBLE PRECISION,
DROP COLUMN "evEbitRatio",
ADD COLUMN     "evEbitRatio" DOUBLE PRECISION,
DROP COLUMN "evFcfRatio",
ADD COLUMN     "evFcfRatio" DOUBLE PRECISION,
DROP COLUMN "debtOverEquityRatio",
ADD COLUMN     "debtOverEquityRatio" DOUBLE PRECISION,
DROP COLUMN "debtOverEbitdaRatio",
ADD COLUMN     "debtOverEbitdaRatio" DOUBLE PRECISION,
DROP COLUMN "debtFcfRatio",
ADD COLUMN     "debtFcfRatio" DOUBLE PRECISION,
DROP COLUMN "currentRatio",
ADD COLUMN     "currentRatio" DOUBLE PRECISION,
DROP COLUMN "assetTurnover",
ADD COLUMN     "assetTurnover" DOUBLE PRECISION,
DROP COLUMN "returnOnEquity",
ADD COLUMN     "returnOnEquity" DOUBLE PRECISION,
DROP COLUMN "returnOnAssets",
ADD COLUMN     "returnOnAssets" DOUBLE PRECISION,
DROP COLUMN "returnOnCapital",
ADD COLUMN     "returnOnCapital" DOUBLE PRECISION,
DROP COLUMN "fcfYield",
ADD COLUMN     "fcfYield" DOUBLE PRECISION,
DROP COLUMN "payoutRatio",
ADD COLUMN     "payoutRatio" DOUBLE PRECISION,
DROP COLUMN "revenueGrowthYOY",
ADD COLUMN     "revenueGrowthYOY" DOUBLE PRECISION,
DROP COLUMN "dividendGrowth",
ADD COLUMN     "dividendGrowth" DOUBLE PRECISION,
DROP COLUMN "cashGrowth",
ADD COLUMN     "cashGrowth" DOUBLE PRECISION,
DROP COLUMN "debtGorwth",
ADD COLUMN     "debtGorwth" DOUBLE PRECISION,
DROP COLUMN "marketCapGrowth",
ADD COLUMN     "marketCapGrowth" DOUBLE PRECISION,
DROP COLUMN "epsGrowth",
ADD COLUMN     "epsGrowth" DOUBLE PRECISION,
DROP COLUMN "operatingIncome",
ADD COLUMN     "operatingIncome" DOUBLE PRECISION,
DROP COLUMN "opIncomeGrowthQuat",
ADD COLUMN     "opIncomeGrowthQuat" DOUBLE PRECISION,
DROP COLUMN "opIncomeGrowthYearly",
ADD COLUMN     "opIncomeGrowthYearly" DOUBLE PRECISION,
DROP COLUMN "revenueTTM",
ADD COLUMN     "revenueTTM" DOUBLE PRECISION,
DROP COLUMN "revenueGrowthYearly",
ADD COLUMN     "revenueGrowthYearly" DOUBLE PRECISION,
DROP COLUMN "revenueGrowthQuat",
ADD COLUMN     "revenueGrowthQuat" DOUBLE PRECISION,
DROP COLUMN "sharesChangeYearly",
ADD COLUMN     "sharesChangeYearly" DOUBLE PRECISION,
DROP COLUMN "sharesChangeQuarterly",
ADD COLUMN     "sharesChangeQuarterly" DOUBLE PRECISION,
DROP COLUMN "preMarketDate",
ADD COLUMN     "preMarketDate" DOUBLE PRECISION,
DROP COLUMN "sharesOutTTM",
ADD COLUMN     "sharesOutTTM" DOUBLE PRECISION,
DROP COLUMN "incomeTaxExpense",
ADD COLUMN     "incomeTaxExpense" DOUBLE PRECISION,
DROP COLUMN "forwardPs",
ADD COLUMN     "forwardPs" DOUBLE PRECISION,
DROP COLUMN "shortPercentFloat",
ADD COLUMN     "shortPercentFloat" DOUBLE PRECISION,
DROP COLUMN "buybackYieldQuat",
ADD COLUMN     "buybackYieldQuat" DOUBLE PRECISION,
DROP COLUMN "buybackYieldYearly",
ADD COLUMN     "buybackYieldYearly" DOUBLE PRECISION,
DROP COLUMN "debtOverFcfQ",
ADD COLUMN     "debtOverFcfQ" DOUBLE PRECISION,
DROP COLUMN "debtOverFcfY",
ADD COLUMN     "debtOverFcfY" DOUBLE PRECISION,
DROP COLUMN "dividendYieldQ",
ADD COLUMN     "dividendYieldQ" DOUBLE PRECISION,
DROP COLUMN "dividendYieldY",
ADD COLUMN     "dividendYieldY" DOUBLE PRECISION,
DROP COLUMN "earningYieldQ",
ADD COLUMN     "earningYieldQ" DOUBLE PRECISION,
DROP COLUMN "earningYieldY",
ADD COLUMN     "earningYieldY" DOUBLE PRECISION,
DROP COLUMN "evOverEbitQuat",
ADD COLUMN     "evOverEbitQuat" DOUBLE PRECISION,
DROP COLUMN "evOverEbitYearly",
ADD COLUMN     "evOverEbitYearly" DOUBLE PRECISION,
DROP COLUMN "evOverFcfQuat",
ADD COLUMN     "evOverFcfQuat" DOUBLE PRECISION,
DROP COLUMN "evOverFcfYearly",
ADD COLUMN     "evOverFcfYearly" DOUBLE PRECISION,
DROP COLUMN "evOverSalesQuat",
ADD COLUMN     "evOverSalesQuat" DOUBLE PRECISION,
DROP COLUMN "evOverSalesYearly",
ADD COLUMN     "evOverSalesYearly" DOUBLE PRECISION,
DROP COLUMN "fcfGrowthQ",
ADD COLUMN     "fcfGrowthQ" DOUBLE PRECISION,
DROP COLUMN "fcfGrowthY",
ADD COLUMN     "fcfGrowthY" DOUBLE PRECISION,
DROP COLUMN "grossProfitGrowthQ",
ADD COLUMN     "grossProfitGrowthQ" DOUBLE PRECISION,
DROP COLUMN "grossProfitGrowthY",
ADD COLUMN     "grossProfitGrowthY" DOUBLE PRECISION,
DROP COLUMN "netIncomeGrowthQ",
ADD COLUMN     "netIncomeGrowthQ" DOUBLE PRECISION,
DROP COLUMN "netIncomeGrowthY",
ADD COLUMN     "netIncomeGrowthY" DOUBLE PRECISION,
DROP COLUMN "priceOverFcfRatioQ",
ADD COLUMN     "priceOverFcfRatioQ" DOUBLE PRECISION,
DROP COLUMN "priceOverFcfRatioY",
ADD COLUMN     "priceOverFcfRatioY" DOUBLE PRECISION,
DROP COLUMN "researchDevelopmentOverRevenueQ",
ADD COLUMN     "researchDevelopmentOverRevenueQ" DOUBLE PRECISION,
DROP COLUMN "researchDevelopmentOverRevenueY",
ADD COLUMN     "researchDevelopmentOverRevenueY" DOUBLE PRECISION,
DROP COLUMN "totalCashQ",
ADD COLUMN     "totalCashQ" DOUBLE PRECISION,
DROP COLUMN "totalCashY",
ADD COLUMN     "totalCashY" DOUBLE PRECISION;
