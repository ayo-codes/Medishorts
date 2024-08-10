const uuid = require("uuid").v4;

const ApiHttpError = require("../models/api-http-error");

const DUMMY_PRODUCTS = require("../dummy_data/productsList/productsList.json");
const DUMMY_PRODUCT_REQUESTS = require("../dummy_data/productRequestsList/productRequestsLists.json");

const getAllProducts = (req, res , next) => {
  console.log("GET Request received for all products");
  const products = DUMMY_PRODUCTS.slice(0,100);
  if (!products) {
    return next(new ApiHttpError("Could not find any products", 404));
  }

  console.log(`Request received from ${req.headers.host + req.url}` ); 
  return res.json({products: products});
};


const getProductRequestsByUserId = (req, res , next) => {
  const {userId} = req.params;
  const userProductRequest = DUMMY_PRODUCT_REQUESTS.filter(p => p.user === userId);

  if (userProductRequest.length === 0) {
    return next(new ApiHttpError("Could not find any product requests for the id provided", 404));
  }

  console.log("GET Request recevied for a single product by user");
  console.log(`Request received from  ${req.headers.host + req.url}` );
  return res.json({userProductRequest: userProductRequest});
};



const getProductById = (req, res , next) => {
  const {productId} = req.params;
  const product = DUMMY_PRODUCTS.find(p => p.barcode === parseInt(productId, 10)); // using barcode for now

  if (!product) {
    return next(new ApiHttpError("Could not find any product for the id provoided", 404));
  }

  console.log("GET Request recevied for a single product by id");
  console.log(`Request received from  ${req.headers.host + req.url}` );
  return res.json({product: product});
}

const createProductRequest = (req, res , next) => {

  const { productName, genericName, packSize, gmsNo, costPrice, vatRate, manufacturer, legalCategory, barcode , ipuCode, user} = req.body;
  const newProductRequest = {
    productName,
    genericName,
    packSize,
    gmsNo,
    costPrice,
    vatRate,
    manufacturer,
    legalCategory,
    barcode,
    ipuCode,
    user,
    productRequestId : uuid()
  };

  DUMMY_PRODUCT_REQUESTS.push(newProductRequest);


  console.log("POST Request received for a new product request");
  console.log(`Request received from  ${req.headers.host + req.url}` ); 
  console.log(req.body);
  return res.status(201).json({message: "Product request created successfully", productRequest : newProductRequest});
}

exports.createProductRequest = createProductRequest;
exports.getAllProducts = getAllProducts;
exports.getProductRequestsByUserId = getProductRequestsByUserId;
exports.getProductById = getProductById;
