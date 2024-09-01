const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const webScrapeController = require("../controllers/web-scrape-controller");

// Trigger the webScrape function
router.get("/", webScrapeController.webScrapeTrigger);

module.exports = router;