const User = require('../models/user-model');

const Alluser = async (req, res) => {
  try {
    // ✅ Fetch only required fields
    const users = await User.find({}, 'username phone_no referral_code');

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = Alluser;
