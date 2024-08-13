const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");

const ApiHttpError = require("../models/api-http-error");

const Product = require("../models/product");

// DUMMY DATA
const DUMMY_PRODUCTS = require("../dummy_data/productsList/productsList.json");

// GET ALL PRODUCTS IN THE DATABASE
const getAllProducts = (req, res, next) => {
  console.log("GET Request received for all products");
  const products = DUMMY_PRODUCTS.slice(0, 100);
  if (!products) {
    return next(new ApiHttpError("Could not find any products", 404));
  }

  console.log(`Request received from ${req.headers.host + req.url}`);
  return res.json({ products: products });
};


// GET A PRODUCT BY ID/BARCODE
const getProductById = (req, res, next) => {
  const { productId } = req.params;
  const product = DUMMY_PRODUCTS.find((p) => p.barcode === parseInt(productId, 10)); // using barcode for now

  if (!product) {
    return next(new ApiHttpError("Could not find any product for the id provoided", 404));
  }

  console.log("GET Request recevied for a single product by id");
  console.log(`Request received from  ${req.headers.host + req.url}`);
  return res.json({ product: product });
};



// EXPORTS
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
