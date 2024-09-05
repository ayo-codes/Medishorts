const mongoose = require("mongoose");

const { Schema } = mongoose;

const shortProductsHpraSchema = new Schema({
  productName: { type: String, required: true },
  hpraCode: { type: String, required: true },
  manufacturer: { type: String, required: true },
  genericName: { type: String, required: true },
  therapeuticAlternative: { type: String, required: true },
  shortageReason: { type: String, required: true },
  shortageDate: { type: String, required: true },
  expectedReturnDate: { type: String, required: true },
  additionalInfo: { type: String, required: false },
  lastUpdateDate: { type: String, required: true },
});

module.exports = mongoose.model("ShortProductsHpra", shortProductsHpraSchema);