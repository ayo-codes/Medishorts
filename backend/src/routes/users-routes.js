const express = require("express");
const { check } = require("express-validator");

const router = express.Router(); 
const usersControllers = require("../controllers/users-controller");


// GET ALL 
router.get("/" , usersControllers.getAllUsers);

// CREATE A NEW USER
router.post("/signup",[check("pharmacyName").notEmpty() , check("email").normalizeEmail().isEmail(), check("password").isLength({min: 6 })], usersControllers.signup);

// LOGIN USER
router.post("/login" , usersControllers.login);

module.exports = router;