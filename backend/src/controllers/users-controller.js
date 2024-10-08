const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


const User = require("../models/user");
const ApiHttpError = require("../models/api-http-error");


const DUMMY_USERS = require("../dummy_data/usersList/usersList.json");


// GET ALL USERS
const getAllUsers = async (req, res, next) => {

  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Fetching users from Database failed ", 500));
  } 
  if (!users || users.length === 0) {
    return next(new ApiHttpError("Could not find any users", 404));
  }
  return res.json({users: users.map(user => user.toObject({getters: true}))});
};

// SIGNUP A USER - MONGO
const signup = async (req, res, next) => { 
  console.log("CREATE Request received for a new user");
  console.log(`Request received at  ${req.headers.host + req.url}`);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new ApiHttpError("Invalid inputs passed, please check your input", 422));
  }

  const {    
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

  // Check for existing user
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

  // Hash the password
  let hashedPassword;
  try{
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (err) {
    const error = new ApiHttpError("Could not create a new account, please try again", 500);
    return next(error);
  }
 

  const newUser = new User({
    email,
    password : hashedPassword,
    pharmacyPSIRegistrationNo,
    pharmacyAddress,
    pharmacyFaxNumber,
    pharmacyName,
    pharmacyOwner,
    pharmacyPhoneNumber,
    superintendentPharmacist,
    supervisingPharmacist,
    vatNumber,
    productRequests : []
  });

  try {
    await newUser.save();
    console.log(newUser.id);
   
    console.log(newUser);
    console.log(process.env.JWT_KEY);
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Could not create a new account, please try again", 500));
  }

  let token;
  try {
    token = jwt.sign(
      {userId: newUser.id, email: newUser.email},process.env.JWT_SECRET, {expiresIn: "2h"})
  } catch (err) {
    const error = new ApiHttpError("Signing up failed at token phase, please try again", 500);
    return next(error);
  }

 return res.status(201).json({user: newUser.toObject({getters: true}), token: token});
};


// LOGIN A USER
const login = async (req, res, next) => {
  console.log("POST Request received for an exisiting user");
  console.log(`Request received at  ${req.headers.host + req.url}`);

  const {email, password} = req.body;

  let existingUser;
  try{
    existingUser = await User.findOne({email: email});
  } catch (err) {
    console.log(err);
    return next(new ApiHttpError("Logging in failed, please try again", 500));
  }


  if (!existingUser ) {
    return next(new ApiHttpError("Could not find user, credentials seem to be incorrect", 403));
  }

  let isValidPassword = false;
 try {
   isValidPassword = await bcrypt.compare(password, existingUser.password);
 } catch (error) {
    const err = new ApiHttpError("Could not log you in, please check your credentials and try again", 500);
    return next(err);
 }

  if (!isValidPassword) {
    return next(new ApiHttpError("Invalid credentials, could not log you in", 403));
  }

  let token;
  try {
    token = jwt.sign(
      {userId: existingUser.id, email: existingUser.email},process.env.JWT_SECRET, {expiresIn: "2h"})
  } catch (err) {
    const error = new ApiHttpError("Login failed, please try again", 500);
    return next(error);
  }

  return res.json({message: "Logged in!", user: existingUser.toObject({getters: true}), token: token});
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;