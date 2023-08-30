const express = require("express");
const router = express.Router();
const {
  populateAllStocks
  // populateOneTicker
} = require("../../controller/stock/stock.controller");
const {
  tickersController,
  SectorController
} = require("../../controller/stock/tickers.controller");
const ratioController = require("../../controller/stock/ratios.cnstroller");

router.get("/ticker", ratioController);
router.get("/sector", SectorController);
router.get("/add-ticker", tickersController);
router.get("/populate", populateAllStocks);

module.exports = router;
