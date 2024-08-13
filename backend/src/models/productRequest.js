const mongoose = require("mongoose");

const { Schema } = mongoose;

const productRequestSchema = new Schema({
  productName: { type: String, required: true },
  genericName: { type: String, required: true },
  packSize: { type: Number, required: true },
  gmsNo: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  vatRate: { type: Number, required: true },
  manufacturer: { type: String, required: true },
  legalCategory: { type: String, required: true },
  barcode: { type: Number, required: true },
  ipuCode: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, required: true , ref: "User" },
});

module.exports = mongoose.model("ProductRequest", productRequestSchema);
