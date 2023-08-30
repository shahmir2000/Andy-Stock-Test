const RevenuetypeDefs = `#graphql
scalar DateTime
scalar JSON
enum Type {
  QUARTERLY
  YEARLY
}

  type Revenue {
    id :                            Int 
    Type: String
    date:       String
    revenueDifference :Float
    revenueEstimateAvg :Float
    totalRevenue :Float
    revenueSurprisePercent :Float
  }

  type RevenueByTicker {
    id :                            Int
    tickerName:String
    company: String
    ticker: String
    Exchange: String
    revenueYearly: [Revenue]  
    revenueQuarterly: [Revenue]
    
  }
  
  type Query {
    RevenueByTicker(tickerName: String ): RevenueByTicker
  }

  type Mutation {
    queuegeneratePosts: Boolean!
  }
`;

module.exports = RevenuetypeDefs;
