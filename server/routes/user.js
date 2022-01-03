const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { searchUsers, getUser, updateUser, getStat } = require("../controllers/user");

router.route("/").get(protect, searchUsers);

router.route("/users/:username").get(getUser);

router.route("/users/:id").patch(updateUser);

router.route("/stat").get(protect, isAdmin, getStat);

module.exports = router;
