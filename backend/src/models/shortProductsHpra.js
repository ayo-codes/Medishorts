const mongoose = require("mongoose");

const { Schema } = mongoose;

const shortProductsHpraSchema = new Schema({
  productName: { type: String, required: true },
  hpraCode: { type: String, required: false },
  manufacturer: { type: String, required: false },
  genericName: { type: String, required: false },
  therapeuticAlternative: { type: String, required: false },
  shortageReason: { type: String, required: false },
  shortageDate: { type: String, required: false },
  expectedReturnDate: { type: String, required: false },
  additionalInfo: { type: String, required: false },
  lastUpdateDate: { type: String, required: false },
});

module.exports = mongoose.model("ShortProductsHpra", shortProductsHpraSchema);