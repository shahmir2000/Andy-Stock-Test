const FinancialForecastDefs = `#graphql
scalar DateTime
scalar JSON
enum Type {
  QUARTERLY
  YEARLY
}

  type FinancialForecast {
    id :                            Int
    Type: String
    date: String
    totalRevenue: Float
    revenueGrowth: Float
    epsActual: Float
    epsGrowth: Float
  }

  type FinancialForecastByTicker {
    id :                            Int
    tickerName:String
    company: String
    ticker: String
    Exchange :String
    FinancialForecastQuarterly: [FinancialForecast]  
    FinancialForecastYearly: [FinancialForecast]  

  }

  type Query {
    FinancialForecastByTicker(tickerName: String): FinancialForecastByTicker
  }

  type Mutation {
    queuegeneratePosts: Boolean!
  }
`;

module.exports = FinancialForecastDefs;
