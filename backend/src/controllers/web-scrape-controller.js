const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const ApiHttpError = require("../models/api-http-error");

const ShortProductsHpra = require("../models/shortProductsHpra");
const webScrapper = require("../web-scrapper/webScrapper");


// WEB SCRAPPER CONTROLLER TO SAVE the shortProductsHpra JSON data from webScrapper.js to MongoDB
const webScrapeTrigger = async (req, res, next) => {
  console.log ("Web Scrape Request received");
  res.send("Web Scrape Request received");
};


// Export the webScrape function
exports.webScrapeTrigger = webScrapeTrigger;