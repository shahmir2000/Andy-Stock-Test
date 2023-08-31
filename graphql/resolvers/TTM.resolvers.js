const { PrismaClient, Type } = require("@prisma/client");
const { convertNumbersInArray } = require("../../utils/stock/numberConverter");
const { FilterSearch } = require("../../utils/stock/stockTwo.utils");

const prisma = new PrismaClient();

const TTMResolvers = {
  Query: {
    TTMScreener: async (_, { skip, take, search }) => {
      const data = await prisma.tTM.findMany({
        // where: (searchString || searchNumbers) && {
        //   OR: [
        //     // {
        //     //   Ticker: {
        //     //     ticker: {
        //     //       contains: searchString,
        //     //       mode: "insensitive"
        //     //     }
        //     //   }
        //     // },
        //     // {
        //     //   industry: {
        //     //     contains: searchString,
        //     //     mode: "insensitive"
        //     //   }
        //     // },
        //     // {
        //     //   ipoDate: {
        //     //     contains: searchString,
        //     //     mode: "insensitive"
        //     //   }
        //     // },

        //     // {
        //     //   earningsDate: {
        //     //     contains: searchString,
        //     //     mode: "insensitive"
        //     //   }
        //     // },

        //     {

        //       // OR: [
        //       //   {
        //       //     earningYieldY: {
        //       //       gte: searchNumbers
        //       //     }
        //       //   },
        //       //   {
        //       //     earningYieldY: {
        //       //       lte: searchNumbers
        //       //     }
        //       //   }
        //       // ]
        //     }
        //     // {
        //     //   earningYieldQ: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   buybackYieldYearly: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   buybackYieldQuat: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   evOverFcfYearly: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   evOverFcfQuat: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   evOverEbitYearly: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   evOverEbitQuat: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   evOverSalesQuat: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   evOverSalesYearly: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   debtOverFcfY: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   debtOverFcfQ: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceOverFcfRatioY: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceOverFcfRatioQ: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   totalCashQ: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   totalCashY: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   fcfGrowthY: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   fcfGrowthQ: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   grossProfitGrowthY: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   grossProfitGrowthQ: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   dividendYieldY: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   dividendYieldQ: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   researchDevelopmentOverRevenueY: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   researchDevelopmentOverRevenueQ: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   netIncomeGrowthY: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   netIncomeGrowthQ: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   premarketPrice: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   fcfGrowthThreeYears: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   fcfGrowthFiveYears: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   forwardPe: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   returnOnEquity5Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   returnOnAssets5Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   returnOnCapital5Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   lastSplitDate: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   lastStockSplit: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   lastStockSplitRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   float: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   shortRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   shortPercentShare: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   beta1Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   epsGrowth3Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   epsGrowth5Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   netIncomeGrowth3Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   netIncomeGrowth5Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   operatingIncomeGrowth3Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   grossProfit3Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   operatingIncomeGrowth5Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   grossProfit5Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   revenueGrowth3Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   revenueGrowth5Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },

        //     // {
        //     //   employees: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   premarketPercentageChg: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceTargetPercentage: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   previousClose: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   anaylystRating: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   analystCount: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceChange1Day: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceChange1Week: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceChange1Month: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceChange6Month: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceChange1Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceChangeThisYear: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceChange3Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceChange5Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceChange10Year: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceChange52WeekHigh: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   priceChange52WeekLow: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   RevOverEmployees: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   piotroskiFScore: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   revGrowthNextYear: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   revGrowthThisYear: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   InvTurnover: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   PayoutFreq: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   AltmanZScore: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   revGrowthThisQuarter: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   revGrowthNextQuarter: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   shareholderYield: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   relativeVolume: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   averageVolume: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   epsGrowthNextQuarter: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   epsGrowthThisQuarter: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   epsGrowthNextYear: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   epsGrowthThisYear: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   cashOverMarketCap: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   financialReportDate: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   volume: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   dividend: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   netCashOverDebtGrowth: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   lastClosePrice: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   evOverEbitda: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   evOverEarnings: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   forwardEvOverSales: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   pegRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   taxOverRevenue: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   quickRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   profOverEmployee: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   ExDividendDate: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   sharesInstitutions: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   sharesInsiders: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   operatingMargin: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   sector: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   country: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   exchange: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   grossProfit: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   costOfRevenue: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   sellingGeneralAdministrative: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   researchDevelopment: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   totalOperatingExpenses: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   interestExpense: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   incomeBeforeTax: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   incomeTax: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   netIncome: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   epsActual: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   dilutedEspActual: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   dividendShare: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   profitMargin: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   ebitda: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   ebitdaMargin: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   ebit: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   ebitMargin: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   depreciationAndAmortization: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   freeCashFlowMargin: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   grossMargin: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   cashAndEquivalents: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   shortTermInvestments: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   cashAndCashEquivalents: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   cashAndShortTermInvestments: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   receivables: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   inventory: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   otherCurrentAssets: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   totalCurrentAssets: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   propertyPlantAndEquipment: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   longTermInvestments: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   goodWillAndIntangibleAssets: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   otherLongTermAssets: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   totalLongTernAssets: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   totalAssets: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   accountsPayable: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   deferredRevenue: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   currentDebt: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   otherCurrentLiabilities: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   totalCurrentLiabilities: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   longTernDebt: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   totalLongTermLiabilities: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   totalLiabilities: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   totalDebt: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   commonStock: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   retainedEarnings: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   comprehensiveIncome: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   shareHoldersEquity: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   totalLiabilitiesAndEquity: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   netCashOverDebt: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   netCashperShare: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   workingCapital: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   bookValuePerShare: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   shareBasedCompensation: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   otherOperatingActivities: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   operatingCashFlow: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   capitalExpenditures: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   otherInvestingActivities: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   investingCashFlow: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   dividendPaid: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   shareIssuanceOverRepurchase: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   otherFinanceActivities: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   financeCashFlow: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   netCashFlow: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   freeCashFlow: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   freeCashFlowPerShare: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   marketCapitalization: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   enterpriseValue: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   peRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   psRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   pOverFcfRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   pOverOcfRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   evOverSalesRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   evEbitdaRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   evEbitRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   evFcfRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   debtOverEquityRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   debtOverEbitdaRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   debtFcfRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   currentRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   assetTurnover: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   returnOnEquity: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   returnOnAssets: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   returnOnCapital: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   fcfYield: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   payoutRatio: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   revenueGrowthYOY: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },

        //     // {
        //     //   dividendGrowth: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   cashGrowth: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   debtGorwth: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   marketCapGrowth: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   epsGrowth: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   operatingIncome: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   opIncomeGrowthQuat: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   opIncomeGrowthYearly: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   revenueTTM: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   revenueGrowthYearly: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   revenueGrowthQuat: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   sharesChangeYearly: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // },
        //     // {
        //     //   sharesChangeQuarterly: {
        //     //     OR: [
        //     //       { gte: searchNumbers },
        //     //       {
        //     //         lte: searchNumbers
        //     //       }
        //     //     ]
        //     //   }
        //     // }
        //   ]
        // },

        include: {
          Ticker: true
        },
        skip,
        take
      });

      const structredData = data.map((Ticker) => {
        return {
          ...Ticker,
          ...{ Ticker: Ticker?.Ticker?.ticker }
        };
      });
      if (!search == undefined) {
        return structredData;
      }
      // console.log(structredData);
      const filteredData = structredData?.filter((item) => {
        for (const key in item) {
          if (FilterSearch(item[key], search)) {
            return true;
          }
        }
        return false;
      });

      return {
        count:
          filteredData?.length !== 0
            ? filteredData?.length
            : structredData?.length,
        data: filteredData?.length !== 0 ? filteredData : structredData
      };
    }
  }
};

module.exports = TTMResolvers;
