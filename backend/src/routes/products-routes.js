const { Router } = require("express");

const { check } = require("express-validator");

const placesControllers = require("../controllers/products-controller");

const router = Router();

// GET ALL PRODUCTS
router.get("/", placesControllers.getAllProducts);

// GET ALL PRODUCT REQUESTS BY USER ID
router.get("/user/:userId", placesControllers.getProductRequestsByUserId);

// GET A PROUCT BY ID/BARCODE
router.get("/:productId", placesControllers.getProductById);

// CREATE A NEW PRODUCT REQUEST
router.post("/", [check("productName").notEmpty(), check("genericName").notEmpty(), check("packSize").notEmpty()], placesControllers.createProductRequest);

// UPDATE A PRODUCT REQUEST BY ID
router.patch("/:productRequestId", [check("productName").notEmpty(), check("genericName").notEmpty(), check("packSize").notEmpty()], placesControllers.updateProductRequestById);

// DELETE A PRODUCT REQUEST BY ID
router.delete("/:productRequestId", placesControllers.deleteProductRequestById);
module.exports = router;
