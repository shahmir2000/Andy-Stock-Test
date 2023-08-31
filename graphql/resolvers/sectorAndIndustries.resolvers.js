const { PrismaClient } = require("@prisma/client");
const { getValuesWithSearch } = require("../../utils/stock/stockTwo.utils");

const prisma = new PrismaClient();

const SectorsAndIndustriesResolver = {
  Query: {
    SectorsAndIndustriesByTicker: async (_, { skip, take, search }) => {
      const count = await prisma.sectors.count({});
      const data = await prisma.sectors.findMany({
        include: {
          Industries: true
        },
        skip,
        take
      });

      const filteredData = getValuesWithSearch(data, search);

      console.log(filteredData);
      const structuredResponse = {
        Sectors:
          filteredData?.length !== 0
            ? filteredData.map((sector) => ({
                id: sector.id,
                name: sector.name,
                Industry: sector.Industries.map((industry) => ({
                  name: industry.name,
                  id: industry.id
                }))
              }))
            : data.map((sector) => ({
                id: sector.id,
                name: sector.name,
                Industry: sector.Industries.map((industry) => ({
                  name: industry.name,
                  id: industry.id
                }))
              }))
      };
      return {
        ...structuredResponse,
        count
      };
    }
  }
};

module.exports = SectorsAndIndustriesResolver;
