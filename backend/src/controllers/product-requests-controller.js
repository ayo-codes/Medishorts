const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const ApiHttpError = require("../models/api-http-error");

const ProductRequest = require("../models/productRequest");
const User = require("../models/user");


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
  return res.json({ productRequests: productRequests.map(productRequest => productRequest.toObject({ getters: true })) });
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

  let userProductRequests;
  try {
    userProductRequests = await ProductRequest.find({ productRequestCreator: userId });
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

  // const { productName, genericName, packSize, gmsNo, costPrice, vatRate, manufacturer, legalCategory, barcode, ipuCode, productRequestCreator } = req.body;
  const { productName, genericName,  costPrice, expiryDate, shortProduct,  productRequestCreator } = req.body;

  // const newProductRequest = new ProductRequest({
  //   productName,
  //   genericName,
  //   packSize,
  //   gmsNo,
  //   costPrice,
  //   vatRate,
  //   manufacturer,
  //   legalCategory,
  //   barcode,
  //   ipuCode,
  //   productRequestCreator,
  //   productRequestId: uuid(),
  // });
  const newProductRequest = new ProductRequest({
    productName,
    genericName,
    costPrice,
    expiryDate,
    shortProduct,
    productRequestCreator : req.userData.userId, // productRequestCreator is the user id from the token
    productRequestId: uuid(),
  });

  let user;
  try {
    user = await User.findById(req.userData.userId); // productRequestCreator id  is the user id from the token and not what is passed in the body
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Could not create a new product request, please try again", 500));
  }


  if (!user) {
    return next(new ApiHttpError("Could not find any user for the provided id", 404
    ));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newProductRequest.save({ session: sess });
    user.productRequests.push(newProductRequest);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Could not create a new product request, please try again", 500));
  }

  console.log("POST Request received for a new product request");
  console.log(`Request received from  ${req.headers.host + req.url}`);
  console.log(req.body);
  return res.status(201).json({ message: "Product request created successfully", productRequest: newProductRequest });
};


// UPDATE A PRODUCT REQUEST BY ID - MONGO
const updateProductRequestById = async (req, res, next) => {
  // Validate the inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new ApiHttpError("Invalid inputs passed, please check your input", 422));
  }

  const { productRequestId } = req.params; // productRequestId
  // const { productName, genericName, packSize, gmsNo, costPrice, vatRate, manufacturer, legalCategory, barcode, ipuCode, user } = req.body;
  const { productName, genericName,  costPrice , expiryDate, shortProduct } = req.body;

  let updatedProductRequest;
  try {
    updatedProductRequest = await ProductRequest.findById(productRequestId);
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Could not update the product request, please try again", 500));
  }

  // Check if product request creator is the product request updater 
  if (updatedProductRequest.productRequestCreator.toString() !== req.userData.userId) {
    return next(new ApiHttpError("You are not allowed to edit this product request", 401));
  }

  
  // updatedProductRequest.productName = productName;
  // updatedProductRequest.genericName = genericName;
  // updatedProductRequest.packSize = packSize;
  // updatedProductRequest.gmsNo = gmsNo;
  // updatedProductRequest.costPrice = costPrice;
  // updatedProductRequest.vatRate = vatRate;
  // updatedProductRequest.manufacturer = manufacturer;
  // updatedProductRequest.legalCategory = legalCategory;
  // updatedProductRequest.barcode = barcode;
  // updatedProductRequest.ipuCode = ipuCode;
  // updatedProductRequest.user = user;

  updatedProductRequest.productName = productName;
  updatedProductRequest.genericName = genericName;
  updatedProductRequest.costPrice = costPrice;
  updatedProductRequest.expiryDate = expiryDate;
  updatedProductRequest.shortProduct = shortProduct;



try {
  await updatedProductRequest.save();
} catch (err) {
  console.log(err);
  return next(new ApiHttpError("Could not update the product request, please try again", 500));
}


  console.log("PATCH Request received for a product request");
  console.log(`Request received from  ${req.headers.host + req.url}`);
  console.log(req.body);
  return res.status(200).json({ message: "Product request updated successfully", productRequest: updatedProductRequest.toObject({ getters: true }) });
};


// DELETE A PRODUCT REQUEST BY ID - MONGO
const deleteProductRequestById = async (req, res, next) => {
  const { productRequestId } = req.params;

  let deletedProductRequest;
  try {
    deletedProductRequest = await ProductRequest.findById(productRequestId).populate("productRequestCreator"); // populate field holds the full user object
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Could not delete the product request, please try again", 500));
  }

  if (!deletedProductRequest) {
    return next(new ApiHttpError("Could not find any product request for the id provided", 404));
  }

  // Check if product request creator is the product request deleter- no need for toString() as Id getter returns a string
  if (deletedProductRequest.productRequestCreator.id !== req.userData.userId) {
    return next(new ApiHttpError("You are not allowed to delete this product request", 401));
  }

  let deletedProductRequestInfo;
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    deletedProductRequestInfo = await deletedProductRequest.deleteOne({ session: sess });
    deletedProductRequest.productRequestCreator.productRequests.pull(deletedProductRequest);
    await deletedProductRequest.productRequestCreator.save({ session: sess });
    await sess.commitTransaction();
  }catch (err) {
    console.log(err);
    return next(new ApiHttpError("Could not delete the product request, please try again", 500));
  }

  console.log("DELETE Request received for a product request");
  console.log(`Request received from  ${req.headers.host + req.url}`);
  return res.status(200).json({ message: "Product request deleted successfully" , deletedProductRequestInfo: deletedProductRequestInfo });
};


// EXPORTS
exports.deleteProductRequestById = deleteProductRequestById;
exports.createProductRequest = createProductRequest;
exports.getProductRequestsByUserId = getProductRequestsByUserId;
exports.getProductRequestById = getProductRequestById;
exports.updateProductRequestById = updateProductRequestById;
exports.getAllProductRequests = getAllProductRequests;
