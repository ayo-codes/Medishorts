const express = require("express");
const { check } = require("express-validator");
const shortProductsHpraController = require("../controllers/short-products-hpra-controller");

const router = express.Router(); 

// GET ALL SHORT PRODUCTS FROM HPRA DATABASE
router.get("/" , shortProductsHpraController.getAllShortProductsHpra);

module.exports = router;