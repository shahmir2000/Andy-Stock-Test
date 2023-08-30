const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const SectorsAndIndustriesResolver = {
  Query: {
    SectorsAndIndustriesByTicker: async (_, { skip, take, search }) => {
      const count = await prisma.sectors.count({
        where: search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: "insensitive"
                  }
                },
                {
                  Industries: {
                    some: {
                      name: {
                        contains: search,
                        mode: "insensitive"
                      }
                    }
                  }
                }
              ]
            }
          : {}
      });
      const data = await prisma.sectors.findMany({
        where: search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: "insensitive"
                  }
                },
                {
                  Industries: {
                    some: {
                      name: {
                        contains: search,
                        mode: "insensitive"
                      }
                    }
                  }
                }
              ]
            }
          : {},
        include: {
          Industries: true
        },
        skip,
        take
      });
      const structuredResponse = {
        Sectors: data.map((sector) => ({
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
