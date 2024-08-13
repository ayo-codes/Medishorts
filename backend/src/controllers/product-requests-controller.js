const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");

const ApiHttpError = require("../models/api-http-error");

const ProductRequest = require("../models/productRequest");

let DUMMY_PRODUCT_REQUESTS = require("../dummy_data/productRequestsList/productRequestsLists.json");


// GET ALL PRODUCT REQUESTS IN THE DATABASE - MONGO
const getAllProductRequests = async (req, res, next) => {
  console.log("GET Request received for all products requests");
  let productRequests;
  try {
    productRequests = await ProductRequest.find();
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Fetching product requests from Database failed ", 500));
  }

  if (!productRequests) {
    return next(new ApiHttpError("Could not find any products", 404));
  }

  console.log(`Request received from ${req.headers.host + req.url}`);
  return res.json({ productRequests: productRequests });
};


// GET A PRODUCT REQUEST BY ID - MONGO
const getProductRequestById = async (req, res, next) => {
  const { productRequestId } = req.params;

  let productRequest;
  try {
    productRequest = await ProductRequest.findById(productRequestId);
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Fetching product request from Database failed", 500));
  }

  if (!productRequest) {
    return next(new ApiHttpError("Could not find any product Request for the id provoided", 404));
  }

  console.log("GET Request recevied for a single product Request by id");
  console.log(`Request received from  ${req.headers.host + req.url}`);
  return res.json({ productRequest: productRequest.toObject({ getters: true }) }); // adds an id field to the object
};


// GET ALL PRODUCT REQUESTS BY A USER ID
const getProductRequestsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  // const userProductRequests = DUMMY_PRODUCT_REQUESTS.filter((p) => p.user === userId);

  let userProductRequests;
  try {
    userProductRequests = await ProductRequest.find({ user: userId });
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Fetching product requests from Database failed", 500));
  } 

  if (!userProductRequests || userProductRequests.length === 0) {
    return next(new ApiHttpError("Could not find any product requests for the id provided", 404));
  }

  console.log("GET Request received for a single product by user");
  console.log(`Request received from  ${req.headers.host + req.url}`);
  return res.json({ userProductRequests: userProductRequests.map(userProductRequest => userProductRequest.toObject({ getters: true })) });
};


// CREATE A NEW PRODUCT REQUEST - MONGO
const createProductRequest = async (req, res, next) => {
  // Validate the inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new ApiHttpError("Invalid inputs passed, please check your input", 422));
  }

  const { productName, genericName, packSize, gmsNo, costPrice, vatRate, manufacturer, legalCategory, barcode, ipuCode, user } = req.body;

  const newProductRequest = new ProductRequest({
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
    productRequestId: uuid(),
  });

  try {
    await newProductRequest.save();
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Could not create a new product request, please try again", 500));
  }

  console.log("POST Request received for a new product request");
  console.log(`Request received from  ${req.headers.host + req.url}`);
  console.log(req.body);
  return res.status(201).json({ message: "Product request created successfully", productRequest: newProductRequest });
};


// UPDATE A PRODUCT REQUEST BY ID
const updateProductRequestById = (req, res, next) => {
  // Validate the inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new ApiHttpError("Invalid inputs passed, please check your input", 422));
  }

  const { productRequestId } = req.params; // productRequestId
  const { productName, genericName, packSize, gmsNo, costPrice, vatRate, manufacturer, legalCategory, barcode, ipuCode, user } = req.body;

  const updatedProductRequest = { ...DUMMY_PRODUCT_REQUESTS.find((p) => p.productRequestId === productRequestId) };
  const productRequestIndex = DUMMY_PRODUCT_REQUESTS.findIndex((p) => p.productRequestId === productRequestId);
  updatedProductRequest.productName = productName;
  updatedProductRequest.genericName = genericName;
  updatedProductRequest.packSize = packSize;
  updatedProductRequest.gmsNo = gmsNo;
  updatedProductRequest.costPrice = costPrice;
  updatedProductRequest.vatRate = vatRate;
  updatedProductRequest.manufacturer = manufacturer;
  updatedProductRequest.legalCategory = legalCategory;
  updatedProductRequest.barcode = barcode;
  updatedProductRequest.ipuCode = ipuCode;
  updatedProductRequest.user = user;

  DUMMY_PRODUCT_REQUESTS[productRequestIndex] = updatedProductRequest;

  console.log("PATCH Request received for a product request");
  console.log(`Request received from  ${req.headers.host + req.url}`);
  console.log(req.body);
  return res.status(200).json({ message: "Product request updated successfully", productRequest: updatedProductRequest });
};


// DELETE A PRODUCT REQUEST BY ID
const deleteProductRequestById = (req, res, next) => {
  const { productRequestId } = req.params;
  // Check if the product request exists
  if (!DUMMY_PRODUCT_REQUESTS.find((p) => p.productRequestId === productRequestId)) {
    return next(new ApiHttpError("Could not find any product request for the id provided", 404));
  }
  DUMMY_PRODUCT_REQUESTS = DUMMY_PRODUCT_REQUESTS.filter((p) => p.productRequestId !== productRequestId);

  console.log("DELETE Request received for a product request");
  console.log(`Request received from  ${req.headers.host + req.url}`);
  return res.status(200).json({ message: "Product request deleted successfully" });
};


// EXPORTS
exports.deleteProductRequestById = deleteProductRequestById;
exports.createProductRequest = createProductRequest;
exports.getProductRequestsByUserId = getProductRequestsByUserId;
exports.getProductRequestById = getProductRequestById;
exports.updateProductRequestById = updateProductRequestById;
exports.getAllProductRequests = getAllProductRequests;
