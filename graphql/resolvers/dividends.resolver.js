const { PrismaClient } = require("@prisma/client");
const { convertNumbersInArray } = require("../../utils/stock/numberConverter");
const { date } = require("zod");
const {
  getQuartersByYear,
  margedArrayByQuat,
  margedArrayByYear
} = require("../../utils/stock/stockTwo.utils");
const prisma = new PrismaClient();

const DividendsResolver = {
  Query: {
    DividendsByTicker: async (_, { tickerName }) => {
      const data = await prisma.ticker.findFirst({
        where: {
          ticker: tickerName ? tickerName?.toUpperCase() : null
        },
        select: {
          id: true,
          ticker: true,
          company: true,
          Dividend: true,
          TTM: {
            select: {
              MostRecentQuarter: true
            }
          },
          IncomeStatement: {
            select: {
              id: true,
              Type: true,
              date: true,
              psRatio: true
            }
          },
          Earnings: {
            select: {
              id: true,
              Type: true,
              date: true,
              peRatio: true
            }
          }
        }
      });

      const CombinedArray = [
        ...data?.Dividend,
        ...data?.Earnings,
        ...data?.IncomeStatement
      ];

      const DividendsQuarterly = convertNumbersInArray(
        CombinedArray?.filter((item) => item.Type === "QUARTERLY")
      );
      const DividendsYearly = convertNumbersInArray(
        CombinedArray?.filter((item) => item.Type === "YEARLY")
      );

      const DividendQuarterlyRes = getQuartersByYear({
        data: DividendsQuarterly,
        varableName: "date"
      });
      const GetQuarterData = margedArrayByQuat({
        array: DividendQuarterlyRes,
        reacentDate: data?.TTM?.MostRecentQuarter
      });

      const DividendYearlyRes = margedArrayByYear({
        array: DividendsYearly,
        reacentDate: data?.TTM?.MostRecentQuarter
      });
      const structredData = {
        ...data,
        tickerName: tickerName,
        id: data?.id,
        DividendsQuarterly: GetQuarterData,
        DividendsYearly: DividendYearlyRes
      };
      return structredData;
    }
  }
};
module.exports = DividendsResolver;
