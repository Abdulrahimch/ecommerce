const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { postProduct, updateProduct, deleteProduct, getProduct } = require("../controllers/product");

router.route("/").post(protect, isAdmin, postProduct);

router.route("/:id").patch(protect, isAdmin, updateProduct);

router.route("/:id").delete(protect, isAdmin, deleteProduct);

router.route("/:id").get(protect, getProduct);


module.exports = router;
