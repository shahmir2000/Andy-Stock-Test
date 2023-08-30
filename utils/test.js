//this function for getting the data before today date
const currentDate = new Date(data?.TTM?.MostRecentQuarter); // Get today's date
const twoDaysAgo = new Date(currentDate);
console.log(twoDaysAgo);
twoDaysAgo.setDate(currentDate.getDate() - 2); // Calculate two days ago

const filteredData = StatisticsYearly.filter((item) => {
  const itemDate = new Date(item.date);
  return itemDate <= twoDaysAgo;
});

console.log(filteredData.length);

// ********************8
