const express = require("express");

const router = express.Router(); 

const DUMMY_PRODUCTS = require("../../productsList/productsList.json");
const DUMMY_PRODUCT_REQUESTS = require("../../productRequestsList/productRequestsLists.json");


// GET ALL PRODUCTS
router.get("/" , (req, res , next) => {
  console.log("GET Request received for all products");
  res.json({products: DUMMY_PRODUCTS.slice(0,100)});
  console.log(`Request received from ${req.headers.host + req.url}` ); 
});

// GET ALL PRODUCT REQUESTS BY USER ID
router.get("/user/:userId" , (req, res , next) => {
  const {userId} = req.params;
  const userProductRequest = DUMMY_PRODUCT_REQUESTS.filter(p => p.user === userId);
  console.log("GET Request recevied for a single product by user");
  res.json({userProductRequest: userProductRequest});
  console.log(`Request received from  ${req.headers.host + req.url}` );
});

// GET A PROUCT BY ID/BARCODE
router.get("/:productId" , (req, res , next) => {
  const {productId} = req.params;
  const product = DUMMY_PRODUCTS.find(p => p.barcode === parseInt(productId, 10)); // using barcode for now
  console.log("GET Request recevied for a single product  products");
  res.json({product: product});
  console.log(`Request received from  ${req.headers.host + req.url}` );
});


module.exports = router;