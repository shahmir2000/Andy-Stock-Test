const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const createError = require("http-errors");
// routes imports
const stockRoutes = require("./routes/stock/stock.route");
const graphqlRoute = require("./routes/graphql.route");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
const main = async () => {
  const PORT = 1999;

  // REST API using Express.js
  app.get("/api", (req, res) => {
    console.log("main router");
    res.json({ message: "This is a REST API endpoint" });
  });
  // import routes
  app.use("/stock", stockRoutes);
  app.use("/", graphqlRoute);

  app.use((req, res, next) => {
    next(createError.NotFound());
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      status: err.status || 500,
      message: err.message
    });
  });

  // await getSocketData("AAPL");

  // Start the server
  app.listen(PORT, () => {
    // webSocket connection
    // initializeWebSocket();
    // Express server
    console.log(`Server is running on http://localhost:${PORT}`);
    // GraphQL server
    console.log(`GraphQL API is available at http://localhost:${PORT}/graphql`);
  });

  // server.on("close", () => {
  //   // Close all WebSocket connections before shutting down the server
  //   connectedClients.forEach((client) => {
  //     client.close();
  //   });
  // });
};

main();
