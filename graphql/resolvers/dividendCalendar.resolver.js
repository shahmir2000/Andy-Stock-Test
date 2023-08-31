const { PrismaClient } = require("@prisma/client");
const { getMostRecentDateObject } = require("../../utils/stock/stockTwo.utils");

const prisma = new PrismaClient();

const DividendCalendarResolver = {
  Query: {
    DividendCalrndarData: async (_, { skip, take }) => {
      const count = await prisma.ticker.count();
      const tickers = await prisma.ticker.findMany({
        include: {
          DividendHistory: true
        },
        skip,
        take
      });
      const convertedTickers = tickers.map((ticker) => ({
        id: ticker.id,
        company: ticker.company,
        ticker: ticker.ticker,
        ...getMostRecentDateObject(ticker.DividendHistory)
      }));

      return {
        DividendCalrndar: convertedTickers,
        count
      };
    }
  }
};
module.exports = DividendCalendarResolver;
