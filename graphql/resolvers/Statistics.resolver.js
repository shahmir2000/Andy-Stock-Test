const { PrismaClient } = require("@prisma/client");
const { convertNumbersInArray } = require("../../utils/stock/numberConverter");
const {
  margedArrayByYear,
  getQuartersByYear,
  margedArrayByQuat
} = require("../../utils/stock/stockTwo.utils");

const prisma = new PrismaClient();

const statisticResolver = {
  Query: {
    StatisticsByTicker: async (_, { tickerName }) => {
      const data = await prisma.ticker.findFirst({
        where: {
          ticker: tickerName ? tickerName?.toUpperCase() : null
        },

        select: {
          id: true,
          ticker: true,
          company: true,
          General: {
            select: {
              Exchange: true
            }
          },
          TTM: {
            select: {
              MostRecentQuarter: true
            }
          },
          RatiosAndMetrics: {
            select: {
              id: true,
              date: true,
              Type: true,
              marketCap: true,
              marketCapGrowth: true,
              enterpriseValue: true,
              pOverOcfRatio: true,
              evOverSalesRatio: true,
              evOverEbitda: true,
              evOverEbit: true,
              evOverFcf: true,
              fcfYield: true,
              buybackYield: true,
              TotalShareholderReturn: true
            }
          },
          Earnings: {
            select: {
              date: true,
              Type: true,
              peRatio: true,
              earningYield: true
            }
          },
          BalanceSheet: {
            select: {
              Type: true,
              date: true,
              pbRatio: true,
              priceOverFcfRatio: true,
              debtOverEbitda: true,
              debtOverEquity: true,
              debtOverFcf: true,
              currentRatio: true,
              assetTurnover: true,
              returnOnCapital: true
            }
          },
          IncomeStatement: {
            select: {
              date: true,
              Type: true,
              psRatio: true
            }
          },
          CashFlow: {
            select: {
              date: true,
              Type: true,
              returnOnAssets: true,
              returnOnEquity: true
            }
          },
          Dividend: {
            select: {
              date: true,
              Type: true,
              dividendYield: true,
              payoutRatio: true
            }
          }
        }
      });

      const CombinedArray = [
        ...data?.RatiosAndMetrics,
        ...data?.Earnings,
        ...data?.BalanceSheet,
        ...data?.IncomeStatement,
        ...data?.CashFlow,
        ...data?.Dividend
      ];

      const StatisticsQuarterly = convertNumbersInArray(
        CombinedArray?.filter((item) => item.Type === "QUARTERLY")
      );
      const StatisticsYearly = convertNumbersInArray(
        CombinedArray?.filter((item) => item.Type === "YEARLY")
      );

      const StatisticsQuarterlyRes = getQuartersByYear({
        data: StatisticsQuarterly,
        varableName: "date"
      });

      const GetQuarterData = margedArrayByQuat({
        array: StatisticsQuarterlyRes,
        reacentDate: data?.TTM?.MostRecentQuarter
      });

      const StatisticsYearlyRes = margedArrayByYear({
        array: StatisticsYearly,
        reacentDate: data?.TTM?.MostRecentQuarter
      });
      const structredData = {
        ...data,
        Exchange: data?.General?.Exchange,
        tickerName: tickerName,
        statisticsQuarterly: GetQuarterData,
        statisticsYearly: StatisticsYearlyRes
      };
      return structredData;
    }
  }
};
module.exports = statisticResolver;
