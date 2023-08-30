const {
  calculateGrowth,
  priceChange1W,
  calculateYeartoDate,
  PriceChangeInYear,
  PriceChangeMonth
} = require("../../utils/stock/stockTwo.utils");

const PriceChangesServices = async ({ PriceChange, PremarketPrice }) => {
  const todayClose = PriceChange[PriceChange.length - 1].close;
  // Get today's close

  const latestDate = new Date(PriceChange[PriceChange.length - 8].date);

  // ******************* Premkt. % Chg.********************
  let PremktPercentChg;
  if (PremarketPrice) {
    PremktPercentChg = calculateGrowth(PremarketPrice, todayClose);
  }
  // Get yesterday's close
  const yesterdayClose = PriceChange[PriceChange.length - 2].close;
  const PriceChange1D = calculateGrowth(todayClose, yesterdayClose);

  const PriceChange1W = priceChange1W({
    PriceChange,
    latestDate,
    todayClose
  });

  // price change One month ago
  const PriceChange1MClose = PriceChangeMonth({
    PriceChange: PriceChange,
    latestDate: latestDate,
    months: 1
  });
  const PriceChange1M = calculateGrowth(
    todayClose,
    PriceChange1MClose
  )?.toFixed(2);

  // price change six month ago
  const PriceChange6MClose = PriceChangeMonth({
    latestDate,
    PriceChange,
    months: 6
  });

  const PriceChange6M = calculateGrowth(
    todayClose,
    PriceChange6MClose
  )?.toFixed(2);

  //......... Price Change year to Date......
  const PriceChangeThisYearClose = calculateYeartoDate({ PriceChange });

  const PriceChangeThisYear = calculateGrowth(
    todayClose,
    PriceChangeThisYearClose
  );

  //......... Price Change 1 Year......
  const PriceChange1YClose = PriceChangeInYear({
    PriceChange,
    latestDate,
    years: 1
  });
  const PriceChange1Y = calculateGrowth(
    todayClose,
    PriceChange1YClose
  )?.toFixed(2);
  //......... Price Change 3 Year......
  const PriceChange3YClose = PriceChangeInYear({
    PriceChange,
    latestDate,
    years: 3
  });

  const PriceChange3Y = calculateGrowth(
    todayClose,
    PriceChange3YClose
  )?.toFixed(2);

  //......... Price Change 5 Year......
  // Calculate the date five year before the latest date

  const PriceChange5YClose = PriceChangeInYear({
    PriceChange,
    latestDate,
    years: 5
  });
  const PriceChange5Y = calculateGrowth(
    todayClose,
    PriceChange5YClose
  )?.toFixed(2);

  //......... Price Change 10 Year......
  const PriceChange10YClose = PriceChangeInYear({
    PriceChange,
    latestDate,
    years: 10
  });
  const PriceChange10Y = calculateGrowth(todayClose, PriceChange10YClose);

  return {
    PriceChange1D,
    PriceChange1W,
    PriceChange1M,
    PriceChange6M,
    PriceChangeThisYear,
    PriceChange1Y,
    PriceChange3Y,
    PriceChange5Y,
    PriceChange10Y,
    PremktPercentChg
  };
};

module.exports = { PriceChangesServices };
