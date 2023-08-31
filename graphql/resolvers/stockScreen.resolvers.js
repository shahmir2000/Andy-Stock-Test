const { PrismaClient } = require("@prisma/client");
const {
  convertNumbersInArray,
  convertAttributesToNumber
} = require("../../utils/stock/numberConverter");
const prisma = new PrismaClient();

const stockScreenResolver = {
  Query: {
    StockByTicker: async (_, { tickerName }) => {
      const data = await prisma.ticker.findFirst({
        where: {
          ticker: tickerName ? tickerName?.toUpperCase() : null
        },
        select: {
          ticker: true,
          company: true,
          TTM: {
            select: {
              id: true,
              earningsDate: true,
              country: true,
              preMarketDate: true,
              priceTargetPercentage: true,
              dividend: true,
              ExDividendDate: true,
              sharesOutTTM: true,
              epsActual: true,
              marketCapitalization: true,
              priceChange1Day: true,
              priceChange1Week: true,
              priceChange1Month: true,
              priceChange6Month: true,
              priceChange1Year: true,
              priceChangeThisYear: true,
              priceChange3Year: true,
              priceChange5Year: true,
              analystCount: true,
              pegRatio: true,
              priceChange52WeekHigh: true,
              priceChange52WeekLow: true
            }
          },
          EarningsTrand: {
            select: {
              Type: true,
              date: true,
              epsEstimateAvg: true,
              revenueEstimateAvg: true,
              epsActual: true,
              totalRevenue: true
            }
          },
          General: {
            include: {
              Officers: true
            }
          }
        }
      });
      const GeneralExtra = { ...data?.General };
      delete GeneralExtra.Officers;
      const General = convertAttributesToNumber(GeneralExtra);
      const Officers = convertNumbersInArray(data?.General?.Officers);

      const earningsQuarterly = convertNumbersInArray(
        data?.EarningsTrand?.filter((item) => item.Type === "QUARTERLY")
      );

      const earningsYearly = convertNumbersInArray(
        data?.EarningsTrand?.filter((item) => item.Type === "YEARLY")
      );

      const structredData = {
        ...data,
        tickerName: tickerName,
        earningsQuarterly,
        earningsYearly,
        General,
        Officers
      };
      return structredData;
    }
  }
};

module.exports = stockScreenResolver;
