const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.User;

const verifyCallback = (username, password, done) => {
  User.findOne({username: username})
    .then((user) => {
      if(!user){return done(null, false)}
      if(err){return done(err)}
      const isValid = validPassword(password, user.hash, user.salt);

      if(isValid){
        return done(null,user);
      } else {
        return done(null, false);
      }
    })
  .catch((err) =>{done(err)});
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const user = new User({

})
