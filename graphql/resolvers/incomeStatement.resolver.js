const { PrismaClient } = require("@prisma/client");
const { convertNumbersInArray } = require("../../utils/stock/numberConverter");
const prisma = new PrismaClient();

const incomeStatementResolver = {
  Query: {
    incomeStatemnentByTicker: async (_, { tickerName }) => {
      const data = await prisma.ticker.findFirst({
        where: {
          ticker: tickerName ? tickerName?.toUpperCase() : null
        },
        select: {
          id: true,
          ticker: true,
          company: true,

          IncomeStatement: true
        }
      });

      const incomeStatementQuarterly = convertNumbersInArray(
        data?.IncomeStatement?.filter((item) => item.Type === "QUARTERLY")
      );
      const incomeStatementYearly = convertNumbersInArray(
        data?.IncomeStatement?.filter((item) => item.Type === "YEARLY")
      );
      const structredData = {
        ...data,
        tickerName: tickerName,
        id: data?.id,
        incomeStatementQuarterly,
        incomeStatementYearly
      };

      return structredData;
    }
  }
};
module.exports = incomeStatementResolver;
