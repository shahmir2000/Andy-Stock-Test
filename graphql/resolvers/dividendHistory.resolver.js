const { PrismaClient } = require("@prisma/client");
const { convertNumbersInArray } = require("../../utils/stock/numberConverter");

const prisma = new PrismaClient();

const DividendHistoryResolver = {
  Query: {
    DividendsHistoryByTicker: async (_, { tickerName }) => {
      const data = await prisma.ticker.findFirst({
        where: {
          ticker: tickerName?.toUpperCase()
        },
        select: {
          id: true,
          ticker: true,
          company: true,
          DividendHistory: {
            select: {
              id: true,
              date: true,
              declarationDate: true,
              recordDate: true,
              paymentDate: true,
              period: true,
              value: true,
              unadjustedValue: true,
              currency: true
            }
          }
        }
      });
      const DividendHistory = convertNumbersInArray(data.DividendHistory);
      const structredData = {
        ...data,
        tickerName: tickerName,
        id: data?.id,
        DividendHistory
      };
      return structredData;
    }
  }
};
module.exports = DividendHistoryResolver;
