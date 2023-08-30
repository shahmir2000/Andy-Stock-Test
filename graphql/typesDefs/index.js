const { mergeTypeDefs } = require("@graphql-tools/merge");
const TTMtypeDefs = require("./TTMtypesDefs");
const Balancesheet_typeDefs = require("./balanceSheet.typeDefs");
const incomeStatemnentByTicker = require("./incomeStatement.typeDefs");
const EarningCalender_typeDefs = require("./earningCalender.typeDefs");
const cashFlowByTicker = require("./cashFlow.typeDefs");
const StatisticstypeDefs = require("./statistics.typeDefs");
const dividendByTicker = require("./dividends.typesDef");
const dividendHistoryByTicker = require("./dividendHistory.typesDefs");
const RevenuetypeDefs = require("./revenue.typesDefs");
const EarningstypeDefs = require("./earnings.typesDefs");
const PriceForecastDefs = require("./priceForecast.typesDefs");
const FinancialForecastDefs = require("./FinancialForecast.typesDefs");
const AnalystRatingDefs = require("./analystRating.typesDefs");
const DividendCalrndarDefs = require("./dividendCalendar.typesDefs");
const SectorsAndIndustriestypeDefs = require("./sectorAndIndustries.typesDefs");
const TickerBySectorDefs = require("./TickerBySector.typesDefs");
const StockByTickerDefs = require("./stockByTickerTypeDefs");

const mergedTypeDefs = mergeTypeDefs([
  TTMtypeDefs,
  StockByTickerDefs,
  Balancesheet_typeDefs,
  incomeStatemnentByTicker,
  EarningCalender_typeDefs,
  cashFlowByTicker,
  StatisticstypeDefs,
  dividendByTicker,
  dividendHistoryByTicker,
  RevenuetypeDefs,
  EarningstypeDefs,
  PriceForecastDefs,
  FinancialForecastDefs,
  AnalystRatingDefs,
  DividendCalrndarDefs,
  SectorsAndIndustriestypeDefs,
  TickerBySectorDefs
]);

module.exports = mergedTypeDefs;
