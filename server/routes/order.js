const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { postOrder,
        updateOrder,
        deleteOrder,
        getOrder,
        getOrders,
        getIncome
       } = require("../controllers/order");

router.route("/").post(protect, postOrder);

router.route("/").get(protect, getOrders);

router.route("/:id").patch(protect, updateOrder);

router.route("/:id").get(protect, getOrder);

router.route("/:id").delete(protect, deleteOrder);

router.route("/income/").get(protect, isAdmin, getIncome);

module.exports = router;