const incomeStatemnentByTicker = `#graphql
scalar DateTime
scalar JSON
enum Type {
  QUARTERLY
  YEARLY
}

  type IncomeStatement {
    id :                            Int
    Type: String
    date                          :String
    sellingGeneralAdministrative   :Float
    freeCashFlowPerShare           :Float
    CashFlowMargin                 :Float
    interestExpense                :Float
    totalOperatingExpenses         :Float
    incomeTaxExpense               :Float
    sharesOutDiluted               :Float
    costOfRevenue                  :Float
    incomeBeforeTax                :Float 
    epsActual                      :Float
    dividendGrowth                 :Float
    depreciationAndAmortization    :Float
    ebitdaGrowth                   :Float 
    netIncome                      :Float
    epsGrowth                      :Float
    netIncomeGrowth                :Float
    operatingIncome                :Float
    opIncomeGrowth                 :Float
    grossProfit                    :Float
    ebit                           :Float
    ebitda                         :Float
    grossProfitGrowth              :Float
    totalRevenue                   :Float
    revenueGrowth                  :Float
    grossMargin                    :Float
    operatingMargin                :Float
    profitMargin                   :Float
    fcfMargin                      :Float
    ebitdaMargin                   :Float
    ebitMargin                     :Float
    researchDevelopment            :Float
    researchDevelopmentOverRevenue :Float
    psRatio                        :Float
    
  }

  type incomeStatemnentByTicker {
    id :                            Int
    tickerName:String
    company: String
    ticker: String
    incomeStatementQuarterly: [IncomeStatement]  
    incomeStatementYearly: [IncomeStatement]  
 
  }

  type Query {
    incomeStatemnentByTicker(tickerName: String): incomeStatemnentByTicker
  }

  type Mutation {
    queuegeneratePosts: Boolean!
  }
`;

module.exports = incomeStatemnentByTicker;
