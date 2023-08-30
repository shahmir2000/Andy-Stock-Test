const zeroPattern = /^0+(\.0+)?$/;

function isValidNumber(input) {
  if (
    typeof input === "number" ||
    (typeof input === "string" && !isNaN(Number(input)))
  ) {
    const numValue = Number(input);

    // Check if the number is finite and not equal to zero
    if (isFinite(numValue) && !zeroPattern.test(numValue)) {
      return numValue; // Valid number
    } else {
      return null;
    }
  }

  return null; // Invalid number
}

function convertAttributesToNumber(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value === null || value === undefined || value === NaN) {
        // Skip null or undefined values
        continue;
      }

      if (
        key.includes("date") ||
        key.includes("Date") ||
        key.includes("MostRecentQuarter") ||
        key.includes("lastStockSplit") ||
        key.includes("lastStockSplitRatio") ||
        key.includes("YearBorn") ||
        key.includes("EmployerIdNumber")
      ) {
        obj[key].toString();
      } else {
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) {
          // console.log("value", numericValue, value, key);
        }
        if (!isNaN(numericValue)) {
          // Conversion to number successful
          obj[key] = numericValue;
        } else {
          // Conversion failed, keep the value as a string
          obj[key] = value.toString();
        }
      }
    }
  }
  return obj;
}

const convertNumbersInArray = (inputArray) => {
  return inputArray?.map(convertAttributesToNumber);
};

function convertValuesToArrayTypes(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertValuesToArrayTypes(item));
  }

  return Object.keys(obj).reduce((convertedObj, key) => {
    const value = obj[key];

    if (value === undefined || value === null) {
      convertedObj[key] = null;
    } else if (typeof value === "string") {
      convertedObj[key] = value.toString();
    } else if (typeof value === "object") {
      convertedObj[key] = convertValuesToArrayTypes(value);
    } else {
      convertedObj[key] = value;
    }

    return convertedObj;
  }, {});
}

function stringifyValuesExceptSpecial(obj) {
  for (const key in obj) {
    if (
      obj[key] !== null &&
      obj[key] !== Infinity &&
      obj[key] !== undefined &&
      obj[key] !== NaN
    ) {
      if (typeof obj[key] === "object") {
        stringifyValuesExceptSpecial(obj[key]); // Recurse into nested object
      } else {
        obj[key] = parseFloat(obj[key]);
      }
    }
  }
}

module.exports = {
  convertAttributesToNumber,
  stringifyValuesExceptSpecial,
  convertValuesToArrayTypes,
  convertNumbersInArray,
  isValidNumber
};
