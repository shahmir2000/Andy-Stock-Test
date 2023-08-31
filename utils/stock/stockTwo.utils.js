const { isValidNumber } = require("./numberConverter");

function calculateGrowth(current, previous) {
  if (isValidNumber(current) && isValidNumber(previous)) {
    const currentValue = Number(current);
    const previousValue = Number(previous);

    if (currentValue === 0 || previousValue === 0) {
      return 0; //
    }
    const value = ((currentValue - previousValue) / previousValue) * 100;
    return value;
  }
  return null;
}
const calculateFiveYear = (cashFlow_yearly, propertyName) => {
  if (cashFlow_yearly?.length >= 5) {
    const ReoReacentYear = cashFlow_yearly[0][propertyName];
    const Reo5yearAgo = cashFlow_yearly[4][propertyName];
    let sub;

    if (isValidNumber(ReoReacentYear) && isValidNumber(Reo5yearAgo)) {
      sub = ReoReacentYear - Reo5yearAgo;
    } else {
      sub = null;
    }

    let d;
    if (isValidNumber(ReoReacentYear) && isValidNumber(sub)) {
      d = (sub / ReoReacentYear) * 100;
    } else {
      d = null;
    }

    return d;
  } else {
    return null;
  }
};

const calculateROIC = (ebit, totalAssets, totalCurrentAssets) => {
  if (
    isValidNumber(ebit) &&
    isValidNumber(totalAssets) &&
    isValidNumber(totalCurrentAssets)
  ) {
    return null;
  }
  return (ebit / (totalAssets - totalCurrentAssets)) * 100;
};

const calculateROICForEach = (incomeStatements, balanceSheets) => {
  const roicData = Object.entries(incomeStatements)?.map(
    ([date, incomeStatement]) => {
      const ebit = isValidNumber(incomeStatement?.ebit);
      const totalAssets = isValidNumber(balanceSheets[date]?.totalAssets);
      const totalCurrentAssets = isValidNumber(
        balanceSheets[date]?.totalCurrentAssets
      );

      if (ebit && totalAssets && totalCurrentAssets) {
        const roic = calculateROIC(
          parseFloat(ebit),
          parseFloat(totalAssets),
          parseFloat(totalCurrentAssets)
        );

        return { date, roic: `${roic}%` };
      }
      return null;
    }
  );

  return roicData;
};

const calculateAltmanZScore = (data, currentSharePrice) => {
  // Get the most recent quarter's data for total assets and total liabilities
  const Balance_Sheet = data?.Financials?.Balance_Sheet;
  // const { yearly: balanceYearly } = Balance_Sheet;
  const balanceYearly = Balance_Sheet?.yearly;
  const mostRecentYear =
    Object.keys(balanceYearly)?.length > 0 &&
    Object.keys(balanceYearly)?.reduce((latestYear, currentYear) => {
      return currentYear > latestYear ? currentYear : latestYear;
    });
  // const { quarterly: balanceQuarterly } = Balance_Sheet;
  const balanceQuarterly = Balance_Sheet?.quarterly;
  const mostRecentQuarter =
    Object.keys(balanceQuarterly)?.length > 0 &&
    Object.keys(balanceQuarterly)?.reduce((latestQuarter, currentQuarter) => {
      return currentQuarter > latestQuarter ? currentQuarter : latestQuarter;
    });

  const totalAssets = isValidNumber(
    balanceQuarterly[mostRecentQuarter]?.totalAssets
  );
  const totalLiab = isValidNumber(
    balanceQuarterly[mostRecentQuarter]?.totalLiab
  );

  const netWorkingCapital = isValidNumber(
    balanceYearly[mostRecentYear]?.netWorkingCapital
  );
  const retainedEarnings = isValidNumber(
    balanceYearly[mostRecentYear]?.retainedEarnings
  );

  // Get the relevant yearly income statement data
  // const { Income_Statement } = data?.Financials;
  const Income_Statement = data?.Financials?.Income_Statement;
  const incomeYearly = Income_Statement?.yearly;
  const mostRecentYearIncome =
    Object.keys(incomeYearly)?.length > 0 &&
    Object.keys(incomeYearly)?.reduce((latestYear, currentYear) => {
      return currentYear > latestYear ? currentYear : latestYear;
    });

  const totalRevenue = isValidNumber(
    incomeYearly[mostRecentYearIncome]?.totalRevenue
  );
  const ebit = isValidNumber(incomeYearly[mostRecentYearIncome]?.ebit);

  // Extract the SharesStats data
  const SharesStats = data?.SharesStats;
  const SharesOutstanding = SharesStats?.SharesOutstanding;
  if (
    isValidNumber(netWorkingCapital) &&
    isValidNumber(totalAssets) &&
    isValidNumber(retainedEarnings) &&
    isValidNumber(ebit) &&
    isValidNumber(SharesOutstanding) &&
    isValidNumber(currentSharePrice) &&
    isValidNumber(totalLiab) &&
    isValidNumber(totalRevenue)
  ) {
    const A = netWorkingCapital / totalAssets;
    const B = retainedEarnings / totalAssets;
    const C = ebit / totalAssets;

    const D = (SharesOutstanding * currentSharePrice) / totalLiab;

    const E = totalRevenue / totalAssets;

    // Altman Z-score formula
    const zScore = 1.2 * A + 1.4 * B + 3.3 * C + 0.6 * D + 1.0 * E;
    return zScore;
  } else {
    return null;
  }
};

