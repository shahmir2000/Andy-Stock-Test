// File: websocketManager.js
const WebSocket = require("ws");
const axios = require("axios");
const https = require("https");

const { PrismaClient } = require("@prisma/client");
const { delay } = require("../../utils/stock/delay");
const { PriceChangesServices } = require("./PriceChanges.services");
const instance = axios.create({
  timeout: 60000,
  httpsAgent: new https.Agent({ keepAlive: true })
});
const url =
  "wss://ws.eodhistoricaldata.com/ws/us?api_token=63bf6ecd8c46c5.53082791";

const prisma = new PrismaClient();
// async function getSocketData({ ticker, PriceChange }) {
//   let alreadyCalled = false;

//   console.log("ticker in socket", ticker);
//   const subscriptionRequest = {
//     action: "subscribe",
//     symbols: ticker
//   };
//   const ws = new WebSocket(url);

//   ws.on("open", () => {
//     console.log("WebSocket connection established.");

//     ws.send(JSON.stringify(subscriptionRequest));
//   });

//   ws.on("message", async (data) => {
//     const message = data.toString("utf-8");

//     try {
//       const jsonData = JSON.parse(message);
//       console.log("Received data 1:", jsonData);

//       if (jsonData?.p && !alreadyCalled) {
//         console.log("Received data internal:", jsonData);
//         ws.close();
//         alreadyCalled = true;
//         preMarketPrice = jsonData?.p;

//         const alreadyExist = await prisma.ticker.findFirst({
//           where: {
//             ticker
//           }
//         });

//         const alreadyTTM = await prisma.tTM.findFirst({
//           where: {
//             tickerId: alreadyExist.id
//           }
//         });

//         if (alreadyTTM) {
//           const changePrice = await PriceChangesServices({
//             PriceChange,
//             PremarketPrice: jsonData?.p?.toString()
//           });

//           await prisma.tTM.update({
//             where: {
//               tickerId: alreadyTTM?.id
//             },
//             data: {
//               premarketPercentageChg: changePrice?.PremktPercentChg
//                 ? changePrice.PremktPercentChg?.toString()
//                 : null,
//               premarketPrice: jsonData?.p?.toString(),
//               priceChange1Day: changePrice.PriceChange1D?.toString(),
//               priceChange1Week: changePrice?.PriceChange1W.toString(),
//               priceChange1Month: changePrice?.PriceChange1M?.toString(),
//               priceChange6Month: changePrice?.PriceChange6M?.toString(),
//               priceChange1Year: changePrice?.PriceChange1Y?.toString(),
//               priceChangeThisYear: changePrice?.PriceChangeThisYear?.toString(),
//               priceChange3Year: changePrice?.PriceChange3Y?.toString(),
//               priceChange5Year: changePrice?.PriceChange5Y?.toString(),
//               priceChange10Year: changePrice?.PriceChange10Y?.toString()
//             }
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error parsing JSON:", error);
//     }
//   });

//   ws.on("error", (error) => {
//     console.error("WebSocket error:", error);
//   });

//   ws.on("close", () => {
//     console.log("WebSocket connection closed.");
//   });
//   await delay(50000);

//   const wss = new WebSocket.Server({ noServer: true });
//   wss.on("connection", (ws) => {
//     console.log("WebSocket client connected.");

//     ws.on("close", () => {
//       console.log("WebSocket client disconnected.");
//       // Remove the disconnected WebSocket from the array
//     });

//     ws.on("error", (error) => {
//       console.error("WebSocket error:", error);
//     });
//   });

//   return wss?.p ? wss : null;
// }

// ******************testing for the WebSocket start  ****************
async function getSocketData({ ticker, PriceChange }) {
  return new Promise((resolve, reject) => {
    let authorized = false; // Track authorization state

    const ws = new WebSocket(url);

    ws.on("open", () => {
      console.log("WebSocket connection established.");
    });

    ws.on("message", async (data) => {
      const message = data.toString("utf-8");
      console.log("Received raw data:", message);

      try {
        const jsonData = JSON.parse(message);
        console.log("Parsed JSON data:", jsonData);

        if (!authorized) {
          // Check if the authorization message is received
          if (
            jsonData?.status_code === 200 &&
            jsonData?.message === "Authorized"
          ) {
            console.log("Authorization successful.");
            authorized = true; // Set authorization state

            // Subscribe to ticker data after authorization
            const subscriptionRequest = {
              action: "subscribe",
              symbols: ticker
            };
            ws.send(JSON.stringify(subscriptionRequest));
          } else {
            console.log("Authorization failed. Closing WebSocket.");
            ws.close();
          }
        } else if (jsonData?.s && jsonData?.p) {
          // Process subsequent data messages
          console.log("Processing subsequent data:", jsonData);
          // Your data processing logic here

          // For example, update your database with the received data
          // const alreadyExist = await prisma.ticker.findFirst({
          //   where: {
          //     ticker
          //   }
          // });
          // ...

          // Resolve the promise once processing is complete
          resolve();
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        reject(error);
      }
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      reject(error);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed.");
    });
  });
}

// ******************testing for the WebSocket End ****************
const stockTicker = async ({ ticker, apiToken }) => {
  console.log(ticker);

  const AllapiUrl = `https://eodhistoricaldata.com/api/fundamentals/${ticker}.US`;

  const StockDataparams = {
    api_token: apiToken
  };

  const response = await instance.get(AllapiUrl, {
    params: StockDataparams
  });

  return response.data;
};

const stockDividend = async ({ ticker, apiToken }) => {
  const dividentApi = `https://eodhistoricaldata.com/api/div/${ticker}.US`;

  const response = await instance.get(dividentApi, {
    params: {
      api_token: apiToken,
      fmt: "json"
    }
  });

  return response.data;
};

const stockAvgVol = async ({ ticker, apiToken }) => {
  const avgVolApi = ` https://eodhistoricaldata.com/api/technical/${ticker}.US?`;

  const response = await instance.get(avgVolApi, {
    params: {
      api_token: apiToken,
      fmt: "json",
      function: "avgvol",
      agg_period: "m"
    }
  });

  return response.data;
};

const stockPrice = async ({ ticker, apiToken }) => {
  const PriceChange1DapiUrl = `https://eodhistoricaldata.com/api/eod/${ticker}.US`;

  const PriceChange1Darams = {
    api_token: apiToken,
    fmt: "json"
  };

  const response = await instance.get(PriceChange1DapiUrl, {
    params: PriceChange1Darams
  });

  return response.data;
};

module.exports = {
  getSocketData,
  stockTicker,
  stockDividend,
  stockAvgVol,
  stockPrice
};
