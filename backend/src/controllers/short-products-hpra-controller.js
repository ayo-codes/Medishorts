const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");


const ApiHttpError = require("../models/api-http-error");
const ShortProductHpra = require("../models/shortProductsHpra");



// GET ALL HPRA SHORT PRODUCTS IN THE DATABASE - MONGO
const getAllshortProductsHpra = async (req, res, next) => {
  console.log("GET Request received for all short products from hpra");
  let shortProductsHpra;
  try {
    shortProductsHpra = await ShortProductHpra.find();
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Fetching product requests from Database failed ", 500));
  }

  if (!shortProductsHpra) {
    return next(new ApiHttpError("Could not find any products", 404));
  }

  console.log(`Request received from ${req.headers.host + req.url}`);
  return res.json({ shortProductsHpra: shortProductsHpra.map(shortProductHpra => shortProductHpra.toObject({ getters: true })) });
};

exports.getAllshortProductsHpra = getAllshortProductsHpra;

