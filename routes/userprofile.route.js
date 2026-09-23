const express = require("express");

const router = express.Router();

const {
  getProfile,
  updateEmail,
  changePassword
} = require("../controller/userprofile.controller");

const{ protect }= require("../middleware/auth.middleware");


// Get profile
router.get("/profile", protect, getProfile);


// Update email
router.put("/profile/email", protect, updateEmail);


// Change password
router.put("/profile/password", protect, changePassword);


module.exports = router;