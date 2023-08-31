const { isValidNumber } = require("./numberConverter");

exports.calculateGrossMargin = (totalRevenue, costOfRevenue) => {
  if (isValidNumber(totalRevenue) && isValidNumber(costOfRevenue)) {
    const growth =
      (Number(totalRevenue) - Number(costOfRevenue)) / Number(totalRevenue);
    return growth * 100;
  } else {
    return null;
  }
};

exports.trendsPerYear = ({ trends }) => {
  const finalArray = trends?.reduce((result, current) => {
    const year = current?.date?.substring(0, 4); // Extract the year from the date string

    // Find if the year already exists in the result array
    const existingYearIndex = result.findIndex((item) =>
      item?.date?.startsWith(year)
    );

    if (existingYearIndex !== -1) {
      // If the year exists, update the value and date to the current entry
      result[existingYearIndex].earningsEstimateAvg +=
        current.earningsEstimateAvg;
      result[existingYearIndex].revenueEstimateAvg +=
        current.revenueEstimateAvg;
      result[existingYearIndex].date = current.date;
    } else {
      // If the year doesn't exist, add it to the result array with the current date
      result.push({
        date: current?.date,
        earningsEstimateAvg: current?.earningsEstimateAvg,
        revenueEstimateAvg: current?.revenueEstimateAvg
      });
    }

    return result;
  }, []);

  return finalArray;
};

exports.calculateMargin = (x, y) => {
  if (isValidNumber(x) && isValidNumber(y)) {
    return (Number(x) / Number(y)) * 100;
  } else {
    return null;
  }
};

exports.calculateGrowth = (x, y) => {
  if (isValidNumber(x) && isValidNumber(y)) {
    return ((Number(x) - Number(y)) / Number(y)) * 100;
  } else {
    return null;
  }
};

const salesPerShare = (totalRevenue, commonStockSharesOutstanding) => {
  if (
    isValidNumber(totalRevenue) &&
    isValidNumber(commonStockSharesOutstanding)
  ) {
    return Number(totalRevenue) / Number(commonStockSharesOutstanding);
  } else {
    return null;
  }
};

