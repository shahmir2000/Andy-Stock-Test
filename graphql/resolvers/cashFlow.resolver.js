const { PrismaClient } = require("@prisma/client");
// const { convertNumbersInArray } = require("../../utils/stock/numberConverter");
const prisma = new PrismaClient();

const cashFlowResolver = {
  Query: {
    CashFlowByTicker: async (_, { tickerName }) => {
      const data = await prisma.ticker.findFirst({
        where: {
          ticker: tickerName ? tickerName?.toUpperCase() : null
        },
        select: {
          id: true,
          ticker: true,
          company: true,
          CashFlow: true
        }
      });

      const cashFlowQuarterly = data?.CashFlow?.filter(
        (item) => item.Type === "QUARTERLY"
      );
      const cashFlowYearly = data?.CashFlow?.filter(
        (item) => item.Type === "YEARLY"
      );
      const structredData = {
        ...data,
        tickerName: tickerName,
        id: data?.id,
        cashFlowQuarterly,
        cashFlowYearly
      };
      return structredData;
    }
  }
};
module.exports = cashFlowResolver;
