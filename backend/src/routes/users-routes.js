const express = require("express");

const router = express.Router(); 
const usersControllers = require("../controllers/users-controller");


// GET ALL 
router.get("/" , usersControllers.getAllUsers);

// CREATE A NEW USER
router.post("/signup" , usersControllers.signup);

// LOGIN USER
router.post("/login" , usersControllers.login);

module.exports = router;