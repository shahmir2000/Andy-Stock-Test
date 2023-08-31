const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const AnalystRatingResolver = {
  Query: {
    AnalystRatingByTicker: async (_, { tickerName }) => {
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
              StrongBuy: true,
              Buy: true,
              Hold: true,
              Sell: true,
              StrongSell: true,
              analystCount: true
            }
          }
        }
      });
      // const AnalystRating = convertAttributesToNumber(data?.TTM);
      const AnalystRating = data?.TTM;

      const structredData = {
        ...data,
        id: data?.id,
        tickerName: tickerName,
        Exchange: data?.General?.Exchange,
        AnalystRating
      };
      return structredData;
    }
  }
};
module.exports = AnalystRatingResolver;
