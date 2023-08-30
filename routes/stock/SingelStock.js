const {
  calculateGrossMargin,
  calculateMargin,
  calculatePsRatio,
  calculatePbRatio,
  calculateROE,
  calculateROA,
  calculateQuickRatio,
  calculateDebtOverVariable,
  calculateTaxOverRevenue,
  calculateForwardEvOverSales,
  calculateEvOverEarnings,
  calculateEvOverEbitda,
  calculateNetCashOverDebtGrowth,
  calculateEnterpriseValue,
  compareYear,
  calculateROC,
  calculateEvOverEbit,
  calculateDividendYield,
  lastClosePriceIdentifier,
  calculateEvOverFcf,
  priceCalculation,
  calculateTTM,
  dividendsPerYear,
  calculatePayoutRatio,
  calculatePriceOverFcfRatio,
  calculateCashOverMarketCap,
  calculateEvOverSales,
  calcualteFcfYield,
  calculateBuybackYield,
  calculateShareholderYield,
  revenueEstimateGrowth,
  revenueEstimateGrowthNextQuat,
  revGrowthThisYear,
  revGrowthNextYear,
  calculatePiotroskiFScore,
  calculatePreviousYearShares,
  calculateLastYearShares,
  calculateEarningsYield,
  division
} = require("../../utils/stock/stock.utils");

const {
  calculateGrowth,
  calculateFiveYear,
  calculateAltmanZScore,
  getMostRecentYearObject,
  sumUpRecentQuarter,
  comparedateFormulaIndex
} = require("../../utils/stock/stockTwo.utils");

const {
  stockTicker,
  getSocketData,
  stockDividend,
  stockAvgVol,
  stockPrice
} = require("../../services/stock/stock.services");
const {
  PriceChangesServices
} = require("../../services/stock/PriceChanges.services");
const {
  PreviousCloseServices
} = require("../../services/stock/PreviousClose.services");
const {
  YearlyGrowthTTM
} = require("../../services/stock/YearlyGrowthTTM.services");

const { delay, retryOperation } = require("../../utils/stock/delay");

const { PrismaClient, Type } = require("@prisma/client");
const prisma = new PrismaClient();

