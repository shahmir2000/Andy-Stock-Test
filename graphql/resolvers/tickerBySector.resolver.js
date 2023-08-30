const { PrismaClient } = require("@prisma/client");

const { convertNumbersInArray } = require("../../utils/stock/numberConverter");
const prisma = new PrismaClient();

const TickerBySectorResolver = {
  Query: {
    TickerBySector: async (_, { skip, take, industryName, sectorName }) => {
      const count = await prisma.ticker.count({
        where: industryName
          ? {
              Industries: {
                name: industryName ? industryName : null
              }
            }
          : {
              Industries: {
                Sectors: {
                  name: sectorName ? sectorName : null
                }
              }
            }
      });
      const data = await prisma.ticker.findMany({
        where: industryName
          ? {
              Industries: {
                name: industryName ? industryName : null
              }
            }
          : {
              Industries: {
                Sectors: {
                  name: sectorName ? sectorName : null
                }
              }
            },
        include: {
          TTM: true
        },

        skip,
        take
      });
      const mergedData = data.map((item) => {
        const { TTM, ...rest } = item;
        return {
          ...rest,
          ...TTM,
          ...{ Ticker: item.ticker }
        };
      });

      return {
        count,
        SectorTicker: convertNumbersInArray(mergedData)
      };
    }
  }
};

module.exports = TickerBySectorResolver;
