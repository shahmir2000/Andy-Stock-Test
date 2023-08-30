const PriceForecastDefs = `#graphql
scalar DateTime
scalar JSON
 
 

  type PriceForecast {
    id :                            Int
    priceChnage:Float
    TargetPrice:Float
  }
 

 
  type PriceForecastByTicker {
    id :                            Int
    tickerName:String
    company: String
    ticker: String
    PriceForecast: PriceForecast 
  
 
  }

  type Query {
    PriceForecastByTicker(tickerName: String): PriceForecastByTicker
  }

  type Mutation {
    queuegeneratePosts: Boolean!
  }
`;

module.exports = PriceForecastDefs;
