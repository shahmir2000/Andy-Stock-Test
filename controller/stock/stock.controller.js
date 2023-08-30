const zeroPattern = /^0+(\.0+)?$/;

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
  division,
  trendsPerYear,
  calculateNetCashPerShare,
  calculateBookValue,
  calclateDebtGrowth
} = require("../../utils/stock/stock.utils");

const {
  calculateGrowth,
  calculateFiveYear,
  calculateAltmanZScore,
  getMostRecentYearObject,
  sumUpRecentQuarter,
  comparedateFormulaIndex,
  calculateGrowthEach,
  getQuartersByYear,
  calculateRevenuePrecent,
  calculateGrowthMarketCap
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
const {
  isValidNumber,
  convertValuesToArrayTypes,
  stringifyValuesExceptSpecial
} = require("../../utils/stock/numberConverter");
const { isValid } = require("zod");
const dayjs = require("dayjs");
const { verify } = require("jsonwebtoken");
const prisma = new PrismaClient();

const apiToken = "63bf6ecd8c46c5.53082791";
const populateOneTicker = async ({ ticker }) => {
  await delay(1000);
  console.log("called external");

  // const tik = "AAPL";
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
    const dividendHistoryData = [...dividends];

    // avgVol for stock ticker
    const avgvol = await stockAvgVol({ ticker: Ticker, apiToken });
    // price list day wise for stock
    const PriceChange = await stockPrice({ ticker: Ticker, apiToken });
    // ============== API Calling End ==============

    const General = data?.General;

    const Officers = Object.values(data?.General?.Officers);
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
    const LastSplitDate = data?.SplitsDividends?.LastSplitDate || null;

    //get historyInEarnings
    const historyOrgInEarnings = data?.Earnings?.History;
    const annualInOrgEarnings = data?.Earnings?.Annual;
    const sharesOutstanding = data?.SharesStats?.SharesOutstanding;
    const historyInEarnings = Object.values(data?.Earnings?.History);
    const annualInEarnings = Object.values(data?.Earnings?.Annual);
    const trendInEarnings = Object.values(data?.Earnings?.Trend);
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
    } = data?.Highlights;

    //get data from SharesStats
    const {
      SharesOutstanding,
      PercentInsiders,
      PercentInstitutions,
      SharesFloat
    } = data.SharesStats;

    //get epsActual
    const epsActual = () => {
      const sameQuat = historyInEarnings?.find(
        (h_items) => h_items?.date === MostRecentQuarter
      );
      return isValidNumber(sameQuat?.epsActual);
    };

    //get previousEpsActual
    const previousActual = () => {
      const previousQuatIndex = comparedateFormulaIndex({
        data: historyInEarnings,
        object: MostRecentQuarter
      });

      if (previousQuatIndex >= 1) {
        const previousQuat = historyInEarnings[previousQuatIndex + 1];
        return isValidNumber(previousQuat?.epsActua)
          ? previousQuat?.epsActual
          : null;
      } else {
        return null;
      }
    };

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
      TargetPrice = null,
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

    const sharesShort = data?.Technicals?.SharesShort;
    const subtractShortShareData =
      isValidNumber(sharesOutstanding) && isValidNumber(sharesShort)
        ? sharesOutstanding - sharesShort
        : null;
    const ShortPercentShare =
      isValidNumber(subtractShortShareData) && isValidNumber(sharesOutstanding)
        ? (subtractShortShareData / sharesOutstanding) * 100
        : null;

    // ======================= junaid start ======================
    const cashFlowQuat = data?.Financials?.Cash_Flow?.quarterly;
    const outstandingShareQuat = data?.outstandingShares?.quarterly;
    const outstandingSharesYearly = data?.outstandingShares?.annual;
    const cashFlowYearly = data?.Financials?.Cash_Flow?.yearly;
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
    const incomeStatementQuat = data?.Financials?.Income_Statement?.quarterly;
    const incomeStatementYearly = data?.Financials?.Income_Statement?.yearly;
    const incomeStatement_yearly_org = Object.values(
      data?.Financials?.Income_Statement?.yearly
    );

    const outstandingSharesAnnual = Object.values(
      data?.outstandingShares?.annual
    );

    const outstandingSharesQuat = Object.values(
      data?.outstandingShares?.quarterly
    );
    const earningsTrendsQuat = Object.values(data?.Earnings?.Trend);
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
          epsActual: isValidNumber(item?.epsActual),
          earningYield:
            isValidNumber(item?.epsActual) && isValidNumber(price?.close)
              ? calculateEarningsYield({
                  eps: item?.epsActual,
                  price: price?.close
                })
              : null,
          epsGrowth:
            isValidNumber(item?.epsActual) && isValidNumber(prevEps?.epsActual)
              ? calculateGrowth(item?.epsActual, prevEps?.epsActual)
              : null,
          peRatio:
            isValidNumber(price?.close) && isValidNumber(item?.epsActual)
              ? division({
                  price: price?.close,
                  epsActual: item?.epsActual
                })
              : null,
          epsEstimate: isValidNumber(item?.epsEstimate)
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
          epsActual: isValidNumber(item?.epsActual),
          earningYield:
            isValidNumber(item?.epsActual) && isValidNumber(price?.close)
              ? calculateEarningsYield({
                  eps: item?.epsActual,
                  price: price?.close
                })
              : null,
          epsGrowth:
            isValidNumber(item?.epsActual) && isValidNumber(prevEps?.epsActual)
              ? calculateGrowth(item?.epsActual, prevEps?.epsActual)?.toString()
              : null,
          peRatio:
            isValidNumber(price?.close) && isValidNumber(item?.epsActual)
              ? Number(price?.close) / Number(item?.epsActual)
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
        dividendShare: isValidNumber(item?.value),
        dividendYield:
          isValidNumber(sameDayPrice?.close) && isValidNumber(item?.value)
            ? calculateDividendYield({
                price: sameDayPrice?.close,
                dividendShare: item?.value
              })
            : null,
        payoutRatio:
          isValidNumber(item?.value) && isValidNumber(sameInEarnings?.epsActual)
            ? calculatePayoutRatio({
                dividendShare: item?.value,
                epsActual: sameInEarnings?.epsActual
              })
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
        dividendShare: isValidNumber(item?.value),
        dividendYield:
          isValidNumber(sameDayPrice?.close) && isValidNumber(item?.value)
            ? calculateDividendYield({
                price: sameDayPrice?.close,
                dividendShare: item?.value
              })
            : null,
        payoutRatio:
          isValidNumber(sameInEarnings?.epsActual) && isValidNumber(item?.value)
            ? calculatePayoutRatio({
                dividendShare: item?.value,
                epsActual: sameInEarnings?.epsActual
              })?.toString()
            : null
      };
    });
    // ratios
    const marketCapGrowthQuatRes = calculateGrowthEach({
      data: outstandingShareQuat,
      variableName: "marketCap"
    });
    const marketCapGrowthQuat = getQuartersByYear({
      data: marketCapGrowthQuatRes,
      variableName: "marketCap"
    });

    const outstandingSharesQuatRes = getQuartersByYear({
      data: outstandingSharesQuat,
      varableName: "dateFormatted"
    });
    const balanceSheet_quat_orgRes = getQuartersByYear({
      data: balanceSheet_quat_org,
      varableName: "date"
    });
    const incomeStatement_quat_org_Res = getQuartersByYear({
      data: incomeStatement_quat_org,
      varableName: "date"
    });
    const cashFlow_quat_Res = getQuartersByYear({
      data: cashFlow_quat_org,
      varableName: "date"
    });
    const dividendsRes = getQuartersByYear({
      data: dividends,
      varableName: "date"
    });
    const PriceChangeRes = getQuartersByYear({
      data: PriceChange,
      varableName: "date"
    });

    const marketCapGrowthYearly = calculateGrowthEach({
      data: outstandingSharesYearly,
      variableName: "marketCap"
    });

    const ratiosAndMetricsYearly = outstandingSharesAnnualTemp?.map(
      (item, index) => {
        const sameDayPrice = PriceChange?.find(
          (p_item) => p_item?.date === item?.dateFormatted
        );
        const sameInBalanceSheet = balanceSheet_yearly_org?.find((b_item) =>
          compareYear({
            dateOne: b_item?.date,
            dateTwo: item?.dateFormatted
          })
        );
        const sameInIncomeStatement = incomeStatement_yearly_org?.find(
          (b_item) =>
            compareYear({
              dateOne: b_item?.date,
              dateTwo: item?.dateFormatted
            })
        );
        const sameInDividends = dividends_yearly?.find((b_item) =>
          compareYear({
            dateOne: b_item?.date,
            dateTwo: item?.dateFormatted
          })
        );

        const marketCapGrowth = marketCapGrowthYearly.find(
          (b_item) => b_item?.growth
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

            evOverSalesRatio:
              isValidNumber(item?.shares) &&
              isValidNumber(price?.close) &&
              isValidNumber(sameInBalanceSheet?.netDebt) &&
              isValidNumber(Number(sameInIncomeStatement?.totalRevenue)) &&
              isValidNumber(sameInBalanceSheet?.cashAndEquivalents)
                ? calculateEnterpriseValue({
                    marketCap: Number(item?.shares) * Number(price?.close),
                    netDebt: sameInBalanceSheet?.netDebt,
                    cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
                  }) / Number(sameInIncomeStatement?.totalRevenue)
                : null,
            pOverOcfRatio:
              isValidNumber(Number(item?.shares) * Number(price?.close)) &&
              isValidNumber(sameInCashFlow?.totalCashFromOperatingActivities)
                ? ((Number(item?.shares) * Number(price?.close)) /
                  sameInCashFlow?.totalCashFromOperatingActivities
                    ? Number(sameInCashFlow?.totalCashFromOperatingActivities)
                    : null
                  )?.toString()
                : null,
            marketCapGrowth:
              outstandingSharesQuatRes.length >= index + 1 &&
              PriceChangeRes.length >= index + 1 &&
              calculateGrowthMarketCap({
                current:
                  isValidNumber(item.shares) * isValidNumber(price?.close),
                privious: isValidNumber(
                  outstandingSharesQuatRes[index + 1]?.shares *
                    PriceChangeRes[index + 1]?.close
                )
              }),
            TotalShareholderReturn:
              isValidNumber(
                Number(
                  calculateDividendYield({
                    price: sameDayPrice?.close,
                    dividendShare: sameInDividends?.value
                  })
                )
              ) &&
              calculateBuybackYield({
                salePurchaseOfStock: sameInCashFlow?.salePurchaseOfStock,
                marketCap: Number(item?.shares) * price?.close
              })
                ? isValidNumber(
                    Number(
                      calculateDividendYield({
                        price: sameDayPrice?.close,
                        dividendShare: sameInDividends?.value
                      })
                    )
                  ) +
                  calculateBuybackYield({
                    salePurchaseOfStock: sameInCashFlow?.salePurchaseOfStock,
                    marketCap: Number(item?.shares) * price?.close
                  })
                : null,
            marketCap:
              isValidNumber(item?.shares) && isValidNumber(price?.close)
                ? Number(item?.shares) * Number(price?.close)
                : null,
            enterpriseValue:
              isValidNumber(item?.shares) &&
              isValidNumber(price?.close) &&
              isValidNumber(sameInBalanceSheet?.netDebt) &&
              isValidNumber(sameInBalanceSheet?.cashAndEquivalents)
                ? calculateEnterpriseValue({
                    marketCap: Number(item?.shares) * Number(price?.close),
                    netDebt: sameInBalanceSheet?.netDebt,
                    cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
                  })
                : null,
            evOverEbit:
              isValidNumber(sameInIncomeStatement?.ebit) &&
              isValidNumber(price?.close) &&
              isValidNumber(item?.shares) &&
              isValidNumber(sameInBalanceSheet?.netDebt) &&
              isValidNumber(sameInBalanceSheet?.cashAndEquivalents)
                ? calculateEvOverEbit({
                    ebit: sameInIncomeStatement?.ebit,
                    marketCap: Number(item?.shares) * Number(price?.close),
                    netDebt: sameInBalanceSheet?.netDebt,
                    cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
                  })
                : null,
            evOverSales: calculateEvOverSales({
              enterpriseValue: calculateEnterpriseValue({
                marketCap: Number(item?.shares) * Number(price?.close),
                netDebt: sameInBalanceSheet?.netDebt,
                cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
              }),
              totalRevenue: sameInIncomeStatement?.totalRevenue
            }),
            evOverFcf: calculateEvOverFcf({
              enterpriseValue: calculateEnterpriseValue({
                marketCap: Number(item?.shares) * Number(price?.close),
                netDebt: sameInBalanceSheet?.netDebt,
                cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
              }),
              freeCashFlow: sameInCashFlow?.freeCashFlow
            }),
            fcfYield: calcualteFcfYield({
              freeCashFlow: sameInCashFlow?.freeCashFlow,
              MarketCapitalization: Number(item?.shares) * Number(price?.close)
            }),
            buybackYield: calculateBuybackYield({
              salePurchaseOfStock: sameInCashFlow?.salePurchaseOfStock,
              marketCap: Number(item?.shares) * Number(price?.close)
            })
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
      }
    );

    const ratiosAndMetricsQuat = outstandingSharesQuatRes?.map(
      (item, index) => {
        const sameDayPrice = PriceChangeRes?.find(
          (p_item) => p_item?.QuaterNum === item?.QuaterNum
        );

        const sameInBalanceSheet = balanceSheet_quat_orgRes?.find(
          (b_item) => b_item?.QuaterNum === item?.QuaterNum
        );

        const sameInIncomeStatement = incomeStatement_quat_org_Res?.find(
          (b_item) => b_item?.QuaterNum === item?.QuaterNum
        );

        const sameInCashFlow = cashFlow_quat_Res?.find(
          (b_item) => b_item?.QuaterNum === item?.QuaterNum
        );
        const sameInDividends = dividendsRes?.find(
          (b_item) => b_item?.QuaterNum === item?.QuaterNum
        );

        const marketCapGrowth = marketCapGrowthQuat.find(
          (b_item) => b_item?.dateFormatted === item?.dateFormatted
        );
        // this is for calculating marketcapGrowth

        const response = ({ price }) => {
          return {
            date: item?.dateFormatted,
            quater: item?.date.toString(),
            evOverEbitda:
              calculateEnterpriseValue({
                marketCap:
                  isValidNumber(item?.shares) && isValidNumber(price?.close)
                    ? item?.shares * price?.close
                    : null,
                netDebt: sameInBalanceSheet?.netDebt,
                cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
              }) / Number(sameInIncomeStatement?.ebitda),

            evOverSalesRatio:
              isValidNumber(item?.shares) &&
              isValidNumber(price?.close) &&
              isValidNumber(sameInBalanceSheet?.netDebt) &&
              isValidNumber(Number(sameInIncomeStatement?.totalRevenue)) &&
              isValidNumber(sameInBalanceSheet?.cashAndEquivalents)
                ? calculateEnterpriseValue({
                    marketCap: Number(item?.shares) * Number(price?.close),
                    netDebt: sameInBalanceSheet?.netDebt,
                    cashAndEquivalents: sameInBalanceSheet?.cashAndEquivalents
                  }) / Number(sameInIncomeStatement?.totalRevenue)
                : null,

            pOverOcfRatio:
              isValidNumber(Number(item?.shares) * Number(price?.close)) &&
              isValidNumber(sameInCashFlow?.totalCashFromOperatingActivities)
                ? (
                    (Number(item?.shares) * Number(price?.close)) /
                    Number(sameInCashFlow?.totalCashFromOperatingActivities)
                  )?.toString()
                : null,
            marketCapGrowth:
              outstandingSharesQuatRes.length >= index + 1 &&
              PriceChangeRes.length >= index + 1 &&
              calculateGrowthMarketCap({
                current:
                  isValidNumber(item.shares) * isValidNumber(price?.close),
                privious: isValidNumber(
                  outstandingSharesQuatRes[index + 1]?.shares *
                    PriceChangeRes[index + 1]?.close
                )
              }),
            TotalShareholderReturn:
              isValidNumber(
                Number(
                  calculateDividendYield({
                    price: sameDayPrice?.close,
                    dividendShare: sameInDividends?.value
                  })
                )
              ) &&
              calculateBuybackYield({
                salePurchaseOfStock: sameInCashFlow?.salePurchaseOfStock,
                marketCap: Number(item?.shares) * price?.close
              })
                ? isValidNumber(
                    Number(
                      calculateDividendYield({
                        price: sameDayPrice?.close,
                        dividendShare: sameInDividends?.value
                      })
                    )
                  ) +
                  calculateBuybackYield({
                    salePurchaseOfStock: sameInCashFlow?.salePurchaseOfStock,
                    marketCap: Number(item?.shares) * price?.close
                  })
                : null,

            marketCap:
              isValidNumber(item?.shares) && isValidNumber(price?.close)
                ? Number(item?.shares) * Number(price?.close)
                : null,
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
      }
    );

    // balancesheet
    const balanceSheet_quat = balanceSheet_quat_org?.map((item, index) => {
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
          netCashPerShare: calculateNetCashPerShare({
            cash: item?.cash,
            shortTermDebt: item?.shortTermDebt,
            commonStockSharesOutstanding: item?.commonStockSharesOutstanding
          }),
          bookValue: isValidNumber(
            calculateBookValue({
              totalAssets: item?.totalAssets,
              totalLiab: item?.totalLiab
            })
          ),
          netWorkingCapital: isValidNumber(item?.netWorkingCapital),
          liabilitiesAndStockholdersEquity: isValidNumber(
            item?.liabilitiesAndStockholdersEquity
          ),
          totalStockholderEquity: isValidNumber(item?.totalStockholderEquity),
          retainedEarnings: isValidNumber(item?.retainedEarnings),
          accumulatedOtherComprehensiveIncome: isValidNumber(
            item?.accumulatedOtherComprehensiveIncome
          ),
          commonStock: isValidNumber(item?.commonStock),
          goodWillAndIntangibleAssets:
            isValidNumber(item?.goodWill) +
            isValidNumber(item?.intangibleAssets),
          propertyPlantAndEquipmentNet: isValidNumber(
            item?.propertyPlantAndEquipmentNet
          ),
          deferredLongTermLiab: isValidNumber(item?.deferredLongTermLiab),
          longTermDebtTotal: isValidNumber(item?.longTermDebtTotal),
          totalCurrentLiabilities: isValidNumber(item?.totalCurrentLiabilities),
          otherCurrentLiab: isValidNumber(item?.otherCurrentLiab),
          shortTermDebt: isValidNumber(item?.shortTermDebt),
          currentDeferredRevenue: isValidNumber(item?.currentDeferredRevenue),
          accountsPayable: isValidNumber(item?.accountsPayable),
          otherAssets: isValidNumber(item?.otherAssets),
          nonCurrentAssetsTotal: isValidNumber(item?.nonCurrentAssetsTotal),
          longTermInvestments: isValidNumber(item?.longTermInvestments),
          totalCurrentAssets: isValidNumber(item?.totalCurrentAssets),
          cashAndEquivalents: isValidNumber(item?.cashAndEquivalents),
          shortTermInvestments: isValidNumber(item?.shortTermInvestments),
          cashAndShortTermInvestments: isValidNumber(
            item?.cashAndShortTermInvestments
          ),
          cashGrowth:
            balanceSheet_quat_org.length >= index + 1 &&
            calculateGrowth(
              item?.cash,
              balanceSheet_quat_org[index + 1]?.cash
            )?.toString(),
          netReceivables: isValidNumber(item?.netReceivables),
          otherCurrentAssets: isValidNumber(item?.otherCurrentAssets),
          inventory: isValidNumber(item?.inventory),
          sharesOut: isValidNumber(item?.commonStockSharesOutstanding),
          netCashOverDebt:
            isValidNumber(item?.cashAndEquivalents) &&
            isValidNumber(item?.totalCurrentLiabilities)
              ? Number(item?.cashAndEquivalents) /
                Number(item?.totalCurrentLiabilities)
              : null,
          totalCash: isValidNumber(item.cashAndEquivalents),
          totalDebt:
            isValidNumber(item.shortTermDebt) &&
            isValidNumber(item.longTermDebt)
              ? Number(item.shortTermDebt) + Number(item.longTermDebt)
              : null,
          debtGrowth:
            balanceSheet_quat_org[index - 1] >= balanceSheet_quat_org.length &&
            isValidNumber(
              calclateDebtGrowth({
                currentDebt:
                  Number(item.shortTermDebt) + Number(item.longTermDebt),
                previousDebt:
                  Number(balanceSheet_quat_org[index - 1].shortTermDebt) +
                  Number(balanceSheet_quat_org[index - 1].longTermDebt)
              })
            ),
          currentRatio:
            isValidNumber(item.totalCurrentAssets) &&
            isValidNumber(Number(item.totalCurrentLiabilities))
              ? (
                  Number(item.totalCurrentAssets) /
                  Number(item.totalCurrentLiabilities)
                )?.toString()
              : null,

          totalAssets: isValidNumber(item?.totalAssets),
          totalLiab: isValidNumber(item?.totalLiab),
          pbRatio: calculatePbRatio(
            PriceChange[PriceChange.length - 1]?.close,
            item?.totalAssets,
            item?.totalLiab
          ),
          debtOverEquity: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: item?.totalStockholderEquity
          }),
          debtOverEbitda: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: sameInIncomeStatement?.ebitda
          }),
          debtOverFcf: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: sameInCashFlow?.freeCashFlow
          }),
          shareHolderEquity: isValidNumber(item?.totalStockholderEquity),
          workingCapital: isValidNumber(item?.netWorkingCapital),
          assetTurnover:
            isValidNumber(sameInIncomeStatement?.totalRevenue) &&
            isValidNumber(item?.totalAssets)
              ? Number(sameInIncomeStatement?.totalRevenue) /
                Number(item?.totalAssets)
              : null,
          returnOnCapital: isValidNumber(
            calculateROC({
              totalAssets: item?.totalAssets,
              totalCurrentAssets: item?.totalCurrentAssets,
              ebit: sameInIncomeStatement?.ebit
            })
          ),
          netCashOverDebtGrowth:
            isValidNumber(item?.cashAndEquivalents) &&
            isValidNumber(item?.shortLongTermDebtTotal)
              ? (Number(item?.cashAndEquivalents) /
                  Number(item?.shortLongTermDebtTotal)) *
                100
              : null,
          priceOverFcfRatio: calculatePriceOverFcfRatio({
            price: price?.close,
            freeCashFlow: sameInCashFlow?.freeCashFlow,
            commonStockSharesOutstanding: item?.commonStockSharesOutstanding
          })
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

    const balanceSheet_yearly = balanceSheet_yearly_org?.map((item, index) => {
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
          netCashPerShare: calculateNetCashPerShare({
            cash: item?.cash,
            shortTermDebt: item?.shortTermDebt,
            commonStockSharesOutstanding: item?.commonStockSharesOutstanding
          }),
          bookValue: isValidNumber(
            calculateBookValue({
              totalAssets: item?.totalAssets,
              totalLiab: item?.totalLiab
            })
          ),
          netWorkingCapital: isValidNumber(item?.netWorkingCapital),
          liabilitiesAndStockholdersEquity: isValidNumber(
            item?.liabilitiesAndStockholdersEquity
          ),
          totalStockholderEquity: isValidNumber(item?.totalStockholderEquity),
          retainedEarnings: isValidNumber(item?.retainedEarnings),
          accumulatedOtherComprehensiveIncome: isValidNumber(
            item?.accumulatedOtherComprehensiveIncome
          ),
          commonStock: isValidNumber(item?.commonStock),
          goodWillAndIntangibleAssets:
            isValidNumber(item?.goodWill) +
            isValidNumber(item?.intangibleAssets),
          propertyPlantAndEquipmentNet: isValidNumber(
            item?.propertyPlantAndEquipmentNet
          ),
          deferredLongTermLiab: isValidNumber(item?.deferredLongTermLiab),
          longTermDebtTotal: isValidNumber(item?.longTermDebtTotal),
          totalCurrentLiabilities: isValidNumber(item?.totalCurrentLiabilities),
          otherCurrentLiab: isValidNumber(item?.otherCurrentLiab),
          shortTermDebt: isValidNumber(item?.shortTermDebt),
          accountsPayable: isValidNumber(item?.accountsPayable),
          currentDeferredRevenue: isValidNumber(item?.currentDeferredRevenue),
          otherAssets: isValidNumber(item?.otherAssets),
          nonCurrentAssetsTotal: isValidNumber(item?.nonCurrentAssetsTotal),
          longTermInvestments: isValidNumber(item?.longTermInvestments),
          cashAndEquivalents: isValidNumber(item?.cashAndEquivalents),
          cashAndShortTermInvestments: isValidNumber(
            item?.cashAndShortTermInvestments
          ),
          cashGrowth:
            balanceSheet_yearly_org.length >= index + 1 &&
            calculateGrowth(
              item?.cash,
              balanceSheet_yearly_org[index + 1]?.cash
            )?.toString(),
          netReceivables: isValidNumber(item?.netReceivables),
          otherCurrentAssets: isValidNumber(item?.otherCurrentAssets),
          totalCurrentAssets: isValidNumber(item?.totalCurrentAssets),
          inventory: isValidNumber(item?.inventory),
          shortTermInvestments: isValidNumber(item?.shortTermInvestments),
          sharesOut: isValidNumber(item?.commonStockSharesOutstanding),
          totalCash: isValidNumber(item.cashAndEquivalents),
          netCashOverDebt:
            isValidNumber(item?.cashAndEquivalents) &&
            isValidNumber(item?.totalCurrentLiabilities)
              ? Number(item?.cashAndEquivalents) /
                Number(item?.totalCurrentLiabilities)
              : null,
          totalDebt:
            isValidNumber(item.shortTermDebt) &&
            isValidNumber(item.longTermDebt)
              ? Number(item.shortTermDebt) + Number(item.longTermDebt)
              : null,
          debtGrowth:
            balanceSheet_yearly_org[index - 1] >=
              balanceSheet_yearly_org.length &&
            isValidNumber(
              calclateDebtGrowth({
                currentDebt:
                  Number(item.shortTermDebt) + Number(item.longTermDebt),
                previousDebt:
                  Number(balanceSheet_yearly_org[index - 1].shortTermDebt) +
                  Number(balanceSheet_yearly_org[index - 1].longTermDebt)
              })
            ),
          currentRatio:
            isValidNumber(item.totalCurrentAssets) &&
            isValidNumber(item.totalCurrentLiabilities)
              ? Number(item.totalCurrentAssets) /
                Number(item.totalCurrentLiabilities)
              : null,
          totalAssets: isValidNumber(item?.totalAssets),
          totalLiab: isValidNumber(item?.totalLiab),
          pbRatio: calculatePbRatio(
            PriceChange[PriceChange.length - 1]?.close,
            item?.totalAssets,
            item?.totalLiab
          ),
          debtOverEquity: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: item?.totalStockholderEquity
          }),
          debtOverEbitda: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: sameInIncomeStatement?.ebitda
          }),
          debtOverFcf: calculateDebtOverVariable({
            shortTermDebt: item?.shortTermDebt,
            longTermDebt: item?.longTermDebt,
            dividedBy: sameInCashFlow?.freeCashFlow
          })?.toString(),
          shareHolderEquity: isValidNumber(item?.totalStockholderEquity),
          workingCapital: isValidNumber(item?.netWorkingCapital),
          assetTurnover:
            isValidNumber(sameInIncomeStatement?.totalRevenue) &&
            isValidNumber(item?.totalAssets)
              ? Number(sameInIncomeStatement?.totalRevenue) /
                Number(item?.totalAssets)
              : null,
          returnOnCapital: isValidNumber(
            calculateROC({
              totalAssets: item?.totalAssets,
              totalCurrentAssets: item?.totalCurrentAssets,
              ebit: sameInIncomeStatement?.ebit
            })
          ),
          netCashOverDebtGrowth:
            isValidNumber(item?.cashAndEquivalents) &&
            isValidNumber(item?.shortLongTermDebtTotal)
              ? (Number(item?.cashAndEquivalents) /
                  Number(item?.shortLongTermDebtTotal)) *
                100
              : null,
          priceOverFcfRatio: sameInCashFlow
            ? calculatePriceOverFcfRatio({
                price: price?.close,
                freeCashFlow: sameInCashFlow?.freeCashFlow,
                commonStockSharesOutstanding: item?.commonStockSharesOutstanding
              })
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

    const operatingCashFlowGrowthQuat = calculateGrowthEach({
      data: cashFlowQuat,
      variableName: "totalCashFromOperatingActivities"
    });

    const operatingCashFlowGrowthYearly = calculateGrowthEach({
      data: cashFlowYearly,
      variableName: "totalCashFromOperatingActivities"
    });

    // cashflow
    const cashFlow_quat_price_map = cashFlow_quat_org?.map((item, index) => {
      const priceObj = PriceChange?.find(
        (priceItem) => priceItem?.date === item?.date
      );

      const sameInBalanceSheet = balanceSheet_quat_org?.find(
        (b_item) => b_item?.date === item?.date
      );
      const sameInIncomeStatement = incomeStatement_quat_org?.find(
        (b_item) => b_item?.date === item?.date
      );
      const sameInoperatingCashFlowGrowthQuat =
        operatingCashFlowGrowthQuat?.find(
          (b_item) => b_item?.date === item?.date
        );

      return {
        date: item?.date,
        otherFinancingActivities: isValidNumber(
          item?.otherCashflowsFromFinancingActivities
        ),
        freeCashFlowMargin: calculateMargin(
          item?.freeCashFlow,
          sameInIncomeStatement?.totalRevenue
        )?.toString(),
        salePurchaseOfStock: isValidNumber(item?.salePurchaseOfStock),
        invCashFlow: isValidNumber(item?.totalCashflowsFromInvestingActivities),
        changeToInventory: isValidNumber(item?.changeToInventory),
        capitalExpenditures: isValidNumber(item?.capitalExpenditures),
        operatingCashFlowGrowth: isValidNumber(
          sameInoperatingCashFlowGrowthQuat?.growth
        ),
        otherOperatingActivities: isValidNumber(
          item?.otherCashflowsFromInvestingActivities
        ),
        depreciationAndAmortization: isValidNumber(
          sameInIncomeStatement?.depreciationAndAmortization
        ),
        finCashFlow: isValidNumber(item?.totalCashFromFinancingActivities),
        sharedBasedCompensation: isValidNumber(item?.stockBasedCompensation),
        operatingCashFlow: isValidNumber(
          item?.totalCashFromOperatingActivities
        ),
        fcfGrowth: calculateGrowth(
          item?.freeCashFlow,
          cashFlow_yearly_org[index + 1]?.freeCashFlow
        ),

        fcfOverShare:
          isValidNumber(item?.freeCashFlow) &&
          isValidNumber(sameInBalanceSheet?.commonStockSharesOutstanding)
            ? Number(item?.freeCashFlow) /
              Number(sameInBalanceSheet?.commonStockSharesOutstanding)
            : null,
        netCashFlow: isValidNumber(item?.changeInCash),
        commonStockSharesOutstanding: isValidNumber(
          sameInBalanceSheet?.commonStockSharesOutstanding
        ),
        freeCashFlow: isValidNumber(item?.freeCashFlow),
        close: isValidNumber(priceObj?.close),
        returnOnEquity: calculateROE({
          netIncome: item?.netIncome,
          balanceSheet_org: balanceSheet_quat_org,
          cashFlowDate: item?.date
        }),
        returnOnAssets: calculateROA({
          netIncome: item?.netIncome,
          balanceSheet_org: balanceSheet_quat_org,
          cashFlowDate: item?.date
        })
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
        const sameInIncomeStatement = incomeStatement_yearly_org?.find(
          (b_item) => b_item?.date === item?.date
        );
        const sameInoperatingCashFlowGrowthYearly =
          operatingCashFlowGrowthYearly?.find(
            (b_item) => b_item?.date === item?.date
          );

        return {
          date: item?.date,
          freeCashFlowPerShare:
            isValidNumber(Number(item?.freeCashFlow)) &&
            isValidNumber(
              Number(sameInBalanceSheet?.commonStockSharesOutstanding)
            )
              ? Number(item?.freeCashFlow) /
                Number(sameInBalanceSheet?.commonStockSharesOutstanding)
              : null,
          freeCashFlowMargin: calculateMargin(
            item?.freeCashFlow,
            sameInIncomeStatement?.totalRevenue
          )?.toString(),
          financingCashFlow: isValidNumber(
            item?.totalCashFromFinancingActivities
          ),
          otherFinancingActivities: isValidNumber(
            item?.otherCashflowsFromFinancingActivities
          ),
          salePurchaseOfStock: isValidNumber(item?.salePurchaseOfStock),
          changeToInventory: isValidNumber(item?.changeToInventory),
          capitalExpenditures: isValidNumber(item?.capitalExpenditures),
          operatingCashFlowGrowth: isValidNumber(
            sameInoperatingCashFlowGrowthYearly?.growth
          ),
          otherOperatingActivities: isValidNumber(
            item?.otherCashflowsFromInvestingActivities
          ),
          depreciationAndAmortization: isValidNumber(
            sameInIncomeStatement?.depreciationAndAmortization
          ), //start
          finCashFlow: isValidNumber(item?.totalCashFromFinancingActivities),
          invCashFlow: isValidNumber(
            item?.totalCashflowsFromInvestingActivities
          ),
          sharedBasedCompensation: isValidNumber(item?.stockBasedCompensation),
          operatingCashFlow: isValidNumber(
            item?.totalCashFromOperatingActivities
          ),
          fcfGrowth: cashFlow_yearly_org[index + 1]?.freeCashFlow
            ? calculateGrowth(
                item?.freeCashFlow,
                cashFlow_yearly_org[index + 1]?.freeCashFlow
              )
            : null,
          fcfOverShare:
            isValidNumber(item?.freeCashFlow) &&
            isValidNumber(sameInBalanceSheet?.commonStockSharesOutstanding)
              ? Number(item?.freeCashFlow) /
                Number(sameInBalanceSheet?.commonStockSharesOutstanding)
              : null,
          netCashFlow: isValidNumber(item?.changeInCash),
          commonStockSharesOutstanding: isValidNumber(
            sameInBalanceSheet?.commonStockSharesOutstanding
          ),
          freeCashFlow: isValidNumber(item?.freeCashFlow),
          close: isValidNumber(priceObj?.close),
          returnOnEquity: calculateROE({
            netIncome: item?.netIncome,
            balanceSheet_org: balanceSheet_yearly_org,
            cashFlowDate: item?.date
          }),
          returnOnAssets: calculateROA({
            netIncome: item?.netIncome,
            balanceSheet_org: balanceSheet_yearly_org,
            cashFlowDate: item?.date
          })
        };
      }
    );

    const cashFlow_yearly = priceCalculation({
      PriceChange,
      price_map: cashFlow_yearly_price_map
    });

    // trend
    const trendsQuat = earningsTrendsQuat?.map((item, index) => {
      const sameInIncomeStatementQuat = incomeStatement_quat_org?.find(
        (b_item) => b_item?.date === item?.date
      );

      const sameInEarningHistoryQuat = earningHistoryQuat?.find((b_item) => {
        if (b_item?.date === item?.date) {
          return b_item;
        }
      });

      const sameInRatiosAndMetrics = ratiosAndMetricsQuat?.find(
        (b_item) => b_item?.date === item?.date
      );

      return {
        date: item?.date?.toString(),
        epsDifference: isValidNumber(sameInEarningHistoryQuat?.epsDifference),
        epsSurprisePercent: isValidNumber(
          sameInEarningHistoryQuat?.surprisePercent
        ),
        marketCap: isValidNumber(sameInRatiosAndMetrics?.marketCap),
        reportDate: sameInEarningHistoryQuat?.reportDate,
        beforeAfterMarket: isValidNumber(
          sameInEarningHistoryQuat?.beforeAfterMarket
        ),
        revenueDifference:
          isValidNumber(item?.totalRevenue) -
          isValidNumber(sameInIncomeStatementQuat?.revenueEstimateAvg),
        revenueSurprisePercent: calculateRevenuePrecent({
          current: item?.revenueEstimateAvg,
          privious: sameInIncomeStatementQuat?.totalRevenue
        }),
        totalRevenue: isValidNumber(sameInIncomeStatementQuat?.totalRevenue),
        epsActual: sameInEarningHistoryQuat?.epsActual,
        epsEstimate: sameInEarningHistoryQuat?.epsEstimate,
        epsEstimateAvg: isValidNumber(item?.earningsEstimateAvg),
        revenueEstimateAvg: isValidNumber(item?.revenueEstimateAvg)
      };
    });

    // trend
    const trends_yearly = trendsPerYear({
      trends: earningsTrendsQuat
    });

    const trendsYearly = trends_yearly?.map((item) => {
      const sameInIncomeStatementYearly = incomeStatement_yearly_org?.find(
        (b_item) =>
          compareYear({
            dateOne: b_item?.date,
            dateTwo: item?.date
          })
      );
      const sameInEarningHistoryYearly = earningHistoryAnnual?.find((b_item) =>
        compareYear({
          dateOne: b_item?.date,
          dateTwo: item?.date
        })
      );

      const sameInRatiosAndMetrics = ratiosAndMetricsYearly?.find((b_item) =>
        compareYear({
          dateOne: b_item?.date,
          dateTwo: item?.date
        })
      );

      return {
        date: item?.date?.toString(),
        marketCap: sameInRatiosAndMetrics?.marketCap,
        reportDate: sameInEarningHistoryYearly?.reportDate,
        beforeAfterMarket: sameInEarningHistoryYearly?.beforeAfterMarket,
        totalRevenue: sameInIncomeStatementYearly?.totalRevenue,
        epsActual: sameInEarningHistoryYearly?.epsActual,
        epsEstimate: sameInEarningHistoryYearly?.epsEstimate,
        epsDifference: sameInEarningHistoryYearly?.epsDifference,
        epsSurprisePercent: sameInEarningHistoryYearly?.surprisePercent,
        epsEstimateAvg: isValidNumber(item?.earningsEstimateAvg),
        revenueDifference:
          isValidNumber(item?.totalRevenue) -
          isValidNumber(sameInIncomeStatementYearly?.revenueEstimateAvg),
        revenueSurprisePercent: calculateRevenuePrecent({
          current: item?.revenueEstimateAvg,
          privious: sameInIncomeStatementYearly?.totalRevenue
        }),
        revenueEstimateAvg: isValidNumber(item?.revenueEstimateAvg)
      };
    });

    const dividendGrowthQuat = calculateGrowthEach({
      data: data?.Financials?.Cash_Flow?.quarterly,
      variableName: "dividendsPaid"
    });
    const dividendGrowthYearly = calculateGrowthEach({
      data: data?.Financials?.Cash_Flow?.yearly,
      variableName: "dividendsPaid"
    });
    const ebitdaGrowthQuat = calculateGrowthEach({
      data: incomeStatementQuat,
      variableName: "ebitda"
    });
    const epsGrowthQuat = calculateGrowthEach({
      data: historyOrgInEarnings,
      variableName: "epsActual"
    });

    const ebitdaGrowthYearly = calculateGrowthEach({
      data: incomeStatementYearly,
      variableName: "ebitda"
    });

    const epsGrowthYearly = calculateGrowthEach({
      data: annualInOrgEarnings,
      variableName: "epsActual"
    });
    // IncomeStatement
    const incomeStatement_quat = incomeStatement_quat_org?.map(
      (item, index) => {
        const sameInCashFlow = cashFlow_quat_org?.find(
          (b_item) => b_item?.date == item?.date
        );

        const sameInBalanceSheet = balanceSheet_quat_org?.find(
          (b_item) => b_item?.date == item?.date
        );
        const sameInHistory = historyInEarnings?.find(
          (b_item) => b_item?.date == item?.date
        );

        const dividendGrowth = dividendGrowthQuat?.find(
          (b_item) => b_item?.date == item?.date
        );
        const ebitdaGrowth = ebitdaGrowthQuat?.find(
          (b_item) => b_item?.date == item?.date
        );
        const epsGrowth = epsGrowthQuat?.find(
          (b_item) => b_item?.date == item?.date
        );

        return {
          date: item?.date,
          CashFlowMargin:
            isValidNumber(Number(sameInCashFlow?.freeCashFlow)) &&
            isValidNumber(Number(sameInCashFlow?.freeCashFlow))
              ? Number(sameInCashFlow?.freeCashFlow) -
                Number(sameInCashFlow?.capitalExpenditures)
              : null,
          dividendGrowth: dividendGrowth?.growth,
          epsActual: isValidNumber(sameInHistory?.epsActual),
          ebitdaGrowth: ebitdaGrowth?.growth,
          // epsGrowth: calculateGrowth(epsActual(), previousActual())?.toString(),
          epsGrowth: epsGrowth?.growth,
          sharesOutDiluted: isValidNumber(
            sameInBalanceSheet?.commonStockSharesOutstanding
          ),
          freeCashFlowPerShare:
            isValidNumber(Number(sameInCashFlow?.freeCashFlow)) &&
            isValidNumber(
              Number(sameInBalanceSheet?.commonStockSharesOutstanding)
            )
              ? Number(sameInCashFlow?.freeCashFlow) /
                Number(sameInBalanceSheet?.commonStockSharesOutstanding)
              : null,

          incomeTaxExpense: isValidNumber(item?.incomeTaxExpense),
          incomeBeforeTax: isValidNumber(item?.incomeBeforeTax),
          costOfRevenue: isValidNumber(item?.costOfRevenue),
          netIncome: isValidNumber(item?.netIncome),
          researchDevelopment: isValidNumber(item?.researchDevelopment),
          totalOperatingExpenses: isValidNumber(item?.totalOperatingExpenses),
          interestExpense: isValidNumber(item?.interestExpense),
          sellingGeneralAdministrative: item?.sellingGeneralAdministrative,
          netIncomeGrowth: calculateGrowth(
            item?.netIncome,
            incomeStatement_quat_org[index + 1]?.netIncome
          ),
          operatingIncome: isValidNumber(item?.operatingIncome),
          opIncomeGrowth: calculateGrowth(
            item?.operatingIncome,
            incomeStatement_quat_org[index + 1]?.operatingIncome
          ),
          grossProfit: isValidNumber(item?.grossProfit),
          ebit: isValidNumber(item?.ebit),
          ebitda: isValidNumber(item?.ebitda),
          grossProfitGrowth: incomeStatement_quat_org[index + 1]?.grossProfit
            ? calculateGrowth(
                item?.grossProfit,
                incomeStatement_quat_org[index + 1]?.grossProfit
              )
            : null,
          totalRevenue: isValidNumber(item?.totalRevenue),
          revenueGrowth: calculateGrowth(
            item?.totalRevenue,
            incomeStatement_quat_org[index + 1]?.totalRevenue
          )?.toString(),
          grossMargin:
            calculateGrossMargin(item?.totalRevenue, item?.costOfRevenue) ||
            null,
          operatingMargin:
            calculateMargin(item?.operatingIncome, item?.totalRevenue) || null,
          profitMargin:
            calculateMargin(item?.netIncome, item?.totalRevenue) || null,
          fcfMargin: cashFlow_quat_org?.reduce((fcfAcc, cash) => {
            if (item?.date === cash?.date) {
              const margin = calculateMargin(
                cash?.freeCashFlow,
                item?.totalRevenue
              );
              fcfAcc = margin;
            }
            return fcfAcc;
          }, null),
          ebitdaMargin: isValidNumber(
            calculateMargin(item?.ebitda, item?.totalRevenue)
          )
            ? calculateMargin(item?.ebitda, item?.totalRevenue)
            : null,
          ebitMargin: calculateMargin(item?.ebit, item?.totalRevenue) || null,
          researchDevelopment: item?.researchDevelopment || null,
          researchDevelopmentOverRevenue:
            calculateMargin(item?.researchDevelopment, item?.totalRevenue) ||
            null,
          psRatio: balanceSheet_quat_org?.reduce((psAcc, balance) => {
            if (item?.date === balance?.date) {
              const psRatio = calculatePsRatio(
                item?.totalRevenue,
                balance?.commonStockSharesOutstanding,
                PriceChange[PriceChange.length - 1]?.close
              );
              psAcc = psRatio;
            }
            return psAcc;
          }, null)
        };
      }
    );

    const incomeStatement_yearly = incomeStatement_yearly_org?.map(
      (item, index) => {
        const sameInCashFlow = cashFlow_yearly_org?.find((b_item) =>
          compareYear({
            dateOne: b_item?.date,
            dateTwo: item?.date
          })
        );

        const sameInBalanceSheet = balanceSheet_yearly_org?.find((b_item) =>
          compareYear({
            dateOne: b_item?.date,
            dateTwo: item?.date
          })
        );
        const sameInAnnual = annualInEarnings?.find((b_item) =>
          compareYear({
            dateOne: b_item?.date,
            dateTwo: item?.date
          })
        );
        const dividendGrowth = dividendGrowthYearly?.find((b_item) =>
          compareYear({
            dateOne: b_item?.date,
            dateTwo: item?.date
          })
        );
        const ebitdaGrowth = ebitdaGrowthYearly?.find((b_item) =>
          compareYear({
            dateOne: b_item?.date,
            dateTwo: item?.date
          })
        );
        const epsGrowth = epsGrowthYearly?.find((b_item) =>
          compareYear({
            dateOne: b_item?.date,
            dateTwo: item?.date
          })
        );
        return {
          date: item?.date,
          CashFlowMargin:
            isValidNumber(Number(sameInCashFlow?.freeCashFlow)) &&
            isValidNumber(Number(sameInCashFlow?.freeCashFlow))
              ? Number(sameInCashFlow?.freeCashFlow) -
                Number(sameInCashFlow?.capitalExpenditures)
              : null,
          dividendGrowth: dividendGrowth?.growth,
          epsActual: isValidNumber(sameInAnnual?.epsActual),
          ebitdaGrowth: ebitdaGrowth?.growth,
          depreciationAndAmortization: item?.depreciationAndAmortization,
          sharesOutDiluted: isValidNumber(
            sameInBalanceSheet?.commonStockSharesOutstanding
          ),
          epsGrowth: epsGrowth?.growth,
          freeCashFlowPerShare:
            isValidNumber(Number(sameInCashFlow?.freeCashFlow)) &&
            isValidNumber(
              Number(sameInBalanceSheet?.commonStockSharesOutstanding)
            )
              ? Number(sameInCashFlow?.freeCashFlow) /
                Number(sameInBalanceSheet?.commonStockSharesOutstanding)
              : null,
          incomeTaxExpense: isValidNumber(item?.incomeTaxExpense),
          incomeBeforeTax: isValidNumber(item?.incomeBeforeTax),
          costOfRevenue: isValidNumber(item?.costOfRevenue),
          netIncome: isValidNumber(item?.netIncome),
          researchDevelopment: isValidNumber(item?.researchDevelopment),
          totalOperatingExpenses: isValidNumber(item?.totalOperatingExpenses),
          interestExpense: isValidNumber(item?.interestExpense),
          sellingGeneralAdministrative: item?.sellingGeneralAdministrative,
          netIncomeGrowth: calculateGrowth(
            item?.netIncome,
            incomeStatement_yearly_org[index + 1]?.netIncome
          ),
          operatingIncome: isValidNumber(item?.operatingIncome),
          opIncomeGrowth: calculateGrowth(
            item?.operatingIncome,
            incomeStatement_yearly_org[index + 1]?.operatingIncome
          ),
          ebit: isValidNumber(item?.ebit),
          ebitda: isValidNumber(item?.ebitda),
          grossProfit: isValidNumber(item?.grossProfit),
          grossProfitGrowth: calculateGrowth(
            item?.grossProfit,
            incomeStatement_yearly_org[index + 1]?.grossProfit
          ),
          totalRevenue: isValidNumber(item?.totalRevenue),
          revenueGrowth: incomeStatement_yearly_org[index + 1]?.totalRevenue
            ? calculateGrowth(
                item?.totalRevenue,
                incomeStatement_yearly_org[index + 1]?.totalRevenue
              )
            : null,
          grossMargin:
            isValidNumber(item?.totalRevenue) &&
            isValidNumber(item?.costOfRevenue)
              ? calculateGrossMargin(item?.totalRevenue, item?.costOfRevenue)
              : null,

          operatingMargin:
            isValidNumber(item?.operatingIncome) &&
            isValidNumber(item?.totalRevenue)
              ? calculateMargin(item?.operatingIncome, item?.totalRevenue)
              : null,
          profitMargin:
            isValidNumber(item?.netIncome) && isValidNumber(item?.totalRevenue)
              ? calculateMargin(item?.netIncome, item?.totalRevenue)
              : null,
          fcfMargin: cashFlow_yearly_org?.reduce((fcfAcc, cash) => {
            if (item?.date === cash?.date) {
              const margin = calculateMargin(
                cash?.freeCashFlow,
                item?.totalRevenue
              );
              fcfAcc = margin;
            }

            return isValidNumber(fcfAcc) ? fcfAcc : null;
          }, null),
          ebitdaMargin: isValidNumber(
            calculateMargin(item?.ebitda, item?.totalRevenue)
          )
            ? calculateMargin(item?.ebitda, item?.totalRevenue)
            : null,
          ebitMargin: calculateMargin(item?.ebit, item?.totalRevenue),
          researchDevelopment: item?.researchDevelopment,
          researchDevelopmentOverRevenue: calculateMargin(
            item?.researchDevelopment,
            item?.totalRevenue
          ),
          psRatio: balanceSheet_yearly_org?.reduce((psAcc, balance) => {
            if (item?.date === balance?.date) {
              const psRatio = calculatePsRatio(
                item?.totalRevenue,
                balance?.commonStockSharesOutstanding,
                PriceChange[PriceChange.length - 1]?.close
              );
              psAcc = psRatio;
            }
            return psAcc;
          }, null)
        };
      }
    );

    // ======================= junaid end ========================

    // ============= talha start TTM ===============

    //get data from highlights

    const ReoEquity5year = calculateFiveYear(cashFlow_yearly, "returnOnEquity");
    const ReoAssets5year = calculateFiveYear(cashFlow_yearly, "returnOnAssets");

    //get data from valuation
    const EnterpriseValue = data?.Valuation?.EnterpriseValue || null;
    const ForwardPE = data?.Valuation?.ForwardPE || null;

    //get data from SplitsDividends
    const ExDividendDate = data?.SplitsDividends?.ExDividendDate;
    const ForwardAnnualDividendRate =
      data?.SplitsDividends?.ForwardAnnualDividendRate;

    //get data from SplitsDividends
    const FullTimeEmployees = data.General?.FullTimeEmployees || null;
    const ShortRatio = data?.Technicals?.ShortRatio || null;

    //get financialReportDate
    const financialReportDate = () => {
      const sameQuat = historyInEarnings?.find(
        (h_items) => h_items?.date === MostRecentQuarter
      );
      return isValidNumber(sameQuat?.reportDate);
    };

    //calculate return on capital growth 5 year
    const ROC5Year = calculateGrowth(
      balanceSheet_yearly[0]?.returnOnCapital,
      balanceSheet_yearly[4]?.returnOnCapital
    );

    const mostRecentYearHistory = earningHistoryQuat?.find(
      (item) => item?.date === MostRecentQuarter
    );

    let earningsDate = null;

    const today = dayjs();
    const isPassed = today.isAfter(mostRecentYearHistory?.date);
    if (isPassed) {
      const indexOfPrevQuat = earningHistoryQuat?.findIndex(
        (item) => item?.date === MostRecentQuarter
      );
      earningsDate = earningHistoryQuat[indexOfPrevQuat - 1]?.reportDate;
    } else {
      earningsDate = mostRecentYearHistory?.reportDate;
    }
    //TTMS Output
    const TTM = {
      StrongBuy: isValidNumber(StrongBuy),
      Buy: isValidNumber(Buy),
      Hold: isValidNumber(Hold),
      Sell: isValidNumber(Sell),
      StrongSell: isValidNumber(StrongSell),
      MostRecentQuarter,
      TargetPrice: isValidNumber(TargetPrice),
      pbRatio: calculatePbRatio(
        PriceChange[PriceChange.length - 1]?.close,
        balanceSheet_quat_org[0]?.totalAssets,
        balanceSheet_quat_org[0]?.totalLiab
      ),
      earningsDate: earningsDate?.toString(),
      sharesOutTTM: isValidNumber(SharesOutstanding),
      earningYieldQ: isValidNumber(earningsQuat[0]?.earningYield),
      earningYieldY: isValidNumber(earningsYearly[0]?.earningYield),
      evOverSalesQuat: isValidNumber(ratiosAndMetricsQuat[0]?.evOverSales),
      evOverEbitQuat: isValidNumber(ratiosAndMetricsQuat[0]?.evOverEbit),
      evOverFcfQuat: isValidNumber(ratiosAndMetricsQuat[0]?.evOverFcf),
      buybackYieldQuat: isValidNumber(ratiosAndMetricsQuat[0]?.buybackYield),
      evOverSalesYearly: isValidNumber(ratiosAndMetricsYearly[0]?.evOverSales),
      evOverEbitYearly: isValidNumber(ratiosAndMetricsYearly[0]?.evOverEbit),
      evOverFcfYearly: isValidNumber(ratiosAndMetricsYearly[0]?.buybackYield),
      buybackYieldYearly: isValidNumber(
        ratiosAndMetricsYearly[0]?.buybackYield
      ),
      totalCashQ: isValidNumber(balanceSheet_quat[0]?.totalCash),
      priceOverFcfRatioQ: isValidNumber(
        balanceSheet_quat[0]?.priceOverFcfRatio
      ),
      debtOverFcfQ: isValidNumber(balanceSheet_quat[0]?.debtOverFcf),
      totalCashY: isValidNumber(balanceSheet_yearly[0]?.totalCash),
      fcfGrowthQ: isValidNumber(cashFlow_yearly[0]?.fcfGrowth),
      fcfGrowthY: isValidNumber(cashFlow_quat[0]?.fcfGrowth),
      researchDevelopmentOverRevenueQ: isValidNumber(
        incomeStatement_quat[0]?.researchDevelopmentOverRevenue
      ),
      grossProfitGrowthQ: isValidNumber(
        incomeStatement_quat[0]?.grossProfitGrowth
      ),
      grossProfitGrowthY: isValidNumber(
        incomeStatement_yearly[0]?.grossProfitGrowth
      ),
      researchDevelopmentOverRevenueY: isValidNumber(
        incomeStatement_yearly[0]?.researchDevelopmentOverRevenue
      ),
      TotalShareholderReturn:
        isValidNumber(
          Number(dividendsQuat[dividendsQuat?.length - 1]?.dividendYield)
        ) && Number(ratiosAndMetricsQuat[0]?.buybackYield)
          ? isValidNumber(
              Number(dividendsQuat[dividendsQuat?.length - 1]?.dividendYield)
            ) + Number(ratiosAndMetricsQuat[0]?.buybackYield)
          : null,
      dividendYieldQ: isValidNumber(
        dividendsQuat[dividendsQuat?.length - 1]?.dividendYield
      ),
      dividendYieldY: isValidNumber(
        dividendsYearly[dividendsYearly?.length - 1]?.dividendYield
      ),
      priceOverFcfRatioY: isValidNumber(
        balanceSheet_yearly[0]?.priceOverFcfRatio
      ),
      debtOverFcfY: isValidNumber(balanceSheet_yearly[0]?.debtOverFcf),
      fcfGrowthThreeYears: calculateGrowth(
        cashFlow_yearly_org[0]?.freeCashFlow,
        cashFlow_yearly_org[3]?.freeCashFlow
      )
        ? calculateGrowth(
            cashFlow_yearly_org[0]?.freeCashFlow,
            cashFlow_yearly_org[3]?.freeCashFlow
          )?.toString()
        : null,
      fcfGrowthFiveYears: isValidNumber(
        calculateGrowth(
          cashFlow_yearly_org[0]?.freeCashFlow,
          cashFlow_yearly_org[5]?.freeCashFlow
        )
      )
        ? calculateGrowth(
            cashFlow_yearly_org[0]?.freeCashFlow,
            cashFlow_yearly_org[5]?.freeCashFlow
          )?.toString()
        : null,
      forwardPe: isValidNumber(ForwardPE) ? ForwardPE?.toString() : null,
      returnOnEquity5Year: isValidNumber(ReoEquity5year),
      returnOnAssets5Year: isValidNumber(ReoAssets5year),
      returnOnCapital5Year: isValidNumber(ROC5Year),
      lastSplitDate: isValidNumber(LastSplitDate),
      lastStockSplit: isValidNumber(splitFactor),
      lastStockSplitRatio: isValidNumber(LastStockSplitRatio),
      float: isValidNumber(SharesFloat),
      shortRatio: isValidNumber(ShortRatio),
      shortPercentShare: isValidNumber(ShortPercentShare),
      shortPercentFloat: isValidNumber(ShortPercentFloat),
      beta1Year: isValidNumber(Beta1Year),
      epsGrowth3Year: isValidNumber(YearlyGrowthTTMs?.EpsGrowth3),
      epsGrowth5Year: isValidNumber(YearlyGrowthTTMs?.EpsGrowth5),
      netIncomeGrowth3Year: isValidNumber(YearlyGrowthTTMs?.NetIncomeGrowth3),
      netIncomeGrowth5Year: isValidNumber(YearlyGrowthTTMs?.NetIncomeGrowth5),
      operatingIncomeGrowth3Year: isValidNumber(
        YearlyGrowthTTMs?.OpIncomeGrowth3
      ),
      operatingIncomeGrowth5Year: isValidNumber(
        YearlyGrowthTTMs?.OpIncomeGrowth5
      ),
      grossProfit3Year: isValidNumber(YearlyGrowthTTMs?.GProfitGrowth3),
      grossProfit5Year: isValidNumber(YearlyGrowthTTMs?.GProfitGrowth5),
      revenueGrowth3Year: isValidNumber(YearlyGrowthTTMs?.RevGrowth3Year),
      revenueGrowth5Year: isValidNumber(YearlyGrowthTTMs?.RevGrowth5Year),
      ipoDate: IPODate,
      founded: Founded,
      employees: isValidNumber(Employees),
      forwardPs:
        isValidNumber(PriceChange[PriceChange?.length - 1]?.close) &&
        isValidNumber(trendInEarnings[0]?.revenueEstimateAvg)
          ? (
              PriceChange[PriceChange?.length - 1]?.close?.toString() /
              trendInEarnings[0]?.revenueEstimateAvg
            )?.toString()
          : null,
      premarketPercentageChg: null,
      // premarketPercentageChg: PriceChanges?.PremktPercentChg
      //   ? PriceChanges.PremktPercentChg?.toString()
      //   : null,
      premarketPrice: null,
      priceTargetPercentage: isValidNumber(PriceTargetPer),
      previousClose: isValidNumber(previousDayClose),
      anaylystRating: isValidNumber(AnalystRating),
      analystCount: isValidNumber(AnalystCount),
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
      priceChange52WeekHigh: isValidNumber(WeekHigh52)
        ? WeekHigh52?.toString()
        : null,
      priceChange52WeekLow: isValidNumber(WeekLow52)
        ? WeekLow52?.toString()
        : null,
      sharesChange: {
        sharesChangeYearly: isValidNumber(
          calculateGrowth(
            outstandingSharesAnnual[0]?.shares,
            outstandingSharesAnnual[1]?.shares
          )
        )
          ? calculateGrowth(
              outstandingSharesAnnual[0]?.shares,
              outstandingSharesAnnual[1]?.shares
            )?.toString()
          : null,
        sharesChangeQuarterly: calculateGrowth(
          outstandingSharesQuat[0]?.shares,
          outstandingSharesQuat[1]?.shares
        )?.toString()
      },
      RevOverEmployees:
        isValidNumber(RevenueTTM) && isValidNumber(FullTimeEmployees)
          ? (RevenueTTM / FullTimeEmployees)?.toString()
          : null,
      piotroskiFScore:
        calculatePiotroskiFScore({
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
            current: Number(
              balanceSheet_yearly_org[0]?.totalCurrentLiabilities
            ),
            previous: Number(
              balanceSheet_yearly_org[1]?.totalCurrentLiabilities
            )
          },
          shares: {
            lastYear: calculateLastYearShares({ outstandingSharesAnnual }),
            prevYear: calculatePreviousYearShares({ outstandingSharesAnnual })
          },
          grossMargin:
            isValidNumber(incomeStatement_yearly[0]?.grossMargin) &&
            isValidNumber(incomeStatement_yearly[0]?.grossMargin)
              ? {
                  lastYear: incomeStatement_yearly[0]?.grossMargin / 100,
                  prevYear: incomeStatement_yearly[1]?.grossMargin / 100
                }
              : null,
          assetTurnoverRatio: {
            lastYear: balanceSheet_yearly[0]?.assetTurnover,
            prevYear: balanceSheet_yearly[1]?.assetTurnover
          }
        })?.toString() || null,
      revGrowthNextYear: isValidNumber(revGrowthNextYear({ trendInEarnings })),
      revGrowthThisYear: isValidNumber(revGrowthThisYear({ trendInEarnings })),
      InvTurnover:
        (
          sumUpRecentQuarter({
            data: mostRecentDateObject,
            propertyName: "costOfRevenue"
          }) /
          (sumUpRecentQuarter({
            data: mostRecentDateBalanceSheetQuarterly,
            propertyName: "inventory"
          }) /
            4)
        )?.toString() !== "NaN"
          ? (
              sumUpRecentQuarter({
                data: mostRecentDateObject,
                propertyName: "costOfRevenue"
              }) /
              (sumUpRecentQuarter({
                data: mostRecentDateBalanceSheetQuarterly,
                propertyName: "inventory"
              }) /
                4)
            )?.toString()
          : null,
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
        isValidNumber(dividendsQuat[dividendsQuat.length - 1]?.dividendYield) &&
        isValidNumber(ratiosAndMetricsQuat[0]?.buybackYield)
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
        isValidNumber(balanceSheet_quat_org[0]?.cash) &&
        isValidNumber(balanceSheet_quat_org[0]?.shortTermDebt) &&
        isValidNumber(balanceSheet_yearly_org[0]?.cash) &&
        isValidNumber(balanceSheet_yearly_org[0]?.shortTermDebt)
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
      lastClosePrice: isValidNumber(PriceChange[PriceChange?.length - 1]?.close)
        ? PriceChange[PriceChange?.length - 1]?.close?.toString()
        : null,
      priceChnage: calculateRevenuePrecent({
        current: PriceChange[PriceChange?.length - 1]?.close,
        privious: TargetPrice
      }),
      // &&
      // isValidNumber(PriceChange[PriceChange?.length - 1]?.close) &&
      // isValidNumber(TargetPrice)
      //   ? ((isValidNumber(
      //       PriceChange[PriceChange?.length - 1]?.close?.toString()
      //     ) -
      //       isValidNumber(TargetPrice)) /
      //       isValidNumber(TargetPrice)) *
      //     100
      //   : null,
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
      forwardEvOverSales: isValidNumber(
        calculateForwardEvOverSales({
          EnterpriseValue,
          revenueEstimateAvg: Object.values(data?.Earnings?.Trend)[0]
            ?.revenueEstimateAvg
        })
      )
        ? calculateForwardEvOverSales({
            EnterpriseValue,
            revenueEstimateAvg: Object.values(data?.Earnings?.Trend)[0]
              ?.revenueEstimateAvg
          })?.toString()
        : null,
      pegRatio: isValidNumber(PEGRatio) ? PEGRatio?.toString() : null,
      incomeTaxExpense: isValidNumber(
        incomeStatement_yearly_org[0]?.incomeTaxExpense
      )
        ? incomeStatement_yearly_org[0]?.incomeTaxExpense
        : null,
      taxOverRevenue:
        isValidNumber(incomeStatement_yearly_org[0]?.incomeTaxExpense) &&
        isValidNumber(incomeStatement_yearly_org[0]?.incomeBeforeTax)
          ? calculateTaxOverRevenue({
              incomeTaxExpense: incomeStatement_yearly_org[0]?.incomeTaxExpense,
              incomeBeforeTax: incomeStatement_yearly_org[0]?.incomeBeforeTax
            })?.toString()
          : null,
      quickRatio:
        isValidNumber(balanceSheet_quat_org[0]?.cash) &&
        isValidNumber(balanceSheet_quat_org[1]?.cash) &&
        isValidNumber(balanceSheet_quat_org[0]?.shortTermInvestments) &&
        isValidNumber(balanceSheet_quat_org[1]?.shortTermInvestments) &&
        isValidNumber(balanceSheet_quat_org[0]?.netReceivables)
          ? calculateQuickRatio({
              cash: balanceSheet_quat_org[0]?.cash
                ? balanceSheet_quat_org[1]?.cash
                : null,
              shortTermInvestments:
                balanceSheet_quat_org[1]?.shortTermInvestments,

              netReceivables: balanceSheet_quat_org[1]?.netReceivables,
              totalCurrentLiabilities:
                balanceSheet_quat_org[0]?.totalCurrentLiabilities
            })?.toString()
          : null,
      profOverEmployee: (isValidNumber(cashFlow_quat_org[0]?.netIncome) &&
      isValidNumber(FullTimeEmployees)
        ? Number(cashFlow_quat_org[0]?.netIncome) / FullTimeEmployees
        : null
      )?.toString(),
      ExDividendDate: isValidNumber(ExDividendDate)
        ? ExDividendDate
        : ExDividendDate,
      sharesInstitutions: isValidNumber(PercentInstitutions)
        ? PercentInstitutions?.toString()
        : null,
      sharesInsiders: isValidNumber(PercentInsiders)
        ? PercentInsiders?.toString()
        : null,
      operatingMargin: isValidNumber(OperatingMarginTTM)
        ? OperatingMarginTTM?.toString()
        : null,
      industry: isValidNumber(industry),
      sector: Sector ? Sector : null,
      country: country ? country : null,
      exchange: isValidNumber(Exchange),
      revenue: {
        revenueTTM: isValidNumber(RevenueTTM) ? RevenueTTM?.toString() : null,
        revenueGrowthYearly:
          incomeStatement_yearly[0]?.revenueGrowth?.toString(),
        revenueGrowthQuat: incomeStatement_quat[0]?.revenueGrowth?.toString()
      },
      grossProfit: isValidNumber(GrossProfitTTM),
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
        opIncomeGrowthQuat: isValidNumber(
          incomeStatement_quat[0]?.opIncomeGrowth
        ),
        opIncomeGrowthYearly: isValidNumber(
          incomeStatement_yearly[0]?.opIncomeGrowth
        )
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
      epsActual: epsActual(),
      dilutedEspActual: isValidNumber(DilutedEpsTTM),
      dividendShare: isValidNumber(DividendShare),
      profitMargin: isValidNumber(ProfitMargin)
        ? (ProfitMargin * 100).toString()
        : null,
      ebitda: isValidNumber(EBITDA),
      ebitdaMargin: isValidNumber(calculateMargin(EBITDA, RevenueTTM)),

      ebit: incomeStatement_quat_org[0]?.ebit?.toString(),
      ebitMargin:
        calculateMargin(
          incomeStatement_quat_org[0]?.ebit,
          incomeStatement_quat_org[0]?.totalRevenue
        )?.toString() || null,
      depreciationAndAmortization: calculateTTM({
        array: incomeStatement_quat_org,
        variableName: "depreciationAndAmortization"
      })?.toString(),
      freeCashFlowMargin: isValidNumber(
        cashFlow_quat_org[0]?.capitalExpenditures
      ),
      grossMargin:
        isValidNumber(RevenueTTM) &&
        isValidNumber(incomeStatement_quat_org[0]?.costOfRevenue)
          ? calculateGrossMargin(
              RevenueTTM,
              incomeStatement_quat_org[0]?.costOfRevenue
            )?.toString()
          : null,
      cashAndEquivalents: isValidNumber(
        balanceSheet_quat_org[0]?.cashAndEquivalents
      ),
      shortTermInvestments: isValidNumber(
        balanceSheet_quat_org[0]?.shortTermInvestments
      ),
      cashAndCashEquivalents: isValidNumber(
        balanceSheet_quat_org[0]?.cashAndShortTermInvestments
      ),
      cashAndShortTermInvestments: isValidNumber(
        balanceSheet_quat_org[0]?.cashAndShortTermInvestments
      ),
      receivables: isValidNumber(balanceSheet_quat_org[0]?.netReceivables),
      inventory: isValidNumber(balanceSheet_quat_org[0]?.inventory),
      otherCurrentAssets: isValidNumber(
        balanceSheet_quat_org[0]?.otherCurrentAssets
      ),
      totalCurrentAssets: isValidNumber(
        balanceSheet_quat_org[0]?.totalCurrentAssets
      ),
      propertyPlantAndEquipment: isValidNumber(
        balanceSheet_quat_org[0]?.propertyPlantAndEquipmentNet
      ),
      longTermInvestments: isValidNumber(
        balanceSheet_quat_org[0]?.longTermInvestments
      ),
      goodWillAndIntangibleAssets:
        isValidNumber(balanceSheet_quat_org[0]?.goodWill) &&
        isValidNumber(balanceSheet_quat_org[0]?.intangibleAssets)
          ? (
              Number(balanceSheet_quat_org[0]?.goodWill) +
              Number(balanceSheet_quat_org[0]?.intangibleAssets)
            )?.toString()
          : null,
      otherLongTermAssets: isValidNumber(balanceSheet_quat_org[0]?.otherAssets),
      totalLongTernAssets: isValidNumber(
        balanceSheet_quat_org[0]?.nonCurrentAssetsTotal
      ),
      totalAssets: isValidNumber(balanceSheet_quat_org[0]?.totalAssets),
      accountsPayable: isValidNumber(balanceSheet_quat_org[0]?.accountsPayable),
      deferredRevenue: isValidNumber(
        balanceSheet_quat_org[0]?.currentDeferredRevenue
      ),
      currentDebt: isValidNumber(balanceSheet_quat_org[0]?.shortTermDebt),
      otherCurrentLiabilities: isValidNumber(
        balanceSheet_quat_org[0]?.otherCurrentLiab
      ),
      totalCurrentLiabilities: isValidNumber(
        balanceSheet_quat_org[0]?.totalCurrentLiabilities
      ),
      longTernDebt: isValidNumber(balanceSheet_quat_org[0]?.longTermDebtTotal),
      totalLongTermLiabilities: isValidNumber(
        balanceSheet_quat_org[0]?.nonCurrentLiabilitiesTotal
      ),
      totalLiabilities: isValidNumber(balanceSheet_quat_org[0]?.totalLiab),
      totalDebt:
        isValidNumber(Number(balanceSheet_quat_org[0]?.shortTermDebt)) &&
        isValidNumber(Number(balanceSheet_quat_org[0]?.longTermDebt))
          ? (
              Number(balanceSheet_quat_org[0]?.shortTermDebt) +
              Number(balanceSheet_quat_org[0]?.longTermDebt)
            )?.toString()
          : null,
      commonStock: isValidNumber(balanceSheet_quat_org[0]?.commonStock),
      retainedEarnings: isValidNumber(
        balanceSheet_quat_org[0]?.retainedEarnings
      ),
      comprehensiveIncome: isValidNumber(
        balanceSheet_quat_org[0]?.accumulatedOtherComprehensiveIncome
      ),
      shareHoldersEquity: isValidNumber(
        balanceSheet_quat_org[0]?.totalStockholderEquity
      ),
      totalLiabilitiesAndEquity: isValidNumber(
        balanceSheet_quat_org[0]?.liabilitiesAndStockholdersEquity
      ),
      netCashOverDebt:
        isValidNumber(balanceSheet_quat_org[0]?.cash) &&
        isValidNumber(balanceSheet_quat_org[0]?.shortTermDebt)
          ? (
              Number(balanceSheet_quat_org[0]?.cash) /
              Number(balanceSheet_quat_org[0]?.shortTermDebt)
            )?.toString()
          : null,
      netCashperShare:
        isValidNumber(balanceSheet_quat_org[0]?.cash) &&
        isValidNumber(balanceSheet_quat_org[0]?.shortTermDebt) &&
        isValidNumber(SharesOutstanding)
          ? (
              Number(balanceSheet_quat_org[0]?.cash) /
              Number(balanceSheet_quat_org[0]?.shortTermDebt) /
              SharesOutstanding
            )?.toString()
          : null,
      workingCapital: isValidNumber(
        balanceSheet_quat_org[0]?.netWorkingCapital
      ),
      bookValuePerShare: isValidNumber(BookValue),
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
      otherFinanceActivities: isValidNumber(
        cashFlow_quat_org[0]?.otherCashflowsFromFinancingActivities
      ),
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
      freeCashFlowPerShare:
        isValidNumber(Number(cashFlow_quat_org[0]?.freeCashFlow)) &&
        isValidNumber(SharesOutstanding)
          ? (
              Number(cashFlow_quat_org[0]?.freeCashFlow) / SharesOutstanding
            )?.toString()
          : null,
      marketCapitalization: isValidNumber(MarketCapitalization),
      enterpriseValue: isValidNumber(EnterpriseValue),
      peRatio: isValidNumber(PERatio),
      psRatio: isValidNumber(RevenueTTM)
        ? (MarketCapitalization / RevenueTTM)?.toString()
        : null,
      pOverFcfRatio:
        isValidNumber(MarketCapitalization) &&
        isValidNumber(Number(cashFlow_quat_org[0]?.freeCashFlow))
          ? (
              MarketCapitalization / Number(cashFlow_quat_org[0]?.freeCashFlow)
            )?.toString()
          : null,
      pOverOcfRatio:
        isValidNumber(MarketCapitalization) &&
        isValidNumber(cashFlow_quat_org[0]?.totalCashFromOperatingActivities)
          ? (
              MarketCapitalization /
              Number(cashFlow_quat_org[0]?.totalCashFromOperatingActivities)
            )?.toString()
          : null,
      evOverSalesRatio: isValidNumber(RevenueTTM)
        ? (EnterpriseValue / RevenueTTM)?.toString()
        : null,
      evEbitdaRatio:
        isValidNumber(EnterpriseValue) &&
        isValidNumber(incomeStatement_quat_org[0]?.ebitda)
          ? (
              EnterpriseValue / Number(incomeStatement_quat_org[0]?.ebitda)
            )?.toString()
          : null,
      evEbitRatio:
        Number(incomeStatement_quat_org[0]?.ebit) &&
        isValidNumber(Number(incomeStatement_quat_org[0]?.ebit))
          ? (
              EnterpriseValue / Number(incomeStatement_quat_org[0]?.ebit)
            )?.toString()
          : null,
      evFcfRatio:
        isValidNumber(EnterpriseValue) &&
        isValidNumber(Number(cashFlow_quat_org[0]?.freeCashFlow))
          ? (
              EnterpriseValue / Number(cashFlow_quat_org[0]?.freeCashFlow)
            )?.toString()
          : null,
      debtOverEquityRatio:
        isValidNumber(Number(balanceSheet_quat_org[0]?.shortTermDebt)) &&
        isValidNumber(Number(balanceSheet_quat_org[0]?.longTermDebt)) &&
        isValidNumber(Number(balanceSheet_quat_org[0]?.totalStockholderEquity))
          ? (
              Number(balanceSheet_quat_org[0]?.shortTermDebt) +
              Number(balanceSheet_quat_org[0]?.longTermDebt) -
              Number(balanceSheet_quat_org[0]?.totalStockholderEquity)
            )?.toString()
          : null,
      debtOverEbitdaRatio:
        isValidNumber(Number(balanceSheet_quat_org[0]?.shortTermDebt)) &&
        isValidNumber(Number(balanceSheet_quat_org[0]?.longTermDebt)) &&
        isValidNumber(incomeStatement_quat_org[0]?.ebitda)
          ? (
              Number(balanceSheet_quat_org[0]?.shortTermDebt) +
              Number(balanceSheet_quat_org[0]?.longTermDebt) -
              Number(incomeStatement_quat_org[0]?.ebitda)
            )?.toString()
          : null,
      debtFcfRatio:
        isValidNumber(Number(balanceSheet_quat_org[0]?.shortTermDebt)) &&
        isValidNumber(Number(balanceSheet_quat_org[0]?.longTermDebt)) &&
        isValidNumber(Number(cashFlow_quat_org[0]?.freeCashFlow))
          ? (
              Number(balanceSheet_quat_org[0]?.shortTermDebt) +
              Number(balanceSheet_quat_org[0]?.longTermDebt) -
              Number(cashFlow_quat_org[0]?.freeCashFlow)
            )?.toString()
          : null,
      currentRatio:
        balanceSheet_quat_org &&
        balanceSheet_quat_org[0]?.totalCurrentLiabilities &&
        isValidNumber(balanceSheet_quat_org[0]?.totalCurrentLiabilities)
          ? (
              Number(balanceSheet_quat_org[0]?.totalCurrentAssets) /
              Number(balanceSheet_quat_org[0]?.totalCurrentLiabilities)
            )?.toString()
          : null,
      assetTurnover:
        isValidNumber(RevenueTTM) &&
        isValidNumber(Number(balanceSheet_quat_org[0]?.totalAssets))
          ? (
              RevenueTTM / Number(balanceSheet_quat_org[0]?.totalAssets)
            )?.toString()
          : null,
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
      netIncomeGrowthQ: calculateGrowth(
        incomeStatement_quat_org[0]?.netIncome,
        incomeStatement_quat_org[1]?.netIncome
      )?.toString(),
      netIncomeGrowthY: calculateGrowth(
        incomeStatement_yearly_org[0]?.netIncome,
        incomeStatement_yearly_org[1]?.netIncome
      )?.toString(),
      dividendGrowth: calculateGrowth(
        cashFlow_yearly_org[0]?.dividendsPaid,
        cashFlow_yearly_org[1]?.dividendsPaid
      )?.toString(),
      cashGrowth: calculateGrowth(
        balanceSheet_quat_org[0]?.cash,
        balanceSheet_quat_org[1]?.cash
      )?.toString(),
      debtGorwth:
        isValidNumber(balanceSheet_quat_org[0]?.shortTermDebt) &&
        isValidNumber(balanceSheet_quat_org[1]?.shortTermDebt)
          ? (
              Number(balanceSheet_quat_org[0]?.shortTermDebt) /
                Number(balanceSheet_quat_org[1]?.shortTermDebt) -
              1 * 100
            )?.toString()
          : null,
      marketCapGrowth: isValidNumber(
        calculateGrowth(
          ratiosAndMetricsQuat[0]?.marketCap,
          ratiosAndMetricsQuat[1]?.marketCap
        )
      )
        ? calculateGrowth(
            ratiosAndMetricsQuat[0]?.marketCap,
            ratiosAndMetricsQuat[1]?.marketCap
          )?.toString()
        : null,
      epsGrowth: calculateGrowth(epsActual(), previousActual())?.toString()
    };

    // // ============= talha end TTM ===============
    // ***************** Queries Start *************************]

    const TickerId = await prisma.ticker.findFirst({
      where: {
        ticker: ticker
      }
    });

    if (!TickerId) {
      throw new Error(`Ticker by id ${TickerId.id} not found!`);
    }

    stringifyValuesExceptSpecial(General);

    const newGeneral = { ...General };
    delete newGeneral?.AddressData;
    delete newGeneral?.Listings;
    delete newGeneral?.LogoURL;
    delete newGeneral?.Code;
    delete newGeneral?.Officers;
    delete newGeneral?.DelistedDate;
    delete newGeneral?.UpdatedAt;
    const OfficersData = convertValuesToArrayTypes(Officers);
    const GeneralPromise = prisma.general.create({
      data: {
        ...newGeneral,
        Officers: {
          createMany: {
            data: OfficersData
          }
        },
        Ticker: {
          connect: {
            id: TickerId?.id
          }
        }
      }
    });

    stringifyValuesExceptSpecial(TTM);

    const newTTM = { ...TTM };
    delete newTTM?.sharesChange;
    delete newTTM?.revenue;
    delete newTTM?.operatingIncome;

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
    const dividendWithoutQuarterNum = dividends?.map((div) => {
      const { QuaterNum, ...rest } = div;
      return rest;
    });
    const dividendHistory = convertValuesToArrayTypes(
      dividendWithoutQuarterNum
    );
    const dividendsHistory = dividendHistory.map((dividendHistory) => {
      return prisma.dividendHistory.create({
        data: {
          ...dividendHistory,
          Ticker: {
            connect: {
              id: TickerId?.id
            }
          }
        }
      });
    });
    const convertedearningsQuat = convertValuesToArrayTypes(earningsQuat);

    const earningsPromisesQuat = convertedearningsQuat.map(
      (earningsQuarterly) => {
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
      }
    );
    const convertedEarningsYearly = convertValuesToArrayTypes(earningsYearly);
    const earningsPromisesYearly = convertedEarningsYearly.map(
      (convertedEarningsYearly) => {
        return prisma.earnings.create({
          data: {
            ...convertedEarningsYearly,
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
    const convertedEarningsTrendsQuat = convertValuesToArrayTypes(trendsQuat);
    const earningsPromisesTrendsQuat = convertedEarningsTrendsQuat.map(
      (convertedEarningsTrendsQuat) => {
        return prisma.earningsTrand.create({
          data: {
            ...convertedEarningsTrendsQuat,

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
    const convertedEarningsTrendsYearly =
      convertValuesToArrayTypes(trendsYearly);
    const earningsPromisesTrendsYearly = convertedEarningsTrendsYearly.map(
      (convertedEarningsTrendsYearly) => {
        return prisma.earningsTrand.create({
          data: {
            ...convertedEarningsTrendsYearly,
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

    const convertedDividendsYearly = convertValuesToArrayTypes(dividendsYearly);
    const dividendsPromisesYearly = convertedDividendsYearly.map(
      (convertedDividendsYearly) => {
        return prisma.dividend.create({
          data: {
            ...convertedDividendsYearly,
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
    const convertedDividendsQuat = convertValuesToArrayTypes(dividendsQuat);
    const dividendsPromisesQuarterly = convertedDividendsQuat.map(
      (dividendsQuat) => {
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
      }
    );
    const convertedRatiosAndMetricsYearly = convertValuesToArrayTypes(
      ratiosAndMetricsYearly
    );
    const ratiosAndMetricsPromisesYearly = convertedRatiosAndMetricsYearly.map(
      (convertedRatiosAndMetricsYearly) => {
        return prisma.ratiosAndMetrics.create({
          data: {
            ...convertedRatiosAndMetricsYearly,
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

    const convertedRatiosAndMetrics =
      convertValuesToArrayTypes(ratiosAndMetricsQuat);
    const ratiosAndMetricsPromisesQuater = convertedRatiosAndMetrics.map(
      (convertedRatiosAndMetrics) => {
        return prisma.ratiosAndMetrics.create({
          data: {
            ...convertedRatiosAndMetrics,
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
    const convertedcashFlowYearly = convertValuesToArrayTypes(cashFlow_yearly);
    const cashFlowPromisesYearly = convertedcashFlowYearly.map(
      (convertedcashFlowYearly) => {
        return prisma.cashFlow.create({
          data: {
            ...convertedcashFlowYearly,
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

    const convertedcashFlowQuat = convertValuesToArrayTypes(cashFlow_quat);
    const cashFlowPromisesQuaterly = convertedcashFlowQuat.map(
      (convertedcashFlowQuat) => {
        return prisma.cashFlow.create({
          data: {
            ...convertedcashFlowQuat,
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

    const convertedincomeStatementQuaterly =
      convertValuesToArrayTypes(incomeStatement_quat);

    const incomeStatementPromisesQuaterly =
      convertedincomeStatementQuaterly.map(
        (convertedincomeStatementQuaterly) => {
          return prisma.incomeStatement.create({
            data: {
              ...convertedincomeStatementQuaterly,
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
    const convertedincomeStatementyearly = convertValuesToArrayTypes(
      incomeStatement_yearly
    );

    const incomeStatementPromisesyearly = convertedincomeStatementyearly.map(
      (convertedincomeStatementyearly) => {
        return prisma.incomeStatement.create({
          data: {
            ...convertedincomeStatementyearly,
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
    const convertedbalanceSheetyearly =
      convertValuesToArrayTypes(balanceSheet_yearly);
    const balanceSheetPromisesyearly = convertedbalanceSheetyearly.map(
      (convertedbalanceSheetyearly) => {
        return prisma.balanceSheet.create({
          data: {
            ...convertedbalanceSheetyearly,
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

    const convertedbalanceSheetQuat =
      convertValuesToArrayTypes(balanceSheet_quat);
    const balanceSheetPromisesQuat = convertedbalanceSheetQuat.map(
      (convertedbalanceSheetQuat) => {
        return prisma.balanceSheet.create({
          data: {
            ...convertedbalanceSheetQuat,
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
      GeneralRes,
      dividendsHistoryRes,
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
      balanceSheetQuatRes,
      earningsTrendResQuat,
      earningsTrendResYearly
    ] = await prisma.$transaction([
      TTMPromise,
      GeneralPromise,
      ...dividendsHistory,
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
      ...balanceSheetPromisesQuat,
      ...earningsPromisesTrendsQuat,
      ...earningsPromisesTrendsYearly
    ]);

    const GeneralExist = await prisma.general.findFirst({
      where: {
        tickerId: TickerId?.id
      }
    });
    if (!GeneralExist) {
      throw new Error(`General by id ${GeneralExist?.id} not found!`);
    }

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
      GeneralRes,
      dividendsHistoryRes,
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
      balanceSheetQuatRes,
      earningsTrendResQuat,
      earningsTrendResYearly
    };
  } catch (error) {
    console.log("error=========================>>", error);
  }
};

const populateAllStocks = async (req, res) => {
  const allTickers = await prisma.ticker.findMany({
    select: {
      ticker: true
    }
  });

  const allTickersNames = allTickers.map((ticker) => ticker.ticker);

  console.log("allTickersNames", allTickersNames);

  const lastDoneTicker = await prisma.lastTicker.findFirst({
    where: {
      id: 1
    },
    select: {
      lastActiveTicker: true
    }
  });

  const lastIndex = allTickersNames.indexOf(lastDoneTicker?.lastActiveTicker);

  const remainingTickers = allTickersNames.filter((t_item, index) => {
    if (index > lastIndex) {
      return true;
    } else {
      return false;
    }
  });

  const populatedStocks = [];

  for (const ticker of remainingTickers) {
    const operation = () => populateOneTicker({ ticker });
    console.log("working on : ", allTickersNames.indexOf(ticker), ticker);
    const result = await retryOperation(operation, 1000, 1000);
    populatedStocks.push(result);
  }

  return res.status(200).json(populateAllStocks);
};

module.exports = { populateAllStocks };

//  netcashoverdebt
// netcashpershare
