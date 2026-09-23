const express = require("express");

const {
  getProfile,
  updateProfile,
  updateEmail,
  changePassword,
} = require("../controller/user.controller");

const {
  protect,
} = require("../middleware/auth.middleware");

const router = express.Router();

// Get profile
router.get(
  "/profile",
  protect,
  getProfile
);

// Update name
router.put(
  "/profile",
  protect,
  updateProfile
);

// Update email
router.put(
  "/profile/email",
  protect,
  updateEmail
);

// Change password
router.put(
  "/profile/password",
  protect,
  changePassword
);

module.exports = router;