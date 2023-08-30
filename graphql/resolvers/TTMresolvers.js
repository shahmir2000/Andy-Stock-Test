const { PrismaClient, Type } = require("@prisma/client");
const { convertNumbersInArray } = require("../../utils/stock/numberConverter");

const prisma = new PrismaClient();

const TTMresolvers = {
  Query: {
    StocksScreener: async (_, { skip, take, search }) => {
      console.log("skip", skip, take, search);
      const count = await prisma.tTM.count({
        where: {
          OR: [
            {
              Ticker: {
                ticker: {
                  contains: search,
                  mode: "insensitive"
                }
              }
            },
            {
              industry: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              earningYieldY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              earningYieldQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              buybackYieldYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              buybackYieldQuat: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverFcfYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverFcfQuat: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverEbitYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverEbitQuat: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverSalesQuat: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverSalesYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              debtOverFcfY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              debtOverFcfQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceOverFcfRatioY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceOverFcfRatioQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalCashQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalCashY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              fcfGrowthY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              fcfGrowthQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              grossProfitGrowthY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              grossProfitGrowthQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              dividendYieldY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              dividendYieldQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              researchDevelopmentOverRevenueY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              researchDevelopmentOverRevenueQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netIncomeGrowthY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netIncomeGrowthQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              premarketPrice: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              fcfGrowthThreeYears: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              fcfGrowthFiveYears: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              forwardPe: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              returnOnEquity5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              returnOnAssets5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              returnOnCapital5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              lastSplitDate: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              lastStockSplit: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              lastStockSplitRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              float: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shortRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shortPercentShare: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              beta1Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowth3Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowth5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netIncomeGrowth3Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netIncomeGrowth5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              operatingIncomeGrowth3Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              grossProfit3Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              operatingIncomeGrowth5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              grossProfit5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revenueGrowth3Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revenueGrowth5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              ipoDate: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              employees: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              premarketPercentageChg: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceTargetPercentage: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              previousClose: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              anaylystRating: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              analystCount: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange1Day: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange1Week: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange1Month: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange6Month: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange1Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChangeThisYear: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange3Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange10Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange52WeekHigh: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange52WeekLow: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              RevOverEmployees: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              piotroskiFScore: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revGrowthNextYear: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revGrowthThisYear: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              InvTurnover: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              PayoutFreq: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              AltmanZScore: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revGrowthThisQuarter: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revGrowthNextQuarter: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shareholderYield: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              relativeVolume: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              averageVolume: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowthNextQuarter: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowthThisQuarter: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowthNextYear: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowthThisYear: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              cashOverMarketCap: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              financialReportDate: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              volume: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              dividend: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netCashOverDebtGrowth: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              lastClosePrice: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverEbitda: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverEarnings: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              forwardEvOverSales: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              pegRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              taxOverRevenue: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              quickRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              profOverEmployee: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              ExDividendDate: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sharesInstitutions: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sharesInsiders: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              operatingMargin: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sector: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              country: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              exchange: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              grossProfit: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              costOfRevenue: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sellingGeneralAdministrative: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              researchDevelopment: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalOperatingExpenses: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              interestExpense: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              incomeBeforeTax: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              incomeTax: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netIncome: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsActual: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              dilutedEspActual: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              dividendShare: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              profitMargin: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              ebitda: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              ebitdaMargin: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              ebit: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              ebitMargin: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              depreciationAndAmortization: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              freeCashFlowMargin: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              grossMargin: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              cashAndEquivalents: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shortTermInvestments: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              cashAndCashEquivalents: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              cashAndShortTermInvestments: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              receivables: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              inventory: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              otherCurrentAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalCurrentAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              propertyPlantAndEquipment: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              longTermInvestments: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              goodWillAndIntangibleAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              otherLongTermAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalLongTernAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              accountsPayable: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              deferredRevenue: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              currentDebt: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              otherCurrentLiabilities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalCurrentLiabilities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              longTernDebt: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalLongTermLiabilities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalLiabilities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalDebt: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              commonStock: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              retainedEarnings: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              comprehensiveIncome: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shareHoldersEquity: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalLiabilitiesAndEquity: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netCashOverDebt: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netCashperShare: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              workingCapital: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              bookValuePerShare: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shareBasedCompensation: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              otherOperatingActivities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              operatingCashFlow: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              capitalExpenditures: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              otherInvestingActivities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              investingCashFlow: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              dividendPaid: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shareIssuanceOverRepurchase: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              otherFinanceActivities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              financeCashFlow: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netCashFlow: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              freeCashFlow: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              freeCashFlowPerShare: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              marketCapitalization: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              enterpriseValue: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              peRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              psRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              pOverFcfRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              pOverOcfRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverSalesRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evEbitdaRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evEbitRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evFcfRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              debtOverEquityRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              debtOverEbitdaRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              debtFcfRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              currentRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              assetTurnover: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              returnOnEquity: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              returnOnAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              returnOnCapital: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              fcfYield: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              payoutRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revenueGrowthYOY: {
                contains: search,
                mode: "insensitive"
              }
            },

            {
              dividendGrowth: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              cashGrowth: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              debtGorwth: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              marketCapGrowth: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowth: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              operatingIncome: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              opIncomeGrowthQuat: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              opIncomeGrowthYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revenueTTM: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revenueGrowthYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revenueGrowthQuat: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sharesChangeYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sharesChangeQuarterly: {
                contains: search,
                mode: "insensitive"
              }
            }
          ]
        }
      });

      const data = await prisma.tTM.findMany({
        where: {
          OR: [
            {
              Ticker: {
                ticker: {
                  contains: search,
                  mode: "insensitive"
                }
              }
            },
            {
              industry: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              earningsDate: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              earningYieldY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              earningYieldQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              buybackYieldYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              buybackYieldQuat: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverFcfYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverFcfQuat: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverEbitYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverEbitQuat: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverSalesQuat: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverSalesYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              debtOverFcfY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              debtOverFcfQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceOverFcfRatioY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceOverFcfRatioQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalCashQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalCashY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              fcfGrowthY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              fcfGrowthQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              grossProfitGrowthY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              grossProfitGrowthQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              dividendYieldY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              dividendYieldQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              researchDevelopmentOverRevenueY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              researchDevelopmentOverRevenueQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netIncomeGrowthY: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netIncomeGrowthQ: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              premarketPrice: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              fcfGrowthThreeYears: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              fcfGrowthFiveYears: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              forwardPe: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              returnOnEquity5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              returnOnAssets5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              returnOnCapital5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              lastSplitDate: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              lastStockSplit: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              lastStockSplitRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              float: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shortRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shortPercentShare: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              beta1Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowth3Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowth5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netIncomeGrowth3Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netIncomeGrowth5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              operatingIncomeGrowth3Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              grossProfit3Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              operatingIncomeGrowth5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              grossProfit5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revenueGrowth3Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revenueGrowth5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              ipoDate: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              employees: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              premarketPercentageChg: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceTargetPercentage: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              previousClose: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              anaylystRating: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              analystCount: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange1Day: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange1Week: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange1Month: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange6Month: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange1Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChangeThisYear: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange3Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange5Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange10Year: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange52WeekHigh: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              priceChange52WeekLow: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              RevOverEmployees: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              piotroskiFScore: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revGrowthNextYear: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revGrowthThisYear: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              InvTurnover: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              PayoutFreq: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              AltmanZScore: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revGrowthThisQuarter: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revGrowthNextQuarter: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shareholderYield: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              relativeVolume: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              averageVolume: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowthNextQuarter: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowthThisQuarter: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowthNextYear: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowthThisYear: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              cashOverMarketCap: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              financialReportDate: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              volume: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              dividend: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netCashOverDebtGrowth: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              lastClosePrice: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverEbitda: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverEarnings: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              forwardEvOverSales: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              pegRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              taxOverRevenue: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              quickRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              profOverEmployee: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              ExDividendDate: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sharesInstitutions: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sharesInsiders: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              operatingMargin: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sector: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              country: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              exchange: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              grossProfit: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              costOfRevenue: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sellingGeneralAdministrative: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              researchDevelopment: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalOperatingExpenses: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              interestExpense: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              incomeBeforeTax: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              incomeTax: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netIncome: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsActual: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              dilutedEspActual: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              dividendShare: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              profitMargin: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              ebitda: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              ebitdaMargin: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              ebit: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              ebitMargin: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              depreciationAndAmortization: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              freeCashFlowMargin: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              grossMargin: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              cashAndEquivalents: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shortTermInvestments: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              cashAndCashEquivalents: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              cashAndShortTermInvestments: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              receivables: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              inventory: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              otherCurrentAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalCurrentAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              propertyPlantAndEquipment: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              longTermInvestments: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              goodWillAndIntangibleAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              otherLongTermAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalLongTernAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              accountsPayable: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              deferredRevenue: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              currentDebt: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              otherCurrentLiabilities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalCurrentLiabilities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              longTernDebt: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalLongTermLiabilities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalLiabilities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalDebt: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              commonStock: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              retainedEarnings: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              comprehensiveIncome: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shareHoldersEquity: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              totalLiabilitiesAndEquity: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netCashOverDebt: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netCashperShare: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              workingCapital: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              bookValuePerShare: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shareBasedCompensation: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              otherOperatingActivities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              operatingCashFlow: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              capitalExpenditures: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              otherInvestingActivities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              investingCashFlow: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              dividendPaid: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              shareIssuanceOverRepurchase: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              otherFinanceActivities: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              financeCashFlow: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              netCashFlow: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              freeCashFlow: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              freeCashFlowPerShare: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              marketCapitalization: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              enterpriseValue: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              peRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              psRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              pOverFcfRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              pOverOcfRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evOverSalesRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evEbitdaRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evEbitRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              evFcfRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              debtOverEquityRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              debtOverEbitdaRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              debtFcfRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              currentRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              assetTurnover: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              returnOnEquity: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              returnOnAssets: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              returnOnCapital: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              fcfYield: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              payoutRatio: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revenueGrowthYOY: {
                contains: search,
                mode: "insensitive"
              }
            },

            {
              dividendGrowth: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              cashGrowth: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              debtGorwth: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              marketCapGrowth: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              epsGrowth: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              operatingIncome: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              opIncomeGrowthQuat: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              opIncomeGrowthYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revenueTTM: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revenueGrowthYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              revenueGrowthQuat: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sharesChangeYearly: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              sharesChangeQuarterly: {
                contains: search,
                mode: "insensitive"
              }
            }
          ]
        },
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

      return {
        data: convertNumbersInArray(structredData),
        count
      };
    }
  }
};

module.exports = TTMresolvers;
