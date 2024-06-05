const express =require("express");
const { getAllProducts,createProduct, updateProduct, deleteProducts, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");


const router =express.Router();
router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuthenticatedUser,authorizedRoles("admin"),createProduct);
router.route("/products/:id")
.put(isAuthenticatedUser,updateProduct)
.delete(isAuthenticatedUser,deleteProducts)
.get(getProductDetails);
module.exports =router;