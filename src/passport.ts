import Google from 'passport-google-oauth20';

import passport from 'passport';

const GOOGLE_CLIENT_ID =
  '743241636245-4qc3mhed9psjdu21tn3d7mgqme6ikr82.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

const GoogleStrategy = Google.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: (arg0: null, arg1: any) => void
    ) {
      console.log(profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

export default passport;
