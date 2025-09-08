const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.findByUsername = async (username) => {
  return await User.findOne({ username: username });
};

exports.create = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashedPassword,
    });
    return await user.save();
  } catch (err) {
    throw err;
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
