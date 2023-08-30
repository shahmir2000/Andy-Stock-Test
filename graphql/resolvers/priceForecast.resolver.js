const { PrismaClient } = require("@prisma/client");
const {
  convertAttributesToNumber
} = require("../../utils/stock/numberConverter");

const prisma = new PrismaClient();

const PriceForecastResolver = {
  Query: {
    PriceForecastByTicker: async (_, { tickerName }) => {
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
              id: true,
              priceChnage: true,
              TargetPrice: true
            }
          }
        }
      });
      const PriceForecast = convertAttributesToNumber(data?.TTM);

      const structredData = {
        ...data,
        tickerName: tickerName,
        id: data?.id,
        Exchange: data?.General?.Exchange,
        PriceForecast
      };
      return structredData;
    }
  }
};
module.exports = PriceForecastResolver;
