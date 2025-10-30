const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { username, phone_no, email, password, referral_code } = req.body;

    if (!username || !phone_no || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingEmail = await User.findOne({ email });
    const existingPhone = await User.findOne({ phone_no });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "User already exists with this Phone Number." });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = new User({
      username,
      phone_no,
      email,
      password: hashedPassword,
      referral_code: referral_code?.trim() || null, // optional cleanup
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phone_no: newUser.phone_no,
        referral_code: newUser.referral_code || null,
      },
    });
  } catch (error) {
    console.error("❌ Register Error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

module.exports = registerUser;
