const StockByTickerDefs = `#graphql
scalar DateTime
scalar JSON
enum Type {
  QUARTERLY
  YEARLY
}

type Officers { 
  id :Int
Name :String
Title :String
YearBorn :String
}
 

type General {
  id                    :Int
  Name                  :String
  Exchange              :String
  CurrencyCode          :String
  CurrencyName          :String
  CurrencySymbol        :String
  CountryName           :String
  CountryISO            :String
  OpenFigi              :String
  ISIN                  :String
  LEI                   :String
  PrimaryTicker         :String
  CUSIP                 :String
  CIK                   :Float
  EmployerIdNumber      :String
  FiscalYearEnd         :String
  IPODate               :String
  InternationalDomestic :String
  Sector                :String
  Industry              :String
  GicSector             :String
  GicGroup              :String
  GicIndustry           :String
  GicSubIndustry        :String
  HomeCategory          :String
  IsDelisted            :String
  Description           :String
  Address               :String
  Phone                 :String
  WebURL                :String
  FullTimeEmployees     :Float
  
  }
  type TTM {
    id :                            Int
    country: String
    earningsDate:String
    preMarketDate: String 
    priceTargetPercentage: Float
    dividend: Float
    ExDividendDate: String
    analystCount:Float
    priceChange52WeekLow:Float
    sharesOutTTM: Float
    epsActual: Float
    priceChange52WeekHigh:Float
    marketCapitalization: Float
    priceChange1Day: Float
    priceChange1Week: Float
    priceChange1Month: Float
    priceChange6Month: Float
    priceChange1Year: Float
    priceChangeThisYear: Float
    priceChange3Year: Float
    priceChange5Year: Float
    pegRatio: Float
  }
 

  type Earnings {
    Type: String
    date            :   String
    epsEstimateAvg   :  Float
    revenueEstimateAvg: Float
    epsActual       :   Float
    totalRevenue    :   Float
    
  }

 
  type StockByTicker {
    tickerName:String
    company: String
    ticker: String
    TTM: TTM 
    earningsQuarterly: [Earnings]  
    earningsYearly: [Earnings]  
    General:General
    Officers: [Officers]
 
  }

  type Query {
    StockByTicker(tickerName: String): StockByTicker
  }

  type Mutation {
    queuegeneratePosts: Boolean!
  }
`;

module.exports = StockByTickerDefs;