const apiToken = "63bf6ecd8c46c5.53082791";
const populateOneTicker = async ({ ticker }) => {
  await delay(1000);
  console.log("called external");
  const Ticker = ticker?.replace(".", "-");
  try {
    if (Ticker == null) {
      throw new Error("Invalid ticker");
    }

    // ============== API Calling Start ==============
    // stock data for ticker
    const data = await stockTicker({ ticker: Ticker, apiToken });
    // dividends data for stock ticker
    const dividends = await stockDividend({ ticker: Ticker, apiToken });
    // avgVol for stock ticker
    const avgvol = await stockAvgVol({ ticker: Ticker, apiToken });
    // price list day wise for stock
    const PriceChange = await stockPrice({ ticker: Ticker, apiToken });
    // ============== API Calling End ==============

    const industry = data?.General?.Industry;
    const Sector = data?.General?.Sector;
    const Exchange = data?.General?.Exchange;
    const country = data?.General?.AddressData?.Country;

    const IncomeStatementObjectYearly =
      data?.Financials?.Income_Statement?.yearly;

    const mostRecentDateBalanceSheetQuarterly =
      data?.Financials?.Balance_Sheet?.quarterly;

    const EarningsAnnual = data?.Earnings?.Annual;

    // Last Stock Split Ratio
    const LastStockSplitRatio = data?.SplitsDividends?.LastSplitFactor;

    // Last Stock Split
    let splitFactor;

    if (!LastStockSplitRatio) {
      splitFactor = "Never";
    } else {
      const splitRatioArray = LastStockSplitRatio?.split(":");
      if (splitRatioArray?.length > 0) {
        const firstNumber = parseInt(splitRatioArray[0]);
        const secondNumber = parseInt(splitRatioArray[1]);

        if (firstNumber < secondNumber) {
          splitFactor = "Reverse";
        } else {
          splitFactor = "Forward";
        }
      } else {
        splitFactor = "Never";
      }
    }

    // Last Stock Split Ratio
    const LastSplitDate = data?.SplitsDividends?.LastSplitDate;

    // --------------- Price changes ----------------
    // const PriceChanges = await PriceChangesServices({
    //   PriceChange,
    //   PremarketPrice
    // });
    //  ------------ dividendInfo -------
    const dividendInfo = data?.SplitsDividends?.NumberDividendsByYear;
    //.........   52 week High   ......
    const WeekHigh52 = data?.Technicals["52WeekHigh"];
    //.........   52 week Low   ......
    const WeekLow52 = data?.Technicals["52WeekLow"];

    //  Analyst Rating
    const AnalystRating = data?.AnalystRatings?.Rating || null;

    // Analyst   Count
    const {
      StrongBuy = null,
      Buy = null,
      Hold = null,
      Sell = null,
      StrongSell = null
    } = data?.AnalystRatings || {};

    const AnalystCount = StrongBuy + Buy + Hold + Sell + StrongSell;
    // Price Target (%)
    const PriceTargetPer = data?.AnalystRatings?.TargetPrice || null;
    // Previous close
    const previousDayClose = await PreviousCloseServices({ PriceChange });

    // Employees

    const Employees = data?.General?.FullTimeEmployees;

    // Founded
    const Founded = null;

    // IPO Date
    const IPODate = data?.General?.IPODate;
    // Revenue Quarterly

    const mostRecentDateObject = data?.Financials?.Income_Statement?.quarterly;

    // Revenue Quaterly

    // // ***************  Growth Yearly TTM **************
    const YearlyGrowthTTMs = await YearlyGrowthTTM({
      IncomeStatementObjectYearly,
      EarningsAnnual
    });

    // ******************* Beta(1)  ****************
    const Beta1Year = data?.Technicals?.Beta;

    // ******************* Short % Float  ****************
    const ShortPercentFloat = data?.SharesStats?.ShortPercentFloat;

    // ******************* Short % Shares  ****************

    const sharesOutstanding = data?.SharesStats?.SharesOutstanding;
    const sharesShort = data?.Technicals?.SharesShort;
    const subtractShortShareData = sharesOutstanding - sharesShort;
    const ShortPercentShare =
      (subtractShortShareData / sharesOutstanding) * 100;

    // ======================= junaid start ======================
    const balanceSheet_quat_org = Object.values(
      data?.Financials?.Balance_Sheet?.quarterly
    );

    const balanceSheet_yearly_org = Object.values(
      data?.Financials?.Balance_Sheet?.yearly
    );

    const cashFlow_quat_org = Object.values(
      data?.Financials?.Cash_Flow?.quarterly
    );

    const cashFlow_yearly_org = Object.values(
      data?.Financials?.Cash_Flow?.yearly
    );

    const incomeStatement_quat_org = Object.values(
      data?.Financials?.Income_Statement?.quarterly
    );

    const incomeStatement_yearly_org = Object.values(
      data?.Financials?.Income_Statement?.yearly
    );

    const outstandingSharesAnnual = Object.values(
      data?.outstandingShares?.annual
    );

    const outstandingSharesQuat = Object.values(
      data?.outstandingShares?.quarterly
    );

    const earningHistoryQuat = Object.values(data?.Earnings?.History);
    const earningHistoryAnnual = Object.values(data?.Earnings?.Annual);

    const outstandingSharesAnnualTemp = [...outstandingSharesAnnual];
    // removing the current year's because we have the marketcap ttm already in TTM and in marketcap quat
    outstandingSharesAnnualTemp?.shift();

    // eps
    const earningsQuat = earningHistoryQuat.map((item) => {
      const currentEps = comparedateFormulaIndex({
        data: earningHistoryQuat,
        object: item?.date
      });

      const sameDayPrice = PriceChange.find(
        (p_item) => p_item?.date === item?.date
      );

      // find previous quarter's value
      const prevEps = earningHistoryQuat[currentEps + 1];

      const response = ({ price }) => {
        return {
          date: item?.date,
          epsActual: item?.epsActual?.toString() || null,
          earningYield: calculateEarningsYield({
            eps: item?.epsActual,
            price: price?.close
          })?.toString(),
          epsGrowth: prevEps
            ? calculateGrowth(item?.epsActual, prevEps?.epsActual)?.toString()
            : null,
          peRatio: division({
            price: price?.close,
            epsActual: item?.epsActual
          }),
          epsEstimate: item?.epsEstimate?.toString() || null
        };
      };

      if (!sameDayPrice) {
        const closestDatePrice = lastClosePriceIdentifier({
          date: item?.date,
          PriceChange
        });

        if (closestDatePrice) {
          return response({ price: closestDatePrice });
        }
      }

      return response({ price: sameDayPrice });
    });

    const earningsYearly = earningHistoryAnnual.map((item) => {
      const currentEps = comparedateFormulaIndex({
        data: earningHistoryAnnual,
        object: item?.date
      });

      const sameDayPrice = PriceChange.find(
        (p_item) => p_item?.date === item?.date
      );

      const prevEps = earningHistoryAnnual[currentEps + 1];

      const response = ({ price }) => {
        return {
          date: item?.date,
          epsActual: item?.epsActual?.toString(),
          earningYield: calculateEarningsYield({
            eps: item?.epsActual,
            price: price?.close
          })?.toString(),
          epsGrowth: prevEps
            ? calculateGrowth(item?.epsActual, prevEps?.epsActual)?.toString()
            : null,
          peRatio: (Number(price?.close) / Number(item?.epsActual))?.toString()
        };
      };

      if (!sameDayPrice) {
        const closestDatePrice = lastClosePriceIdentifier({
          date: item?.date,
          PriceChange
        });

        if (closestDatePrice) {
          return response({ price: closestDatePrice });
        }
      }

      return response({ price: sameDayPrice });
    });

    // dividends
    const dividendsQuat = dividends?.map((item, index) => {
      const sameDayPrice = PriceChange?.find(
        (p_item) => p_item?.date === item?.date
      );

      const sameInEarnings = earningHistoryQuat?.find((p_item) =>
        compareYear({
          dateOne: p_item?.date,
          dateTwo: item?.date
        })
      );

      return {
        date: item.date,
        dividendShare: item?.value.toString(),
        dividendYield: calculateDividendYield({
          price: sameDayPrice?.close,
          dividendShare: item?.value
        })?.toString(),
        payoutRatio: sameInEarnings
          ? calculatePayoutRatio({
              dividendShare: item?.value,
              epsActual: sameInEarnings ? sameInEarnings?.epsActual : null
            })?.toString()
          : null
      };
    });

    const dividends_yearly = dividendsPerYear({
      dividends
    });

    const dividendsYearly = dividends_yearly?.map((item) => {
      const sameDayPrice = PriceChange?.find(
        (p_item) => p_item?.date === item?.date
      );

      const sameInEarnings = earningHistoryAnnual?.find((p_item) =>
        compareYear({
          dateOne: p_item?.date,
          dateTwo: item?.date
        })
      );

      return {
        date: item.date,
        dividendShare: item?.value.toString(),
        dividendYield: calculateDividendYield({
          price: sameDayPrice?.close,
          dividendShare: item?.value
        })?.toString(),
        payoutRatio: sameInEarnings
          ? calculatePayoutRatio({
              dividendShare: item?.value,
              epsActual: sameInEarnings ? sameInEarnings?.epsActual : null
            })?.toString()
          : null
      };
    });

    // ratios
    const ratiosAndMetricsYearly = outstandingSharesAnnualTemp?.map((item) => {
      const sameDayPrice = PriceChange?.find(
        (p_item) => p_item?.date === item?.dateFormatted
      );

      const sameInBalanceSheet = balanceSheet_yearly_org?.find((b_item) =>
        compareYear({
          dateOne: b_item?.date,
          dateTwo: item?.dateFormatted
        })
      );

      const sameInIncomeStatement = incomeStatement_yearly_org?.find((b_item) =>
        compareYear({
          dateOne: b_item?.date,
          dateTwo: item?.dateFormatted
        })
      );

      const sameInCashFlow = cashFlow_yearly_org?.find((b_item) =>
        compareYear({
          dateOne: b_item?.date,
          dateTwo: item?.dateFormatted
        })
      );

      const response = ({ price }) => {
        return {
          date: item?.dateFormatted,
          quater: item?.date,
          marketCap: (Number(item?.shares) * Number(price?.close))?.toString(),
          enterpriseValue: calculateEnterpriseValue({
            marketCap: Number(item?.shares) * Number(price?.close),
            netDebt: sameInBalanceSheet?.netDebt,
            cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
          })?.toString(),
          evOverEbit: calculateEvOverEbit({
            ebit: sameInIncomeStatement?.ebit,
            marketCap: Number(item?.shares) * Number(price?.close),
            netDebt: sameInBalanceSheet?.netDebt,
            cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
          })?.toString(),
          evOverSales: calculateEvOverSales({
            enterpriseValue: calculateEnterpriseValue({
              marketCap: Number(item?.shares) * Number(price?.close),
              netDebt: sameInBalanceSheet?.netDebt,
              cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
            }),
            totalRevenue: sameInIncomeStatement?.totalRevenue
          })?.toString(),
          evOverFcf: sameInCashFlow
            ? calculateEvOverFcf({
                enterpriseValue: calculateEnterpriseValue({
                  marketCap: Number(item?.shares) * Number(price?.close),
                  netDebt: sameInBalanceSheet?.netDebt,
                  cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
                }),
                freeCashFlow: sameInCashFlow?.freeCashFlow
              })?.toString()
            : null,
          fcfYield: sameInCashFlow
            ? calcualteFcfYield({
                freeCashFlow: sameInCashFlow?.freeCashFlow,
                MarketCapitalization:
                  Number(item?.shares) * Number(price?.close)
              })?.toString()
            : null,
          buybackYield: calculateBuybackYield({
            salePurchaseOfStock: sameInCashFlow?.salePurchaseOfStock,
            marketCap: Number(item?.shares) * Number(price?.close)
          })?.toString()
        };
      };

      if (!sameDayPrice) {
        const closestDatePrice = lastClosePriceIdentifier({
          date: item?.dateFormatted,
          PriceChange
        });

        if (closestDatePrice) {
          return response({ price: closestDatePrice });
        }
      }

      // If either the same-day or closest-date price is found, use it for calculations
      return response({ price: sameDayPrice });
    });

    const ratiosAndMetricsQuat = outstandingSharesQuat?.map((item, index) => {
      const sameDayPrice = PriceChange?.find(
        (p_item) => p_item?.date === item?.dateFormatted
      );

      const sameInBalanceSheet = balanceSheet_quat_org?.find(
        (b_item) => b_item?.date === item?.dateFormatted
      );

      const sameInIncomeStatement = incomeStatement_quat_org?.find(
        (b_item) => b_item?.date === item?.dateFormatted
      );

      const sameInCashFlow = cashFlow_quat_org?.find(
        (b_item) => b_item?.date === item?.dateFormatted
      );

      const response = ({ price }) => {
        return {
          date: item?.dateFormatted,
          quater: item?.date.toString(),
          marketCap: (Number(item?.shares) * Number(price?.close))?.toString(),
          enterpriseValue: calculateEnterpriseValue({
            marketCap: Number(item?.shares) * Number(price?.close),
            netDebt: sameInBalanceSheet?.netDebt,
            cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
          })?.toString(),
          evOverEbit: calculateEvOverEbit({
            ebit: sameInIncomeStatement?.ebit,
            marketCap: Number(item?.shares) * Number(price?.close),
            netDebt: sameInBalanceSheet?.netDebt,
            cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
          })?.toString(),
          evOverSales: calculateEvOverSales({
            enterpriseValue: calculateEnterpriseValue({
              marketCap: Number(item?.shares) * Number(price?.close),
              netDebt: sameInBalanceSheet?.netDebt,
              cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
            }),
            totalRevenue: sameInIncomeStatement?.totalRevenue
          })?.toString(),
          evOverFcf: sameInCashFlow
            ? calculateEvOverFcf({
                enterpriseValue: calculateEnterpriseValue({
                  marketCap: Number(item?.shares) * Number(price?.close),
                  netDebt: sameInBalanceSheet?.netDebt,
                  cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
                }),
                freeCashFlow: sameInCashFlow?.freeCashFlow
              })?.toString()
            : null,
          fcfYield: sameInCashFlow
            ? calcualteFcfYield({
                freeCashFlow: sameInCashFlow?.freeCashFlow,
                MarketCapitalization:
                  Number(item?.shares) * Number(price?.close)
              })?.toString()
            : null,
          buybackYield: calculateBuybackYield({
            salePurchaseOfStock: sameInCashFlow?.salePurchaseOfStock,
            marketCap: Number(item?.shares) * Number(price?.close)
          })?.toString()
        };
      };

      if (!sameDayPrice) {
        const closestDatePrice = lastClosePriceIdentifier({
          date: item?.dateFormatted,
          PriceChange
        });

        if (closestDatePrice) {
          return response({ price: closestDatePrice });
        }
      }

      // If either the same-day or closest-date price is found, use it for calculations
      return response({ price: sameDayPrice });
    });

    // balancesheet
    const balanceSheet_quat = balanceSheet_quat_org?.map((item) => {
      const sameInIncomeStatement = incomeStatement_quat_org?.find(
        (b_item) => b_item?.date === item?.date
      );
      const sameInCashFlow = cashFlow_quat_org?.find(
        (b_item) => b_item?.date === item?.date
      );
      const sameDayPrice = PriceChange?.find(
        (p_item) => p_item?.date === item?.dateFormatted
      );

      console.log(
        "Number(item?.cashAndEquivalents) =============>>",
        Number(item?.cashAndEquivalents),
        Number(item?.totalCurrentLiabilities)
      );
      const response = ({ price }) => {
        return {
          date: item?.date,
          sharesOut: item?.commonStockSharesOutstanding?.toString(),
          netCashOverDebt: (Number(item?.cashAndEquivalents) &&
          Number(item?.totalCurrentLiabilities)
            ? Number(item?.cashAndEquivalents) /
              Number(item?.totalCurrentLiabilities)
            : null
          )?.toString(),
          totalCash: item.cashAndEquivalents?.toString(),
          totalDebt: (
            Number(item.shortTermDebt) + Number(item.longTermDebt)
          )?.toString(),
          currentRatio: (
            Number(item.totalCurrentAssets) /
            Number(item.totalCurrentLiabilities)
          )?.toString(),
          totalAssets: item?.totalAssets?.toString(),
          totalLiab: item?.totalLiab?.toString(),
          pbRatio: calculatePbRatio(
            PriceChange[PriceChange.length - 1]?.close,
            item?.totalAssets,
            item?.totalLiab
          )?.toString(),
          debtOverEquity: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: item?.totalStockholderEquity
          })?.toString(),
          debtOverEbitda: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: sameInIncomeStatement?.ebitda
          })?.toString(),
          debtOverFcf: sameInCashFlow
            ? calculateDebtOverVariable({
                shortTermDebt: item?.shortTermDebt,
                longTermDebt: item?.longTermDebt,
                dividedBy: sameInCashFlow?.freeCashFlow
              })?.toString()
            : null,
          shareHolderEquity: item?.totalStockholderEquity?.toString(),
          workingCapital: item?.netWorkingCapital?.toString(),
          assetTurnover: (
            Number(sameInIncomeStatement?.totalRevenue) /
            Number(item?.totalAssets)
          )?.toString(),
          returnOnCapital: calculateROC({
            totalAssets: item?.totalAssets,
            totalCurrentAssets: item?.totalCurrentAssets,
            ebit: sameInIncomeStatement?.ebit
          })?.toString(),
          netCashOverDebtGrowth: (
            (Number(item?.cashAndEquivalents) /
              Number(item?.shortLongTermDebtTotal)) *
            100
          )?.toString(),
          priceOverFcfRatio: sameInCashFlow
            ? calculatePriceOverFcfRatio({
                price: price?.close,
                freeCashFlow: sameInCashFlow?.freeCashFlow,
                commonStockSharesOutstanding: item?.commonStockSharesOutstanding
              })?.toString()
            : null
        };
      };

      if (!sameDayPrice) {
        const closestDatePrice = lastClosePriceIdentifier({
          date: item?.date,
          PriceChange
        });

        if (closestDatePrice) {
          return response({ price: closestDatePrice });
        }
      }

      return response({ price: sameDayPrice });
    });

    const balanceSheet_yearly = balanceSheet_yearly_org?.map((item) => {
      const sameInIncomeStatement = incomeStatement_yearly_org?.find(
        (b_item) => b_item?.date === item?.date
      );

      const sameInCashFlow = cashFlow_yearly_org.find(
        (b_item) => b_item?.date === item?.date
      );

      const sameDayPrice = PriceChange.find(
        (p_item) => p_item?.date === item?.dateFormatted
      );

      const response = ({ price }) => {
        return {
          date: item?.date,

          totalCash: item.cashAndEquivalents?.toString(),
          netCashOverDebt: (
            Number(item?.cashAndEquivalents) /
            Number(item?.totalCurrentLiabilities)
          )?.toString(),
          totalDebt: (
            Number(item.shortTermDebt) + Number(item.longTermDebt)
          )?.toString(),
          currentRatio: (
            Number(item.totalCurrentAssets) /
            Number(item.totalCurrentLiabilities)
          )?.toString(),
          totalAssets: item?.totalAssets?.toString(),
          totalLiab: item?.totalLiab?.toString(),
          pbRatio: calculatePbRatio(
            PriceChange[PriceChange.length - 1]?.close,
            item?.totalAssets,
            item?.totalLiab
          )?.toString(),
          debtOverEquity: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: item?.totalStockholderEquity
          })?.toString(),
          debtOverEbitda: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: sameInIncomeStatement?.ebitda
          })?.toString(),
          debtOverFcf: sameInCashFlow
            ? calculateDebtOverVariable({
                shortTermDebt: item?.shortTermDebt,
                longTermDebt: item?.longTermDebt,
                dividedBy: sameInCashFlow?.freeCashFlow
              })?.toString()
            : null,
          shareHolderEquity: item?.totalStockholderEquity?.toString(),
          workingCapital: item?.netWorkingCapital?.toString(),
          assetTurnover: (
            Number(sameInIncomeStatement?.totalRevenue) /
            Number(item?.totalAssets)
          )?.toString(),
          returnOnCapital: calculateROC({
            totalAssets: item?.totalAssets,
            totalCurrentAssets: item?.totalCurrentAssets,
            ebit: sameInIncomeStatement?.ebit
          })?.toString(),
          netCashOverDebtGrowth: (
            (Number(item?.cashAndEquivalents) /
              Number(item?.shortLongTermDebtTotal)) *
            100
          )?.toString(),
          priceOverFcfRatio: sameInCashFlow
            ? calculatePriceOverFcfRatio({
                price: price?.close,
                freeCashFlow: sameInCashFlow?.freeCashFlow,
                commonStockSharesOutstanding: item?.commonStockSharesOutstanding
              })?.toString()
            : null
        };
      };

      if (!sameDayPrice) {
        const closestDatePrice = lastClosePriceIdentifier({
          date: item?.date,
          PriceChange
        });

        if (closestDatePrice) {
          return response({ price: closestDatePrice });
        }
      }

      return response({ price: sameDayPrice });
    });

    // cashflow
    const cashFlow_quat_price_map = cashFlow_quat_org?.map((item, index) => {
      const priceObj = PriceChange?.find(
        (priceItem) => priceItem?.date === item?.date
      );

      const sameInBalanceSheet = balanceSheet_quat_org?.find(
        (b_item) => b_item?.date === item?.date
      );

      return {
        date: item?.date,
        finCashFlow: item?.totalCashFromFinancingActivities?.toString(),
        sharedBasedCompensation: item?.stockBasedCompensation?.toString(),
        invCashFlow: item?.totalCashflowsFromInvestingActivities?.toString(),
        operatingCashFlow: item?.totalCashFromOperatingActivities?.toString(),
        fcfGrowth: cashFlow_yearly_org[index + 1]?.freeCashFlow
          ? calculateGrowth(
              item?.freeCashFlow,
              cashFlow_yearly_org[index + 1]?.freeCashFlow
            )?.toString()
          : null,
        fcfOverShare: (
          Number(item?.freeCashFlow) /
          Number(sameInBalanceSheet?.commonStockSharesOutstanding)
        )?.toString(),
        netCashFlow: item?.changeInCash?.toString(),
        commonStockSharesOutstanding:
          sameInBalanceSheet?.commonStockSharesOutstanding?.toString(),
        freeCashFlow: item?.freeCashFlow?.toString(),
        close: priceObj?.close?.toString(),
        returnOnEquity: calculateROE({
          netIncome: item?.netIncome,
          balanceSheet_org: balanceSheet_quat_org,
          cashFlowDate: item?.date
        })?.toString(),
        returnOnAssets: calculateROA({
          netIncome: item?.netIncome,
          balanceSheet_org: balanceSheet_quat_org,
          cashFlowDate: item?.date
        })?.toString()
      };
    });

    const cashFlow_quat = priceCalculation({
      PriceChange,
      price_map: cashFlow_quat_price_map
    });

    const cashFlow_yearly_price_map = cashFlow_yearly_org?.map(
      (item, index) => {
        const priceObj = PriceChange?.find(
          (priceItem) => priceItem?.date === item?.date
        );

        const sameInBalanceSheet = balanceSheet_yearly_org?.find(
          (b_item) => b_item?.date === item?.date
        );

        return {
          date: item?.date,
          finCashFlow: item?.totalCashFromFinancingActivities?.toString(),
          invCashFlow: item?.totalCashflowsFromInvestingActivities?.toString(),
          sharedBasedCompensation: item?.stockBasedCompensation?.toString(),
          operatingCashFlow: item?.totalCashFromOperatingActivities?.toString(),
          fcfGrowth: cashFlow_yearly_org[index + 1]?.freeCashFlow
            ? calculateGrowth(
                item?.freeCashFlow,
                cashFlow_yearly_org[index + 1]?.freeCashFlow
              )?.toString()
            : null,
          fcfOverShare: (
            Number(item?.freeCashFlow) /
            Number(sameInBalanceSheet?.commonStockSharesOutstanding)
          )?.toString(),
          netCashFlow: item?.changeInCash?.toString(),
          commonStockSharesOutstanding:
            sameInBalanceSheet?.commonStockSharesOutstanding?.toString(),
          freeCashFlow: item?.freeCashFlow?.toString(),
          close: priceObj?.close?.toString(),
          returnOnEquity: calculateROE({
            netIncome: item?.netIncome,
            balanceSheet_org: balanceSheet_yearly_org,
            cashFlowDate: item?.date
          })?.toString(),
          returnOnAssets: calculateROA({
            netIncome: item?.netIncome,
            balanceSheet_org: balanceSheet_yearly_org,
            cashFlowDate: item?.date
          })?.toString()
        };
      }
    );

    const cashFlow_yearly = priceCalculation({
      PriceChange,
      price_map: cashFlow_yearly_price_map
    });

    // IncomeStatement
    const incomeStatement_quat = incomeStatement_quat_org?.map(
      (item, index) => {
        return {
          date: item?.date,
          netIncome: item?.netIncome?.toString(),
          netIncomeGrowth: incomeStatement_quat_org[index + 1]?.netIncome
            ? calculateGrowth(
                item?.netIncome,
                incomeStatement_quat_org[index + 1]?.netIncome
              )?.toString()
            : null,
          operatingIncome: item?.operatingIncome?.toString(),
          opIncomeGrowth: incomeStatement_quat_org[index + 1]?.operatingIncome
            ? calculateGrowth(
                item?.operatingIncome,
                incomeStatement_quat_org[index + 1]?.operatingIncome
              )?.toString()
            : null,
          grossProfit: item?.grossProfit?.toString(),
          ebit: item?.ebit?.toString(),
          ebitda: item?.ebitda?.toString(),
          grossProfitGrowth: incomeStatement_quat_org[index + 1]?.grossProfit
            ? calculateGrowth(
                item?.grossProfit,
                incomeStatement_quat_org[index + 1]?.grossProfit
              )?.toString()
            : null,
          totalRevenue: item?.totalRevenue?.toString(),
          revenueGrowth: incomeStatement_quat_org[index + 1]?.totalRevenue
            ? calculateGrowth(
                item?.totalRevenue,
                incomeStatement_quat_org[index + 1]?.totalRevenue
              )?.toString()
            : null,
          grossMargin: calculateGrossMargin(
            item?.totalRevenue,
            item?.costOfRevenue
          )?.toString(),
          operatingMargin: calculateMargin(
            item?.operatingIncome,
            item?.totalRevenue
          )?.toString(),
          profitMargin: calculateMargin(
            item?.netIncome,
            item?.totalRevenue
          )?.toString(),
          fcfMargin: cashFlow_quat_org?.reduce((fcfAcc, cash) => {
            if (item?.date === cash?.date) {
              const margin = calculateMargin(
                cash?.freeCashFlow,
                item?.totalRevenue
              );
              fcfAcc = margin;
            }
            return fcfAcc?.toString();
          }, null),
          ebitdaMargin: calculateMargin(
            item?.ebitda,
            item?.totalRevenue
          )?.toString(),
          ebitMargin: calculateMargin(
            item?.ebit,
            item?.totalRevenue
          )?.toString(),
          researchDevelopment: item?.researchDevelopment?.toString(),
          researchDevelopmentOverRevenue: calculateMargin(
            item?.researchDevelopment,
            item?.totalRevenue
          )?.toString(),
          psRatio: balanceSheet_quat_org?.reduce((psAcc, balance) => {
            if (item?.date === balance?.date) {
              const psRatio = calculatePsRatio(
                item?.totalRevenue,
                balance?.commonStockSharesOutstanding,
                PriceChange[PriceChange.length - 1]?.close
              );
              psAcc = psRatio;
            }
            return psAcc?.toString();
          }, null)
        };
      }
    );

    const incomeStatement_yearly = incomeStatement_yearly_org?.map(
      (item, index) => {
        return {
          date: item?.date,
          netIncome: item?.netIncome?.toString(),
          netIncomeGrowth: incomeStatement_yearly_org[index + 1]?.netIncome
            ? calculateGrowth(
                item?.netIncome,
                incomeStatement_yearly_org[index + 1]?.netIncome
              )?.toString()
            : null,
          operatingIncome: item?.operatingIncome?.toString(),
          opIncomeGrowth: incomeStatement_yearly_org[index + 1]?.operatingIncome
            ? calculateGrowth(
                item?.operatingIncome,
                incomeStatement_yearly_org[index + 1]?.operatingIncome
              )?.toString()
            : null,
          ebit: item?.ebit?.toString(),
          ebitda: item?.ebitda?.toString(),
          grossProfit: item?.grossProfit?.toString(),
          grossProfitGrowth: incomeStatement_yearly_org[index + 1]?.grossProfit
            ? calculateGrowth(
                item?.grossProfit,
                incomeStatement_yearly_org[index + 1]?.grossProfit
              )?.toString()
            : null,
          totalRevenue: item?.totalRevenue?.toString(),
          revenueGrowth: incomeStatement_yearly_org[index + 1]?.totalRevenue
            ? calculateGrowth(
                item?.totalRevenue,
                incomeStatement_yearly_org[index + 1]?.totalRevenue
              )?.toString()
            : null,
          grossMargin: calculateGrossMargin(
            item?.totalRevenue,
            item?.costOfRevenue
          )?.toString(),
          operatingMargin: calculateMargin(
            item?.operatingIncome,
            item?.totalRevenue
          )?.toString(),
          profitMargin: calculateMargin(
            item?.netIncome,
            item?.totalRevenue
          )?.toString(),
          fcfMargin: cashFlow_yearly_org?.reduce((fcfAcc, cash) => {
            if (item?.date === cash?.date) {
              const margin = calculateMargin(
                cash?.freeCashFlow,
                item?.totalRevenue
              );
              fcfAcc = margin;
            }
            return fcfAcc?.toString();
          }, null),
          ebitdaMargin: calculateMargin(
            item?.ebitda,
            item?.totalRevenue
          )?.toString(),
          ebitMargin: calculateMargin(
            item?.ebit,
            item?.totalRevenue
          )?.toString(),
          researchDevelopment: item?.researchDevelopment?.toString(),
          researchDevelopmentOverRevenue: calculateMargin(
            item?.researchDevelopment,
            item?.totalRevenue
          )?.toString(),
          psRatio: balanceSheet_yearly_org?.reduce((psAcc, balance) => {
            if (item?.date === balance?.date) {
              const psRatio = calculatePsRatio(
                item?.totalRevenue,
                balance?.commonStockSharesOutstanding,
                PriceChange[PriceChange.length - 1]?.close
              );
              psAcc = psRatio;
            }
            return psAcc?.toString();
          }, null)
        };
      }
    );
    // ======================= junaid end ========================

    // ============= talha start TTM ===============

    //get data from highlights
    const {
      RevenueTTM,
      GrossProfitTTM,
      MostRecentQuarter,
      DilutedEpsTTM,
      DividendShare,
      OperatingMarginTTM,
      ProfitMargin,
      EBITDA,
      BookValue,
      MarketCapitalization,
      PERatio,
      PEGRatio,
      EPSEstimateNextQuarter,
      EPSEstimateNextYear,
      EPSEstimateCurrentQuarter,
      EPSEstimateCurrentYear,
      ReturnOnAssetsTTM
    } = data.Highlights;

    const ReoEquity5year = calculateFiveYear(cashFlow_yearly, "returnOnEquity");
    const ReoAssets5year = calculateFiveYear(cashFlow_yearly, "returnOnAssets");

    //get data from valuation
    const EnterpriseValue = data?.Valuation?.EnterpriseValue;
    const ForwardPE = data?.Valuation?.ForwardPE;

    //get data from SharesStats
    const {
      SharesOutstanding,
      PercentInsiders,
      PercentInstitutions,
      SharesFloat
    } = data.SharesStats;

    //get data from SplitsDividends
    const ExDividendDate = data?.SplitsDividends?.ExDividendDate;
    const ForwardAnnualDividendRate =
      data?.SplitsDividends?.ForwardAnnualDividendRate;

    //get data from SplitsDividends
    const FullTimeEmployees = data.General?.FullTimeEmployees;
    const ShortRatio = data?.Technicals?.ShortRatio;

    //get historyInEarnings
    const historyInEarnings = Object.values(data?.Earnings?.History);
    const trendInEarnings = Object.values(data?.Earnings?.Trend);

    //get epsActual
    const epsActual = () => {
      const sameQuat = historyInEarnings?.find(
        (h_items) => h_items?.date === MostRecentQuarter
      );
      return sameQuat?.epsActual;
    };

    //get financialReportDate
    const financialReportDate = () => {
      const sameQuat = historyInEarnings?.find(
        (h_items) => h_items?.date === MostRecentQuarter
      );
      return sameQuat?.reportDate;
    };

    //get previousEpsActual
    const previousActual = () => {
      const previousQuatIndex = comparedateFormulaIndex({
        data: historyInEarnings,
        object: MostRecentQuarter
      });

      if (previousQuatIndex >= 1) {
        const previousQuat = historyInEarnings[previousQuatIndex + 1];
        return previousQuat ? previousQuat?.epsActual : null;
      } else {
        console.log("No previousActual Found!");
        return null;
      }
    };

    //calculate return on capital growth 5 year
    const ROC5Year = calculateGrowth(
      balanceSheet_yearly[0]?.returnOnCapital,
      balanceSheet_yearly[4]?.returnOnCapital
    );

    //TTMS
    const TTM = {
      sharesOutTTM: SharesOutstanding.toString(),
      fcfGrowthThreeYears: calculateGrowth(
        cashFlow_yearly_org[0]?.freeCashFlow,
        cashFlow_yearly_org[3]?.freeCashFlow
      )?.toString(),
      fcfGrowthFiveYears: calculateGrowth(
        cashFlow_yearly_org[0]?.freeCashFlow,
        cashFlow_yearly_org[5]?.freeCashFlow
      )?.toString(),
      forwardPe: ForwardPE?.toString(),
      returnOnEquity5Year: ReoEquity5year?.toString(),
      returnOnAssets5Year: ReoAssets5year?.toString(),
      returnOnCapital5Year: ROC5Year?.toString(),
      lastSplitDate: LastSplitDate,
      lastStockSplit: splitFactor?.toString(),
      lastStockSplitRatio: LastStockSplitRatio?.toString(),
      float: SharesFloat?.toString(),
      shortRatio: ShortRatio?.toString(),
      shortPercentShare: ShortPercentShare?.toString(),
      shortPercentFloat: ShortPercentFloat?.toString(),
      beta1Year: Beta1Year?.toString(),
      epsGrowth3Year: YearlyGrowthTTMs?.EpsGrowth3?.toString(),
      epsGrowth5Year: YearlyGrowthTTMs?.EpsGrowth5?.toString(),
      netIncomeGrowth3Year: YearlyGrowthTTMs?.NetIncomeGrowth3?.toString(),
      netIncomeGrowth5Year: YearlyGrowthTTMs?.NetIncomeGrowth5?.toString(),
      operatingIncomeGrowth3Year: YearlyGrowthTTMs?.OpIncomeGrowth3?.toString(),
      operatingIncomeGrowth5Year: YearlyGrowthTTMs?.OpIncomeGrowth5?.toString(),
      grossProfit3Year: YearlyGrowthTTMs?.GProfitGrowth3?.toString(),
      grossProfit5Year: YearlyGrowthTTMs?.GProfitGrowth5?.toString(),
      revenueGrowth3Year: YearlyGrowthTTMs?.RevGrowth3Year?.toString(),
      revenueGrowth5Year: YearlyGrowthTTMs?.RevGrowth5Year?.toString(),
      ipoDate: IPODate,
      founded: Founded?.toString(),
      employees: Employees?.toString(),
      forwardPs: (
        PriceChange[PriceChange?.length - 1]?.close?.toString() /
        trendInEarnings[0]?.revenueEstimateAvg
      )?.toString(),
      premarketPercentageChg: null,
      // premarketPercentageChg: PriceChanges?.PremktPercentChg
      //   ? PriceChanges.PremktPercentChg?.toString()
      //   : null,
      premarketPrice: null,
      priceTargetPercentage: PriceTargetPer?.toString(),
      previousClose: previousDayClose?.toString(),
      anaylystRating: AnalystRating ? AnalystRating?.toString() : null,
      analystCount: AnalystCount?.toString(),
      priceChange1Day: null,
      priceChange1Week: null,
      priceChange1Month: null,
      priceChange6Month: null,
      priceChange1Year: null,
      priceChangeThisYear: null,
      priceChange3Year: null,
      priceChange5Year: null,
      priceChange10Year: null,
      // priceChange1Day: PriceChanges.PriceChange1D?.toString(),
      // priceChange1Week: PriceChanges?.PriceChange1W.toString(),
      // priceChange1Month: PriceChanges?.PriceChange1M?.toString(),
      // priceChange6Month: PriceChanges?.PriceChange6M?.toString(),
      // priceChange1Year: PriceChanges?.PriceChange1Y?.toString(),
      // priceChangeThisYear: PriceChanges?.PriceChangeThisYear?.toString(),
      // priceChange3Year: PriceChanges?.PriceChange3Y?.toString(),
      // priceChange5Year: PriceChanges?.PriceChange5Y?.toString(),
      // priceChange10Year: PriceChanges?.PriceChange10Y?.toString(),
      priceChange52WeekHigh: WeekHigh52?.toString(),
      priceChange52WeekLow: WeekLow52?.toString(),
      sharesChange: {
        sharesChangeYearly: calculateGrowth(
          outstandingSharesAnnual[0]?.shares,
          outstandingSharesAnnual[1]?.shares
        )?.toString(),
        sharesChangeQuarterly: calculateGrowth(
          outstandingSharesQuat[0]?.shares,
          outstandingSharesQuat[1]?.shares
        )?.toString()
      },
      RevOverEmployees: (RevenueTTM / FullTimeEmployees)?.toString(),
      piotroskiFScore: calculatePiotroskiFScore({
        netIncome: Number(cashFlow_yearly_org[0]?.netIncome),
        ReturnOnAssetsTTM,
        totalCashFromOperatingActivities: Number(
          cashFlow_yearly_org[0]?.totalCashFromOperatingActivities
        ),
        longTermDebt: {
          current: Number(balanceSheet_yearly_org[0]?.longTermDebt),
          previous: Number(balanceSheet_yearly_org[1]?.longTermDebt)
        },
        totalCurrentAssets: {
          current: Number(balanceSheet_yearly_org[0]?.totalCurrentAssets),
          previous: Number(balanceSheet_yearly_org[1]?.totalCurrentAssets)
        },
        totalCurrentLiabilities: {
          current: Number(balanceSheet_yearly_org[0]?.totalCurrentLiabilities),
          previous: Number(balanceSheet_yearly_org[1]?.totalCurrentLiabilities)
        },
        shares: {
          lastYear: calculateLastYearShares({ outstandingSharesAnnual }),
          prevYear: calculatePreviousYearShares({ outstandingSharesAnnual })
        },
        grossMargin: {
          lastYear: incomeStatement_yearly[0]?.grossMargin / 100,
          prevYear: incomeStatement_yearly[1]?.grossMargin / 100
        },
        assetTurnoverRatio: {
          lastYear: balanceSheet_yearly[0]?.assetTurnover,
          prevYear: balanceSheet_yearly[1]?.assetTurnover
        }
      })?.toString(),
      revGrowthNextYear: revGrowthNextYear({ trendInEarnings })?.toString(),
      revGrowthThisYear: revGrowthThisYear({ trendInEarnings })?.toString(),
      InvTurnover: (
        sumUpRecentQuarter({
          data: mostRecentDateObject,
          propertyName: "costOfRevenue"
        }) /
        (sumUpRecentQuarter({
          data: mostRecentDateBalanceSheetQuarterly,
          propertyName: "inventory"
        }) /
          4)
      )?.toString(),
      PayoutFreq: getMostRecentYearObject(dividendInfo)?.Count?.toString(),
      AltmanZScore: calculateAltmanZScore(
        data,
        Number(PriceChange[PriceChange?.length - 1]?.close)
      )?.toString(),
      revGrowthThisQuarter: revenueEstimateGrowth({
        trendInEarnings,
        MostRecentQuarter
      })?.toString(),

      revGrowthNextQuarter: revenueEstimateGrowthNextQuat({
        trendInEarnings,
        MostRecentQuarter
      })?.toString(),
      shareholderYield:
        dividendsQuat[dividendsQuat.length - 1]?.dividendYield &&
        ratiosAndMetricsQuat[0]?.buybackYield
          ? calculateShareholderYield({
              dividendYield:
                dividendsQuat[dividendsQuat.length - 1]?.dividendYield,
              buybackYield: ratiosAndMetricsQuat[0]?.buybackYield
            })?.toString()
          : null,
      relativeVolume: calculateGrowth(
        avgvol[avgvol.length - 1]?.avgvol,
        PriceChange[PriceChange?.length - 1]?.volume
      )?.toString(),
      averageVolume: avgvol[avgvol?.length - 1]?.avgvol?.toString(),
      epsGrowthNextQuarter: EPSEstimateNextQuarter?.toString(),
      epsGrowthThisQuarter: EPSEstimateCurrentQuarter?.toString(),
      epsGrowthNextYear: EPSEstimateNextYear?.toString(),
      epsGrowthThisYear: EPSEstimateCurrentYear?.toString(),
      cashOverMarketCap: calculateCashOverMarketCap({
        cashAndEquivalents: calculateTTM({
          array: balanceSheet_quat_org,
          variableName: "cashAndEquivalents"
        }),
        MarketCapitalization
      })?.toString(),
      financialReportDate: financialReportDate(),
      volume: PriceChange[PriceChange?.length - 1]?.volume?.toString(),
      dividend: ForwardAnnualDividendRate?.toString(),
      netCashOverDebtGrowth:
        balanceSheet_quat_org[0]?.cash &&
        balanceSheet_quat_org[0]?.shortTermDebt &&
        balanceSheet_yearly_org[0]?.cash &&
        balanceSheet_yearly_org[0]?.shortTermDebt
          ? calculateNetCashOverDebtGrowth({
              currentYear: {
                cash: balanceSheet_quat_org[0]?.cash,
                shortTermDebt: balanceSheet_quat_org[0]?.shortTermDebt
              },
              previousYear: {
                cash: balanceSheet_yearly_org[0]?.cash,
                shortTermDebt: balanceSheet_yearly_org[0]?.shortTermDebt
              }
            })?.toString()
          : null,
      lastClosePrice: PriceChange[PriceChange?.length - 1]?.close?.toString(),
      evOverEbitda:
        EnterpriseValue && EBITDA
          ? calculateEvOverEbitda({
              EnterpriseValue,
              ebitda: EBITDA
            })?.toString()
          : null,
      evOverEarnings:
        EnterpriseValue && cashFlow_yearly_org[0]?.netIncome
          ? calculateEvOverEarnings({
              EnterpriseValue,
              netIncome: cashFlow_yearly_org[0]?.netIncome
            })?.toString()
          : null,
      forwardEvOverSales: calculateForwardEvOverSales({
        EnterpriseValue,
        revenueEstimateAvg: Object.values(data?.Earnings?.Trend)[0]
          ?.revenueEstimateAvg
      })?.toString(),
      pegRatio: PEGRatio?.toString(),
      taxOverRevenue: calculateTaxOverRevenue({
        incomeTaxExpense: incomeStatement_yearly_org[0]?.incomeTaxExpense,
        incomeBeforeTax: incomeStatement_yearly_org[0]?.incomeBeforeTax
      })?.toString(),
      quickRatio: calculateQuickRatio({
        cash: balanceSheet_quat_org[0]?.cash,
        shortTermInvestments: balanceSheet_quat_org[0]?.shortTermInvestments,
        netReceivables: balanceSheet_quat_org[0]?.netReceivables,
        totalCurrentLiabilities:
          balanceSheet_quat_org[0]?.totalCurrentLiabilities
      })?.toString(),
      profOverEmployee: (Number(cashFlow_quat_org[0]?.netIncome) &&
      FullTimeEmployees
        ? Number(cashFlow_quat_org[0]?.netIncome) / FullTimeEmployees
        : null
      )?.toString(),
      ExDividendDate: ExDividendDate,
      sharesInstitutions: PercentInstitutions?.toString(),
      sharesInsiders: PercentInsiders?.toString(),
      operatingMargin: OperatingMarginTTM?.toString(),
      industry,
      sector: Sector,
      country,
      exchange: Exchange,
      revenue: {
        revenueTTM: RevenueTTM?.toString(),
        revenueGrowthYearly:
          incomeStatement_yearly[0]?.revenueGrowth?.toString(),
        revenueGrowthQuat: incomeStatement_quat[0]?.revenueGrowth?.toString()
      },
      grossProfit: GrossProfitTTM?.toString(),
      costOfRevenue: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "costOfRevenue"
      })?.toString(),
      sellingGeneralAdministrative: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "sellingGeneralAdministrative"
      })?.toString(),
      researchDevelopment: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "researchDevelopment"
      })?.toString(),
      totalOperatingExpenses: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "totalOperatingExpenses"
      })?.toString(),
      operatingIncome: {
        operatingIncome: calculateTTM({
          array: incomeStatement_quat_org,
          variableName: "operatingIncome"
        })?.toString(),
        opIncomeGrowthQuat: incomeStatement_quat[0]?.opIncomeGrowth?.toString(),
        opIncomeGrowthYearly:
          incomeStatement_yearly[0]?.opIncomeGrowth?.toString()
      },
      interestExpense: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "interestExpense"
      })?.toString(),
      incomeBeforeTax: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "incomeBeforeTax"
      })?.toString(),
      incomeTax: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "incomeTaxExpense"
      })?.toString(),
      netIncome: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "netIncome"
      })?.toString(),
      epsActual: epsActual()?.toString(),
      dilutedEspActual: DilutedEpsTTM?.toString(),
      dividendShare: DividendShare?.toString(),
      profitMargin: (ProfitMargin * 100)?.toString(),
      ebitda: EBITDA?.toString(),
      ebitdaMargin: calculateMargin(EBITDA, RevenueTTM)?.toString(),
      ebit: incomeStatement_quat_org[0]?.ebit?.toString(),
      ebitMargin: calculateMargin(
        incomeStatement_quat_org[0]?.ebit,
        incomeStatement_quat_org[0]?.totalRevenue
      )?.toString(),
      depreciationAndAmortization: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "depreciationAndAmortization"
      })?.toString(),
      freeCashFlowMargin: cashFlow_quat_org[0]?.capitalExpenditures?.toString(),
      grossMargin: calculateGrossMargin(
        RevenueTTM,
        incomeStatement_quat_org[0]?.costOfRevenue
      )?.toString(),
      cashAndEquivalents:
        balanceSheet_quat_org[0]?.cashAndEquivalents?.toString(),
      shortTermInvestments:
        balanceSheet_quat_org[0]?.shortTermInvestments?.toString(),
      cashAndCashEquivalents:
        balanceSheet_quat_org[0]?.cashAndShortTermInvestments?.toString(),
      cashAndShortTermInvestments:
        balanceSheet_quat_org[0]?.cashAndShortTermInvestments?.toString(),
      receivables: balanceSheet_quat_org[0]?.netReceivables?.toString(),
      inventory: balanceSheet_quat_org[0]?.inventory?.toString(),
      otherCurrentAssets:
        balanceSheet_quat_org[0]?.otherCurrentAssets?.toString(),
      totalCurrentAssets:
        balanceSheet_quat_org[0]?.totalCurrentAssets?.toString(),
      propertyPlantAndEquipment:
        balanceSheet_quat_org[0]?.propertyPlantAndEquipmentNet?.toString(),
      longTermInvestments:
        balanceSheet_quat_org[0]?.longTermInvestments?.toString(),
      goodWillAndIntangibleAssets: (
        Number(balanceSheet_quat_org[0]?.goodWill) +
        Number(balanceSheet_quat_org[0]?.intangibleAssets)
      )?.toString(),
      otherLongTermAssets: balanceSheet_quat_org[0]?.otherAssets?.toString(),
      totalLongTernAssets:
        balanceSheet_quat_org[0]?.nonCurrentAssetsTotal?.toString(),
      totalAssets: balanceSheet_quat_org[0]?.totalAssets?.toString(),
      accountsPayable: balanceSheet_quat_org[0]?.accountsPayable?.toString(),
      deferredRevenue:
        balanceSheet_quat_org[0]?.currentDeferredRevenue?.toString(),
      currentDebt: balanceSheet_quat_org[0]?.shortTermDebt?.toString(),
      otherCurrentLiabilities:
        balanceSheet_quat_org[0]?.otherCurrentLiab?.toString(),
      totalCurrentLiabilities:
        balanceSheet_quat_org[0]?.totalCurrentLiabilities?.toString(),
      longTernDebt: balanceSheet_quat_org[0]?.longTermDebtTotal?.toString(),
      totalLongTermLiabilities:
        balanceSheet_quat_org[0]?.nonCurrentLiabilitiesTotal?.toString(),
      totalLiabilities: balanceSheet_quat_org[0]?.totalLiab?.toString(),
      totalDebt: (
        Number(balanceSheet_quat_org[0]?.shortTermDebt) +
        Number(balanceSheet_quat_org[0]?.longTermDebt)
      )?.toString(),
      commonStock: balanceSheet_quat_org[0]?.commonStock?.toString(),
      retainedEarnings: balanceSheet_quat_org[0]?.retainedEarnings?.toString(),
      comprehensiveIncome:
        balanceSheet_quat_org[0]?.accumulatedOtherComprehensiveIncome?.toString(),
      shareHoldersEquity:
        balanceSheet_quat_org[0]?.totalStockholderEquity?.toString(),
      totalLiabilitiesAndEquity:
        balanceSheet_quat_org[0]?.liabilitiesAndStockholdersEquity?.toString(),
      netCashOverDebt: (
        Number(balanceSheet_quat_org[0]?.cash) /
        Number(balanceSheet_quat_org[0]?.shortTermDebt)
      )?.toString(),
      netCashperShare: (
        Number(balanceSheet_quat_org[0]?.cash) /
        Number(balanceSheet_quat_org[0]?.shortTermDebt) /
        SharesOutstanding
      )?.toString(),
      workingCapital: balanceSheet_quat_org[0]?.netWorkingCapital?.toString(),
      bookValuePerShare: BookValue?.toString(),
      netIncome: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "netIncome"
      })?.toString(),
      depreciationAndAmortization: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "depreciationAndAmortization"
      })?.toString(),
      shareBasedCompensation: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "stockBasedCompensation"
      })?.toString(),
      otherOperatingActivities: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "otherCashflowsFromInvestingActivities"
      })?.toString(),
      operatingCashFlow: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "totalCashFromOperatingActivities"
      })?.toString(),
      capitalExpenditures: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "capitalExpenditures"
      })?.toString(),
      otherInvestingActivities: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "changeToInventory"
      })?.toString(),
      investingCashFlow: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "totalCashflowsFromInvestingActivities"
      })?.toString(),
      dividendPaid: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "dividendsPaid"
      })?.toString(),
      shareIssuanceOverRepurchase: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "salePurchaseOfStock"
      })?.toString(),
      otherFinanceActivities:
        cashFlow_quat_org[0]?.otherCashflowsFromFinancingActivities?.toString(),
      financeCashFlow: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "totalCashFromFinancingActivities"
      })?.toString(),
      netCashFlow: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "changeInCash"
      })?.toString(),
      freeCashFlow: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "freeCashFlow"
      })?.toString(),
      freeCashFlowMargin: calculateMargin(
        cashFlow_quat_org[0]?.freeCashFlow,
        incomeStatement_quat_org[0]?.totalRevenue
      )?.toString(),
      freeCashFlowPerShare: (
        Number(cashFlow_quat_org[0]?.freeCashFlow) / SharesOutstanding
      )?.toString(),
      marketCapitalization: MarketCapitalization?.toString(),
      enterpriseValue: EnterpriseValue?.toString(),
      peRatio: PERatio?.toString(),
      psRatio: (MarketCapitalization / RevenueTTM)?.toString(),
      pOverFcfRatio: (
        MarketCapitalization / Number(cashFlow_quat_org[0]?.freeCashFlow)
      )?.toString(),
      pOverOcfRatio: (
        MarketCapitalization /
        Number(cashFlow_quat_org[0]?.totalCashFromOperatingActivities)
      )?.toString(),
      evOverSalesRatio: (EnterpriseValue / RevenueTTM)?.toString(),
      evEbitdaRatio: (
        EnterpriseValue / Number(incomeStatement_quat_org[0]?.ebitda)
      )?.toString(),
      evEbitRatio: (
        EnterpriseValue / Number(incomeStatement_quat_org[0]?.ebit)
      )?.toString(),
      evFcfRatio: (
        EnterpriseValue / Number(cashFlow_quat_org[0]?.freeCashFlow)
      )?.toString(),
      debtOverEquityRatio: (
        Number(balanceSheet_quat_org[0]?.shortTermDebt) +
        Number(balanceSheet_quat_org[0]?.longTermDebt) -
        Number(balanceSheet_quat_org[0]?.totalStockholderEquity)
      )?.toString(),
      debtOverEbitdaRatio: (
        Number(balanceSheet_quat_org[0]?.shortTermDebt) +
        Number(balanceSheet_quat_org[0]?.longTermDebt) -
        Number(incomeStatement_quat_org[0]?.ebitda)
      )?.toString(),
      debtFcfRatio: (
        Number(balanceSheet_quat_org[0]?.shortTermDebt) +
        Number(balanceSheet_quat_org[0]?.longTermDebt) -
        Number(cashFlow_quat_org[0]?.freeCashFlow)
      )?.toString(),
      currentRatio: (
        Number(balanceSheet_quat_org[0]?.totalCurrentAssets) /
        Number(balanceSheet_quat_org[0]?.totalCurrentLiabilities)
      )?.toString(),
      assetTurnover: (
        RevenueTTM / Number(balanceSheet_quat_org[0]?.totalAssets)
      )?.toString(),
      returnOnEquity: calculateMargin(
        incomeStatement_quat_org[0]?.netIncome,
        balanceSheet_quat_org[0]?.totalStockholderEquity
      )?.toString(),
      returnOnAssets: calculateMargin(
        incomeStatement_quat_org[0]?.netIncome,
        balanceSheet_quat_org[0]?.totalAssets
      )?.toString(),
      returnOnCapital: calculateMargin(
        incomeStatement_quat_org[0]?.ebit,
        balanceSheet_quat_org[0]?.netInvestedCapital
      )?.toString(),
      fcfYield: calculateMargin(
        cashFlow_quat_org[0]?.freeCashFlow,
        MarketCapitalization
      )?.toString(),
      payoutRatio: calculateMargin(DividendShare, epsActual())?.toString(),
      revenueGrowthYOY: calculateGrowth(
        cashFlow_quat_org[0]?.freeCashFlow,
        cashFlow_quat_org[1]?.freeCashFlow
      )?.toString(),
      netIncomeGrowth: calculateGrowth(
        incomeStatement_quat_org[0]?.netIncome,
        incomeStatement_quat_org[1]?.netIncome
      )?.toString(),
      dividendGrowth: calculateGrowth(
        cashFlow_yearly_org[0]?.dividendsPaid,
        cashFlow_yearly_org[1]?.dividendsPaid
      )?.toString(),
      cashGrowth: calculateGrowth(
        balanceSheet_quat_org[0]?.cash,
        balanceSheet_quat_org[1]?.cash
      )?.toString(),
      debtGorwth: (
        Number(balanceSheet_quat_org[0]?.shortTermDebt) /
          Number(balanceSheet_quat_org[1]?.shortTermDebt) -
        1 * 100
      )?.toString(),
      marketCapGrowth: calculateGrowth(
        ratiosAndMetricsQuat[0]?.marketCap,
        ratiosAndMetricsQuat[1]?.marketCap
      )?.toString(),
      epsGrowth: calculateGrowth(epsActual(), previousActual())?.toString()
    };

    // // ============= talha end TTM ===============
    // ***************** Queries Start *************************

    const oldTTM = { ...TTM };
    const newTTM = { ...TTM };
    delete newTTM?.sharesChange;
    delete newTTM?.revenue;
    delete newTTM?.operatingIncome;
    console.log(ticker);
    const TickerId = await prisma.ticker.findFirst({
      where: {
        ticker: ticker
      }
    });
    if (!TickerId) {
      throw new Error(`Ticker by id ${TickerId.id} not found!`);
    }

    const TTMPromise = prisma.tTM.create({
      data: {
        ...newTTM,
        ipoDate: TTM?.ipoDate,
        sharesChangeYearly: TTM?.sharesChange?.sharesChangeYearly,
        sharesChangeQuarterly: TTM?.sharesChange?.sharesChangeQuarterly,
        revenueTTM: TTM?.revenue?.revenueTTM,
        revenueGrowthYearly: TTM?.revenue?.revenueGrowthYearly,
        revenueGrowthQuat: TTM?.revenue?.revenueGrowthQuat,
        operatingIncome: TTM?.operatingIncome?.operatingIncome,
        opIncomeGrowthQuat: TTM?.operatingIncome?.opIncomeGrowthQuat,
        opIncomeGrowthYearly: TTM?.operatingIncome?.opIncomeGrowthYearly,
        Ticker: {
          connect: {
            id: TickerId?.id
          }
        }
      }
    });

    const earningsPromisesQuat = earningsQuat.map((earningsQuarterly) => {
      return prisma.earnings.create({
        data: {
          ...earningsQuarterly,
          Type: Type?.QUARTERLY,
          Ticker: {
            connect: {
              id: TickerId?.id
            }
          }
        }
      });
    });
    const earningsPromisesYearly = earningsYearly.map((earningsYearly) => {
      return prisma.earnings.create({
        data: {
          ...earningsYearly,
          Type: Type.YEARLY,
          Ticker: {
            connect: {
              id: TickerId.id
            }
          }
        }
      });
    });

    const dividendsPromisesYearly = dividendsYearly.map((dividendsYearly) => {
      return prisma.dividend.create({
        data: {
          ...dividendsYearly,
          Type: Type.YEARLY,
          Ticker: {
            connect: {
              id: TickerId.id
            }
          }
        }
      });
    });

    const dividendsPromisesQuarterly = dividendsQuat.map((dividendsQuat) => {
      return prisma.dividend.create({
        data: {
          ...dividendsQuat,
          Type: Type.QUARTERLY,
          Ticker: {
            connect: {
              id: TickerId.id
            }
          }
        }
      });
    });

    const ratiosAndMetricsPromisesYearly = ratiosAndMetricsYearly.map(
      (ratiosAndMetricsYearly) => {
        return prisma.ratiosAndMetrics.create({
          data: {
            ...ratiosAndMetricsYearly,
            Type: Type.YEARLY,
            Ticker: {
              connect: {
                id: TickerId.id
              }
            }
          }
        });
      }
    );
    const ratiosAndMetricsPromisesQuater = ratiosAndMetricsQuat.map(
      (ratiosAndMetricsQuat) => {
        return prisma.ratiosAndMetrics.create({
          data: {
            ...ratiosAndMetricsQuat,
            Type: Type.QUARTERLY,
            Ticker: {
              connect: {
                id: TickerId.id
              }
            }
          }
        });
      }
    );

    const cashFlowPromisesYearly = cashFlow_yearly.map((cashFlow_yearly) => {
      return prisma.cashFlow.create({
        data: {
          ...cashFlow_yearly,
          Type: Type.YEARLY,
          Ticker: {
            connect: {
              id: TickerId.id
            }
          }
        }
      });
    });
    const cashFlowPromisesQuaterly = cashFlow_quat.map((cashFlow_Quaterly) => {
      return prisma.cashFlow.create({
        data: {
          ...cashFlow_Quaterly,
          Type: Type.QUARTERLY,
          Ticker: {
            connect: {
              id: TickerId.id
            }
          }
        }
      });
    });
    const incomeStatementPromisesQuaterly = incomeStatement_quat.map(
      (incomeStatement_quat) => {
        return prisma.incomeStatement.create({
          data: {
            ...incomeStatement_quat,
            Type: Type.QUARTERLY,
            Ticker: {
              connect: {
                id: TickerId.id
              }
            }
          }
        });
      }
    );
    const incomeStatementPromisesyearly = incomeStatement_yearly.map(
      (incomeStatement_yearly) => {
        return prisma.incomeStatement.create({
          data: {
            ...incomeStatement_yearly,
            Type: Type.YEARLY,
            Ticker: {
              connect: {
                id: TickerId.id
              }
            }
          }
        });
      }
    );
    const balanceSheetPromisesyearly = balanceSheet_yearly.map(
      (balanceSheet_yearly) => {
        return prisma.balanceSheet.create({
          data: {
            ...balanceSheet_yearly,
            Type: Type.YEARLY,
            Ticker: {
              connect: {
                id: TickerId.id
              }
            }
          }
        });
      }
    );
    const balanceSheetPromisesQuat = balanceSheet_quat.map(
      (balanceSheet_Quat) => {
        return prisma.balanceSheet.create({
          data: {
            ...balanceSheet_Quat,
            Type: Type.QUARTERLY,
            Ticker: {
              connect: {
                id: TickerId.id
              }
            }
          }
        });
      }
    );

    const [
      TTMRes,
      earningsQuaterlyRes,
      earningsYearlyRes,
      dividendsYearlyRes,
      dividendsQuarterlyRes,
      ratiosAndMetricsYearlyRes,
      cashFlowQuateRes,
      cashFlowYearlyRes,
      cashFlowQuatRes,
      incomeStatementQuaterlyRes,
      incomeStatementyearlyRes,
      balanceSheetyearlyRes,
      balanceSheetQuatRes
    ] = await prisma.$transaction([
      TTMPromise,
      ...earningsPromisesQuat,
      ...earningsPromisesYearly,
      ...dividendsPromisesYearly,
      ...dividendsPromisesQuarterly,
      ...ratiosAndMetricsPromisesYearly,
      ...ratiosAndMetricsPromisesQuater,
      ...cashFlowPromisesYearly,
      ...cashFlowPromisesQuaterly,
      ...incomeStatementPromisesQuaterly,
      ...incomeStatementPromisesyearly,
      ...balanceSheetPromisesyearly,
      ...balanceSheetPromisesQuat
    ]);

    // await getSocketData({ ticker, PriceChange });
    // console.log("WebSocket data processing complete.");

    // console.log("socket data==>>", socketData);
    const findActive = await prisma.lastTicker.findMany({});
    if (findActive.length > 0) {
      await prisma.lastTicker.update({
        where: {
          id: findActive[0].id
        },
        data: {
          lastActiveTicker: ticker.toString()
        }
      });
      console.log("updated", ticker.toString());
    } else {
      await prisma.lastTicker.create({
        data: {
          lastActiveTicker: ticker.toString()
        }
      });
      console.log("Created ", ticker.toString());
    }

    return {
      TTMRes,
      earningsQuaterlyRes,
      earningsYearlyRes,
      dividendsYearlyRes,
      dividendsQuarterlyRes,
      ratiosAndMetricsYearlyRes,
      cashFlowQuateRes,
      cashFlowYearlyRes,
      cashFlowQuatRes,
      incomeStatementQuaterlyRes,
      incomeStatementyearlyRes,
      balanceSheetyearlyRes,
      balanceSheetQuatRes
    };
  } catch (error) {
    console.log("error=========================>>", error);
  }
};

