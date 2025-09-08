const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.loginPage = (req, res) => {
  res.render("login", { error: null });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(" >>> [DEBUG] Login attempt:", { username, password });

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
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
