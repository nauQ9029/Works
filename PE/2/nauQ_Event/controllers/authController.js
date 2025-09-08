const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.loginPage = (req, res) => {
  res.render("login", { error: null });
};

exports.login = async (req, res) => {
  try {
    // validation for req.body
    if (!req.body) {
      console.log(" >>> [DEBUG] req.body is undefined");
      return res.render("login", { error: "Invalid request format" });
    }

    const { username, password } = req.body;
    console.log(" >>> [DEBUG] Login attempt:", { username, password });

    // Validate required fields
    if (!username || !password) {
      console.log(" >>> [DEBUG] Missing username or password");
      return res.render("login", { error: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    console.log("User from DB:", user);

    if (!user) {
      console.log(" >>> [DEBUG] User not found");
      return res.render("login", { error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log(" >>> [DEBUG] Password match:", match);

    if (!match) {
      console.log(" >>> [DEBUG] Password mismatch");
      return res.render("login", { error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET || "7294923945",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });
    console.log(" >>> [DEBUG] Token issued for:", user.username);

    if (user.role === "admin") return res.redirect("/registrations");
    res.redirect("/events");
  } catch (error) {
    console.error(" >>> [ERROR] Login error:", error);
    res.render("login", { error: "An error occurred during login" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
