const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const TickerBySectorResolver = {
  Query: {
    TickerBySector: async (_, { skip, take, industryName, sectorName }) => {
      const count = await prisma.ticker.count({
        where: industryName
          ? {
              General: {
                Industry: industryName ? industryName : null
              }
            }
          : {
              General: {
                Sector: sectorName ? sectorName : null
              }
            }
      });
      const data = await prisma.ticker.findMany({
        where: industryName
          ? {
              General: {
                Industry: industryName ? industryName : null
              }
            }
          : {
              General: {
                Sector: sectorName ? sectorName : null
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
        SectorTicker: mergedData
        // SectorTicker: convertNumbersInArray(mergedData)
      };
    }
  }
};

module.exports = TickerBySectorResolver;