exports.calculatePsRatio = (
  totalRevenue,
  commonStockSharesOutstanding,
  stockPrice
) => {
  if (
    isValidNumber(totalRevenue) &&
    isValidNumber(commonStockSharesOutstanding) &&
    isValidNumber(stockPrice)
  ) {
    const companySPS = salesPerShare(
      totalRevenue,
      commonStockSharesOutstanding
    );
    if (isValidNumber(companySPS)) {
      const psRatio = Number(stockPrice) / companySPS;
      return psRatio;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const bookValue = (totalAssets, totalLiab) => {
  if (isValidNumber(totalAssets) && isValidNumber(totalLiab)) {
    return Number(totalAssets) / Number(totalLiab);
  } else {
    return null;
  }
};

exports.calculatePbRatio = (lcprice, totalAssets, totalLiab) => {
  if (
    isValidNumber(lcprice) &&
    isValidNumber(totalAssets) &&
    isValidNumber(totalLiab)
  ) {
    const result = bookValue(totalAssets, totalLiab);
    if (result && isValidNumber(result)) {
      return Number(lcprice) / result;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const fcfPerShare = (freeCashFlow, commonStockSharesOutstanding) => {
  if (
    isValidNumber(freeCashFlow) &&
    isValidNumber(commonStockSharesOutstanding)
  ) {
    return Number(freeCashFlow) / Number(commonStockSharesOutstanding);
  } else {
    return null;
  }
};

exports.calculatePriceOverFcfRatio = ({
  price,
  freeCashFlow,
  commonStockSharesOutstanding
}) => {
  if (
    isValidNumber(price) &&
    isValidNumber(freeCashFlow) &&
    isValidNumber(commonStockSharesOutstanding)
  ) {
    const fcfValue = fcfPerShare(freeCashFlow, commonStockSharesOutstanding);
    if (fcfValue && isValidNumber(fcfValue)) {
      return Number(price) / fcfValue
        ? parseFloat(Number(price) / fcfValue)
        : null;
    } else {
      return null;
    }
  }
  return null;
};

exports.priceCalculation = ({ PriceChange, price_map }) => {
  // Create a copy of the PriceChange array using the spread operator
  // this donot affect the original array
  const sortedPriceChange = [...PriceChange].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const mergedArray = price_map.map((item) => {
    const targetDate = new Date(item.date);
    const closestPrice = sortedPriceChange.find(
      (priceItem) => new Date(priceItem.date) <= targetDate
    );

    const result = fcfPerShare(
      Number(item?.freeCashFlow),
      Number(item?.commonStockSharesOutstanding)
    );

    let calculatedField = null;
    if (isValidNumber(result)) {
      calculatedField = Number(closestPrice?.close) / result;
    }

    delete item?.commonStockSharesOutstanding;
    delete item?.close;

    return {
      date: item.date,
      priceOverFcfRatio: isValidNumber(calculatedField)
        ? calculatedField?.toString()
        : null,
      ...item
    };
  });

  return mergedArray;
};

exports.calculateNetCashPerShare = ({
  cash,
  shortTermDebt,
  commonStockSharesOutstanding
}) => {
  if (
    isValidNumber(cash) &&
    isValidNumber(shortTermDebt) &&
    isValidNumber(commonStockSharesOutstanding)
  ) {
    const result = isValidNumber(cash) / isValidNumber(shortTermDebt);
    return result / isValidNumber(commonStockSharesOutstanding);
  } else {
    return null;
  }
};
exports.calculateBookValue = ({ totalAssets, totalLiab }) => {
  if (isValidNumber(totalAssets) && isValidNumber(totalLiab)) {
    return isValidNumber(totalAssets) / isValidNumber(totalLiab);
  } else {
    return null;
  }
};

exports.calculateROE = ({ netIncome, balanceSheet_org, cashFlowDate }) => {
  const sameInBalanceSheet = balanceSheet_org?.find(
    (b_item) => b_item?.date === cashFlowDate
  );
  if (
    isValidNumber(netIncome) &&
    isValidNumber(sameInBalanceSheet?.totalStockholderEquity)
  ) {
    return (
      (Number(netIncome) / Number(sameInBalanceSheet?.totalStockholderEquity)) *
      100
    );
  } else {
    return null;
  }
};

exports.calculateROA = ({ netIncome, balanceSheet_org, cashFlowDate }) => {
  const sameInBalanceSheet = balanceSheet_org?.find(
    (b_item) => b_item?.date === cashFlowDate
  );
  if (
    isValidNumber(netIncome) &&
    isValidNumber(sameInBalanceSheet?.totalAssets)
  ) {
    return (Number(netIncome) / Number(sameInBalanceSheet?.totalAssets)) * 100;
  } else {
    return null;
  }
};

exports.calculateQuickRatio = ({
  cash,
  shortTermInvestments,
  netReceivables,
  totalCurrentLiabilities
}) => {
  if (
    isValidNumber(cash) &&
    isValidNumber(shortTermInvestments) &&
    isValidNumber(netReceivables) &&
    isValidNumber(totalCurrentLiabilities)
  ) {
    return (
      (Number(cash) + Number(shortTermInvestments) + Number(netReceivables)) /
      Number(totalCurrentLiabilities)
    );
  } else {
    return null;
  }
};

exports.calculateDebtOverVariable = ({
  shortTermDebt,
  longTermDebt,
  dividedBy
}) => {
  if (
    isValidNumber(shortTermDebt) &&
    isValidNumber(longTermDebt) &&
    isValidNumber(dividedBy)
  ) {
    return (Number(shortTermDebt) + Number(longTermDebt)) / Number(dividedBy);
  }
  return null;
};

exports.calculateTaxOverRevenue = ({ incomeTaxExpense, incomeBeforeTax }) => {
  if (isValidNumber(incomeTaxExpense) && isValidNumber(incomeBeforeTax)) {
    return (Number(incomeTaxExpense) / Number(incomeBeforeTax)) * 100;
  }
  return null;
};

exports.calculateForwardEvOverSales = ({
  EnterpriseValue,
  revenueEstimateAvg
}) => {
  if (isValidNumber(EnterpriseValue) && isValidNumber(revenueEstimateAvg)) {
    return Number(EnterpriseValue) / Number(revenueEstimateAvg);
  } else {
    return null;
  }
};

exports.calculateEvOverEarnings = ({ EnterpriseValue, netIncome }) => {
  if (isValidNumber(EnterpriseValue) && isValidNumber(netIncome)) {
    return Number(EnterpriseValue) / Number(netIncome);
  } else {
    return null;
  }
};

exports.calculateEvOverEbitda = ({ EnterpriseValue, ebitda }) => {
  if (isValidNumber(EnterpriseValue) && isValidNumber(ebitda)) {
    return Number(EnterpriseValue) / Number(ebitda);
  } else {
    return null;
  }
};

exports.calculateNetCashOverDebtGrowth = ({ currentYear, previousYear }) => {
  const currentYearCashOverDebt =
    Number(currentYear.cash) / Number(currentYear.shortTermDebt);
  const previousYearCashOverDebt =
    Number(previousYear.cash) / Number(previousYear.shortTermDebt);

  if (
    isValidNumber(currentYearCashOverDebt) &&
    isValidNumber(previousYearCashOverDebt)
  ) {
    growth =
      (Number(currentYearCashOverDebt) - Number(previousYearCashOverDebt)) /
      Number(currentYearCashOverDebt);
    if (isValidNumber(growth)) {
      return growth * 100;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

exports.calculateEnterpriseValue = ({
  marketCap,
  netDebt,
  cashAndEquivalents
}) => {
  if (
    isValidNumber(marketCap) &&
    isValidNumber(netDebt) &&
    isValidNumber(cashAndEquivalents)
  ) {
    return Number(marketCap) + Number(netDebt) - Number(cashAndEquivalents);
  } else {
    return null;
  }
};

exports.calculateEvOverEbit = ({
  marketCap,
  netDebt,
  cashAndEquivalents,
  ebit
}) => {
  if (
    isValidNumber(marketCap) &&
    isValidNumber(netDebt) &&
    isValidNumber(cashAndEquivalents) &&
    isValidNumber(ebit)
  ) {
    return (
      Number(marketCap) +
      Number(netDebt) -
      Number(cashAndEquivalents) / Number(ebit)
    );
  } else {
    return null;
  }

  // const enterpriseValue =
  //   Number(marketCap) + Number(netDebt) - Number(cashAndEquivalents);
  // return enterpriseValue / Number(ebit);
};

exports.calculateEvOverFcf = ({ enterpriseValue, freeCashFlow }) => {
  if (isValidNumber(enterpriseValue) && isValidNumber(freeCashFlow)) {
    return enterpriseValue / Number(freeCashFlow);
  } else {
    return null;
  }
};

exports.compareYear = ({ dateOne, dateTwo }) => {
  if (dateOne && dateTwo) {
    return dateOne.split("-")[0] === dateTwo.split("-")[0];
  } else {
    return null;
  }
};

exports.calculateROC = ({ totalAssets, ebit, totalCurrentAssets }) => {
  if (
    isValidNumber(totalAssets) &&
    isValidNumber(ebit) &&
    isValidNumber(totalCurrentAssets)
  ) {
    const roc =
      Number(ebit) / (Number(totalAssets) - Number(totalCurrentAssets));
    return roc * 100;
  } else {
    return null;
  }
};

exports.calclateDebtGrowth = ({ currentDebt, previousDebt }) => {
  if (isValidNumber(currentDebt) && isValidNumber(previousDebt)) {
    const division = Number(currentDebt) / Number(previousDebt);
    const res = division - 1;
    return res * 100;
  } else {
    return null;
  }
};

exports.calculateDividendYield = ({ price, dividendShare }) => {
  if (isValidNumber(price) && isValidNumber(dividendShare)) {
    return (Number(dividendShare) / Number(price)) * 100;
  } else {
    return null;
  }
};

exports.lastClosePriceIdentifier = ({ date, PriceChange }) => {
  if (isValidNumber(date) && isValidNumber(PriceChange)) {
    // If sameDayPrice is not found, find the closest date that is less than dateFormatted
    const currentDate = new Date(date);
    let closestDate;

    for (const p_item of PriceChange) {
      const priceChangeDate = new Date(p_item?.date);

      if (priceChangeDate < currentDate) {
        closestDate = priceChangeDate;
      } else {
        break;
      }
    }

    if (closestDate) {
      const closestDateString = closestDate?.toISOString()?.slice(0, 10);
      const closestDatePrice = PriceChange?.find(
        (p_item) => p_item?.date === closestDateString
      );

      if (closestDatePrice) {
        // If a closest date's price is found, use it for calculations
        return closestDatePrice;
      }
    }
  } else {
    return null;
  }
};

exports.calculateTTM = ({ array, variableName }) => {
  const a = array[0];
  const b = array[1];
  const c = array[2];
  const d = array[3];

  if (
    isValidNumber(a) &&
    isValidNumber(b) &&
    isValidNumber(c) &&
    isValidNumber(d) &&
    variableName
  ) {
    return (
      Number(a[variableName]) +
      Number(b[variableName]) +
      Number(c[variableName]) +
      Number(d[variableName])
    );
  } else {
    return null;
  }
};

exports.dividendsPerYear = ({ dividends }) => {
  const finalArray = dividends?.reduce((result, current) => {
    const year = current?.date?.substring(0, 4); // Extract the year from the date string

    // Find if the year already exists in the result array
    const existingYearIndex = result.findIndex((item) =>
      item?.date?.startsWith(year)
    );

    if (existingYearIndex !== -1) {
      // If the year exists, update the value and date to the current entry
      result[existingYearIndex].value += current.value;
      result[existingYearIndex].date = current.date;
    } else {
      // If the year doesn't exist, add it to the result array with the current date
      result.push({
        date: current?.date,
        value: current?.value
      });
    }

    return result;
  }, []);

  return finalArray;
};

exports.trendsPerYear = ({ trends }) => {
  const finalArray = trends?.reduce((result, current) => {
    const year = current?.date?.substring(0, 4); // Extract the year from the date string

    // Find if the year already exists in the result array
    const existingYearIndex = result.findIndex((item) =>
      item?.date?.startsWith(year)
    );

    if (existingYearIndex !== -1) {
      // If the year exists, update the value and date to the current entry
      result[existingYearIndex].earningsEstimateAvg =
        parseFloat(result[existingYearIndex].earningsEstimateAvg) +
        parseFloat(current.earningsEstimateAvg);
      result[existingYearIndex].revenueEstimateAvg =
        parseFloat(result[existingYearIndex].revenueEstimateAvg) +
        parseFloat(current.revenueEstimateAvg);
      result[existingYearIndex].date = current.date;
    } else {
      // If the year doesn't exist, add it to the result array with the current date
      result.push({
        date: current?.date,
        earningsEstimateAvg: current?.earningsEstimateAvg,
        revenueEstimateAvg: current?.revenueEstimateAvg
      });
    }

    return result;
  }, []);

  return finalArray;
};

exports.calculatePayoutRatio = ({ dividendShare, epsActual }) => {
  if (isValidNumber(dividendShare) && isValidNumber(epsActual)) {
    return (Number(dividendShare) / Number(epsActual)) * 100;
  } else {
    return null;
  }
};

exports.calculateCashOverMarketCap = ({
  cashAndEquivalents,
  MarketCapitalization
}) => {
  if (
    isValidNumber(cashAndEquivalents) &&
    isValidNumber(MarketCapitalization)
  ) {
    return (Number(cashAndEquivalents) / Number(MarketCapitalization)) * 100;
  } else {
    return null;
  }
};

exports.calcualteFcfYield = ({ freeCashFlow, MarketCapitalization }) => {
  if (isValidNumber(freeCashFlow) && isValidNumber(MarketCapitalization)) {
    const value =
      Number(freeCashFlow) && Number(MarketCapitalization)
        ? (Number(freeCashFlow) / Number(MarketCapitalization)) * 100
        : null;
    return value;
  } else {
    return null;
  }
};

exports.calculateEvOverSales = ({ enterpriseValue, totalRevenue }) => {
  if (isValidNumber(totalRevenue) && isValidNumber(enterpriseValue)) {
    return Number(enterpriseValue) / Number(totalRevenue);
  } else {
    return null;
  }
};

exports.calculateBuybackYield = ({ salePurchaseOfStock, marketCap }) => {
  if (isValidNumber(salePurchaseOfStock) && isValidNumber(marketCap)) {
    return (Number(salePurchaseOfStock) / Number(marketCap)) * 100;
  } else {
    return null;
  }
};

exports.calculateShareholderYield = ({ dividendYield, buybackYield }) => {
  if (isValidNumber(dividendYield) && isValidNumber(buybackYield)) {
    return Number(dividendYield) + Number(buybackYield);
  } else {
    return null;
  }
};

exports.calculateTotalDebt = ({ shortTermDebt, longTermDebt }) => {
  if (isValidNumber(shortTermDebt) && isValidNumber(longTermDebt)) {
    return Number(shortTermDebt) + Number(longTermDebt);
  } else {
    return null;
  }
};

//get revenueEstimateGrowth
exports.revenueEstimateGrowth = ({ trendInEarnings, MostRecentQuarter }) => {
  const sameQuat = trendInEarnings?.find(
    (h_items) => h_items?.date === MostRecentQuarter
  );
  return sameQuat?.revenueEstimateGrowth;
};

//get revenueEstimateGrowthNextQuat
exports.revenueEstimateGrowthNextQuat = ({
  trendInEarnings,
  MostRecentQuarter
}) => {
  const recentQuatIndex = trendInEarnings?.findIndex(
    (h_items) => h_items.date === MostRecentQuarter
  );

  return trendInEarnings[recentQuatIndex - 1]?.revenueEstimateGrowth;
};

const epsEstimatePerYear = ({ array }) => {
  const finalArray = array.reduce((result, current) => {
    const year = current.date.substring(0, 4); // Extract the year from the date string

    // Find if the year already exists in the result array
    const existingYearIndex = result.findIndex((item) =>
      item?.date?.startsWith(year)
    );

    if (existingYearIndex !== -1) {
      // If the year exists, update the value and date to the current entry
      result[existingYearIndex].revenueEstimateGrowth += Number(
        current?.revenueEstimateGrowth
      );
      result[existingYearIndex].date = current?.date;
    } else {
      // If the year doesn't exist, add it to the result array with the current date
      result.push({
        date: current?.date,
        revenueEstimateGrowth: Number(current?.revenueEstimateGrowth)
      });
    }

    return result;
  }, []);

  return finalArray;
};

//get revGrowthThisYear
exports.revGrowthThisYear = ({ trendInEarnings }) => {
  const epsEstPerYear = epsEstimatePerYear({ array: trendInEarnings });
  const currentYear = new Date().getFullYear();
  const thisYearEps = epsEstPerYear?.find((e_item) => {
    const date = e_item?.date?.substring(0, 4);
    if (date == currentYear) {
      return true;
    } else {
      return false;
    }
  });
  return thisYearEps?.revenueEstimateGrowth;
};

//get revGrowthNextYear
exports.revGrowthNextYear = ({ trendInEarnings }) => {
  const epsEstPerYear = epsEstimatePerYear({ array: trendInEarnings });
  const currentYear = new Date().getFullYear();
  const thisYearIndex = epsEstPerYear?.findIndex((e_item) => {
    const date = e_item?.date?.substring(0, 4);
    if (date == currentYear) {
      return true;
    } else {
      return false;
    }
  });

  const nextYearEps = epsEstPerYear[thisYearIndex - 1];
  return nextYearEps?.revenueEstimateGrowth;
};

exports.calculateLastYearShares = ({ outstandingSharesAnnual }) => {
  const currentYear = new Date().getFullYear();
  const prevYear = currentYear - 1;

  const lastYear = outstandingSharesAnnual.find(
    (item) => item?.date == prevYear
  );

  return lastYear?.shares;
};

exports.calculatePreviousYearShares = ({ outstandingSharesAnnual }) => {
  const currentYear = new Date()?.getFullYear();
  const prevYear = currentYear - 2;
  const obj = outstandingSharesAnnual?.find((item) => item?.date == prevYear);
  return obj?.shares;
};
exports.calculateEarningsYield = ({ eps, price }) => {
  if (isValidNumber(eps) && isValidNumber(price)) {
    return (Number(eps) / Number(price)) * 100;
  } else {
    return null;
  }
};

//todo
exports.calculatePiotroskiFScore = ({
  netIncome,
  ReturnOnAssetsTTM,
  totalCashFromOperatingActivities,
  longTermDebt,
  totalCurrentAssets,
  totalCurrentLiabilities,
  shares,
  grossMargin,
  assetTurnoverRatio
}) => {
  let score = 0;

  if (netIncome > 0) {
    score += 1;
  }

  if (ReturnOnAssetsTTM > 0) {
    score += 1;
  }

  if (totalCashFromOperatingActivities > 0) {
    score += 1;
  }

  if (totalCashFromOperatingActivities > netIncome) {
    score += 1;
  }

  if (longTermDebt.current < longTermDebt.previous) {
    score += 1;
  }

  const assetsAndLiabRatioLastYear =
    isValidNumber(totalCurrentAssets?.current) &&
    isValidNumber(totalCurrentLiabilities?.current)
      ? totalCurrentAssets?.current / totalCurrentLiabilities?.current
      : null;

  const assetsAndLiabRatioPreviousYear =
    isValidNumber(totalCurrentAssets?.previous) &&
    isValidNumber(totalCurrentLiabilities?.previous)
      ? totalCurrentAssets?.previous / totalCurrentLiabilities?.previous
      : null;

  if (assetsAndLiabRatioLastYear > assetsAndLiabRatioPreviousYear) {
    score += 1;
  }

  if (shares.lastYear < shares.prevYear) {
    score += 1;
  }

  if (grossMargin?.lastYear > grossMargin?.prevYear) {
    score += 1;
  }

  if (assetTurnoverRatio?.lastYear > assetTurnoverRatio?.prevYear) {
    score += 1;
  }

  return score;
};

exports.division = ({ price, epsActual }) => {
  if (isValidNumber(price) && isValidNumber(epsActual)) {
    return Number(price) / Number(epsActual);
  } else {
    return null;
  }
};
