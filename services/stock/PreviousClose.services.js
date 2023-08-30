const { comparedateFormulaIndex } = require("../../utils/stock/stockTwo.utils");

const PreviousCloseServices = async ({ PriceChange }) => {
  let previousDayClose = null;
  try {
    // Get the current date dynamically
    const currentDate = new Date().toISOString()?.slice(0, 10); // "YYYY-MM-DD"

    // Find the closest previous date in the data relative to the current date
    let closestDate = null;
    for (let i = PriceChange.length - 2; i >= 0; i--) {
      if (PriceChange[i].date < currentDate) {
        closestDate = PriceChange[i].date;
        break;
      }
    }

    if (closestDate !== null) {
      const currentIndex = comparedateFormulaIndex({
        data: PriceChange,
        object: closestDate
      });

      previousDayClose = PriceChange[currentIndex].close;
    } else {
      console.log("Data for the current date or previous day not found.");
    }
  } catch (error) {
    console.error("Error fetching data from the API:", error);
  }
  return previousDayClose;
};

module.exports = { PreviousCloseServices };
