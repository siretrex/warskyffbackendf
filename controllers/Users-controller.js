const User = require("../models/user-model");

// ✅ Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id username email phone_no referral_code");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 🗑️ Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = { getAllUsers, deleteUser };
