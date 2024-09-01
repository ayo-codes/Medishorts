const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const ApiHttpError = require("../models/api-http-error");

const ShortProductsHpra = require("../models/shortProductsHpra");