const { PrismaClient } = require("@prisma/client");
const { convertNumbersInArray } = require("../../utils/stock/numberConverter");
const prisma = new PrismaClient();

const balanceSheetResolver = {
  Query: {
    balanceSheet: async (_, { tickerName }) => {
      const data = await prisma.ticker.findFirst({
        where: {
          ticker: tickerName ? tickerName?.toUpperCase() : null
        },
        include: {
          BalanceSheet: true
        }
      });

      const balanceSheetQuat = convertNumbersInArray(
        data?.BalanceSheet?.filter((item) => item.Type === "QUARTERLY")
      );

      const balanceSheetYearly = convertNumbersInArray(
        data?.BalanceSheet?.filter((item) => item.Type === "YEARLY")
      );

      const structredData = {
        ...data,
        balanceSheetQuat,
        balanceSheetYearly
      };

      return structredData;
    }
  }
};

module.exports = balanceSheetResolver;
