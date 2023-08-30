const XLSX = require("xlsx");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { Sectors } = require("../../utils/Sectors");

const prisma = new PrismaClient();

const filePath = path.join(__dirname, "stock.xlsx");

const loadExcel = async ({ sheetNumber }) => {
  console.log("i am about to start");
  // Load the workbook
  const workbook = XLSX.readFile(filePath);

  // Select the first sheet in the workbook
  const sheetName = workbook.SheetNames[sheetNumber];
  const worksheet = workbook.Sheets[sheetName];

  // Convert worksheet data to JSON format
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  return data;
};

const tickersController = async (req, res, next) => {
  try {
    const result = await loadExcel({ sheetNumber: 4 });
    result.shift();

    for (const ticker of result) {
      const tickerAlreadyExist = await prisma.ticker.findFirst({
        where: {
          ticker: ticker[0].toString(),
          company: ticker[1].toString()
        }
      });
      if (tickerAlreadyExist) {
        console.log("Ticker already exist!", ticker);
      } else {
        await prisma.ticker.create({
          data: {
            ticker: ticker[0]?.toString(),
            company: ticker[1]?.toString()
          }
        });
      }
    }
    return res.status(200).json({ message: "all ticker added successfully" });
  } catch (error) {
    console.log("error=========================>>", error);
    next(error);
  }
};

const SectorController = async (req, res, next) => {
  try {
    for (const data of Sectors) {
      const sectorName = data.Sector;
      const industryName = data.Industries;

      let sector = await prisma.sectors.findUnique({
        where: { name: sectorName }
      });

      if (!sector) {
        sector = await prisma.sectors.create({
          data: {
            name: sectorName
          }
        });
      }

      const industry = await prisma.industries.create({
        data: {
          name: industryName,
          sectorsId: sector.id
        }
      });

      const tickersWithSameSector = await prisma.ticker.findMany({
        where: {
          General: {
            Sector: sectorName
          }
        }
      });

      for (const ticker of tickersWithSameSector) {
        await prisma.ticker.update({
          where: { id: ticker.id },
          data: {
            industriesId: industry.id
          }
        });
      }
    }
    res.json({ message: "Sectors inserted successfully" });
  } catch (error) {
    console.log("error=========================>>", error);
    next(error);
  }
};

module.exports = { tickersController, SectorController };
