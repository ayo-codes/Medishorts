const mongoose = require("mongoose");

const { Schema } = mongoose;

const productRequestSchema = new Schema({
  productName: { type: String, required: true },
  genericName: { type: String, required: true },
  packSize: { type: Number, required: false },
  gmsNo: { type: Number, required:  false },
  costPrice: { type: Number, required: true },
  quantity: { type: Number, required: true},
  vatRate: { type: Number, required: false },
  manufacturer: { type: String, required:false },
  legalCategory: { type: String, required: false },
  barcode: { type: Number, required: false },
  ipuCode: { type: Number, required: false },
  expiryDate: { type: Date, required: true },
  shortProduct: { type: Boolean, required: false },
  productRequestCreator: { type: mongoose.Types.ObjectId, required: true , ref: "User" },
});

module.exports = mongoose.model("ProductRequest", productRequestSchema);
