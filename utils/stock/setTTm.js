const TTM = {
  sharesOutTTM: !isNaN(SharesOutstanding) ? SharesOutstanding.toString() : null,
  earningYieldQ: !isNaN(earningsQuat[0]?.earningYield)
    ? earningsQuat[0]?.earningYield
    : null,
  earningYieldY: !isNaN(earningsYearly[0]?.earningYield)
    ? earningsYearly[0]?.earningYield
    : null,
  evOverSalesQuat: !isNaN(ratiosAndMetricsQuat[0]?.evOverSales)
    ? ratiosAndMetricsQuat[0]?.evOverSales
    : null,
  evOverEbitQuat: !isNaN(ratiosAndMetricsQuat[0]?.evOverEbit)
    ? ratiosAndMetricsQuat[0]?.evOverEbit
    : null,
  evOverFcfQuat: ratiosAndMetricsQuat[0]?.evOverFcf,
  buybackYieldQuat: !isNaN(ratiosAndMetricsQuat[0]?.buybackYield)
    ? ratiosAndMetricsQuat[0]?.buybackYield
    : null,
  evOverSalesYearly: !isNaN(ratiosAndMetricsQuat[0]?.evOverSales)
    ? ratiosAndMetricsQuat[0]?.evOverSales
    : null,
  evOverEbitYearly: !isNaN(ratiosAndMetricsQuat[0]?.evOverEbit)
    ? ratiosAndMetricsQuat[0]?.evOverEbit
    : null,
  evOverFcfYearly: !isNaN(ratiosAndMetricsQuat[0]?.buybackYield)
    ? ratiosAndMetricsQuat[0]?.buybackYield
    : null,
  buybackYieldYearly: !isNaN(ratiosAndMetricsQuat[0]?.buybackYield)
    ? ratiosAndMetricsQuat[0]?.buybackYield
    : null,
  totalCashQ: !isNaN(balanceSheet_quat[0]?.totalCash)
    ? balanceSheet_quat[0]?.totalCash
    : null,
  priceOverFcfRatioQ: !isNaN(balanceSheet_quat[0]?.priceOverFcfRatio)
    ? balanceSheet_quat[0]?.priceOverFcfRatio
    : null,
  debtOverFcfQ: !isNaN(balanceSheet_quat[0]?.debtOverFcf)
    ? balanceSheet_quat[0]?.debtOverFcf
    : null,
  totalCashY: !isNaN(balanceSheet_yearly[0]?.totalCash)
    ? balanceSheet_yearly[0]?.totalCash
    : null,
  fcfGrowthQ: !isNaN(cashFlow_yearly[0]?.fcfGrowth)
    ? cashFlow_yearly[0]?.fcfGrowth
    : null,
  fcfGrowthY: !isNaN(cashFlow_quat[0]?.fcfGrowth)
    ? cashFlow_quat[0]?.fcfGrowth
    : null,
  researchDevelopmentOverRevenueQ: !isNaN(
    incomeStatement_quat[0]?.researchDevelopmentOverRevenue
  )
    ? incomeStatement_quat[0]?.researchDevelopmentOverRevenue
    : null,
  grossProfitGrowthQ: !isNaN(incomeStatement_quat[0]?.grossProfitGrowth)
    ? incomeStatement_quat[0]?.grossProfitGrowth
    : null,
  grossProfitGrowthY: !isNaN(incomeStatement_yearly[0]?.grossProfitGrowth)
    ? incomeStatement_yearly[0]?.grossProfitGrowth
    : null,
  researchDevelopmentOverRevenueY: !isNaN(
    incomeStatement_yearly[0]?.researchDevelopmentOverRevenue
  )
    ? incomeStatement_yearly[0]?.researchDevelopmentOverRevenue
    : null,
  dividendYieldQ: !isNaN(
    dividendsQuat[dividendsQuat?.length - 1]?.dividendYield
  )
    ? dividendsQuat[dividendsQuat?.length - 1]?.dividendYield
    : null,
  dividendYieldY: !isNaN(
    dividendsYearly[dividendsYearly?.length - 1]?.dividendYield
  )
    ? dividendsYearly[dividendsYearly?.length - 1]?.dividendYield
    : null,
  priceOverFcfRatioY: !isNaN(balanceSheet_yearly[0]?.priceOverFcfRatio)
    ? balanceSheet_yearly[0]?.priceOverFcfRatio
    : null,
  debtOverFcfY: !isNaN(balanceSheet_yearly[0]?.debtOverFcf)
    ? balanceSheet_yearly[0]?.debtOverFcf
    : null,
  fcfGrowthThreeYears: !isNaN(
    calculateGrowth(
      cashFlow_yearly_org[0]?.freeCashFlow,
      cashFlow_yearly_org[3]?.freeCashFlow
    )
  )
    ? calculateGrowth(
        cashFlow_yearly_org[0]?.freeCashFlow,
        cashFlow_yearly_org[3]?.freeCashFlow
      )?.toString()
    : null,
  fcfGrowthFiveYears: !isNaN(
    calculateGrowth(
      cashFlow_yearly_org[0]?.freeCashFlow,
      cashFlow_yearly_org[5]?.freeCashFlow
    )
  )
    ? calculateGrowth(
        cashFlow_yearly_org[0]?.freeCashFlow,
        cashFlow_yearly_org[5]?.freeCashFlow
      )?.toString()
    : null,
  forwardPe: !isNaN(ForwardPE) ? ForwardPE?.toString() : null,
  returnOnEquity5Year: !isNaN(ReoEquity5year)
    ? ReoEquity5year?.toString()
    : null,
  returnOnAssets5Year: !isNaN(ReoAssets5year)
    ? ReoAssets5year?.toString()
    : ReoAssets5year?.toString(),
  returnOnCapital5Year: !isNaN(ROC5Year) ? ROC5Year?.toString() : null,
  lastSplitDate: !isNaN(LastSplitDate) ? LastSplitDate : null,
  lastStockSplit: !isNaN(splitFactor) ? splitFactor?.toString() : null,
  lastStockSplitRatio: LastStockSplitRatio
    ? LastStockSplitRatio?.toString()
    : null,
  float: !isNaN(SharesFloat) ? SharesFloat.toString() : null,
  shortRatio: !isNaN(ShortRatio) ? ShortRatio?.toString() : null,
  shortPercentShare: !isNaN(ShortPercentShare)
    ? ShortPercentShare?.toString()
    : null,
  shortPercentFloat: !isNaN(ShortPercentFloat)
    ? ShortPercentFloat?.toString()
    : null,
  beta1Year: !isNaN(Beta1Year) ? Beta1Year?.toString() : null,
  epsGrowth3Year: !isNaN(YearlyGrowthTTMs?.EpsGrowth3)
    ? YearlyGrowthTTMs?.EpsGrowth3?.toString()
    : nul,
  epsGrowth5Year: !isNaN(YearlyGrowthTTMs?.EpsGrowth5)
    ? YearlyGrowthTTMs?.EpsGrowth5?.toString()
    : null,
  netIncomeGrowth3Year: !isNaN(YearlyGrowthTTMs?.NetIncomeGrowth3)
    ? YearlyGrowthTTMs?.NetIncomeGrowth3?.toString()
    : null,
  netIncomeGrowth5Year: !isNaN(YearlyGrowthTTMs?.NetIncomeGrowth5)
    ? YearlyGrowthTTMs?.NetIncomeGrowth5?.toString()
    : null,
  operatingIncomeGrowth3Year: !isNaN(YearlyGrowthTTMs?.OpIncomeGrowth3)
    ? YearlyGrowthTTMs?.OpIncomeGrowth3?.toString()
    : null,
  operatingIncomeGrowth5Year: !isNaN(YearlyGrowthTTMs?.OpIncomeGrowth5)
    ? YearlyGrowthTTMs?.OpIncomeGrowth5?.toString()
    : null,
  grossProfit3Year: !isNaN(YearlyGrowthTTMs?.GProfitGrowth3)
    ? YearlyGrowthTTMs?.GProfitGrowth3?.toString()
    : null,
  grossProfit5Year: !isNaN(YearlyGrowthTTMs?.GProfitGrowth5)
    ? YearlyGrowthTTMs?.GProfitGrowth5?.toString()
    : null,
  revenueGrowth3Year: !isNaN(YearlyGrowthTTMs?.RevGrowth3Year)
    ? YearlyGrowthTTMs?.RevGrowth3Year?.toString()
    : null,
  revenueGrowth5Year: !isNaN(YearlyGrowthTTMs?.RevGrowth5Year)
    ? YearlyGrowthTTMs?.RevGrowth5Year?.toString()
    : null,
  ipoDate: IPODate,
  founded: Founded?.toString(),
  employees: Employees?.toString(),
  forwardPs:
    trendInEarnings[0]?.revenueEstimateAvg &&
    !isNaN(PriceChange[PriceChange?.length - 1]?.close) &&
    !isNaN(trendInEarnings[0]?.revenueEstimateAvg) &&
    !zeroPattern.test(trendInEarnings[0]?.revenueEstimateAvg)
      ? (
          PriceChange[PriceChange?.length - 1]?.close?.toString() /
          trendInEarnings[0]?.revenueEstimateAvg
        )?.toString()
      : null,
  premarketPercentageChg: null,
  // premarketPercentageChg: PriceChanges?.PremktPercentChg
  //   ? PriceChanges.PremktPercentChg?.toString()
  //   : null,
  premarketPrice: null,
  priceTargetPercentage: PriceTargetPer?.toString(),
  previousClose: previousDayClose?.toString(),
  anaylystRating: AnalystRating ? AnalystRating?.toString() : null,
  analystCount: AnalystCount?.toString(),
  priceChange1Day: null,
  priceChange1Week: null,
  priceChange1Month: null,
  priceChange6Month: null,
  priceChange1Year: null,
  priceChangeThisYear: null,
  priceChange3Year: null,
  priceChange5Year: null,
  priceChange10Year: null,
  // priceChange1Day: PriceChanges.PriceChange1D?.toString(),
  // priceChange1Week: PriceChanges?.PriceChange1W.toString(),
  // priceChange1Month: PriceChanges?.PriceChange1M?.toString(),
  // priceChange6Month: PriceChanges?.PriceChange6M?.toString(),
  // priceChange1Year: PriceChanges?.PriceChange1Y?.toString(),
  // priceChangeThisYear: PriceChanges?.PriceChangeThisYear?.toString(),
  // priceChange3Year: PriceChanges?.PriceChange3Y?.toString(),
  // priceChange5Year: PriceChanges?.PriceChange5Y?.toString(),
  // priceChange10Year: PriceChanges?.PriceChange10Y?.toString(),
  priceChange52WeekHigh: !isNaN(WeekHigh52) ? WeekHigh52?.toString() : null,
  priceChange52WeekLow: !isNaN(WeekLow52) ? WeekLow52?.toString() : null,
  sharesChange: {
    sharesChangeYearly: !isNaN(
      calculateGrowth(
        outstandingSharesAnnual[0]?.shares,
        outstandingSharesAnnual[1]?.shares
      )
    )
      ? calculateGrowth(
          outstandingSharesAnnual[0]?.shares,
          outstandingSharesAnnual[1]?.shares
        )?.toString()
      : null,
    sharesChangeQuarterly: calculateGrowth(
      outstandingSharesQuat[0]?.shares,
      outstandingSharesQuat[1]?.shares
    )?.toString()
  },
  RevOverEmployees:
    RevenueTTM &&
    !isNaN(RevenueTTM) &&
    FullTimeEmployees &&
    !isNaN(FullTimeEmployees)
      ? (RevenueTTM / FullTimeEmployees)?.toString()
      : null,
  piotroskiFScore:
    calculatePiotroskiFScore({
      netIncome: Number(cashFlow_yearly_org[0]?.netIncome),
      ReturnOnAssetsTTM,
      totalCashFromOperatingActivities: Number(
        cashFlow_yearly_org[0]?.totalCashFromOperatingActivities
      ),
      longTermDebt: {
        current: Number(balanceSheet_yearly_org[0]?.longTermDebt),
        previous: Number(balanceSheet_yearly_org[1]?.longTermDebt)
      },
      totalCurrentAssets: {
        current: Number(balanceSheet_yearly_org[0]?.totalCurrentAssets),
        previous: Number(balanceSheet_yearly_org[1]?.totalCurrentAssets)
      },
      totalCurrentLiabilities: {
        current: Number(balanceSheet_yearly_org[0]?.totalCurrentLiabilities),
        previous: Number(balanceSheet_yearly_org[1]?.totalCurrentLiabilities)
      },
      shares: {
        lastYear: calculateLastYearShares({ outstandingSharesAnnual }),
        prevYear: calculatePreviousYearShares({ outstandingSharesAnnual })
      },
      grossMargin:
        !isNaN(incomeStatement_yearly[0]?.grossMargin) &&
        !isNaN(incomeStatement_yearly[0]?.grossMargin)
          ? {
              lastYear: incomeStatement_yearly[0]?.grossMargin / 100,
              prevYear: incomeStatement_yearly[1]?.grossMargin / 100
            }
          : null,
      assetTurnoverRatio: {
        lastYear: balanceSheet_yearly[0]?.assetTurnover,
        prevYear: balanceSheet_yearly[1]?.assetTurnover
      }
    })?.toString() || null,
  revGrowthNextYear: !isNaN(revGrowthNextYear({ trendInEarnings }))
    ? revGrowthNextYear({ trendInEarnings })?.toString()
    : null,
  revGrowthThisYear: !isNaN(revGrowthThisYear({ trendInEarnings }))
    ? revGrowthThisYear({ trendInEarnings })?.toString()
    : null,
  InvTurnover:
    (
      sumUpRecentQuarter({
        data: mostRecentDateObject,
        propertyName: "costOfRevenue"
      }) /
      (sumUpRecentQuarter({
        data: mostRecentDateBalanceSheetQuarterly,
        propertyName: "inventory"
      }) /
        4)
    )?.toString() !== "NaN"
      ? (
          sumUpRecentQuarter({
            data: mostRecentDateObject,
            propertyName: "costOfRevenue"
          }) /
          (sumUpRecentQuarter({
            data: mostRecentDateBalanceSheetQuarterly,
            propertyName: "inventory"
          }) /
            4)
        )?.toString()
      : null,
  PayoutFreq: getMostRecentYearObject(dividendInfo)?.Count?.toString(),
  AltmanZScore: calculateAltmanZScore(
    data,
    Number(PriceChange[PriceChange?.length - 1]?.close)
  )?.toString(),
  revGrowthThisQuarter: revenueEstimateGrowth({
    trendInEarnings,
    MostRecentQuarter
  })?.toString(),

  revGrowthNextQuarter: revenueEstimateGrowthNextQuat({
    trendInEarnings,
    MostRecentQuarter
  })?.toString(),
  shareholderYield:
    !isNaN(dividendsQuat[dividendsQuat.length - 1]?.dividendYield) &&
    !isNaN(ratiosAndMetricsQuat[0]?.buybackYield)
      ? calculateShareholderYield({
          dividendYield: dividendsQuat[dividendsQuat.length - 1]?.dividendYield,
          buybackYield: ratiosAndMetricsQuat[0]?.buybackYield
        })?.toString()
      : null,
  relativeVolume: calculateGrowth(
    avgvol[avgvol.length - 1]?.avgvol,
    PriceChange[PriceChange?.length - 1]?.volume
  )?.toString(),
  averageVolume: avgvol[avgvol?.length - 1]?.avgvol?.toString(),
  epsGrowthNextQuarter: EPSEstimateNextQuarter?.toString(),
  epsGrowthThisQuarter: EPSEstimateCurrentQuarter?.toString(),
  epsGrowthNextYear: EPSEstimateNextYear?.toString(),
  epsGrowthThisYear: EPSEstimateCurrentYear?.toString(),
  cashOverMarketCap: calculateCashOverMarketCap({
    cashAndEquivalents: calculateTTM({
      array: balanceSheet_quat_org,
      variableName: "cashAndEquivalents"
    }),
    MarketCapitalization
  })?.toString(),
  financialReportDate: financialReportDate(),
  volume: PriceChange[PriceChange?.length - 1]?.volume?.toString(),
  dividend: ForwardAnnualDividendRate?.toString(),
  netCashOverDebtGrowth:
    !isNaN(balanceSheet_quat_org[0]?.cash) &&
    !isNaN(balanceSheet_quat_org[0]?.shortTermDebt) &&
    !isNaN(balanceSheet_yearly_org[0]?.cash) &&
    !isNaN(balanceSheet_yearly_org[0]?.shortTermDebt) &&
    !zeroPattern.test(balanceSheet_quat_org[0]?.cash) &&
    !zeroPattern.test(balanceSheet_quat_org[0]?.shortTermDebt) &&
    !zeroPattern.test(balanceSheet_yearly_org[0]?.cash) &&
    !zeroPattern.test(balanceSheet_yearly_org[0]?.shortTermDebt)
      ? calculateNetCashOverDebtGrowth({
          currentYear: {
            cash: balanceSheet_quat_org[0]?.cash,
            shortTermDebt: balanceSheet_quat_org[0]?.shortTermDebt
          },
          previousYear: {
            cash: balanceSheet_yearly_org[0]?.cash,
            shortTermDebt: balanceSheet_yearly_org[0]?.shortTermDebt
          }
        })?.toString()
      : null,
  lastClosePrice: PriceChange[PriceChange?.length - 1]?.close?.toString(),
  evOverEbitda:
    EnterpriseValue && EBITDA
      ? calculateEvOverEbitda({
          EnterpriseValue,
          ebitda: EBITDA
        })?.toString()
      : null,
  evOverEarnings:
    EnterpriseValue && cashFlow_yearly_org[0]?.netIncome
      ? calculateEvOverEarnings({
          EnterpriseValue,
          netIncome: cashFlow_yearly_org[0]?.netIncome
        })?.toString()
      : null,
  forwardEvOverSales: !isNaN(
    calculateForwardEvOverSales({
      EnterpriseValue,
      revenueEstimateAvg: Object.values(data?.Earnings?.Trend)[0]
        ?.revenueEstimateAvg
    })
  )
    ? calculateForwardEvOverSales({
        EnterpriseValue,
        revenueEstimateAvg: Object.values(data?.Earnings?.Trend)[0]
          ?.revenueEstimateAvg
      })?.toString()
    : null,
  pegRatio: PEGRatio?.toString(),
  incomeTaxExpense: incomeStatement_yearly_org[0]?.incomeTaxExpense,
  taxOverRevenue: calculateTaxOverRevenue({
    incomeTaxExpense: incomeStatement_yearly_org[0]?.incomeTaxExpense,
    incomeBeforeTax: incomeStatement_yearly_org[0]?.incomeBeforeTax
  })?.toString(),
  quickRatio: calculateQuickRatio({
    cash: balanceSheet_quat_org[0]?.cash,
    shortTermInvestments: balanceSheet_quat_org[0]?.shortTermInvestments,
    netReceivables: balanceSheet_quat_org[0]?.netReceivables,
    totalCurrentLiabilities: balanceSheet_quat_org[0]?.totalCurrentLiabilities
  })?.toString(),
  profOverEmployee: (Number(cashFlow_quat_org[0]?.netIncome) &&
  FullTimeEmployees
    ? Number(cashFlow_quat_org[0]?.netIncome) / FullTimeEmployees
    : null
  )?.toString(),
  ExDividendDate: ExDividendDate,
  sharesInstitutions: PercentInstitutions?.toString(),
  sharesInsiders: PercentInsiders?.toString(),
  operatingMargin: OperatingMarginTTM?.toString(),
  industry,
  sector: Sector,
  country,
  exchange: Exchange,
  revenue: {
    revenueTTM: RevenueTTM?.toString(),
    revenueGrowthYearly: incomeStatement_yearly[0]?.revenueGrowth?.toString(),
    revenueGrowthQuat: incomeStatement_quat[0]?.revenueGrowth?.toString()
  },
  grossProfit: GrossProfitTTM?.toString(),
  costOfRevenue: calculateTTM({
    array: incomeStatement_quat_org,
    variableName: "costOfRevenue"
  })?.toString(),
  sellingGeneralAdministrative: calculateTTM({
    array: incomeStatement_quat_org,
    variableName: "sellingGeneralAdministrative"
  })?.toString(),
  researchDevelopment: calculateTTM({
    array: incomeStatement_quat_org,
    variableName: "researchDevelopment"
  })?.toString(),
  totalOperatingExpenses: calculateTTM({
    array: incomeStatement_quat_org,
    variableName: "totalOperatingExpenses"
  })?.toString(),
  operatingIncome: {
    operatingIncome: calculateTTM({
      array: incomeStatement_quat_org,
      variableName: "operatingIncome"
    })?.toString(),
    opIncomeGrowthQuat: incomeStatement_quat[0]?.opIncomeGrowth?.toString(),
    opIncomeGrowthYearly: incomeStatement_yearly[0]?.opIncomeGrowth?.toString()
  },
  interestExpense: calculateTTM({
    array: incomeStatement_quat_org,
    variableName: "interestExpense"
  })?.toString(),
  incomeBeforeTax: calculateTTM({
    array: incomeStatement_quat_org,
    variableName: "incomeBeforeTax"
  })?.toString(),
  incomeTax: calculateTTM({
    array: incomeStatement_quat_org,
    variableName: "incomeTaxExpense"
  })?.toString(),
  netIncome: calculateTTM({
    array: incomeStatement_quat_org,
    variableName: "netIncome"
  })?.toString(),
  epsActual: epsActual()?.toString(),
  dilutedEspActual: DilutedEpsTTM?.toString(),
  dividendShare: DividendShare?.toString(),
  profitMargin: (ProfitMargin * 100)?.toString(),
  ebitda: EBITDA?.toString(),
  ebitdaMargin: !isNaN(calculateMargin(EBITDA, RevenueTTM))
    ? calculateMargin(EBITDA, RevenueTTM)?.toString()
    : null,
  ebit: incomeStatement_quat_org[0]?.ebit?.toString(),
  ebitMargin:
    calculateMargin(
      incomeStatement_quat_org[0]?.ebit,
      incomeStatement_quat_org[0]?.totalRevenue
    )?.toString() || null,
  depreciationAndAmortization: calculateTTM({
    array: incomeStatement_quat_org,
    variableName: "depreciationAndAmortization"
  })?.toString(),
  freeCashFlowMargin: cashFlow_quat_org[0]?.capitalExpenditures?.toString(),
  grossMargin: calculateGrossMargin(
    RevenueTTM,
    incomeStatement_quat_org[0]?.costOfRevenue
  )?.toString(),
  cashAndEquivalents: balanceSheet_quat_org[0]?.cashAndEquivalents?.toString(),
  shortTermInvestments:
    balanceSheet_quat_org[0]?.shortTermInvestments?.toString(),
  cashAndCashEquivalents:
    balanceSheet_quat_org[0]?.cashAndShortTermInvestments?.toString(),
  cashAndShortTermInvestments:
    balanceSheet_quat_org[0]?.cashAndShortTermInvestments?.toString(),
  receivables: balanceSheet_quat_org[0]?.netReceivables?.toString(),
  inventory: balanceSheet_quat_org[0]?.inventory?.toString(),
  otherCurrentAssets: balanceSheet_quat_org[0]?.otherCurrentAssets?.toString(),
  totalCurrentAssets: balanceSheet_quat_org[0]?.totalCurrentAssets?.toString(),
  propertyPlantAndEquipment:
    balanceSheet_quat_org[0]?.propertyPlantAndEquipmentNet?.toString(),
  longTermInvestments:
    balanceSheet_quat_org[0]?.longTermInvestments?.toString(),
  goodWillAndIntangibleAssets:
    !isNaN(balanceSheet_quat_org[0]?.goodWill) &&
    !isNaN(balanceSheet_quat_org[0]?.intangibleAssets) &&
    !zeroPattern.test(balanceSheet_quat_org[0]?.goodWill) &&
    !zeroPattern.test(balanceSheet_quat_org[0]?.intangibleAssets)
      ? (
          Number(balanceSheet_quat_org[0]?.goodWill) +
          Number(balanceSheet_quat_org[0]?.intangibleAssets)
        )?.toString()
      : null,
  otherLongTermAssets: balanceSheet_quat_org[0]?.otherAssets?.toString(),
  totalLongTernAssets:
    balanceSheet_quat_org[0]?.nonCurrentAssetsTotal?.toString(),
  totalAssets: balanceSheet_quat_org[0]?.totalAssets?.toString(),
  accountsPayable: balanceSheet_quat_org[0]?.accountsPayable?.toString(),
  deferredRevenue: balanceSheet_quat_org[0]?.currentDeferredRevenue?.toString(),
  currentDebt: balanceSheet_quat_org[0]?.shortTermDebt?.toString(),
  otherCurrentLiabilities:
    balanceSheet_quat_org[0]?.otherCurrentLiab?.toString(),
  totalCurrentLiabilities:
    balanceSheet_quat_org[0]?.totalCurrentLiabilities?.toString(),
  longTernDebt: balanceSheet_quat_org[0]?.longTermDebtTotal?.toString(),
  totalLongTermLiabilities:
    balanceSheet_quat_org[0]?.nonCurrentLiabilitiesTotal?.toString(),
  totalLiabilities: balanceSheet_quat_org[0]?.totalLiab?.toString(),
  totalDebt:
    !isNaN(Number(balanceSheet_quat_org[0]?.shortTermDebt)) &&
    !isNaN(Number(balanceSheet_quat_org[0]?.longTermDebt)) &&
    !zeroPattern.test(Number(balanceSheet_quat_org[0]?.shortTermDebt)) &&
    !zeroPattern.test(Number(balanceSheet_quat_org[0]?.longTermDebt))
      ? (
          Number(balanceSheet_quat_org[0]?.shortTermDebt) +
          Number(balanceSheet_quat_org[0]?.longTermDebt)
        )?.toString()
      : null,
  commonStock: balanceSheet_quat_org[0]?.commonStock?.toString(),
  retainedEarnings: balanceSheet_quat_org[0]?.retainedEarnings?.toString(),
  comprehensiveIncome:
    balanceSheet_quat_org[0]?.accumulatedOtherComprehensiveIncome?.toString(),
  shareHoldersEquity:
    balanceSheet_quat_org[0]?.totalStockholderEquity?.toString(),
  totalLiabilitiesAndEquity:
    balanceSheet_quat_org[0]?.liabilitiesAndStockholdersEquity?.toString(),
  netCashOverDebt:
    Number(balanceSheet_quat_org[0]?.cash) &&
    Number(balanceSheet_quat_org[0]?.shortTermDebt)
      ? (
          Number(balanceSheet_quat_org[0]?.cash) /
          Number(balanceSheet_quat_org[0]?.shortTermDebt)
        )?.toString()
      : null,
  netCashperShare:
    Number(balanceSheet_quat_org[0]?.cash) &&
    Number(balanceSheet_quat_org[0]?.shortTermDebt) &&
    SharesOutstanding
      ? (
          Number(balanceSheet_quat_org[0]?.cash) /
          Number(balanceSheet_quat_org[0]?.shortTermDebt) /
          SharesOutstanding
        )?.toString()
      : null,
  workingCapital: balanceSheet_quat_org[0]?.netWorkingCapital?.toString(),
  bookValuePerShare: BookValue?.toString(),
  netIncome: calculateTTM({
    array: cashFlow_quat_org,
    variableName: "netIncome"
  })?.toString(),
  depreciationAndAmortization: calculateTTM({
    array: incomeStatement_quat_org,
    variableName: "depreciationAndAmortization"
  })?.toString(),
  shareBasedCompensation: calculateTTM({
    array: cashFlow_quat_org,
    variableName: "stockBasedCompensation"
  })?.toString(),
  otherOperatingActivities: calculateTTM({
    array: cashFlow_quat_org,
    variableName: "otherCashflowsFromInvestingActivities"
  })?.toString(),
  operatingCashFlow: calculateTTM({
    array: cashFlow_quat_org,
    variableName: "totalCashFromOperatingActivities"
  })?.toString(),
  capitalExpenditures: calculateTTM({
    array: cashFlow_quat_org,
    variableName: "capitalExpenditures"
  })?.toString(),
  otherInvestingActivities: calculateTTM({
    array: cashFlow_quat_org,
    variableName: "changeToInventory"
  })?.toString(),
  investingCashFlow: calculateTTM({
    array: cashFlow_quat_org,
    variableName: "totalCashflowsFromInvestingActivities"
  })?.toString(),
  dividendPaid: calculateTTM({
    array: cashFlow_quat_org,
    variableName: "dividendsPaid"
  })?.toString(),
  shareIssuanceOverRepurchase: calculateTTM({
    array: cashFlow_quat_org,
    variableName: "salePurchaseOfStock"
  })?.toString(),
  otherFinanceActivities:
    cashFlow_quat_org[0]?.otherCashflowsFromFinancingActivities?.toString(),
  financeCashFlow: calculateTTM({
    array: cashFlow_quat_org,
    variableName: "totalCashFromFinancingActivities"
  })?.toString(),
  netCashFlow: calculateTTM({
    array: cashFlow_quat_org,
    variableName: "changeInCash"
  })?.toString(),
  freeCashFlow: calculateTTM({
    array: cashFlow_quat_org,
    variableName: "freeCashFlow"
  })?.toString(),
  freeCashFlowMargin: calculateMargin(
    cashFlow_quat_org[0]?.freeCashFlow,
    incomeStatement_quat_org[0]?.totalRevenue
  )?.toString(),
  freeCashFlowPerShare:
    !isNaN(Number(cashFlow_quat_org[0]?.freeCashFlow)) &&
    !isNaN(SharesOutstanding) &&
    !zeroPattern.test(SharesOutstanding) &&
    !zeroPattern.test(Number(cashFlow_quat_org[0]?.freeCashFlow))
      ? (
          Number(cashFlow_quat_org[0]?.freeCashFlow) / SharesOutstanding
        )?.toString()
      : null,
  marketCapitalization: MarketCapitalization?.toString(),
  enterpriseValue: EnterpriseValue?.toString(),
  peRatio: PERatio?.toString(),
  psRatio:
    RevenueTTM && !isNaN(RevenueTTM) && !zeroPattern.test(RevenueTTM)
      ? (MarketCapitalization / RevenueTTM)?.toString()
      : null,
  pOverFcfRatio:
    !isNoN(MarketCapitalization) &&
    !isNoN(Number(cashFlow_quat_org[0]?.freeCashFlow)) &&
    !zeroPattern.test(Number(cashFlow_quat_org[0]?.freeCashFlow)) &&
    !zeroPattern.test(MarketCapitalization)
      ? (
          MarketCapitalization / Number(cashFlow_quat_org[0]?.freeCashFlow)
        )?.toString()
      : null,
  pOverOcfRatio:
    !isNoN(MarketCapitalization) &&
    !isNoN(cashFlow_quat_org[0]?.totalCashFromOperatingActivities) &&
    !zeroPattern.test(cashFlow_quat_org[0]?.totalCashFromOperatingActivities) &&
    !zeroPattern.test(MarketCapitalization)
      ? (
          MarketCapitalization /
          Number(cashFlow_quat_org[0]?.totalCashFromOperatingActivities)
        )?.toString()
      : null,
  evOverSalesRatio:
    RevenueTTM && !isNaN(RevenueTTM) && !zeroPattern.test(RevenueTTM)
      ? (EnterpriseValue / RevenueTTM)?.toString()
      : null,
  evEbitdaRatio:
    !isNoN(EnterpriseValue) &&
    !isNoN(incomeStatement_quat_org[0]?.ebitda) &&
    !zeroPattern.test(incomeStatement_quat_org[0]?.ebitda) &&
    !zeroPattern.test(EnterpriseValue)
      ? (
          EnterpriseValue / Number(incomeStatement_quat_org[0]?.ebitda)
        )?.toString()
      : null,
  evEbitRatio:
    Number(incomeStatement_quat_org[0]?.ebit) &&
    !isNaN(Number(incomeStatement_quat_org[0]?.ebit)) &&
    zeroPattern.test(Number(incomeStatement_quat_org[0]?.ebit))
      ? (
          EnterpriseValue / Number(incomeStatement_quat_org[0]?.ebit)
        )?.toString()
      : null,
  evFcfRatio:
    !isNoN(EnterpriseValue) &&
    !isNoN(Number(cashFlow_quat_org[0]?.freeCashFlow)) &&
    !zeroPattern.test(Number(cashFlow_quat_org[0]?.freeCashFlow)) &&
    !zeroPattern.test(EnterpriseValue)
      ? (
          EnterpriseValue / Number(cashFlow_quat_org[0]?.freeCashFlow)
        )?.toString()
      : null,
  debtOverEquityRatio:
    !isNoN(Number(balanceSheet_quat_org[0]?.shortTermDebt)) &&
    !isNoN(Number(balanceSheet_quat_org[0]?.longTermDebt)) &&
    !isNoN(Number(balanceSheet_quat_org[0]?.totalStockholderEquity)) &&
    !zeroPattern.test(
      Number(balanceSheet_quat_org[0]?.totalStockholderEquity)
    ) &&
    !zeroPattern.test(balanceSheet_quat_org[0]?.longTermDebt) &&
    !zeroPattern.test(balanceSheet_quat_org[0]?.shortTermDebt)
      ? (
          Number(balanceSheet_quat_org[0]?.shortTermDebt) +
          Number(balanceSheet_quat_org[0]?.longTermDebt) -
          Number(balanceSheet_quat_org[0]?.totalStockholderEquity)
        )?.toString()
      : null,
  debtOverEbitdaRatio:
    !isNoN(Number(balanceSheet_quat_org[0]?.shortTermDebt)) &&
    !isNoN(Number(balanceSheet_quat_org[0]?.longTermDebt)) &&
    !isNoN(incomeStatement_quat_org[0]?.ebitda) &&
    !zeroPattern.test(Number(incomeStatement_quat_org[0]?.ebitda)) &&
    !zeroPattern.test(Number(balanceSheet_quat_org[0]?.longTermDebt)) &&
    !zeroPattern.test(Number(balanceSheet_quat_org[0]?.shortTermDebt))
      ? (
          Number(balanceSheet_quat_org[0]?.shortTermDebt) +
          Number(balanceSheet_quat_org[0]?.longTermDebt) -
          Number(incomeStatement_quat_org[0]?.ebitda)
        )?.toString()
      : null,
  debtFcfRatio:
    !isNoN(Number(balanceSheet_quat_org[0]?.shortTermDebt)) &&
    !isNoN(Number(balanceSheet_quat_org[0]?.longTermDebt)) &&
    !isNoN(Number(cashFlow_quat_org[0]?.freeCashFlow)) &&
    !zeroPattern.test(Number(cashFlow_quat_org[0]?.freeCashFlow)) &&
    !zeroPattern.test(Number(balanceSheet_quat_org[0]?.longTermDebt)) &&
    !zeroPattern.test(Number(balanceSheet_quat_org[0]?.shortTermDebt))
      ? (
          Number(balanceSheet_quat_org[0]?.shortTermDebt) +
          Number(balanceSheet_quat_org[0]?.longTermDebt) -
          Number(cashFlow_quat_org[0]?.freeCashFlow)
        )?.toString()
      : null,
  currentRatio:
    balanceSheet_quat_org &&
    balanceSheet_quat_org[0]?.totalCurrentLiabilities &&
    !isNaN(balanceSheet_quat_org[0]?.totalCurrentLiabilities) &&
    !zeroPattern.test(balanceSheet_quat_org[0]?.totalCurrentLiabilities)
      ? (
          Number(balanceSheet_quat_org[0]?.totalCurrentAssets) /
          Number(balanceSheet_quat_org[0]?.totalCurrentLiabilities)
        )?.toString()
      : null,
  assetTurnover:
    !isNoN(RevenueTTM) &&
    !isNoN(Number(balanceSheet_quat_org[0]?.totalAssets)) &&
    !zeroPattern.test(Number(balanceSheet_quat_org[0]?.totalAssets)) &&
    !zeroPattern.test(RevenueTTM)
      ? (RevenueTTM / Number(balanceSheet_quat_org[0]?.totalAssets))?.toString()
      : null,
  returnOnEquity: calculateMargin(
    incomeStatement_quat_org[0]?.netIncome,
    balanceSheet_quat_org[0]?.totalStockholderEquity
  )?.toString(),
  returnOnAssets: calculateMargin(
    incomeStatement_quat_org[0]?.netIncome,
    balanceSheet_quat_org[0]?.totalAssets
  )?.toString(),
  returnOnCapital: calculateMargin(
    incomeStatement_quat_org[0]?.ebit,
    balanceSheet_quat_org[0]?.netInvestedCapital
  )?.toString(),
  fcfYield: calculateMargin(
    cashFlow_quat_org[0]?.freeCashFlow,
    MarketCapitalization
  )?.toString(),
  payoutRatio: calculateMargin(DividendShare, epsActual())?.toString(),
  revenueGrowthYOY: calculateGrowth(
    cashFlow_quat_org[0]?.freeCashFlow,
    cashFlow_quat_org[1]?.freeCashFlow
  )?.toString(),
  netIncomeGrowthQ: calculateGrowth(
    incomeStatement_quat_org[0]?.netIncome,
    incomeStatement_quat_org[1]?.netIncome
  )?.toString(),
  netIncomeGrowthY: calculateGrowth(
    incomeStatement_yearly_org[0]?.netIncome,
    incomeStatement_yearly_org[1]?.netIncome
  )?.toString(),
  dividendGrowth: calculateGrowth(
    cashFlow_yearly_org[0]?.dividendsPaid,
    cashFlow_yearly_org[1]?.dividendsPaid
  )?.toString(),
  cashGrowth: calculateGrowth(
    balanceSheet_quat_org[0]?.cash,
    balanceSheet_quat_org[1]?.cash
  )?.toString(),
  debtGorwth:
    !isNaN(balanceSheet_quat_org[0]?.shortTermDebt) &&
    !isNaN(balanceSheet_quat_org[1]?.shortTermDebt) &&
    !zeroPattern.test(balanceSheet_quat_org[1]?.shortTermDebt) &&
    !zeroPattern.test(balanceSheet_quat_org[0]?.shortTermDebt)
      ? (
          Number(balanceSheet_quat_org[0]?.shortTermDebt) /
            Number(balanceSheet_quat_org[1]?.shortTermDebt) -
          1 * 100
        )?.toString()
      : null,
  marketCapGrowth: !isNaN(
    calculateGrowth(
      ratiosAndMetricsQuat[0]?.marketCap,
      ratiosAndMetricsQuat[1]?.marketCap
    )
  )
    ? calculateGrowth(
        ratiosAndMetricsQuat[0]?.marketCap,
        ratiosAndMetricsQuat[1]?.marketCap
      )?.toString()
    : null,
  epsGrowth: calculateGrowth(epsActual(), previousActual())?.toString()
};
