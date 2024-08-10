const express = require("express");

const router = express.Router(); 
const placesControllers = require("../controllers/products-controller");


// GET ALL PRODUCTS
router.get("/" , placesControllers.getAllProducts);

// GET ALL PRODUCT REQUESTS BY USER ID
router.get("/user/:userId" ,placesControllers.getProductRequestsByUserId );

// GET A PROUCT BY ID/BARCODE
router.get("/:productId" ,placesControllers.getProductById );

module.exports = router;