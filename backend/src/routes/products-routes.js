const { Router } = require("express");

const { check } = require("express-validator");

const productsControllers = require("../controllers/products-controller");

const router = Router();

// GET ALL PRODUCTS
router.get("/", productsControllers.getAllProducts);


// GET A PROUCT BY ID/BARCODE
router.get("/:productId", productsControllers.getProductById);

// Export Module
module.exports = router;
