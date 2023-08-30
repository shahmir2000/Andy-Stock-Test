const dividendHistoryByTicker = `#graphql
scalar DateTime
scalar JSON
enum Type {
  QUARTERLY
  YEARLY
}

  type DividendHistory {
    id :Int
  date           : String
  declarationDate :String
  recordDate   :   String
  paymentDate   :  String
  period      :    String
  value         :  Float
  unadjustedValue :Float
  currency      :  String
    
  }

  type DividendsHistoryByTicker { 
    id :                            Int
    company: String
    ticker: String
    DividendHistory: [DividendHistory]  
 
  }

  type Query {
    DividendsHistoryByTicker(tickerName: String): DividendsHistoryByTicker
  }

  type Mutation {
    queuegeneratePosts: Boolean!
  }
`;

module.exports = dividendHistoryByTicker;
