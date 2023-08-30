const cashFlowByTicker = `#graphql
scalar DateTime
scalar JSON
enum Type {
  QUARTERLY
  YEARLY
}

  type CashFlow {
    id :                            Int
    Type: String
    freeCashFlowMargin:Float,
      freeCashFlowPerShare: Float,
      otherOperatingActivities: Float,
      financingCashFlow: Float,
      salePurchaseOfStock: Float,
      otherFinancingActivities: Float,
      changeToInventory: Float,
      depreciationAndAmortization: Float,
      operatingCashFlowGrowth: Float,
      capitalExpenditures: Float,
      date: String,
      priceOverFcfRatio: Float,
      finCashFlow: Float,
      invCashFlow: Float,
      sharedBasedCompensation: Float,
      operatingCashFlow: Float,
      fcfGrowth: Float,
      fcfOverShare: Float,
      netCashFlow: Float,
      freeCashFlow: Float,
      returnOnEquity: Float,
      returnOnAssets: Float,
  }

  type CashFlowByTicker {
    id :                            Int
    tickerName:String
    company: String
    ticker: String
    cashFlowQuarterly: [CashFlow]  
    cashFlowYearly: [CashFlow]  

  }

  type Query {
    CashFlowByTicker(tickerName: String): CashFlowByTicker
  }

  type Mutation {
    queuegeneratePosts: Boolean!
  }
`;

module.exports = cashFlowByTicker;
