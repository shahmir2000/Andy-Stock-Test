const EarningCalender_typeDefs = `#graphql
scalar DateTime
scalar JSON

  type Query {
    Earnings_Calender(from: String, to: String): JSON
  }
`;

module.exports = EarningCalender_typeDefs;