const getMostRecentYearObject = (data) => {
  let mostRecentYear = 0;
  let mostRecentYearObject = null;

  for (const key in data) {
    const year = data[key].Year;
    if (year > mostRecentYear) {
      mostRecentYear = year;
      mostRecentYearObject = data[key];
    }
  }

  return mostRecentYearObject;
};
const getMostRecentDateObject = (data) => {
  let indexOfMostRecent = 0;
  for (let i = 1; i < data.length; i++) {
    const currentDate = new Date(data[i].date);
    const mostRecentDate = new Date(data[indexOfMostRecent].date);

    if (currentDate > mostRecentDate) {
      indexOfMostRecent = i;
    }
  }

  const mostRecentObject = data[indexOfMostRecent];

  return mostRecentObject;
};

const sumUpRecentQuarter = ({ data, propertyName }) => {
  const quarterlyData = Object.values(data);
  const sortedData = quarterlyData?.sort(
    (a, b) => new Date(b?.date) - new Date(a?.date)
  );
  const currentDate = new Date();

  const mostRecentFour = sortedData
    ?.filter((entry) => new Date(entry?.date) <= currentDate)
    ?.slice(0, 4);

  const totalCostOfRevenue =
    mostRecentFour.length > 0 &&
    mostRecentFour?.reduce((sum, entry) => {
      return sum + parseFloat(entry[propertyName]);
    }, 0);

  return totalCostOfRevenue;
};

const YoyDataFunction = ({ object, variableName }) => {
  const DataKeysYoy = Object.keys(object)?.sort();
  const currentGProfitYearKeyYoy = DataKeysYoy[DataKeysYoy?.length - 1];
  const previousGProfitYearKeyYoy = DataKeysYoy[DataKeysYoy?.length - 2];
  const twoGProfitYearsAgoKey = DataKeysYoy[DataKeysYoy?.length - 3];
  const fourGProfitYearsAgoKey = DataKeysYoy[DataKeysYoy?.length - 5];

  const currentYear = currentGProfitYearKeyYoy
    ? object[currentGProfitYearKeyYoy][variableName]
    : null;
  const previousYear = previousGProfitYearKeyYoy
    ? object[previousGProfitYearKeyYoy][variableName]
    : null;
  const twoYearsAgo = twoGProfitYearsAgoKey
    ? object[twoGProfitYearsAgoKey][variableName]
    : null;

  const fourYearsAgo = fourGProfitYearsAgoKey
    ? object[fourGProfitYearsAgoKey][variableName]
    : null;

  return {
    currentYear: isValidNumber(currentYear),
    previousYear: isValidNumber(previousYear),
    twoYearsAgo: isValidNumber(twoYearsAgo),
    fourYearsAgo: isValidNumber(fourYearsAgo)
  };
};

const comapredateFormula = ({ data, object }) => {
  const closeOneWeekBefore = data?.find((item) => item?.date === object);
  return closeOneWeekBefore;
};
const comparedateFormulaIndex = ({ data, object }) => {
  const targetIndex = data?.findIndex((item) => item?.date === object);
  return targetIndex;
};

