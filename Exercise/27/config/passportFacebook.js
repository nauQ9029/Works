const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user");
require("dotenv").config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: "https://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
          user = new User({
            facebookId: profile.id,
            username:
              profile.displayName || profile.emails?.[0]?.value || "fb_user",
            password: "fb_" + profile.id,
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
