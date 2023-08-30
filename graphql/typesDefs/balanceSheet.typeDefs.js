const Balancesheet_typeDefs = `#graphql
scalar DateTime
scalar JSON

type balanceSheet_data {
  id: String
  Type: String,
  cashAndCashEquivalents: Float,
  shortTermInvestments: Float,
  cashAndShortTermInvestments: Float,
  cashGrowth: Float,
  netReceivables: Float,
  inventory: Float,
  otherCurrentAssets: Float,
  totalCurrentAssets: Float,
  longTermInvestments: Float,
  accountsPayable: Float,
  otherCurrentLiab: Float,
  longTermDebtTotal: Float,
  totalCurrentLiabilities: Float,
  shortTermDebt: Float,
  deferredLongTermLiab: Float,
  otherAssets: Float,
  nonCurrentAssetsTotal: Float,
  currentDeferredRevenue: Float,
  liabilitiesAndStockholdersEquity: Float
  totalStockholderEquity:Float,
  retainedEarnings: Float,
  accumulatedOtherComprehensiveIncome: Float,
  commonStock: Float,
  goodWillAndIntangibleAssets:Float,
  propertyPlantAndEquipmentNet: Float,
  netWorkingCapital: Float,
  bookValue: Float,
  netCashPerShare: Float,
  date: String,
  sharesOut: Float,
  netCashOverDebt: Float,
  totalCash: Float,
  totalDebt: Float,
  currentRatio: Float,
  totalAssets: Float,
  totalLiab: Float,
  pbRatio: Float,
  debtOverEquity: Float,
  debtOverEbitda: Float,
  debtOverFcf: Float,
  shareHolderEquity: Float,
  workingCapital: Float,
  assetTurnover: Float,
  returnOnCapital: Float,
  netCashOverDebtGrowth: Float,
  priceOverFcfRatio: Float,
  createdAt:DateTime,
  updatedAt:DateTime
}

  type balanceSheet {
    balanceSheetYearly: [balanceSheet_data]  
    balanceSheetQuat: [balanceSheet_data]  
  }


  type Query {
    balanceSheet(tickerName: String): balanceSheet
  }
`;

module.exports = Balancesheet_typeDefs;
