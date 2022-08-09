import dotenv from 'dotenv';
import passport from 'passport';
import Strategy from 'passport-google-oauth2';
const GoogleStrategy = Strategy.Strategy;
dotenv.config();

const passportConfig = () => {
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://localhost:4011/users/google_signin/google/callback',
      passReqToCallback: true
    },
    ((request, accessToken, refreshToken, profile, done) => {
      // console.log('Trying to access google blah blah', profile);
      try {
        const user = Userservice.findUser({ googleId: profile.id });
        if (user) {
          done(null, user);
        }

        const userData = {
          googleId: profile.id,
          firstName: profile.displayName,
          photo: profile.photos[0].value
        };

        const newUser = Userservice.createG(userData)
          .then((_user) => _user)
          .catch((error) => {
            throw new Error(error);
          });

        // (() => {})()

        done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    })
  ));

  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      cb(null, { id: user.id, username: user.username, name: user.name });
    });
  });

  passport.deserializeUser((user, cb) => {
    process.nextTick(() => cb(null, user));
  });

  return passport;
}

export default passportConfig;