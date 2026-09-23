const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

// Get logged-in user's profile
const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      user
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get profile"
    });
  }
};


// Update email
const updateEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const existingUser = await UserModel.findOne({
      email,
      _id: { $ne: req.user.userId }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const user = await UserModel.findByIdAndUpdate(
      req.user.userId,
      { email },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Email updated successfully",
      user
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update email"
    });
  }
};


// Change password
const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters"
      });
    }

    const user = await UserModel.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check current password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Current password is incorrect"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to change password"
    });
  }
};


module.exports = {
  getProfile,
  updateEmail,
  changePassword
};