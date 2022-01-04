const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { postCart,
        updateCart,
        deleteItemFromCart,
        deleteCart,
        getCart
       } = require("../controllers/cart");

router.route("/").post(protect, postCart);

router.route("/:id").patch(protect, updateCart);

router.route("/:id").get(protect, getCart);

router.route("/:id").delete(protect, deleteCart);

router.route("/delete/:id").patch(protect, deleteItemFromCart);

module.exports = router;