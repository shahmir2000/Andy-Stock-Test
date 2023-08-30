const {
  YoyDataFunction,
  calculateGrowth
} = require("../../utils/stock/stockTwo.utils");

const YearlyGrowthTTM = async ({
  IncomeStatementObjectYearly,
  EarningsAnnual
}) => {
  const totalRevenueData = YoyDataFunction({
    object: IncomeStatementObjectYearly,
    variableName: "totalRevenue"
  });

  const RevGrowth3Year = calculateGrowth(
    totalRevenueData.currentYear,
    totalRevenueData.twoYearsAgo
  );

  const RevGrowth5Year = calculateGrowth(
    totalRevenueData.currentYear,
    totalRevenueData.fourYearsAgo
  );

  // ******************* Gross profit yearly growth  ****************
  // /////
  const grossProfitData = YoyDataFunction({
    object: IncomeStatementObjectYearly,
    variableName: "grossProfit"
  });

  const GProfitGrowth3 = calculateGrowth(
    grossProfitData.currentYear,
    grossProfitData.twoYearsAgo
  );

  const GProfitGrowth5 = calculateGrowth(
    grossProfitData.currentYear,
    grossProfitData.fourYearsAgo
  );

  const operatingIncomeData = YoyDataFunction({
    object: IncomeStatementObjectYearly,
    variableName: "operatingIncome"
  });

  const OpIncomeGrowth3 = calculateGrowth(
    operatingIncomeData.currentYear,
    operatingIncomeData.twoYearsAgo
  );

  const OpIncomeGrowth5 = calculateGrowth(
    operatingIncomeData.currentYear,
    operatingIncomeData.fourYearsAgo
  );

  const netIncomeData = YoyDataFunction({
    object: IncomeStatementObjectYearly,
    variableName: "netIncome"
  });

  const NetIncomeGrowth3 = calculateGrowth(
    netIncomeData.currentYear,
    netIncomeData.twoYearsAgo
  );

  const NetIncomeGrowth5 = calculateGrowth(
    netIncomeData.currentYear,
    netIncomeData.fourYearsAgo
  );

  // ******************* Gross profit yearly growth  ****************
  const EpsData = YoyDataFunction({
    object: EarningsAnnual,
    variableName: "epsActual"
  });

  const EpsGrowth3 = calculateGrowth(EpsData.currentYear, EpsData.twoYearsAgo);

  const EpsGrowth5 = calculateGrowth(EpsData.currentYear, EpsData.fourYearsAgo);

  return {
    RevGrowth3Year,
    RevGrowth5Year,
    GProfitGrowth3,
    GProfitGrowth5,
    OpIncomeGrowth3,
    OpIncomeGrowth5,
    NetIncomeGrowth3,
    NetIncomeGrowth5,
    EpsGrowth3,
    EpsGrowth5
  };
};

module.exports = { YearlyGrowthTTM };
