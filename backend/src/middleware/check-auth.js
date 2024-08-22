/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const ApiHttpError = require("../models/api-http-error");

module.exports = (req, res, next) => {
  // prevent options request from being blocked
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];// split the token from the Bearer on the white space
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new ApiHttpError("Authentication failed", 401);
    return next(error);
  }
}