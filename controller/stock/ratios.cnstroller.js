const { PrismaClient } = require("@prisma/client");
const {
  stockPrice,
  stockTicker,
  stockDividend,
  stockAvgVol
} = require("../../services/stock/stock.services");
const {
  calculateEnterpriseValue,
  lastClosePriceIdentifier,
  calculateEvOverEbit,
  calculateEvOverSales,
  calculateBuybackYield,
  calculateEvOverFcf,
  calcualteFcfYield,
  calculateDividendYield,
  dividendsPerYear,
  compareYear
} = require("../../utils/stock/stock.utils");
const {
  calculateGrowthEach,
  getQuartersByYear
} = require("../../utils/stock/stockTwo.utils");
const {
  isValidNumber,
  convertValuesToArrayTypes
} = require("../../utils/stock/numberConverter");

const apiToken = "63bf6ecd8c46c5.53082791";
const ratioController = async (req, res, next) => {
  try {
    const Ticker = "A";
    const PriceChange = await stockPrice({ ticker: Ticker, apiToken });
    // ============== API Calling Start ==============
    // stock data for ticker
    const data = await stockTicker({ ticker: Ticker, apiToken });
    // dividends data for stock ticker
    const dividends = await stockDividend({ ticker: Ticker, apiToken });
    // avgVol for stock ticker
    const avgvol = await stockAvgVol({ ticker: Ticker, apiToken });
    // price list day wise for stock

    // ============== API Calling End ==============
    // dividends
    const balanceSheet_yearly_org = Object.values(
      data?.Financials?.Balance_Sheet?.yearly
    );
    const outstandingSharesYearly = data?.outstandingShares?.annual;

    const incomeStatement_yearly_org = Object.values(
      data?.Financials?.Income_Statement?.yearly
    );
    const dividends_yearly = dividendsPerYear({
      dividends
    });
    const cashFlow_yearly_org = Object.values(
      data?.Financials?.Cash_Flow?.yearly
    );
    const outstandingSharesAnnual = Object.values(
      data?.outstandingShares?.annual
    );

    const outstandingSharesAnnualTemp = [...outstandingSharesAnnual];
    console.log(PriceChange);
    const marketCapGrowthYearly = calculateGrowthEach({
      data: outstandingSharesYearly,
      // Price:
      variableName: "marketCap"
    });
    console.log(marketCapGrowthYearly);

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
      const sameInDividends = dividends_yearly?.find((b_item) =>
        compareYear({
          dateOne: b_item?.date,
          dateTwo: item?.dateFormatted
        })
      );

      const marketCapGrowth = marketCapGrowthYearly.find((b_item) =>
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
          marketCapGrowth: marketCapGrowth?.growth
            ? marketCapGrowth?.growth
            : null,
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
    });
    return res.status(200).json(ratiosAndMetricsYearly);
  } catch (error) {
    console.log("error=========================>>", error);
    next(error);
  }
};

// Export the stockController function
module.exports = ratioController;
