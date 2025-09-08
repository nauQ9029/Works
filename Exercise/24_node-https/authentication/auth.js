var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((User, done) => {
  done(null, User.id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);  // attempt to find the user by ID
    done(null, user); // successfully found user, pass user to done
  } catch (err) {
    done(err, false); // if an error occurs, pass the error to done
  }
});
