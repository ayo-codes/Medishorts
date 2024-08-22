const { Router } = require("express");

const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");

const productRequestsControllers = require("../controllers/product-requests-controller");


const router = Router();

// GET ALL PRODUCT REQUESTS
router.get("/", productRequestsControllers.getAllProductRequests);

// GET A PRODUCT REQUEST BY ID
router.get("/:productRequestId", productRequestsControllers.getProductRequestById);

// ROUTE PROTECTION MIDDLEWARE
router.use(checkAuth);


// CREATE A NEW PRODUCT REQUEST
// router.post("/", [check("productName").notEmpty(), check("genericName").notEmpty(), check("packSize").notEmpty()], productRequestsControllers.createProductRequest);
router.post("/", [check("productName").notEmpty(), check("genericName").notEmpty()], productRequestsControllers.createProductRequest);

// GET ALL PRODUCT REQUESTS BY USER ID
router.get("/user/:userId", productRequestsControllers.getProductRequestsByUserId);


// UPDATE A PRODUCT REQUEST BY ID
router.patch("/:productRequestId", [check("productName").notEmpty(), check("genericName").notEmpty(),], productRequestsControllers.updateProductRequestById);

// DELETE A PRODUCT REQUEST BY ID
router.delete("/:productRequestId", productRequestsControllers.deleteProductRequestById);

// Export Module
module.exports = router;