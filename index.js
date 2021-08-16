// esversion: 6

const express = require("express");
const app = express();
const passport = require('passport')
LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const formidable = require('formidable');
const multer = require('multer');
const path = require('path')
const shortid = require('shortid')
const fit = require('./fit');
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

app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));

const Schema = mongoose.Schema;
const RideSchema = new Schema({
  data: String,
  date: Date,
  distance: Number,
  nPwr: Number,
  tss: Number
})

const UserSchema = new Schema({
  name: String,
  ftp: Number,
  username: String,
  password: String,
})

const Ride = mongoose.model("Ride", RideSchema);
const User = mongoose.model("User", UserSchema);

const mongoDB = "mongodb://localhost:27017";
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

function uploadDB(req, res, next) {
  const dbRide = new Ride({
    data: JSON.stringify(req.parsedFile.sessions[0]),
    date: req.parsedFile.sessions[0].timestamp,
    distance: req.parsedFile.sessions[0].total_distance,
    nPwr: fit.getNP(req.parsedFile),
  });
  dbRide.save(function(err) {
    if (err) console.log(err);
  });
  next();
}

app.get('/showRides/:dateOne.:dateTwo', async (req, res, next) => {
  var rideArr = [];
  let rides = await Ride.find({
    date: {
      $gt: req.params.dateOne,
      $lt: req.params.dateTwo
    }
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
    res.locals.rideArray = rideArr;
    res.send(res.locals.rideArray);
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

app.post('/file_upload', upload.any('file'), fit.parseFIT, uploadDB, function(req, res) {
  console.log('Ride saved to DB');
});

app.post('/register', function(req, res) {
  console.log(req.body);
  res.send("Data received")
});

app.post('/login', function(req, res) {
  console.log(req.body);
  res.send("Logged in")
});

app.delete('/file_delete/:id', function(req, res) {
  // Build delete route here
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
