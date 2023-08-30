const AnalystRatingDefs = `#graphql
scalar DateTime
scalar JSON
 
 

  type AnalystRating {
    id :                            Int
    StrongBuy: Float,
    Buy: Float,
    Hold: Float,
    Sell: Float,
    StrongSell: Float,
    analystCount: Float
  }
 

 
  type AnalystRatingByTicker {
    id :                            Int
    tickerName:String
    company: String
    ticker: String
    AnalystRating: AnalystRating 
  
 
  }

  type Query {
    AnalystRatingByTicker(tickerName: String): AnalystRatingByTicker
  }

  type Mutation {
    queuegeneratePosts: Boolean!
  }
`;

module.exports = AnalystRatingDefs;
