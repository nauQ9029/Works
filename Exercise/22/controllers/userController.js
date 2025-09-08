const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
    console.error(err); // Log full error
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username only
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Store user ID in session
    req.session.userId = user._id;

    // Login success
    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearSession("username");
  res.json({ message: "Logout successful" });
};
