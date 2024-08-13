const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const productRequest = require("./productRequest");

const {Schema} = mongoose;


const userSchema = new Schema({
  pharmacyPSIRegistrationNo: { type: Number, required: true },
  pharmacyAddress: { type: String, required: true },
  pharmacyFaxNumber: { type: String, required: true },
  pharmacyName: { type: String, required: true },
  pharmacyOwner: { type: String, required: true },
  pharmacyPhoneNumber: { type: String, required: true },
  superintendentPharmacist: { type: String, required: true },
  supervisingPharmacist: { type: String, required: true },
  vatNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  productRequests: [{ type: mongoose.Types.ObjectId, required: true, ref: "ProductRequest" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);