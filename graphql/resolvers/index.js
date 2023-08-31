const { mergeResolvers } = require("@graphql-tools/merge");
const stockScreenResolver = require("./stockScreen.resolvers");
const balanceSheetResolver = require("./balancesheet.resolver");
const incomeStatementResolver = require("./incomeStatement.resolver");
const EarningCalenderResolver = require("./earningCalender.resolver");
const cashFlowResolver = require("./cashFlow.resolver");
const statisticResolver = require("./Statistics.resolver");
const DividendsResolver = require("./dividends.resolver");
const DividendHistoryResolver = require("./dividendHistory.resolver");
const RevenueResolver = require("./revenue.resolver");
const EarningsResolver = require("./earnings.resolver");
const PriceForecastResolver = require("./priceForecast.resolver");
const FinancialForecastResolver = require("./financialForecast.resolver");
const AnalystRatingResolver = require("./analystsRating.resolver");
const DividendCalendarResolver = require("./dividendCalendar.resolver");
const SectorsAndIndustriesResolver = require("./sectorAndIndustries.resolvers");
const TickerBySectorResolver = require("./tickerBySector.resolver");
const TTMResolvers = require("./TTM.resolvers");

const mergedResolvers = mergeResolvers([
  TTMResolvers,
  stockScreenResolver,
  balanceSheetResolver,
  incomeStatementResolver,
  EarningCalenderResolver,
  cashFlowResolver,
  statisticResolver,
  DividendsResolver,
  DividendHistoryResolver,
  RevenueResolver,
  EarningsResolver,
  PriceForecastResolver,
  FinancialForecastResolver,
  AnalystRatingResolver,
  DividendCalendarResolver,
  SectorsAndIndustriesResolver,
  TickerBySectorResolver
]);

module.exports = mergedResolvers;
