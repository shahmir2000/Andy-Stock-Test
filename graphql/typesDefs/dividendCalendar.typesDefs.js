const DividendCalrndarDefs = `#graphql
scalar DateTime
scalar JSON



 

type DividendCalrndar {
    id :                            Int
    company:String
    ticker:String 
    date: String,
    declarationDate: String,
    recordDate: String,
    paymentDate: String,
    period: String,
    value: Float,
    unadjustedValue: Float,
    currency: String

}



 type DividendCalrndarData {
   count: Int 
   DividendCalrndar: [DividendCalrndar]
  

 }
  
  type Query {
    DividendCalrndarData(skip: Int , take: Int): DividendCalrndarData
  }


  type Mutation{
    queuegeneratePosts: Boolean!
  }
`;

module.exports = DividendCalrndarDefs;
