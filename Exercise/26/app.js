var createError = require("http-errors");
var express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const path = require("path");
const session = require("express-session");
const morgan = require("morgan");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// passport setup
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// facebook strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: "1272883231175348",
      clientSecret: "8fe75840b41b5fc3e4524c51996f1de6",
      callbackURL: "https://localhost:3000/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("dev"));

// routes
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

// home route
app.get("/", (req, res) => {
  res.send("Welcome to your app!");
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
