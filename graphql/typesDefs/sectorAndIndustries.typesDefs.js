const SectorsAndIndustriestypeDefs = `#graphql
scalar DateTime
scalar JSON


type Industry {
  id :                 String
  name :String
}

type Sectors {
  id :                            String
  name:String
  Industry:[Industry]  
}



 type SectorsAndIndustriesByTicker {
   count: Int
   Sectors: [Sectors]
  

 }
  
  type Query {
    SectorsAndIndustriesByTicker(skip: Int , take: Int, search: String):SectorsAndIndustriesByTicker
  }


  type Mutation{
    queuegeneratePosts: Boolean!
  }
`;

module.exports = SectorsAndIndustriestypeDefs;
