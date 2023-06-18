import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import GoogleUser from "./models/GoogleUser.js";

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async (req,accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await GoogleUser.findOne({ googleId: profile.id });

        if (user) {
          // If the user exists, update any necessary information
          // For example, you might want to update the access token or refresh token
          user.accessToken = accessToken;
          if (refreshToken) {
            user.refreshToken = String(refreshToken);
          }
        } else {
          // If the user doesn't exist, create a new user
          user = new GoogleUser({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            accessToken: accessToken,
            refreshToken: refreshToken ? String(refreshToken) : null,
          });
        }

        // Save the user to the database
        await user.validate();
        const savedUser = await user.save();
        req.session = {
          regenerate: (callback) => callback(null),
          save: (callback) => callback(null),
        };

        req.login(savedUser, (err) => {
          if (err) {
            return done(err);
          }
          return done(null, savedUser);
        });
      }  catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


export default passport;
