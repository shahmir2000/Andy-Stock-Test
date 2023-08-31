const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const RevenueResolver = {
  Query: {
    RevenueByTicker: async (_, { tickerName }) => {
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
              revenueDifference: true,
              revenueEstimateAvg: true,
              revenueSurprisePercent: true,
              totalRevenue: true
            }
          }
        }
      });

      const revenueQuarterly = data?.EarningsTrand?.filter(
        (item) => item.Type === "QUARTERLY"
      );
      const revenueYearly = data?.EarningsTrand?.filter(
        (item) => item.Type === "YEARLY"
      );
      const structredData = {
        ...data,
        id: data?.id,
        tickerName: tickerName,
        Exchange: data?.General?.Exchange,
        revenueQuarterly,
        revenueYearly
      };
      return structredData;
    }
  }
};
module.exports = RevenueResolver;
