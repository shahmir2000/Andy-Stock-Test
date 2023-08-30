const StatisticstypeDefs = `#graphql
scalar DateTime
scalar JSON
enum Type {
  QUARTERLY
  YEARLY
}

  type Statistics {
    id :                            Int
    Type: String
    year:String
    date: String, 
    marketCap: Float,
    marketCapGrowth: Float,
    enterpriseValue: Float,
    pOverOcfRatio: Float,
    evOverSalesRatio: Float,
    evOverEbitda: Float,
    evOverEbit: Float,
    evOverFcf: Float,
    fcfYield: Float,
    buybackYield: Float,
    TotalShareholderReturn: Float
    peRatio: Float,
    earningYield: Float
    pbRatio: Float,
    priceOverFcfRatio: Float,
    debtOverEbitda: Float,
    debtOverEquity: Float,
    debtOverFcf: Float,
    currentRatio: Float,
    assetTurnover: Float,
    returnOnCapital: Float
    psRatio: Float
    returnOnAssets: Float,
    returnOnEquity: Float
   dividendYield: Float,
   payoutRatio: Float
  }

  type StatisticsByTicker {
    id :                            Int
    tickerName:String
    company: String
    ticker: String
    Exchange: String
    statisticsYearly: [Statistics]  
    statisticsQuarterly: [Statistics]
    
  }
  
  type Query {
    StatisticsByTicker(tickerName: String ): StatisticsByTicker
  }

  type Mutation {
    queuegeneratePosts: Boolean!
  }
`;

module.exports = StatisticstypeDefs;
