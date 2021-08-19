// esversion: 6

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const connection = require('./config/database')
const passport = require('passport')
const password = require('./lib/passwordUtils');
require('./config/passport')
const session = require('express-session');
const crypto = require('crypto');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const formidable = require('formidable');
const multer = require('multer');
const path = require('path')
const shortid = require('shortid')
const fit = require('./fit');
require('dotenv').config();
const port = 3000
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './temp');
  },
  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(null, file.fieldname + path.parse(file.originalname).ext);

    console.log("File uploaded successfully")
  }
});
const upload = multer({
  storage: storage
});

app.use(cookieParser())
app.use(cors({
  origin: [
              'http://localhost:8080',
              'https://localhost:8080'
            ],
            credentials: true,
            exposedHeaders: ['set-cookie']

}));

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ // to support URL-encoded bodies
  extended: true
}));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/trainingApp",
    collectionName: 'sessions' // See below for details
  }),
  cookie: {
    maxAge: 600000,
    httpOnly: false
  },
  unset: 'destroy'
}));
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  console.log(`Is logged in: ${req.isAuthenticated()}`);
  if (req.isAuthenticated()) { return next(); }
  res.status(401).json({msg:"Not logged in"})
}

//Connect to database and set the Ride model from databse.js
connection.connect;
const Ride = connection.Ride;
const User = connection.User;



function uploadDB(req, res, next) {
  const dbRide = new Ride({
    data: JSON.stringify(req.parsedFile.sessions[0]),
    date: req.parsedFile.sessions[0].timestamp,
    distance: req.parsedFile.sessions[0].total_distance,
    nPwr: fit.getNP(req.parsedFile),
    user: req.user.username
  });
  dbRide.save(function(err) {
    if (err) console.log(err);
  });
  next();
}
//
// app.get('/', (req,res) => {
//   res.send("<h1>Hello World of Sessions</h1>")
// });

app.get('/showRides/:dateOne.:dateTwo', ensureAuthenticated, async (req, res, next) => {
  console.log(req.session);
  console.log(req.user.username);
  var rideArr = [];
  let rides = await Ride.find({
    date: {
      $gt: req.params.dateOne,
      $lt: req.params.dateTwo
    }, user: req.user.username
  }, function(err, docs) {
    if (err) {
      console.log(err)
    }
    for (var i = 0; i < docs.length; i++) {
      var rideObj = new Object();
      rideObj.date = docs[i].date;
      rideObj.distance = docs[i].distance;
      rideObj.np = docs[i].nPwr;
      rideObj.id = docs[i]._id
      rideArr.push(rideObj);
    }
    console.log(rideArr);
    res.locals.rideArray = rideArr;
    res.send(rideArr);

  });
});

app.get('/showRide/:id', async function(req, res) {
  let rides = await Ride.find({
    _id: req.params.id
  }, function(err, docs) {
    console.log(req.params.id)
    if (err) {
      console.log(err)
    }
    var rideObj = new Object();
    rideObj.date = docs[0].date;
    rideObj.distance = docs[0].distance;
    rideObj.np = docs[0].nPwr;
    rideObj.id = docs[0]._id
    res.locals.rideObj = rideObj;
  });
  res.send(res.locals.rideObj);
});

app.post('/file_upload', ensureAuthenticated, upload.any('file'), fit.parseFIT, uploadDB, function(req, res) {
  console.log('Ride saved to DB');
});

app.post('/register', function(req, res) {
  console.log(req.body.username)
  // This could do with going into middleware
  if (req.body.password!==req.body.passwordConfirm) {
    return res.status(500).json({msg:"Passwords do not match"})
  }
  const hashSalt = password.genPassword(req.body.password);
  const regUser = new User({
    name: `${req.body.firstName} ${req.body.lastName}`,
    ftp:'',
    username: req.body.username,
    hash: hashSalt.hash,
    salt: hashSalt.salt,
  });
  regUser.save()
    .then((user) =>{
      console.log(user);
  })
  .catch((err)=>{
    console.log(err)
  });
  res.status(200).json({msg:"Sign up successful"});

});

app.post('/login', passport.authenticate('local'), function(req, res) {

  res.status(200).json({msg:"Signed in successfully"});

});

app.delete('/file_delete/:id', function(req, res) {
  // Build delete route here
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
