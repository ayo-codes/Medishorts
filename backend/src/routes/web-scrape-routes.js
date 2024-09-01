const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const webScrapper = require("../web-scrapper/webScrapper");

// GET ALL

router.get("/", webScrapper.webScrapper);

module.exports = router;