// esversion: 6

const express = require("express");
const app = express();

const passport = require('passport')
LocalStrategy = require('passport-local').Strategy;

const cors = require('cors');
app.use(cors());
var mongoose = require('mongoose');

var bodyParser = require('body-parser')
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var formidable = require('formidable');
const multer = require('multer');
var path = require('path')
var fs= require('fs')
var shortid = require('shortid')
const EasyFit = require('./node_modules/easy-fit/dist/easy-fit.js').default;
let activity;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './temp');
  },
  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(null, file.fieldname + path.parse(file.originalname).ext);

    console.log("File uploaded successfully")
  }
});

var upload = multer({storage:storage});
var Schema = mongoose.Schema;
var RideSchema = new Schema({
  data: String,
  date: Date,
  distance: Number,
  nPwr: Number,
  tss: Number
})

var UserSchema = new Schema({
  name: String,
  ftp: Number,
  username: String,
  password: String,
})

var Ride = mongoose.model("Ride", RideSchema);
var User = mongoose.model("User", UserSchema);

var mongoDB = "mongodb://localhost:27017";
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

function uploadDB(req, res, next){

  const dbRide = new Ride({
  data: JSON.stringify(req.parsedFile.sessions[0]),
  date: req.parsedFile.sessions[0].timestamp,
  distance: req.parsedFile.sessions[0].total_distance,
  nPwr: getNP(req.parsedFile),
  // tss: getTSS(req.parsedFile)

  });

dbRide.save(function(err){
  if (err) console.log(err);
});
next();
}

function parseFIT (req, res, next) {
   fs.readFile("temp/file.fit", function(err, content) {
    // Create a EasyFit instance (options argument is optional)
    var easyFit = new EasyFit({
      force: true,
      speedUnit: 'km/h',
      lengthUnit: 'km',
      temperatureUnit: 'kelvin',
      elapsedRecordField: true,
      mode: 'cascade',
    });

    // Parse your file
   easyFit.parse(content, function(error, data) {
      // Handle result of parse method
      if (error) {
        console.log(error);
      } else {
        req.parsedFile = data.activity;
        }
    });
    next();
  });

}

function getNP(activity){
  remove_stops(activity);
  var np = rideNormalisedPower(activity);
  return np;
}

function remove_stops(activity) {
  activity.sessions[0].laps.forEach((lap) => {
    for (i = 0; i < lap.records.length; i++) {
      if (lap.records[i].speed < 1) {
        lap.records.splice(i, 1);
      }
    }
  });
  activity.sessions[0].normalized_power = 999
}

function de_Lap_power(activity) {
  // console.log(activity);
  var block_power = [];
  // console.log(activity.sessions.laps[i].records)
  console.log(activity.sessions[0]);
  for (i in activity.sessions[0].laps) {
    for (j in activity.sessions[0].laps[i].records) {
      block_power.push(activity.sessions[0].laps[i].records[j].power);
    }
  }
  // console.log(block_power);
  for (x in block_power) {
    if (block_power[x] > 2000) {
      block_power[x] = 0;
    }
  }
  return block_power;
}

function rideNormalisedPower(activity) {
  var power_array = de_Lap_power(activity);
  var total_rolling_power = 0;
  var rolling_average = 0;
  var rolling_average_array = [];
  var rolling_average_powered_array = [];
  var total_rolling_average_powered = 0;
  var avg_powered_values = 0;
  var normalized_power;
  var j = 0;
  var i;

  // console.log(power_array)
  for (i = 0; i < power_array.length; i++) {
    if (i >= 29) {
      // console.log(i);
      for (j = i; j >= i - 29; j--) {
        total_rolling_power += power_array[j];
      }
      rolling_average = total_rolling_power / 30;
      //
      // if(i=28){
      //   console.log(rolling_average);
      // }
      rolling_average_array.push(rolling_average);
      total_rolling_power = 0;
    }
  }
  for (x in rolling_average_array) {
    rolling_average_powered_array.push(Math.pow(rolling_average_array[x], 4));
  }
  for (z in rolling_average_powered_array) {
    if (isNaN(rolling_average_powered_array[z]) === false) {
      total_rolling_average_powered += rolling_average_powered_array[z];
    }
  }
  console.log("Total of rolling averages raised ^4:" + total_rolling_average_powered);
  avg_powered_values = total_rolling_average_powered / rolling_average_powered_array.length;
  console.log("Average of values raised to ^4:" + avg_powered_values);
  normalized_power = Math.pow(avg_powered_values, 0.25);
  console.log("Normalized Power:" + normalized_power);
  activity.sessions[0].normalized_power = normalized_power;
  return normalized_power;
}

async function getTSS(activity){
  // let ftp = await User.find(find active user)
}





const port = 3000

app.get('/showRides/:dateOne.:dateTwo',  async (req, res, next) => {
  console.log(req.params.dateOne +' : ' +req.params.dateTwo)
  var rideArr = [];
  let rides = await Ride.find({date:{$gt: req.params.dateOne, $lt:  req.params.dateTwo}}, function (err, docs) {
    if(err){console.log(err)}
    for (var i =0; i<docs.length;i++){
     var rideObj = new Object();
     rideObj.date = docs[i].date;
     rideObj.distance = docs[i].distance;
     rideObj.np = docs[i].nPwr;
     rideObj.id = docs[i]._id
     rideArr.push(rideObj);
   }
   console.log(rideArr);
   res.locals.rideArray = rideArr;
   res.send(res.locals.rideArray);
   // console.log(res)
});

});

app.get('/showRide/:id', async function(req, res){
  let rides = await Ride.find({_id:req.params.id}, function (err, docs) {
    console.log(req.params.id)
    if(err){console.log(err)}

     var rideObj = new Object();
     rideObj.date = docs[0].date;
     rideObj.distance = docs[0].distance;
     rideObj.np = docs[0].nPwr;
     rideObj.id = docs[0]._id

     console.log(rideObj);
     res.locals.rideObj = rideObj;
   // console.log(res)
});

res.send(res.locals.rideObj);
});
 // app.post('/file_upload', fit_upload.uploadFile, fit_upload.afterUpload, function (req, res, next){
app.post('/file_upload', upload.any('file'), parseFIT, uploadDB, function (req, res){
    // Need to make the parse and database logging promise based then build into async middleware functions
    res.send('Ride saved to DB');
    // res.redirect('/showRides');
    // uploadDB(activity);

  });

app.post('/register', function(req,res){
  console.log(req.body);
  res.send("Data received")
});

app.post('/login', function(req,res){
  console.log(req.body);
  res.send("Logged in")
});

app.delete('/file_delete/:id', function(req, res){
    // Build delete route here
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
