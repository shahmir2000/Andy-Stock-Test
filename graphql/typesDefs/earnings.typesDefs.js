const EarningstypeDefs = `#graphql
scalar DateTime
scalar JSON
enum Type {
  QUARTERLY
  YEARLY
}

  type EarningsHistory {
    id :                            Int
    Type: String
    date:       String
    epsActual: Float,
    epsDifference: Float,
    epsEstimate: Float,
    epsSurprisePercent: Float
  }

  type EarningsByTicker {
    id :                            Int
    tickerName:String
    company: String
    ticker: String
    Exchange: String
    EarningsYearly: [EarningsHistory]  
    EarningsQuarterly: [EarningsHistory]
    
  }
  
  type Query {
    EarningsByTicker(tickerName: String ): EarningsByTicker
  }

  type Mutation {
    queuegeneratePosts: Boolean!
  }
`;

module.exports = EarningstypeDefs;