const priceChange1W = ({ PriceChange, latestDate, todayClose }) => {
  const formattedOneWeekBefore = latestDate?.toISOString()?.split("T")[0];

  const closeOneWeekBefore = comapredateFormula({
    data: PriceChange,
    object: formattedOneWeekBefore
  });
  return calculateGrowth(todayClose, closeOneWeekBefore?.close);
};

const PriceChangeMonth = ({ PriceChange, latestDate, months }) => {
  const oneMonthBeforeDate = new Date(
    latestDate?.getFullYear(),
    latestDate?.getMonth() - months,
    latestDate?.getDate() + 1
  );
  const oneMonthBeforeDateString = oneMonthBeforeDate
    ?.toISOString()
    ?.split("T")[0];

  const targetIndex = comparedateFormulaIndex({
    data: PriceChange,
    object: oneMonthBeforeDateString
  });

  let result;

  if (targetIndex !== -1) {
    result = PriceChange[targetIndex];
  } else {
    const targetDateObj = new Date(oneMonthBeforeDateString);
    const oneMonthAgo = new Date(
      targetDateObj?.getFullYear(),
      targetDateObj?.getMonth() - 1,
      targetDateObj?.getDate()
    );
    const oneMonthAgoString = oneMonthAgo?.toISOString()?.split("T")[0];

    const filteredData = PriceChange?.filter(
      (item) => item?.date <= oneMonthBeforeDateString
    );
    const filteredOneMonthAgo = filteredData?.filter(
      (item) => item?.date >= oneMonthAgoString
    );

    if (filteredOneMonthAgo.length > 0) {
      result =
        filteredOneMonthAgo.length > 0 &&
        filteredOneMonthAgo.reduce((acc, curr) =>
          curr?.date > acc?.date ? curr : acc
        );
    } else {
      result = null;
    }
  }
  return result?.close ? result?.close : null;
};

const calculateYeartoDate = ({ PriceChange }) => {
  const currentYear = new Date().getFullYear();
  const yearStartDate = `${currentYear}-01-01`;

  // Find the earliest available data point after the year start
  let earliestYearStartData = null;

  // Find the earliest available data point for each month in the year
  const earliestMonthData = new Array(12).fill(null);

  for (const data of PriceChange) {
    if (!earliestYearStartData && data?.date >= yearStartDate) {
      earliestYearStartData = data;
    }

    const monthIndex = new Date(data?.date).getMonth();
    if (!earliestMonthData[monthIndex]) {
      earliestMonthData[monthIndex] = data;
    }
  }

  return earliestYearStartData ? earliestYearStartData.close : null;
};

const PriceChangeInYear = ({ PriceChange, latestDate, years }) => {
  const oneYearBeforeDate = new Date(
    latestDate?.getFullYear() - years,
    latestDate?.getMonth(),
    latestDate?.getDate() - 1
  );
  const oneYearBeforeDateString = oneYearBeforeDate
    ?.toISOString()
    ?.split("T")[0];

  const targetIndexy = comparedateFormulaIndex({
    data: PriceChange,
    object: oneYearBeforeDateString
  });

  let result;

  if (targetIndexy !== -1) {
    result = PriceChange[targetIndexy];
  } else {
    const targetDateObj = new Date(oneYearBeforeDateString);
    const oneYearAgo = new Date(
      targetDateObj?.getFullYear() - 1,
      targetDateObj?.getMonth(),
      targetDateObj?.getDate()
    );
    const oneYearAgoString = oneYearAgo?.toISOString()?.split("T")[0];

    const filteredData = PriceChange.filter(
      (item) => item?.date <= oneYearBeforeDateString
    );
    const filteredOneYearAgo = filteredData.filter(
      (item) => item?.date >= oneYearAgoString
    );

    if (filteredOneYearAgo.length > 0) {
      result = filteredOneYearAgo?.reduce((acc, curr) =>
        curr?.date > acc?.date ? curr : acc
      );
    } else {
      result = null;
    }
  }
  return result?.close ? result?.close : null;
};

