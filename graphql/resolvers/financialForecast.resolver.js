const { PrismaClient } = require("@prisma/client");
const { convertNumbersInArray } = require("../../utils/stock/numberConverter");

const prisma = new PrismaClient();

const FinancialForecastResolver = {
  Query: {
    FinancialForecastByTicker: async (_, { tickerName }) => {
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
          IncomeStatement: {
            select: {
              id: true,
              Type: true,
              date: true,
              totalRevenue: true,
              revenueGrowth: true,
              epsActual: true,
              epsGrowth: true
            }
          }
        }
      });

      const FinancialForecastQuarterly = convertNumbersInArray(
        data?.IncomeStatement?.filter((item) => item.Type === "QUARTERLY")
      );
      const FinancialForecastYearly = convertNumbersInArray(
        data?.IncomeStatement?.filter((item) => item.Type === "YEARLY")
      );
      const structredData = {
        ...data,
        tickerName: tickerName,
        id: data?.id,
        Exchange: data?.General?.Exchange,
        FinancialForecastQuarterly,
        FinancialForecastYearly
      };
      return structredData;
    }
  }
};
module.exports = FinancialForecastResolver;