const stockController = async ({ ticker }) => {
  const tickerss = "AAPL";
  console.log("called external");
  const Ticker = tickerss?.replace(".", "-");
  console.log("ticker", tickerss);
  try {
    if (Ticker == null) {
      throw new Error("Invalid ticker");
    }

    // ============== API Calling Start ==============
    // stock data for ticker
    const data = await stockTicker({ ticker: Ticker, apiToken });
    // dividends data for stock ticker
    const dividends = await stockDividend({ ticker: Ticker, apiToken });
    // avgVol for stock ticker
    const avgvol = await stockAvgVol({ ticker: Ticker, apiToken });
    // price list day wise for stock
    const PriceChange = await stockPrice({ ticker: Ticker, apiToken });
    // ============== API Calling End ==============

    const industry = data?.General?.Industry;
    const Sector = data?.General?.Sector;
    const Exchange = data?.General?.Exchange;
    const country = data?.General?.AddressData?.Country;

    const IncomeStatementObjectYearly =
      data?.Financials?.Income_Statement?.yearly;

    const mostRecentDateBalanceSheetQuarterly =
      data?.Financials?.Balance_Sheet?.quarterly;

    const EarningsAnnual = data?.Earnings?.Annual;

    // Last Stock Split Ratio
    const LastStockSplitRatio = data?.SplitsDividends?.LastSplitFactor;

    // Last Stock Split
    let splitFactor;

    console.log("LastStockSplitRatio===>>>", LastStockSplitRatio);
    if (!LastStockSplitRatio) {
      splitFactor = "Never";
    } else {
      const splitRatioArray = LastStockSplitRatio?.split(":");
      if (splitRatioArray?.length > 0) {
        const firstNumber = parseInt(splitRatioArray[0]);
        const secondNumber = parseInt(splitRatioArray[1]);

        if (firstNumber < secondNumber) {
          splitFactor = "Reverse";
        } else {
          splitFactor = "Forward";
        }
      } else {
        splitFactor = "Never";
      }
    }

    // Last Stock Split Ratio
    const LastSplitDate = data?.SplitsDividends?.LastSplitDate;

    // --------------- Price changes ----------------
    // const PriceChanges = await PriceChangesServices({
    //   PriceChange,
    //   PremarketPrice
    // });
    //  ------------ dividendInfo -------
    const dividendInfo = data?.SplitsDividends?.NumberDividendsByYear;
    //.........   52 week High   ......
    const WeekHigh52 = data?.Technicals["52WeekHigh"];
    //.........   52 week Low   ......
    const WeekLow52 = data?.Technicals["52WeekLow"];

    //  Analyst Rating
    const AnalystRating = data?.AnalystRatings?.Rating || null;

    // Analyst   Count
    const {
      StrongBuy = null,
      Buy = null,
      Hold = null,
      Sell = null,
      StrongSell = null
    } = data?.AnalystRatings || {};

    const AnalystCount = StrongBuy + Buy + Hold + Sell + StrongSell;
    // Price Target (%)
    const PriceTargetPer = data?.AnalystRatings?.TargetPrice || null;
    // Previous close
    const previousDayClose = await PreviousCloseServices({ PriceChange });

    // Employees

    const Employees = data?.General?.FullTimeEmployees;

    // Founded
    const Founded = null;

    // IPO Date
    const IPODate = data?.General?.IPODate;
    // Revenue Quarterly

    const mostRecentDateObject = data?.Financials?.Income_Statement?.quarterly;

    // Revenue Quaterly

    // // ***************  Growth Yearly TTM **************
    const YearlyGrowthTTMs = await YearlyGrowthTTM({
      IncomeStatementObjectYearly,
      EarningsAnnual
    });

    // ******************* Beta(1)  ****************
    const Beta1Year = data?.Technicals?.Beta;

    // ******************* Short % Float  ****************
    const ShortPercentFloat = data?.SharesStats?.ShortPercentFloat;

    // ******************* Short % Shares  ****************

    const sharesOutstanding = data?.SharesStats?.SharesOutstanding;
    const sharesShort = data?.Technicals?.SharesShort;
    const subtractShortShareData = sharesOutstanding - sharesShort;
    const ShortPercentShare =
      (subtractShortShareData / sharesOutstanding) * 100;

    // ======================= junaid start ======================
    const balanceSheet_quat_org = Object.values(
      data?.Financials?.Balance_Sheet?.quarterly
    );

    const balanceSheet_yearly_org = Object.values(
      data?.Financials?.Balance_Sheet?.yearly
    );

    const cashFlow_quat_org = Object.values(
      data?.Financials?.Cash_Flow?.quarterly
    );

    const cashFlow_yearly_org = Object.values(
      data?.Financials?.Cash_Flow?.yearly
    );

    const incomeStatement_quat_org = Object.values(
      data?.Financials?.Income_Statement?.quarterly
    );

    const incomeStatement_yearly_org = Object.values(
      data?.Financials?.Income_Statement?.yearly
    );

    const outstandingSharesAnnual = Object.values(
      data?.outstandingShares?.annual
    );

    const outstandingSharesQuat = Object.values(
      data?.outstandingShares?.quarterly
    );

    const earningHistoryQuat = Object.values(data?.Earnings?.History);
    const earningHistoryAnnual = Object.values(data?.Earnings?.Annual);

    const outstandingSharesAnnualTemp = [...outstandingSharesAnnual];
    // removing the current year's because we have the marketcap ttm already in TTM and in marketcap quat
    outstandingSharesAnnualTemp?.shift();

    // eps
    const earningsQuat = earningHistoryQuat.map((item) => {
      const currentEps = comparedateFormulaIndex({
        data: earningHistoryQuat,
        object: item?.date
      });

      const sameDayPrice = PriceChange.find(
        (p_item) => p_item?.date === item?.date
      );

      // find previous quarter's value
      const prevEps = earningHistoryQuat[currentEps + 1];

      const response = ({ price }) => {
        return {
          date: item?.date,
          epsActual: item?.epsActual?.toString() || null,
          earningYield: calculateEarningsYield({
            eps: item?.epsActual,
            price: price?.close
          })?.toString(),
          epsGrowth: prevEps
            ? calculateGrowth(item?.epsActual, prevEps?.epsActual)?.toString()
            : null,
          peRatio: division({
            price: price?.close,
            epsActual: item?.epsActual
          }),
          epsEstimate: item?.epsEstimate?.toString() || null
        };
      };

      if (!sameDayPrice) {
        const closestDatePrice = lastClosePriceIdentifier({
          date: item?.date,
          PriceChange
        });

        if (closestDatePrice) {
          return response({ price: closestDatePrice });
        }
      }

      return response({ price: sameDayPrice });
    });

    const earningsYearly = earningHistoryAnnual.map((item) => {
      const currentEps = comparedateFormulaIndex({
        data: earningHistoryAnnual,
        object: item?.date
      });

      const sameDayPrice = PriceChange.find(
        (p_item) => p_item?.date === item?.date
      );

      const prevEps = earningHistoryAnnual[currentEps + 1];

      const response = ({ price }) => {
        return {
          date: item?.date,
          epsActual: item?.epsActual?.toString(),
          earningYield: calculateEarningsYield({
            eps: item?.epsActual,
            price: price?.close
          })?.toString(),
          epsGrowth: prevEps
            ? calculateGrowth(item?.epsActual, prevEps?.epsActual)?.toString()
            : null,
          peRatio: (Number(price?.close) / Number(item?.epsActual))?.toString()
        };
      };

      if (!sameDayPrice) {
        const closestDatePrice = lastClosePriceIdentifier({
          date: item?.date,
          PriceChange
        });

        if (closestDatePrice) {
          return response({ price: closestDatePrice });
        }
      }

      return response({ price: sameDayPrice });
    });

    // dividends
    const dividendsQuat = dividends?.map((item, index) => {
      const sameDayPrice = PriceChange?.find(
        (p_item) => p_item?.date === item?.date
      );

      const sameInEarnings = earningHistoryQuat?.find((p_item) =>
        compareYear({
          dateOne: p_item?.date,
          dateTwo: item?.date
        })
      );

      return {
        date: item.date,
        dividendShare: item?.value.toString(),
        dividendYield: calculateDividendYield({
          price: sameDayPrice?.close,
          dividendShare: item?.value
        })?.toString(),
        payoutRatio: sameInEarnings
          ? calculatePayoutRatio({
              dividendShare: item?.value,
              epsActual: sameInEarnings ? sameInEarnings?.epsActual : null
            })?.toString()
          : null
      };
    });

    const dividends_yearly = dividendsPerYear({
      dividends
    });

    const dividendsYearly = dividends_yearly?.map((item) => {
      const sameDayPrice = PriceChange?.find(
        (p_item) => p_item?.date === item?.date
      );

      const sameInEarnings = earningHistoryAnnual?.find((p_item) =>
        compareYear({
          dateOne: p_item?.date,
          dateTwo: item?.date
        })
      );

      return {
        date: item.date,
        dividendShare: item?.value.toString(),
        dividendYield: calculateDividendYield({
          price: sameDayPrice?.close,
          dividendShare: item?.value
        })?.toString(),
        payoutRatio: sameInEarnings
          ? calculatePayoutRatio({
              dividendShare: item?.value,
              epsActual: sameInEarnings ? sameInEarnings?.epsActual : null
            })?.toString()
          : null
      };
    });

    // ratios
    const ratiosAndMetricsYearly = outstandingSharesAnnualTemp?.map((item) => {
      const sameDayPrice = PriceChange?.find(
        (p_item) => p_item?.date === item?.dateFormatted
      );

      const sameInBalanceSheet = balanceSheet_yearly_org?.find((b_item) =>
        compareYear({
          dateOne: b_item?.date,
          dateTwo: item?.dateFormatted
        })
      );

      const sameInIncomeStatement = incomeStatement_yearly_org?.find((b_item) =>
        compareYear({
          dateOne: b_item?.date,
          dateTwo: item?.dateFormatted
        })
      );

      const sameInCashFlow = cashFlow_yearly_org?.find((b_item) =>
        compareYear({
          dateOne: b_item?.date,
          dateTwo: item?.dateFormatted
        })
      );

      const response = ({ price }) => {
        return {
          date: item?.dateFormatted,
          quater: item?.date,
          marketCap: (Number(item?.shares) * Number(price?.close))?.toString(),
          enterpriseValue: calculateEnterpriseValue({
            marketCap: Number(item?.shares) * Number(price?.close),
            netDebt: sameInBalanceSheet?.netDebt,
            cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
          })?.toString(),
          evOverEbit: calculateEvOverEbit({
            ebit: sameInIncomeStatement?.ebit,
            marketCap: Number(item?.shares) * Number(price?.close),
            netDebt: sameInBalanceSheet?.netDebt,
            cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
          })?.toString(),
          evOverSales: calculateEvOverSales({
            enterpriseValue: calculateEnterpriseValue({
              marketCap: Number(item?.shares) * Number(price?.close),
              netDebt: sameInBalanceSheet?.netDebt,
              cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
            }),
            totalRevenue: sameInIncomeStatement?.totalRevenue
          })?.toString(),
          evOverFcf: sameInCashFlow
            ? calculateEvOverFcf({
                enterpriseValue: calculateEnterpriseValue({
                  marketCap: Number(item?.shares) * Number(price?.close),
                  netDebt: sameInBalanceSheet?.netDebt,
                  cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
                }),
                freeCashFlow: sameInCashFlow?.freeCashFlow
              })?.toString()
            : null,
          fcfYield: sameInCashFlow
            ? calcualteFcfYield({
                freeCashFlow: sameInCashFlow?.freeCashFlow,
                MarketCapitalization:
                  Number(item?.shares) * Number(price?.close)
              })?.toString()
            : null,
          buybackYield: calculateBuybackYield({
            salePurchaseOfStock: sameInCashFlow?.salePurchaseOfStock,
            marketCap: Number(item?.shares) * Number(price?.close)
          })?.toString()
        };
      };

      if (!sameDayPrice) {
        const closestDatePrice = lastClosePriceIdentifier({
          date: item?.dateFormatted,
          PriceChange
        });

        if (closestDatePrice) {
          return response({ price: closestDatePrice });
        }
      }

      // If either the same-day or closest-date price is found, use it for calculations
      return response({ price: sameDayPrice });
    });

    const ratiosAndMetricsQuat = outstandingSharesQuat?.map((item, index) => {
      const sameDayPrice = PriceChange?.find(
        (p_item) => p_item?.date === item?.dateFormatted
      );

      const sameInBalanceSheet = balanceSheet_quat_org?.find(
        (b_item) => b_item?.date === item?.dateFormatted
      );

      const sameInIncomeStatement = incomeStatement_quat_org?.find(
        (b_item) => b_item?.date === item?.dateFormatted
      );

      const sameInCashFlow = cashFlow_quat_org?.find(
        (b_item) => b_item?.date === item?.dateFormatted
      );

      const response = ({ price }) => {
        return {
          date: item?.dateFormatted,
          quater: item?.date.toString(),
          marketCap: (Number(item?.shares) * Number(price?.close))?.toString(),
          enterpriseValue: calculateEnterpriseValue({
            marketCap: Number(item?.shares) * Number(price?.close),
            netDebt: sameInBalanceSheet?.netDebt,
            cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
          })?.toString(),
          evOverEbit: calculateEvOverEbit({
            ebit: sameInIncomeStatement?.ebit,
            marketCap: Number(item?.shares) * Number(price?.close),
            netDebt: sameInBalanceSheet?.netDebt,
            cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
          })?.toString(),
          evOverSales: calculateEvOverSales({
            enterpriseValue: calculateEnterpriseValue({
              marketCap: Number(item?.shares) * Number(price?.close),
              netDebt: sameInBalanceSheet?.netDebt,
              cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
            }),
            totalRevenue: sameInIncomeStatement?.totalRevenue
          })?.toString(),
          evOverFcf: sameInCashFlow
            ? calculateEvOverFcf({
                enterpriseValue: calculateEnterpriseValue({
                  marketCap: Number(item?.shares) * Number(price?.close),
                  netDebt: sameInBalanceSheet?.netDebt,
                  cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
                }),
                freeCashFlow: sameInCashFlow?.freeCashFlow
              })?.toString()
            : null,
          fcfYield: sameInCashFlow
            ? calcualteFcfYield({
                freeCashFlow: sameInCashFlow?.freeCashFlow,
                MarketCapitalization:
                  Number(item?.shares) * Number(price?.close)
              })?.toString()
            : null,
          buybackYield: calculateBuybackYield({
            salePurchaseOfStock: sameInCashFlow?.salePurchaseOfStock,
            marketCap: Number(item?.shares) * Number(price?.close)
          })?.toString()
        };
      };

      if (!sameDayPrice) {
        const closestDatePrice = lastClosePriceIdentifier({
          date: item?.dateFormatted,
          PriceChange
        });

        if (closestDatePrice) {
          return response({ price: closestDatePrice });
        }
      }

      // If either the same-day or closest-date price is found, use it for calculations
      return response({ price: sameDayPrice });
    });

    // balancesheet
    const balanceSheet_quat = balanceSheet_quat_org?.map((item) => {
      const sameInIncomeStatement = incomeStatement_quat_org?.find(
        (b_item) => b_item?.date === item?.date
      );
      const sameInCashFlow = cashFlow_quat_org?.find(
        (b_item) => b_item?.date === item?.date
      );
      const sameDayPrice = PriceChange?.find(
        (p_item) => p_item?.date === item?.dateFormatted
      );

      const response = ({ price }) => {
        return {
          date: item?.date,
          sharesOut: item?.commonStockSharesOutstanding?.toString(),
          netCashOverDebt: (
            Number(item?.cashAndEquivalents) /
            Number(item?.totalCurrentLiabilities)
          )?.toString(),
          totalCash: item.cashAndEquivalents?.toString(),
          totalDebt: (
            Number(item.shortTermDebt) + Number(item.longTermDebt)
          )?.toString(),
          currentRatio: (
            Number(item.totalCurrentAssets) /
            Number(item.totalCurrentLiabilities)
          )?.toString(),
          totalAssets: item?.totalAssets?.toString(),
          totalLiab: item?.totalLiab?.toString(),
          pbRatio: calculatePbRatio(
            PriceChange[PriceChange.length - 1]?.close,
            item?.totalAssets,
            item?.totalLiab
          )?.toString(),
          debtOverEquity: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: item?.totalStockholderEquity
          })?.toString(),
          debtOverEbitda: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: sameInIncomeStatement?.ebitda
          })?.toString(),
          debtOverFcf: sameInCashFlow
            ? calculateDebtOverVariable({
                shortTermDebt: item?.shortTermDebt,
                longTermDebt: item?.longTermDebt,
                dividedBy: sameInCashFlow?.freeCashFlow
              })?.toString()
            : null,
          shareHolderEquity: item?.totalStockholderEquity?.toString(),
          workingCapital: item?.netWorkingCapital?.toString(),
          assetTurnover: (
            Number(sameInIncomeStatement?.totalRevenue) /
            Number(item?.totalAssets)
          )?.toString(),
          returnOnCapital: calculateROC({
            totalAssets: item?.totalAssets,
            totalCurrentAssets: item?.totalCurrentAssets,
            ebit: sameInIncomeStatement?.ebit
          })?.toString(),
          netCashOverDebtGrowth: (
            (Number(item?.cashAndEquivalents) /
              Number(item?.shortLongTermDebtTotal)) *
            100
          )?.toString(),
          priceOverFcfRatio: sameInCashFlow
            ? calculatePriceOverFcfRatio({
                price: price?.close,
                freeCashFlow: sameInCashFlow?.freeCashFlow,
                commonStockSharesOutstanding: item?.commonStockSharesOutstanding
              })?.toString()
            : null
        };
      };

      if (!sameDayPrice) {
        const closestDatePrice = lastClosePriceIdentifier({
          date: item?.date,
          PriceChange
        });

        if (closestDatePrice) {
          return response({ price: closestDatePrice });
        }
      }

      return response({ price: sameDayPrice });
    });

    const balanceSheet_yearly = balanceSheet_yearly_org?.map((item) => {
      const sameInIncomeStatement = incomeStatement_yearly_org?.find(
        (b_item) => b_item?.date === item?.date
      );

      const sameInCashFlow = cashFlow_yearly_org.find(
        (b_item) => b_item?.date === item?.date
      );

      const sameDayPrice = PriceChange.find(
        (p_item) => p_item?.date === item?.dateFormatted
      );

      const response = ({ price }) => {
        return {
          date: item?.date,

          totalCash: item.cashAndEquivalents?.toString(),
          netCashOverDebt: (
            Number(item?.cashAndEquivalents) /
            Number(item?.totalCurrentLiabilities)
          )?.toString(),
          totalDebt: (
            Number(item.shortTermDebt) + Number(item.longTermDebt)
          )?.toString(),
          currentRatio: (
            Number(item.totalCurrentAssets) /
            Number(item.totalCurrentLiabilities)
          )?.toString(),
          totalAssets: item?.totalAssets?.toString(),
          totalLiab: item?.totalLiab?.toString(),
          pbRatio: calculatePbRatio(
            PriceChange[PriceChange.length - 1]?.close,
            item?.totalAssets,
            item?.totalLiab
          )?.toString(),
          debtOverEquity: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: item?.totalStockholderEquity
          })?.toString(),
          debtOverEbitda: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: sameInIncomeStatement?.ebitda
          })?.toString(),
          debtOverFcf: sameInCashFlow
            ? calculateDebtOverVariable({
                shortTermDebt: item?.shortTermDebt,
                longTermDebt: item?.longTermDebt,
                dividedBy: sameInCashFlow?.freeCashFlow
              })?.toString()
            : null,
          shareHolderEquity: item?.totalStockholderEquity?.toString(),
          workingCapital: item?.netWorkingCapital?.toString(),
          assetTurnover: (
            Number(sameInIncomeStatement?.totalRevenue) /
            Number(item?.totalAssets)
          )?.toString(),
          returnOnCapital: calculateROC({
            totalAssets: item?.totalAssets,
            totalCurrentAssets: item?.totalCurrentAssets,
            ebit: sameInIncomeStatement?.ebit
          })?.toString(),
          netCashOverDebtGrowth: (
            (Number(item?.cashAndEquivalents) /
              Number(item?.shortLongTermDebtTotal)) *
            100
          )?.toString(),
          priceOverFcfRatio: sameInCashFlow
            ? calculatePriceOverFcfRatio({
                price: price?.close,
                freeCashFlow: sameInCashFlow?.freeCashFlow,
                commonStockSharesOutstanding: item?.commonStockSharesOutstanding
              })?.toString()
            : null
        };
      };

      if (!sameDayPrice) {
        const closestDatePrice = lastClosePriceIdentifier({
          date: item?.date,
          PriceChange
        });

        if (closestDatePrice) {
          return response({ price: closestDatePrice });
        }
      }

      return response({ price: sameDayPrice });
    });

    // cashflow
    const cashFlow_quat_price_map = cashFlow_quat_org?.map((item, index) => {
      const priceObj = PriceChange?.find(
        (priceItem) => priceItem?.date === item?.date
      );

      const sameInBalanceSheet = balanceSheet_quat_org?.find(
        (b_item) => b_item?.date === item?.date
      );

      return {
        date: item?.date,
        finCashFlow: item?.totalCashFromFinancingActivities?.toString(),
        sharedBasedCompensation: item?.stockBasedCompensation?.toString(),
        invCashFlow: item?.totalCashflowsFromInvestingActivities?.toString(),
        operatingCashFlow: item?.totalCashFromOperatingActivities?.toString(),
        fcfGrowth: cashFlow_yearly_org[index + 1]?.freeCashFlow
          ? calculateGrowth(
              item?.freeCashFlow,
              cashFlow_yearly_org[index + 1]?.freeCashFlow
            )?.toString()
          : null,
        fcfOverShare: (
          Number(item?.freeCashFlow) /
          Number(sameInBalanceSheet?.commonStockSharesOutstanding)
        )?.toString(),
        netCashFlow: item?.changeInCash?.toString(),
        commonStockSharesOutstanding:
          sameInBalanceSheet?.commonStockSharesOutstanding?.toString(),
        freeCashFlow: item?.freeCashFlow?.toString(),
        close: priceObj?.close?.toString(),
        returnOnEquity: calculateROE({
          netIncome: item?.netIncome,
          balanceSheet_org: balanceSheet_quat_org,
          cashFlowDate: item?.date
        })?.toString(),
        returnOnAssets: calculateROA({
          netIncome: item?.netIncome,
          balanceSheet_org: balanceSheet_quat_org,
          cashFlowDate: item?.date
        })?.toString()
      };
    });

    const cashFlow_quat = priceCalculation({
      PriceChange,
      price_map: cashFlow_quat_price_map
    });

    const cashFlow_yearly_price_map = cashFlow_yearly_org?.map(
      (item, index) => {
        const priceObj = PriceChange?.find(
          (priceItem) => priceItem?.date === item?.date
        );

        const sameInBalanceSheet = balanceSheet_yearly_org?.find(
          (b_item) => b_item?.date === item?.date
        );

        return {
          date: item?.date,
          finCashFlow: item?.totalCashFromFinancingActivities?.toString(),
          invCashFlow: item?.totalCashflowsFromInvestingActivities?.toString(),
          sharedBasedCompensation: item?.stockBasedCompensation?.toString(),
          operatingCashFlow: item?.totalCashFromOperatingActivities?.toString(),
          fcfGrowth: cashFlow_yearly_org[index + 1]?.freeCashFlow
            ? calculateGrowth(
                item?.freeCashFlow,
                cashFlow_yearly_org[index + 1]?.freeCashFlow
              )?.toString()
            : null,
          fcfOverShare: (
            Number(item?.freeCashFlow) /
            Number(sameInBalanceSheet?.commonStockSharesOutstanding)
          )?.toString(),
          netCashFlow: item?.changeInCash?.toString(),
          commonStockSharesOutstanding:
            sameInBalanceSheet?.commonStockSharesOutstanding?.toString(),
          freeCashFlow: item?.freeCashFlow?.toString(),
          close: priceObj?.close?.toString(),
          returnOnEquity: calculateROE({
            netIncome: item?.netIncome,
            balanceSheet_org: balanceSheet_yearly_org,
            cashFlowDate: item?.date
          })?.toString(),
          returnOnAssets: calculateROA({
            netIncome: item?.netIncome,
            balanceSheet_org: balanceSheet_yearly_org,
            cashFlowDate: item?.date
          })?.toString()
        };
      }
    );

    const cashFlow_yearly = priceCalculation({
      PriceChange,
      price_map: cashFlow_yearly_price_map
    });

    // IncomeStatement
    const incomeStatement_quat = incomeStatement_quat_org?.map(
      (item, index) => {
        return {
          date: item?.date,
          netIncome: item?.netIncome?.toString(),
          netIncomeGrowth: incomeStatement_quat_org[index + 1]?.netIncome
            ? calculateGrowth(
                item?.netIncome,
                incomeStatement_quat_org[index + 1]?.netIncome
              )?.toString()
            : null,
          operatingIncome: item?.operatingIncome?.toString(),
          opIncomeGrowth: incomeStatement_quat_org[index + 1]?.operatingIncome
            ? calculateGrowth(
                item?.operatingIncome,
                incomeStatement_quat_org[index + 1]?.operatingIncome
              )?.toString()
            : null,
          grossProfit: item?.grossProfit?.toString(),
          ebit: item?.ebit?.toString(),
          ebitda: item?.ebitda?.toString(),
          grossProfitGrowth: incomeStatement_quat_org[index + 1]?.grossProfit
            ? calculateGrowth(
                item?.grossProfit,
                incomeStatement_quat_org[index + 1]?.grossProfit
              )?.toString()
            : null,
          totalRevenue: item?.totalRevenue?.toString(),
          revenueGrowth: incomeStatement_quat_org[index + 1]?.totalRevenue
            ? calculateGrowth(
                item?.totalRevenue,
                incomeStatement_quat_org[index + 1]?.totalRevenue
              )?.toString()
            : null,
          grossMargin: calculateGrossMargin(
            item?.totalRevenue,
            item?.costOfRevenue
          )?.toString(),
          operatingMargin: calculateMargin(
            item?.operatingIncome,
            item?.totalRevenue
          )?.toString(),
          profitMargin: calculateMargin(
            item?.netIncome,
            item?.totalRevenue
          )?.toString(),
          fcfMargin: cashFlow_quat_org?.reduce((fcfAcc, cash) => {
            if (item?.date === cash?.date) {
              const margin = calculateMargin(
                cash?.freeCashFlow,
                item?.totalRevenue
              );
              fcfAcc = margin;
            }
            return fcfAcc?.toString();
          }, null),
          ebitdaMargin: calculateMargin(
            item?.ebitda,
            item?.totalRevenue
          )?.toString(),
          ebitMargin: calculateMargin(
            item?.ebit,
            item?.totalRevenue
          )?.toString(),
          researchDevelopment: item?.researchDevelopment?.toString(),
          researchDevelopmentOverRevenue: calculateMargin(
            item?.researchDevelopment,
            item?.totalRevenue
          )?.toString(),
          psRatio: balanceSheet_quat_org?.reduce((psAcc, balance) => {
            if (item?.date === balance?.date) {
              const psRatio = calculatePsRatio(
                item?.totalRevenue,
                balance?.commonStockSharesOutstanding,
                PriceChange[PriceChange.length - 1]?.close
              );
              psAcc = psRatio;
            }
            return psAcc?.toString();
          }, null)
        };
      }
    );

    const incomeStatement_yearly = incomeStatement_yearly_org?.map(
      (item, index) => {
        return {
          date: item?.date,
          netIncome: item?.netIncome?.toString(),
          netIncomeGrowth: incomeStatement_yearly_org[index + 1]?.netIncome
            ? calculateGrowth(
                item?.netIncome,
                incomeStatement_yearly_org[index + 1]?.netIncome
              )?.toString()
            : null,
          operatingIncome: item?.operatingIncome?.toString(),
          opIncomeGrowth: incomeStatement_yearly_org[index + 1]?.operatingIncome
            ? calculateGrowth(
                item?.operatingIncome,
                incomeStatement_yearly_org[index + 1]?.operatingIncome
              )?.toString()
            : null,
          ebit: item?.ebit?.toString(),
          ebitda: item?.ebitda?.toString(),
          grossProfit: item?.grossProfit?.toString(),
          grossProfitGrowth: incomeStatement_yearly_org[index + 1]?.grossProfit
            ? calculateGrowth(
                item?.grossProfit,
                incomeStatement_yearly_org[index + 1]?.grossProfit
              )?.toString()
            : null,
          totalRevenue: item?.totalRevenue?.toString(),
          revenueGrowth: incomeStatement_yearly_org[index + 1]?.totalRevenue
            ? calculateGrowth(
                item?.totalRevenue,
                incomeStatement_yearly_org[index + 1]?.totalRevenue
              )?.toString()
            : null,
          grossMargin: calculateGrossMargin(
            item?.totalRevenue,
            item?.costOfRevenue
          )?.toString(),
          operatingMargin: calculateMargin(
            item?.operatingIncome,
            item?.totalRevenue
          )?.toString(),
          profitMargin: calculateMargin(
            item?.netIncome,
            item?.totalRevenue
          )?.toString(),
          fcfMargin: cashFlow_yearly_org?.reduce((fcfAcc, cash) => {
            if (item?.date === cash?.date) {
              const margin = calculateMargin(
                cash?.freeCashFlow,
                item?.totalRevenue
              );
              fcfAcc = margin;
            }
            return fcfAcc?.toString();
          }, null),
          ebitdaMargin: calculateMargin(
            item?.ebitda,
            item?.totalRevenue
          )?.toString(),
          ebitMargin: calculateMargin(
            item?.ebit,
            item?.totalRevenue
          )?.toString(),
          researchDevelopment: item?.researchDevelopment?.toString(),
          researchDevelopmentOverRevenue: calculateMargin(
            item?.researchDevelopment,
            item?.totalRevenue
          )?.toString(),
          psRatio: balanceSheet_yearly_org?.reduce((psAcc, balance) => {
            if (item?.date === balance?.date) {
              const psRatio = calculatePsRatio(
                item?.totalRevenue,
                balance?.commonStockSharesOutstanding,
                PriceChange[PriceChange.length - 1]?.close
              );
              psAcc = psRatio;
            }
            return psAcc?.toString();
          }, null)
        };
      }
    );
    // ======================= junaid end ========================

    // ============= talha start TTM ===============

    //get data from highlights
    const {
      RevenueTTM,
      GrossProfitTTM,
      MostRecentQuarter,
      DilutedEpsTTM,
      DividendShare,
      OperatingMarginTTM,
      ProfitMargin,
      EBITDA,
      BookValue,
      MarketCapitalization,
      PERatio,
      PEGRatio,
      EPSEstimateNextQuarter,
      EPSEstimateNextYear,
      EPSEstimateCurrentQuarter,
      EPSEstimateCurrentYear,
      ReturnOnAssetsTTM
    } = data.Highlights;

    const ReoEquity5year = calculateFiveYear(cashFlow_yearly, "returnOnEquity");
    const ReoAssets5year = calculateFiveYear(cashFlow_yearly, "returnOnAssets");

    //get data from valuation
    const EnterpriseValue = data?.Valuation?.EnterpriseValue;
    const ForwardPE = data?.Valuation?.ForwardPE;

    //get data from SharesStats
    const {
      SharesOutstanding,
      PercentInsiders,
      PercentInstitutions,
      SharesFloat
    } = data.SharesStats;

    //get data from SplitsDividends
    const ExDividendDate = data?.SplitsDividends?.ExDividendDate;
    const ForwardAnnualDividendRate =
      data?.SplitsDividends?.ForwardAnnualDividendRate;

    //get data from SplitsDividends
    const FullTimeEmployees = data.General?.FullTimeEmployees;
    const ShortRatio = data?.Technicals?.ShortRatio;

    //get historyInEarnings
    const historyInEarnings = Object.values(data?.Earnings?.History);
    const trendInEarnings = Object.values(data?.Earnings?.Trend);

    //get epsActual
    const epsActual = () => {
      const sameQuat = historyInEarnings?.find(
        (h_items) => h_items?.date === MostRecentQuarter
      );
      return sameQuat?.epsActual;
    };

    //get financialReportDate
    const financialReportDate = () => {
      const sameQuat = historyInEarnings?.find(
        (h_items) => h_items?.date === MostRecentQuarter
      );
      return sameQuat?.reportDate;
    };

    //get previousEpsActual
    const previousActual = () => {
      const previousQuatIndex = comparedateFormulaIndex({
        data: historyInEarnings,
        object: MostRecentQuarter
      });

      if (previousQuatIndex >= 1) {
        const previousQuat = historyInEarnings[previousQuatIndex + 1];
        return previousQuat ? previousQuat?.epsActual : null;
      } else {
        console.log("No previousActual Found!");
        return null;
      }
    };

    //calculate return on capital growth 5 year
    const ROC5Year = calculateGrowth(
      balanceSheet_yearly[0]?.returnOnCapital,
      balanceSheet_yearly[4]?.returnOnCapital
    );

    //TTMS
    const TTM = {
      sharesOutTTM: SharesOutstanding.toString(),
      fcfGrowthThreeYears: calculateGrowth(
        cashFlow_yearly_org[0]?.freeCashFlow,
        cashFlow_yearly_org[3]?.freeCashFlow
      )?.toString(),
      fcfGrowthFiveYears: calculateGrowth(
        cashFlow_yearly_org[0]?.freeCashFlow,
        cashFlow_yearly_org[5]?.freeCashFlow
      )?.toString(),
      forwardPe: ForwardPE?.toString(),
      returnOnEquity5Year: ReoEquity5year?.toString(),
      returnOnAssets5Year: ReoAssets5year?.toString(),
      returnOnCapital5Year: ROC5Year?.toString(),
      lastSplitDate: LastSplitDate,
      lastStockSplit: splitFactor?.toString(),
      lastStockSplitRatio: LastStockSplitRatio?.toString(),
      float: SharesFloat?.toString(),
      shortRatio: ShortRatio?.toString(),
      shortPercentShare: ShortPercentShare?.toString(),
      shortPercentFloat: ShortPercentFloat?.toString(),
      beta1Year: Beta1Year?.toString(),
      epsGrowth3Year: YearlyGrowthTTMs?.EpsGrowth3?.toString(),
      epsGrowth5Year: YearlyGrowthTTMs?.EpsGrowth5?.toString(),
      netIncomeGrowth3Year: YearlyGrowthTTMs?.NetIncomeGrowth3?.toString(),
      netIncomeGrowth5Year: YearlyGrowthTTMs?.NetIncomeGrowth5?.toString(),
      operatingIncomeGrowth3Year: YearlyGrowthTTMs?.OpIncomeGrowth3?.toString(),
      operatingIncomeGrowth5Year: YearlyGrowthTTMs?.OpIncomeGrowth5?.toString(),
      grossProfit3Year: YearlyGrowthTTMs?.GProfitGrowth3?.toString(),
      grossProfit5Year: YearlyGrowthTTMs?.GProfitGrowth5?.toString(),
      revenueGrowth3Year: YearlyGrowthTTMs?.RevGrowth3Year?.toString(),
      revenueGrowth5Year: YearlyGrowthTTMs?.RevGrowth5Year?.toString(),
      ipoDate: IPODate,
      founded: Founded ? Founded?.toString() : null,
      employees: Employees?.toString(),
      premarketPercentageChg: null,
      // premarketPercentageChg: PriceChanges?.PremktPercentChg
      //   ? PriceChanges.PremktPercentChg?.toString()
      //   : null,
      premarketPrice: null,
      priceTargetPercentage: PriceTargetPer?.toString(),
      previousClose: previousDayClose?.toString(),
      anaylystRating: AnalystRating?.toString(),
      analystCount: AnalystCount?.toString(),
      priceChange1Day: null,
      priceChange1Week: null,
      priceChange1Month: null,
      priceChange6Month: null,
      priceChange1Year: null,
      priceChangeThisYear: null,
      priceChange3Year: null,
      priceChange5Year: null,
      priceChange10Year: null,
      // priceChange1Day: PriceChanges.PriceChange1D?.toString(),
      // priceChange1Week: PriceChanges?.PriceChange1W.toString(),
      // priceChange1Month: PriceChanges?.PriceChange1M?.toString(),
      // priceChange6Month: PriceChanges?.PriceChange6M?.toString(),
      // priceChange1Year: PriceChanges?.PriceChange1Y?.toString(),
      // priceChangeThisYear: PriceChanges?.PriceChangeThisYear?.toString(),
      // priceChange3Year: PriceChanges?.PriceChange3Y?.toString(),
      // priceChange5Year: PriceChanges?.PriceChange5Y?.toString(),
      // priceChange10Year: PriceChanges?.PriceChange10Y?.toString(),
      priceChange52WeekHigh: WeekHigh52?.toString(),
      priceChange52WeekLow: WeekLow52?.toString(),
      sharesChange: {
        sharesChangeYearly: calculateGrowth(
          outstandingSharesAnnual[0]?.shares,
          outstandingSharesAnnual[1]?.shares
        )?.toString(),
        sharesChangeQuarterly: calculateGrowth(
          outstandingSharesQuat[0]?.shares,
          outstandingSharesQuat[1]?.shares
        )?.toString()
      },
      RevOverEmployees: (RevenueTTM / FullTimeEmployees)?.toString(),
      piotroskiFScore: calculatePiotroskiFScore({
        netIncome: Number(cashFlow_yearly_org[0]?.netIncome),
        ReturnOnAssetsTTM,
        totalCashFromOperatingActivities: Number(
          cashFlow_yearly_org[0]?.totalCashFromOperatingActivities
        ),
        longTermDebt: {
          current: Number(balanceSheet_yearly_org[0]?.longTermDebt),
          previous: Number(balanceSheet_yearly_org[1]?.longTermDebt)
        },
        totalCurrentAssets: {
          current: Number(balanceSheet_yearly_org[0]?.totalCurrentAssets),
          previous: Number(balanceSheet_yearly_org[1]?.totalCurrentAssets)
        },
        totalCurrentLiabilities: {
          current: Number(balanceSheet_yearly_org[0]?.totalCurrentLiabilities),
          previous: Number(balanceSheet_yearly_org[1]?.totalCurrentLiabilities)
        },
        shares: {
          lastYear: calculateLastYearShares({ outstandingSharesAnnual }),
          prevYear: calculatePreviousYearShares({ outstandingSharesAnnual })
        },
        grossMargin: {
          lastYear: incomeStatement_yearly[0]?.grossMargin / 100,
          prevYear: incomeStatement_yearly[1]?.grossMargin / 100
        },
        assetTurnoverRatio: {
          lastYear: balanceSheet_yearly[0]?.assetTurnover,
          prevYear: balanceSheet_yearly[1]?.assetTurnover
        }
      })?.toString(),
      revGrowthNextYear: revGrowthNextYear({ trendInEarnings })?.toString(),
      revGrowthThisYear: revGrowthThisYear({ trendInEarnings })?.toString(),
      InvTurnover: (
        sumUpRecentQuarter({
          data: mostRecentDateObject,
          propertyName: "costOfRevenue"
        }) /
        (sumUpRecentQuarter({
          data: mostRecentDateBalanceSheetQuarterly,
          propertyName: "inventory"
        }) /
          4)
      )?.toString(),
      PayoutFreq: getMostRecentYearObject(dividendInfo)?.toString(),
      AltmanZScore: calculateAltmanZScore(
        data,
        Number(PriceChange[PriceChange?.length - 1]?.close)
      )?.toString(),
      revGrowthThisQuarter: revenueEstimateGrowth({
        trendInEarnings,
        MostRecentQuarter
      })?.toString(),

      revGrowthNextQuarter: revenueEstimateGrowthNextQuat({
        trendInEarnings,
        MostRecentQuarter
      })?.toString(),
      shareholderYield: calculateShareholderYield({
        dividendYield: dividendsQuat[dividendsQuat.length - 1]?.dividendYield,
        buybackYield: ratiosAndMetricsQuat[0]?.buybackYield
      })?.toString(),
      relativeVolume: calculateGrowth(
        avgvol[avgvol.length - 1]?.avgvol,
        PriceChange[PriceChange?.length - 1]?.volume
      )?.toString(),
      averageVolume: avgvol[avgvol?.length - 1]?.avgvol?.toString(),
      epsGrowthNextQuarter: EPSEstimateNextQuarter?.toString(),
      epsGrowthThisQuarter: EPSEstimateCurrentQuarter?.toString(),
      epsGrowthNextYear: EPSEstimateNextYear?.toString(),
      epsGrowthThisYear: EPSEstimateCurrentYear?.toString(),
      cashOverMarketCap: calculateCashOverMarketCap({
        cashAndEquivalents: calculateTTM({
          array: balanceSheet_quat_org,
          variableName: "cashAndEquivalents"
        }),
        MarketCapitalization
      })?.toString(),
      financialReportDate: financialReportDate(),
      volume: PriceChange[PriceChange?.length - 1]?.volume?.toString(),
      dividend: ForwardAnnualDividendRate?.toString(),
      netCashOverDebtGrowth: calculateNetCashOverDebtGrowth({
        currentYear: {
          cash: balanceSheet_quat_org[0]?.cash,
          shortTermDebt: balanceSheet_quat_org[0]?.shortTermDebt
        },
        previousYear: {
          cash: balanceSheet_yearly_org[0]?.cash,
          shortTermDebt: balanceSheet_yearly_org[0]?.shortTermDebt
        }
      })?.toString(),
      lastClosePrice: PriceChange[PriceChange?.length - 1]?.close?.toString(),
      evOverEbitda: calculateEvOverEbitda({
        EnterpriseValue,
        ebitda: EBITDA
      })?.toString(),
      evOverEarnings: calculateEvOverEarnings({
        EnterpriseValue,
        netIncome: cashFlow_yearly_org[0]?.netIncome
      })?.toString(),
      forwardEvOverSales: calculateForwardEvOverSales({
        EnterpriseValue,
        revenueEstimateAvg: Object.values(data?.Earnings?.Trend)[0]
          ?.revenueEstimateAvg
      })?.toString(),
      pegRatio: PEGRatio?.toString(),
      taxOverRevenue: calculateTaxOverRevenue({
        incomeTaxExpense: incomeStatement_yearly_org[0]?.incomeTaxExpense,
        incomeBeforeTax: incomeStatement_yearly_org[0]?.incomeBeforeTax
      })?.toString(),
      quickRatio: calculateQuickRatio({
        cash: balanceSheet_quat_org[0]?.cash,
        shortTermInvestments: balanceSheet_quat_org[0]?.shortTermInvestments,
        netReceivables: balanceSheet_quat_org[0]?.netReceivables,
        totalCurrentLiabilities:
          balanceSheet_quat_org[0]?.totalCurrentLiabilities
      })?.toString(),
      profOverEmployee: (
        Number(cashFlow_quat_org[0]?.netIncome) / FullTimeEmployees
      )?.toString(),
      ExDividendDate: ExDividendDate,
      sharesInstitutions: PercentInstitutions?.toString(),
      sharesInsiders: PercentInsiders?.toString(),
      operatingMargin: OperatingMarginTTM?.toString(),
      industry,
      sector: Sector,
      country,
      exchange: Exchange,
      revenue: {
        revenueTTM: RevenueTTM?.toString(),
        revenueGrowthYearly:
          incomeStatement_yearly[0]?.revenueGrowth?.toString(),
        revenueGrowthQuat: incomeStatement_quat[0]?.revenueGrowth?.toString()
      },
      grossProfit: GrossProfitTTM?.toString(),
      costOfRevenue: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "costOfRevenue"
      })?.toString(),
      sellingGeneralAdministrative: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "sellingGeneralAdministrative"
      })?.toString(),
      researchDevelopment: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "researchDevelopment"
      })?.toString(),
      totalOperatingExpenses: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "totalOperatingExpenses"
      })?.toString(),
      operatingIncome: {
        operatingIncome: calculateTTM({
          array: incomeStatement_quat_org,
          variableName: "operatingIncome"
        })?.toString(),
        opIncomeGrowthQuat: incomeStatement_quat[0]?.opIncomeGrowth?.toString(),
        opIncomeGrowthYearly:
          incomeStatement_yearly[0]?.opIncomeGrowth?.toString()
      },
      interestExpense: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "interestExpense"
      })?.toString(),
      incomeBeforeTax: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "incomeBeforeTax"
      })?.toString(),
      incomeTax: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "incomeTaxExpense"
      })?.toString(),
      netIncome: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "netIncome"
      })?.toString(),
      epsActual: epsActual()?.toString(),
      dilutedEspActual: DilutedEpsTTM?.toString(),
      dividendShare: DividendShare?.toString(),
      profitMargin: (ProfitMargin * 100)?.toString(),
      ebitda: EBITDA?.toString(),
      ebitdaMargin: calculateMargin(EBITDA, RevenueTTM)?.toString(),
      ebit: incomeStatement_quat_org[0]?.ebit?.toString(),
      ebitMargin: calculateMargin(
        incomeStatement_quat_org[0]?.ebit,
        incomeStatement_quat_org[0]?.totalRevenue
      )?.toString(),
      depreciationAndAmortization: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "depreciationAndAmortization"
      })?.toString(),
      freeCashFlowMargin: cashFlow_quat_org[0]?.capitalExpenditures?.toString(),
      grossMargin: calculateGrossMargin(
        RevenueTTM,
        incomeStatement_quat_org[0]?.costOfRevenue
      )?.toString(),
      cashAndEquivalents:
        balanceSheet_quat_org[0]?.cashAndEquivalents?.toString(),
      shortTermInvestments:
        balanceSheet_quat_org[0]?.shortTermInvestments?.toString(),
      cashAndCashEquivalents:
        balanceSheet_quat_org[0]?.cashAndShortTermInvestments?.toString(),
      cashAndShortTermInvestments:
        balanceSheet_quat_org[0]?.cashAndShortTermInvestments?.toString(),
      receivables: balanceSheet_quat_org[0]?.netReceivables?.toString(),
      inventory: balanceSheet_quat_org[0]?.inventory?.toString(),
      otherCurrentAssets:
        balanceSheet_quat_org[0]?.otherCurrentAssets?.toString(),
      totalCurrentAssets:
        balanceSheet_quat_org[0]?.totalCurrentAssets?.toString(),
      propertyPlantAndEquipment:
        balanceSheet_quat_org[0]?.propertyPlantAndEquipmentNet?.toString(),
      longTermInvestments:
        balanceSheet_quat_org[0]?.longTermInvestments?.toString(),
      goodWillAndIntangibleAssets: (
        Number(balanceSheet_quat_org[0]?.goodWill) +
        Number(balanceSheet_quat_org[0]?.intangibleAssets)
      )?.toString(),
      otherLongTermAssets: balanceSheet_quat_org[0]?.otherAssets?.toString(),
      totalLongTernAssets:
        balanceSheet_quat_org[0]?.nonCurrentAssetsTotal?.toString(),
      totalAssets: balanceSheet_quat_org[0]?.totalAssets?.toString(),
      accountsPayable: balanceSheet_quat_org[0]?.accountsPayable?.toString(),
      deferredRevenue:
        balanceSheet_quat_org[0]?.currentDeferredRevenue?.toString(),
      currentDebt: balanceSheet_quat_org[0]?.shortTermDebt?.toString(),
      otherCurrentLiabilities:
        balanceSheet_quat_org[0]?.otherCurrentLiab?.toString(),
      totalCurrentLiabilities:
        balanceSheet_quat_org[0]?.totalCurrentLiabilities?.toString(),
      longTernDebt: balanceSheet_quat_org[0]?.longTermDebtTotal?.toString(),
      totalLongTermLiabilities:
        balanceSheet_quat_org[0]?.nonCurrentLiabilitiesTotal?.toString(),
      totalLiabilities: balanceSheet_quat_org[0]?.totalLiab?.toString(),
      totalDebt: (
        Number(balanceSheet_quat_org[0]?.shortTermDebt) +
        Number(balanceSheet_quat_org[0]?.longTermDebt)
      )?.toString(),
      commonStock: balanceSheet_quat_org[0]?.commonStock?.toString(),
      retainedEarnings: balanceSheet_quat_org[0]?.retainedEarnings?.toString(),
      comprehensiveIncome:
        balanceSheet_quat_org[0]?.accumulatedOtherComprehensiveIncome?.toString(),
      shareHoldersEquity:
        balanceSheet_quat_org[0]?.totalStockholderEquity?.toString(),
      totalLiabilitiesAndEquity:
        balanceSheet_quat_org[0]?.liabilitiesAndStockholdersEquity?.toString(),
      netCashOverDebt: (
        Number(balanceSheet_quat_org[0]?.cash) /
        Number(balanceSheet_quat_org[0]?.shortTermDebt)
      )?.toString(),
      netCashperShare: (
        Number(balanceSheet_quat_org[0]?.cash) /
        Number(balanceSheet_quat_org[0]?.shortTermDebt) /
        SharesOutstanding
      )?.toString(),
      workingCapital: balanceSheet_quat_org[0]?.netWorkingCapital?.toString(),
      bookValuePerShare: BookValue?.toString(),
      netIncome: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "netIncome"
      })?.toString(),
      depreciationAndAmortization: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "depreciationAndAmortization"
      })?.toString(),
      shareBasedCompensation: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "stockBasedCompensation"
      })?.toString(),
      otherOperatingActivities: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "otherCashflowsFromInvestingActivities"
      })?.toString(),
      operatingCashFlow: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "totalCashFromOperatingActivities"
      })?.toString(),
      capitalExpenditures: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "capitalExpenditures"
      })?.toString(),
      otherInvestingActivities: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "changeToInventory"
      })?.toString(),
      investingCashFlow: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "totalCashflowsFromInvestingActivities"
      })?.toString(),
      dividendPaid: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "dividendsPaid"
      })?.toString(),
      shareIssuanceOverRepurchase: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "salePurchaseOfStock"
      })?.toString(),
      otherFinanceActivities:
        cashFlow_quat_org[0]?.otherCashflowsFromFinancingActivities?.toString(),
      financeCashFlow: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "totalCashFromFinancingActivities"
      })?.toString(),
      netCashFlow: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "changeInCash"
      })?.toString(),
      freeCashFlow: calculateTTM({
        array: cashFlow_quat_org,
        variableName: "freeCashFlow"
      })?.toString(),
      freeCashFlowMargin: calculateMargin(
        cashFlow_quat_org[0]?.freeCashFlow,
        incomeStatement_quat_org[0]?.totalRevenue
      )?.toString(),
      freeCashFlowPerShare: (
        Number(cashFlow_quat_org[0]?.freeCashFlow) / SharesOutstanding
      )?.toString(),
      marketCapitalization: MarketCapitalization?.toString(),
      enterpriseValue: EnterpriseValue?.toString(),
      peRatio: PERatio?.toString(),
      psRatio: (MarketCapitalization / RevenueTTM)?.toString(),
      pOverFcfRatio: (
        MarketCapitalization / Number(cashFlow_quat_org[0]?.freeCashFlow)
      )?.toString(),
      pOverOcfRatio: (
        MarketCapitalization /
        Number(cashFlow_quat_org[0]?.totalCashFromOperatingActivities)
      )?.toString(),
      evOverSalesRatio: (EnterpriseValue / RevenueTTM)?.toString(),
      evEbitdaRatio: (
        EnterpriseValue / Number(incomeStatement_quat_org[0]?.ebitda)
      )?.toString(),
      evEbitRatio: (
        EnterpriseValue / Number(incomeStatement_quat_org[0]?.ebit)
      )?.toString(),
      evFcfRatio: (
        EnterpriseValue / Number(cashFlow_quat_org[0]?.freeCashFlow)
      )?.toString(),
      debtOverEquityRatio: (
        Number(balanceSheet_quat_org[0]?.shortTermDebt) +
        Number(balanceSheet_quat_org[0]?.longTermDebt) -
        Number(balanceSheet_quat_org[0]?.totalStockholderEquity)
      )?.toString(),
      debtOverEbitdaRatio: (
        Number(balanceSheet_quat_org[0]?.shortTermDebt) +
        Number(balanceSheet_quat_org[0]?.longTermDebt) -
        Number(incomeStatement_quat_org[0]?.ebitda)
      )?.toString(),
      debtFcfRatio: (
        Number(balanceSheet_quat_org[0]?.shortTermDebt) +
        Number(balanceSheet_quat_org[0]?.longTermDebt) -
        Number(cashFlow_quat_org[0]?.freeCashFlow)
      )?.toString(),
      currentRatio: (
        Number(balanceSheet_quat_org[0]?.totalCurrentAssets) /
        Number(balanceSheet_quat_org[0]?.totalCurrentLiabilities)
      )?.toString(),
      assetTurnover: (
        RevenueTTM / Number(balanceSheet_quat_org[0]?.totalAssets)
      )?.toString(),
      returnOnEquity: calculateMargin(
        incomeStatement_quat_org[0]?.netIncome,
        balanceSheet_quat_org[0]?.totalStockholderEquity
      )?.toString(),
      returnOnAssets: calculateMargin(
        incomeStatement_quat_org[0]?.netIncome,
        balanceSheet_quat_org[0]?.totalAssets
      )?.toString(),
      returnOnCapital: calculateMargin(
        incomeStatement_quat_org[0]?.ebit,
        balanceSheet_quat_org[0]?.netInvestedCapital
      )?.toString(),
      fcfYield: calculateMargin(
        cashFlow_quat_org[0]?.freeCashFlow,
        MarketCapitalization
      )?.toString(),
      payoutRatio: calculateMargin(DividendShare, epsActual())?.toString(),
      revenueGrowthYOY: calculateGrowth(
        cashFlow_quat_org[0]?.freeCashFlow,
        cashFlow_quat_org[1]?.freeCashFlow
      )?.toString(),
      netIncomeGrowth: calculateGrowth(
        incomeStatement_quat_org[0]?.netIncome,
        incomeStatement_quat_org[1]?.netIncome
      )?.toString(),
      dividendGrowth: calculateGrowth(
        cashFlow_yearly_org[0]?.dividendsPaid,
        cashFlow_yearly_org[1]?.dividendsPaid
      )?.toString(),
      cashGrowth: calculateGrowth(
        balanceSheet_quat_org[0]?.cash,
        balanceSheet_quat_org[1]?.cash
      )?.toString(),
      debtGorwth: (
        Number(balanceSheet_quat_org[0]?.shortTermDebt) /
          Number(balanceSheet_quat_org[1]?.shortTermDebt) -
        1 * 100
      )?.toString(),
      marketCapGrowth: calculateGrowth(
        ratiosAndMetricsQuat[0]?.marketCap,
        ratiosAndMetricsQuat[1]?.marketCap
      )?.toString(),
      epsGrowth: calculateGrowth(epsActual(), previousActual())?.toString()
    };

    // // ============= talha end TTM ===============
    // ***************** Queries Start *************************

    // const oldTTM = { ...TTM };
    // const newTTM = { ...TTM };
    // delete newTTM?.sharesChange;
    // delete newTTM?.revenue;
    // delete newTTM?.operatingIncome;
    // console.log(ticker);
    // const TickerId = await prisma.ticker.findFirst({
    //   where: {
    //     ticker: ticker
    //   }
    // });
    // if (!TickerId) {
    //   throw new Error(`Ticker by id ${TickerId.id} not found!`);
    // }

    // const TTMPromise = prisma.tTM.create({
    //   data: {
    //     ...newTTM,
    //     ipoDate: TTM?.ipoDate,
    //     sharesChangeYearly: TTM?.sharesChange?.sharesChangeYearly,
    //     sharesChangeQuarterly: TTM?.sharesChange?.sharesChangeQuarterly,
    //     revenueTTM: TTM?.revenue?.revenueTTM,
    //     revenueGrowthYearly: TTM?.revenue?.revenueGrowthYearly,
    //     revenueGrowthQuat: TTM?.revenue?.revenueGrowthQuat,
    //     operatingIncome: TTM?.operatingIncome?.operatingIncome,
    //     opIncomeGrowthQuat: TTM?.operatingIncome?.opIncomeGrowthQuat,
    //     opIncomeGrowthYearly: TTM?.operatingIncome?.opIncomeGrowthYearly,
    //     Ticker: {
    //       connect: {
    //         id: TickerId?.id
    //       }
    //     }
    //   }
    // });

    // const earningsPromisesQuat = earningsQuat.map((earningsQuarterly) => {
    //   return prisma.earnings.create({
    //     data: {
    //       ...earningsQuarterly,
    //       Type: Type?.QUARTERLY,
    //       Ticker: {
    //         connect: {
    //           id: TickerId?.id
    //         }
    //       }
    //     }
    //   });
    // });
    // const earningsPromisesYearly = earningsYearly.map((earningsYearly) => {
    //   return prisma.earnings.create({
    //     data: {
    //       ...earningsYearly,
    //       Type: Type.YEARLY,
    //       Ticker: {
    //         connect: {
    //           id: TickerId.id
    //         }
    //       }
    //     }
    //   });
    // });

    // const dividendsPromisesYearly = dividendsYearly.map((dividendsYearly) => {
    //   return prisma.dividend.create({
    //     data: {
    //       ...dividendsYearly,
    //       Type: Type.YEARLY,
    //       Ticker: {
    //         connect: {
    //           id: TickerId.id
    //         }
    //       }
    //     }
    //   });
    // });

    // const dividendsPromisesQuarterly = dividendsQuat.map((dividendsQuat) => {
    //   return prisma.dividend.create({
    //     data: {
    //       ...dividendsQuat,
    //       Type: Type.QUARTERLY,
    //       Ticker: {
    //         connect: {
    //           id: TickerId.id
    //         }
    //       }
    //     }
    //   });
    // });

    // const ratiosAndMetricsPromisesYearly = ratiosAndMetricsYearly.map(
    //   (ratiosAndMetricsYearly) => {
    //     return prisma.ratiosAndMetrics.create({
    //       data: {
    //         ...ratiosAndMetricsYearly,
    //         Type: Type.YEARLY,
    //         Ticker: {
    //           connect: {
    //             id: TickerId.id
    //           }
    //         }
    //       }
    //     });
    //   }
    // );
    // const ratiosAndMetricsPromisesQuater = ratiosAndMetricsQuat.map(
    //   (ratiosAndMetricsQuat) => {
    //     return prisma.ratiosAndMetrics.create({
    //       data: {
    //         ...ratiosAndMetricsQuat,
    //         Type: Type.QUARTERLY,
    //         Ticker: {
    //           connect: {
    //             id: TickerId.id
    //           }
    //         }
    //       }
    //     });
    //   }
    // );

    // const cashFlowPromisesYearly = cashFlow_yearly.map((cashFlow_yearly) => {
    //   return prisma.cashFlow.create({
    //     data: {
    //       ...cashFlow_yearly,
    //       Type: Type.YEARLY,
    //       Ticker: {
    //         connect: {
    //           id: TickerId.id
    //         }
    //       }
    //     }
    //   });
    // });
    // const cashFlowPromisesQuaterly = cashFlow_quat.map((cashFlow_Quaterly) => {
    //   return prisma.cashFlow.create({
    //     data: {
    //       ...cashFlow_Quaterly,
    //       Type: Type.QUARTERLY,
    //       Ticker: {
    //         connect: {
    //           id: TickerId.id
    //         }
    //       }
    //     }
    //   });
    // });
    // const incomeStatementPromisesQuaterly = incomeStatement_quat.map(
    //   (incomeStatement_quat) => {
    //     return prisma.incomeStatement.create({
    //       data: {
    //         ...incomeStatement_quat,
    //         Type: Type.QUARTERLY,
    //         Ticker: {
    //           connect: {
    //             id: TickerId.id
    //           }
    //         }
    //       }
    //     });
    //   }
    // );
    // const incomeStatementPromisesyearly = incomeStatement_yearly.map(
    //   (incomeStatement_yearly) => {
    //     return prisma.incomeStatement.create({
    //       data: {
    //         ...incomeStatement_yearly,
    //         Type: Type.YEARLY,
    //         Ticker: {
    //           connect: {
    //             id: TickerId.id
    //           }
    //         }
    //       }
    //     });
    //   }
    // );
    // const balanceSheetPromisesyearly = balanceSheet_yearly.map(
    //   (balanceSheet_yearly) => {
    //     return prisma.balanceSheet.create({
    //       data: {
    //         ...balanceSheet_yearly,
    //         Type: Type.YEARLY,
    //         Ticker: {
    //           connect: {
    //             id: TickerId.id
    //           }
    //         }
    //       }
    //     });
    //   }
    // );
    // const balanceSheetPromisesQuat = balanceSheet_quat.map(
    //   (balanceSheet_Quat) => {
    //     return prisma.balanceSheet.create({
    //       data: {
    //         ...balanceSheet_Quat,
    //         Type: Type.QUARTERLY,
    //         Ticker: {
    //           connect: {
    //             id: TickerId.id
    //           }
    //         }
    //       }
    //     });
    //   }
    // );

    // const [
    //   TTMRes,
    //   earningsQuaterlyRes,
    //   earningsYearlyRes,
    //   dividendsYearlyRes,
    //   dividendsQuarterlyRes,
    //   ratiosAndMetricsYearlyRes,
    //   cashFlowQuateRes,
    //   cashFlowYearlyRes,
    //   cashFlowQuatRes,
    //   incomeStatementQuaterlyRes,
    //   incomeStatementyearlyRes,
    //   balanceSheetyearlyRes,
    //   balanceSheetQuatRes
    // ] = await prisma.$transaction([
    //   TTMPromise,
    //   ...earningsPromisesQuat,
    //   ...earningsPromisesYearly,
    //   ...dividendsPromisesYearly,
    //   ...dividendsPromisesQuarterly,
    //   ...ratiosAndMetricsPromisesYearly,
    //   ...ratiosAndMetricsPromisesQuater,
    //   ...cashFlowPromisesYearly,
    //   ...cashFlowPromisesQuaterly,
    //   ...incomeStatementPromisesQuaterly,
    //   ...incomeStatementPromisesyearly,
    //   ...balanceSheetPromisesyearly,
    //   ...balanceSheetPromisesQuat
    // ]);

    // await getSocketData({ ticker, PriceChange });
    // console.log("WebSocket data processing complete.");

    // // console.log("socket data==>>", socketData);
    // const findActive = await prisma.lastTicker.findMany({});
    // if (findActive.length > 0) {
    //   await prisma.lastTicker.update({
    //     where: {
    //       id: findActive[0].id
    //     },
    //     data: {
    //       lastActiveTicker: ticker.toString()
    //     }
    //   });
    //   console.log("updated", ticker.toString());
    // } else {
    //   await prisma.lastTicker.create({
    //     data: {
    //       lastActiveTicker: ticker.toString()
    //     }
    //   });
    //   console.log("Created ", ticker.toString());
    // }

    return {
      ratiosAndMetricsQuat
      // earningsQuaterlyRes,
      // earningsYearlyRes,
      // dividendsYearlyRes,
      // dividendsQuarterlyRes,
      // ratiosAndMetricsYearlyRes,
      // cashFlowQuateRes,
      // cashFlowYearlyRes,
      // cashFlowQuatRes,
      // incomeStatementQuaterlyRes,
      // incomeStatementyearlyRes,
      // balanceSheetyearlyRes,
      // balanceSheetQuatRes
    };
  } catch (error) {
    console.log("error=========================>>", error);
  }
};
