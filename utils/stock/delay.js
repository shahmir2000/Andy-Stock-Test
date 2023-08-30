const delay = (delay) => {
  console.log("called internal");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Response after 2 seconds");
    }, delay);
  });
};

const retryOperation = async (operation, maxRetries, delayBetweenRetries) => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const result = await operation();
      return result;
    } catch (error) {
      console.log("Attempt", retries + 1, "failed with error:", error);
      retries++;
      await new Promise((resolve) => setTimeout(resolve, delayBetweenRetries));
    }
  }
  console.log("Maximum retries reached");
  throw new Error("All retries exhausted");
};

module.exports = { delay, retryOperation };
