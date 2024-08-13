const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");

const User = require("../models/user");
const ApiHttpError = require("../models/api-http-error");


const DUMMY_USERS = require("../dummy_data/usersList/usersList.json");



const getAllUsers = (req, res, next) => {
  res.json({users: DUMMY_USERS});
};

// SIGNUP A USER - MONGO
const signup = async (req, res, next) => { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new ApiHttpError("Invalid inputs passed, please check your input", 422));
  }

  const {  
    productRequests,  
    pharmacyPSIRegistrationNo,
    pharmacyAddress,
    pharmacyFaxNumber,
    pharmacyName,
    pharmacyOwner,
    pharmacyPhoneNumber,
    superintendentPharmacist,
    supervisingPharmacist,
    vatNumber,
    email,
    password } = req.body;

  // const hasUser = DUMMY_USERS.find(u => u.email === email);
  // if (hasUser) {
  //   return next(new ApiHttpError("User exists already, please login instead", 422));
  // }

  let existingUser;
  try{
    existingUser = await User.findOne({email: email});
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Signing up failed, please try again", 500));
  }

  if (existingUser) {
    return next(new ApiHttpError("User exists already, please login instead", 422));
  }

  const newUser = new User({
    email,
    password,
    pharmacyPSIRegistrationNo,
    pharmacyAddress,
    pharmacyFaxNumber,
    pharmacyName,
    pharmacyOwner,
    pharmacyPhoneNumber,
    superintendentPharmacist,
    supervisingPharmacist,
    vatNumber,
    productRequests
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Could not create a new account, please try again", 500));
  }
 return res.status(201).json({user: newUser.toObject({getters: true})});
};


// LOGIN A USER
const login = (req, res, next) => {
  const {email, password} = req.body;
  const foundUser = DUMMY_USERS.find(u => u.email === email);
  if (!foundUser || foundUser.password !== password) {
    return next(new ApiHttpError("Could not find user, credentials seem to be incorrect", 401));
  }
  return res.json({message: "Logged in!"});
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;