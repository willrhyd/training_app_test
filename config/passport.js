const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.User;
const validPassword = require('../lib/passwordUtils').validPassword

const verifyCallback = async function(username, password, cb) {

  try{
    let user = await User.findOne({ username: username })

    if (!user) { return cb(null, false) }
      const isValid = validPassword(password, user.hash, user.salt);

    if (isValid) {
      return cb(null, user);
    } else {
      return cb(null, false);
    }
  } catch(err) {
                // This is an application error, so we need to populate the callback `err` field with it
                cb(err);
            });
}
const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});
