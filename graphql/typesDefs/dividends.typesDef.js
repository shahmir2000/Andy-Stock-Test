const dividendByTicker = `#graphql
scalar DateTime
scalar JSON
enum Type {
  QUARTERLY
  YEARLY
}

  type Dividends {
    id :                            Int
    Type: String
    date        : String
  dividendYield :Float
  dividendShare :Float
  payoutRatio   :Float
  psRatio :Float
  peRatio:Float
    
  }

  type DividendsByTicker {
    id :                            Int
    tickerName:String
    company: String
    ticker: String
    DividendsQuarterly: [Dividends]  
    DividendsYearly: [Dividends]  
 
  }

  type Query {
    DividendsByTicker(tickerName: String): DividendsByTicker
  }

  type Mutation {
    queuegeneratePosts: Boolean!
  }
`;

module.exports = dividendByTicker;
