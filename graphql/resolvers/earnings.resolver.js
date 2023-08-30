const { PrismaClient } = require("@prisma/client");
const { convertNumbersInArray } = require("../../utils/stock/numberConverter");

const prisma = new PrismaClient();

const EarningsResolver = {
  Query: {
    EarningsByTicker: async (_, { tickerName }) => {
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
          EarningsTrand: {
            select: {
              id: true,
              Type: true,
              date: true,
              epsActual: true,
              epsDifference: true,
              epsEstimate: true,
              epsSurprisePercent: true
            }
          }
        }
      });

      const EarningsQuarterly = convertNumbersInArray(
        data?.EarningsTrand?.filter((item) => item.Type === "QUARTERLY")
      );
      const EarningsYearly = convertNumbersInArray(
        data?.EarningsTrand?.filter((item) => item.Type === "YEARLY")
      );
      const structredData = {
        ...data,
        tickerName: tickerName,
        id: data?.id,
        Exchange: data?.General?.Exchange,
        EarningsQuarterly,
        EarningsYearly
      };
      return structredData;
    }
  }
};
module.exports = EarningsResolver;