const calculateGrowthEach = ({ data, variableName }) => {
  const years = Object?.values(data)?.sort();

  const resultArray = years.reduce((acc, currentObj, index, array) => {
    if (index < array.length - 1) {
      const currentValue = currentObj && currentObj[variableName];
      const date = currentObj && currentObj.date;
      const nextObj = array[index + 1];
      const nextValue = nextObj[variableName];
      const divisionResult =
        isValidNumber(Number(currentValue)) &&
        isValidNumber(Number(nextObj[variableName]))
          ? Number(currentValue) / Number(nextValue)
          : null;
      acc.push({ growth: divisionResult, date: date });
    }
    return acc;
  }, []);
  return resultArray; // Don't forget to return the resultArray.
};
// ***************************** i have to set it after my work **********

const calculateGrowthMarketCap = ({ current, privious }) => {
  if (isValidNumber(current) && isValidNumber(privious)) {
    const division =
      (isValidNumber(current) - isValidNumber(privious)) /
      isValidNumber(privious);
    const result = division * 100;
    return result;
  }
};

const calculateRevenuePrecent = ({ current, privious }) => {
  if (isValidNumber(current) && isValidNumber(privious)) {
    const division =
      (isValidNumber(current) - isValidNumber(privious)) /
      isValidNumber(privious);
    const result = division * 100;
    return result;
  }
};

const margedArrayByDate = ({ array }) => {
  const mergedData = {};

  array.forEach((item) => {
    const { date, ...rest } = item;
    if (!mergedData[date]) {
      mergedData[date] = { date, ...rest };
    } else {
      Object.assign(mergedData[date], rest);
    }
  });

  const result = Object.values(mergedData);
  return result;
};
const margedArrayByYear = ({ array, reacentDate }) => {
  const mergedData = {};

  array.forEach((item) => {
    const year = item.date.substring(0, 4);

    if (!mergedData[year]) {
      mergedData[year] = { year };
    }

    Object.entries(item).forEach(([key, value]) => {
      if (key !== "year") {
        mergedData[year][key] = value;
      }
    });
  });
  const reacent = reacentDate.substring(0, 4);
  const mergedArray = Object.values(mergedData);
  const filteredArray = mergedArray.filter(
    (item) => Number(item.year) <= reacent && Number(item.year) >= 2013
  );
  return filteredArray;
};
const margedArrayByQuat = ({ array, reacentDate }) => {
  const mergedData = [];

  array.forEach((obj) => {
    const existingObj = mergedData.find(
      (item) => item.QuaterNum === obj.QuaterNum
    );

    if (existingObj) {
      Object.assign(existingObj, obj);
    } else {
      mergedData.push({ ...obj });
    }
  });

  return mergedData;
};

// testing for getting object in quarters
function getQuartersByYear({ data, varableName }) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const date = new Date(data[key][varableName]);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-based
      let quarter = Math.ceil(month / 3);

      // Adjust quarter for the first month of the quarter from previous year
      if (quarter === 0) {
        quarter = 4;
      }

      const quarterString = `${year}-Q${quarter}`;

      data[key].QuaterNum = quarterString;
    }
  }

  return data;
}
// Function to check if a value contains the search term
function FilterSearch(value, search) {
  if (typeof value === "number") {
    return value?.toString()?.includes(search);
  } else if (typeof value === "string") {
    return value?.includes(search);
  } else if (typeof value === "undefined") {
    return value;
  }
  return false;
}

function getValuesWithSearch(values, searchValue) {
  const filteredValues = values.filter((item) => {
    for (const key in item) {
      if (typeof item[key] === "object") {
        for (const nestedKey in item[key]) {
          if (FilterSearch(item[key][nestedKey], searchValue)) {
            return true;
          }
        }
      } else {
        if (FilterSearch(item[key], searchValue)) {
          return true;
        }
      }
    }
    return false;
  });

  return filteredValues;
}

module.exports = {
  getValuesWithSearch,
  FilterSearch,
  calculateRevenuePrecent,
  calculateGrowthMarketCap,
  margedArrayByQuat,
  margedArrayByYear,
  getQuartersByYear,
  margedArrayByDate,
  calculateGrowthEach,
  PriceChangeInYear,
  calculateYeartoDate,
  getMostRecentDateObject,
  PriceChangeMonth,
  comparedateFormulaIndex,
  comapredateFormula,
  YoyDataFunction,
  sumUpRecentQuarter,
  getMostRecentYearObject,
  calculateAltmanZScore,
  calculateFiveYear,
  calculateGrowth,
  calculateROICForEach,
  priceChange1W
};
