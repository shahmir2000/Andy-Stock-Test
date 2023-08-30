const connectedClients = [];
let socketData = null;
let ws;

function initializeWebSocket() {
  const url =
    "wss://ws.eodhistoricaldata.com/ws/us?api_token=63bf6ecd8c46c5.53082791";
  ws = new WebSocket(url);

  const wsPromise = new Promise((resolve, reject) => {
    ws.on("open", () => {
      console.log("WebSocket connection established.");
      resolve();
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      reject(error);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed.");
    });
  });

  ws.on("message", (data) => {
    const message = data.toString("utf-8");
    try {
      const jsonData = JSON.parse(message);
      socketData = jsonData;
      connectedClients.forEach((client) => {
        client.send(data);
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });

  const wss = new WebSocket.Server({ noServer: true });
  wss.on("connection", (ws) => {
    console.log("WebSocket client connected.");
    connectedClients.push(ws);

    ws.on("close", () => {
      console.log("WebSocket client disconnected.");
      connectedClients.splice(connectedClients.indexOf(ws), 1);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  return wsPromise;
}

async function updateSubscriptionTicker(ticker) {
  try {
    await initializeWebSocket(); // Wait for the WebSocket connection to be established
    const subscriptionRequest = {
      action: "subscribe",
      symbols: ticker
    };
    console.log(ticker);
    ws.send(JSON.stringify(subscriptionRequest));
  } catch (error) {
    console.error("Error updating subscription ticker:", error);
  }
}

function getSocketData() {
  return socketData;
}

module.exports = {
  initializeWebSocket,
  updateSubscriptionTicker,
  getSocketData
};
