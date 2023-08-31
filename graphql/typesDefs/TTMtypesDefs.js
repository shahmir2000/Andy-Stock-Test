const TTMtypeDefs = `#graphql
scalar DateTime
scalar JSON


type Data {
  id :                            String
  earningsDate:String
  premarketPrice             :    Float
  fcfGrowthThreeYears        :    Float
  fcfGrowthFiveYears         :    Float
  forwardPe                  :    Float
  returnOnEquity5Year        :    Float
  returnOnAssets5Year        :    Float
  returnOnCapital5Year       :    Float
  lastSplitDate              :    String
  lastStockSplit             :    String
  lastStockSplitRatio        :    String
  float                      :    Float
  shortRatio                 :    Float
  shortPercentShare          :    Float
  beta1Year                  :    Float
  epsGrowth3Year             :    Float
  epsGrowth5Year             :    Float
  netIncomeGrowth3Year       :    Float
  netIncomeGrowth5Year       :    Float
  operatingIncomeGrowth3Year :    Float
  operatingIncomeGrowth5Year :    Float
  grossProfit3Year           :    Float
  grossProfit5Year           :    Float
  revenueGrowth3Year         :    Float
  revenueGrowth5Year         :    Float
  ipoDate                    :    String
  employees                    :    Float
  premarketPercentageChg       :    Float
  priceTargetPercentage        :    Float
  previousClose                :    Float
  anaylystRating               :    Float
  analystCount                 :    Float
  priceChange1Day              :    Float
  priceChange1Week             :    Float
  priceChange1Month            :    Float
  priceChange6Month            :    Float
  priceChange1Year             :    Float
  priceChangeThisYear          :    Float
  priceChange3Year             :    Float
  priceChange5Year             :    Float
  priceChange10Year            :    Float
  priceChange52WeekHigh        :    Float
  priceChange52WeekLow         :    Float
  RevOverEmployees             :    Float
  piotroskiFScore              :    Float
  revGrowthNextYear            :    Float
  revGrowthThisYear            :    Float
  InvTurnover                  :    Float
  PayoutFreq                   :    Float
  AltmanZScore                 :    Float
  revGrowthThisQuarter         :    Float
  revGrowthNextQuarter         :    Float
  shareholderYield             :    Float
  relativeVolume               :    Float
  averageVolume                :    Float
  epsGrowthNextQuarter         :    Float
  epsGrowthThisQuarter         :    Float
  epsGrowthNextYear            :    Float
  epsGrowthThisYear            :    Float
  cashOverMarketCap            :    Float
  financialReportDate          :    Float
  volume                       :    Float
  dividend                     :    Float
  netCashOverDebtGrowth        :    Float
  lastClosePrice               :    Float
  evOverEbitda                 :    Float
  evOverEarnings               :    Float
  forwardEvOverSales           :    Float
  pegRatio                     :    Float
  taxOverRevenue               :    Float
  quickRatio                   :    Float
  profOverEmployee             :    Float
  ExDividendDate               :    String
  sharesInstitutions           :    Float
  sharesInsiders               :    Float
  operatingMargin              :    Float
  sector                       :    String   
  country                      :    String   
  exchange                     :    String   
  grossProfit                  :    Float
  costOfRevenue                :    Float
  sellingGeneralAdministrative :    Float
  researchDevelopment          :    Float
  totalOperatingExpenses       :    Float
  interestExpense              :    Float
  incomeBeforeTax              :    Float
  incomeTax                    :    Float
  netIncome                    :    Float
  epsActual                    :    Float
  dilutedEspActual             :    Float
  dividendShare                :    Float
  profitMargin                 :    Float
  ebitda                       :    Float
  ebitdaMargin                 :    Float
  ebit                         :    Float
  ebitMargin                   :    Float
  depreciationAndAmortization  :    Float
  freeCashFlowMargin           :    Float
  grossMargin                  :    Float
  cashAndEquivalents           :    Float
  shortTermInvestments         :    Float
  cashAndCashEquivalents       :    Float
  cashAndShortTermInvestments  :    Float
  receivables                  :    Float
  inventory                    :    Float
  otherCurrentAssets           :    Float
  totalCurrentAssets           :    Float
  propertyPlantAndEquipment    :    Float
  longTermInvestments          :    Float
  goodWillAndIntangibleAssets  :    Float
  otherLongTermAssets          :    Float
  totalLongTernAssets          :    Float
  totalAssets                  :    Float
  accountsPayable              :    Float
  deferredRevenue              :    Float
  currentDebt                  :    Float
  otherCurrentLiabilities      :    Float
  totalCurrentLiabilities      :    Float
  longTernDebt                 :    Float
  totalLongTermLiabilities     :    Float
  totalLiabilities             :    Float
  totalDebt                    :    Float
  commonStock                  :    Float
  retainedEarnings             :    Float
  comprehensiveIncome          :    Float
  shareHoldersEquity           :    Float
  totalLiabilitiesAndEquity    :    Float
  netCashOverDebt              :    Float
  netCashperShare              :    Float
  workingCapital               :    Float
  bookValuePerShare            :    Float
  shareBasedCompensation       :    Float
  otherOperatingActivities     :    Float
  operatingCashFlow            :    Float
  capitalExpenditures          :    Float
  otherInvestingActivities     :    Float
  investingCashFlow            :    Float
  dividendPaid                 :    Float
  shareIssuanceOverRepurchase  :    Float
  otherFinanceActivities       :    Float
  financeCashFlow              :    Float
  netCashFlow                  :    Float
  freeCashFlow                 :    Float
  freeCashFlowPerShare         :    Float
  marketCapitalization         :    Float
  enterpriseValue              :    Float
  peRatio                      :    Float
  psRatio                      :    Float
  pOverFcfRatio                :    Float
  pOverOcfRatio                :    Float
  evOverSalesRatio             :    Float
  evEbitdaRatio                :    Float
  evEbitRatio                  :    Float
  evFcfRatio                   :    Float
  debtOverEquityRatio          :    Float
  debtOverEbitdaRatio          :    Float
  debtFcfRatio                 :    Float
  currentRatio                 :    Float
  assetTurnover                :    Float
  returnOnEquity               :    Float
  returnOnAssets               :    Float
  returnOnCapital              :    Float
  fcfYield                     :    Float
  payoutRatio                  :    Float
  revenueGrowthYOY             :    Float
  netIncomeGrowthQ             :    Float
netIncomeGrowthY                :    Float
researchDevelopmentOverRevenueQ              :    Float
researchDevelopmentOverRevenueY              :    Float
dividendYieldQ                               :    Float
dividendYieldY                               :    Float
grossProfitGrowthQ                           :    Float
grossProfitGrowthY                           :    Float
fcfGrowthQ                                   :    Float
fcfGrowthY                                   :    Float
totalCashY                                   :    Float
totalCashQ                                   :    Float
priceOverFcfRatioQ                           :    Float
priceOverFcfRatioY                           :    Float
debtOverFcfQ                                 :    Float
forwardPs                                 :    Float
debtOverFcfY                                 :    Float
evOverSalesYearly                            :    Float
evOverSalesQuat                              :    Float
evOverEbitQuat                               :    Float
evOverEbitYearly                             :    Float
evOverFcfQuat                                :    Float
evOverFcfYearly                              :    Float
buybackYieldQuat                             :    Float
buybackYieldYearly                           :    Float
earningYieldQ                                :    Float
sharesOutTTM                     :    Float
preMarketDate                    :    Float
shortPercentFloat                    :    Float
industry                         :    String
founded                         : String
incomeTaxExpense  :    Float
earningYieldY            :    Float
  netIncomeGrowth              :    Float
  dividendGrowth               :    Float
  cashGrowth                   :    Float
  debtGorwth                   :    Float
  marketCapGrowth              :    Float
  epsGrowth                    :    Float
  operatingIncome              :    Float
  opIncomeGrowthQuat           :    Float
  opIncomeGrowthYearly         :    Float
  revenueTTM                   :    Float
  revenueGrowthYearly          :    Float
  revenueGrowthQuat            :    Float
  sharesChangeYearly           :    Float
  sharesChangeQuarterly        :    Float
  Ticker                       :    String   
 
  createdAt                    :    DateTime
  updatedAt                    :    DateTime
}



 type TTMScreener {
  count: Int
   data: [Data]
  

 }
  
  type Query {
   TTMScreener(skip: Int , take: Int, search: String):TTMScreener
  }


  type Mutation{
    queuegeneratePosts: Boolean!
  }
`;

module.exports = TTMtypeDefs;
