import dotenv from 'dotenv';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';

dotenv.config();

const passportConfig = () => {
  const runStrategy = passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://localhost:4011/users/google/redirect'
      },
      () => {

      }
    )
  );
  return runStrategy;
};

export default passportConfig;
