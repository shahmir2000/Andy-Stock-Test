const { PrismaClient } = require("@prisma/client");
const { convertNumbersInArray } = require("../../utils/stock/numberConverter");
const prisma = new PrismaClient();

const EarningCalenderResolver = {
  Query: {
    Earnings_Calender: async (_, { from, to }) => {
      console.log(from, to);
      const mixCalender = await prisma.earningsTrand.findMany({
        where: {
          Type: "QUARTERLY",
          reportDate: {
            gte: from,
            lte: to
          }
        },
        include: {
          Ticker: true
        }
      });

      const withTicker = mixCalender.map((val) => {
        return {
          ...val,
          tickerName: val.Ticker?.ticker,
          company: val.Ticker?.company
        };
      });

      // const convertedToFloats = convertNumbersInArray(withTicker);
      const convertedToFloats = withTicker;

      const earningCalender = convertedToFloats?.reduce((result, item) => {
        const { reportDate, ...data } = item;

        if (!result[reportDate]) {
          result[reportDate] = [];
        }
        result[reportDate].push({
          reportDate,
          ...data,
          ticker: item.Ticker?.Ticker
        });
        return result;
      }, {});
      return earningCalender;
    }
  }
};

module.exports = EarningCalenderResolver;
