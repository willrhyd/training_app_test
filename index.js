// esversion: 6

const express = require("express");
const cors = require('cors');
var mongoose = require('mongoose');
// var parseFIT = require('./parseFIT')
var mongoose = require('mongoose');
var formidable = require('formidable');
const multer = require('multer');
var path = require('path')
var fs= require('fs')
var shortid = require('shortid')
const EasyFit = require('./node_modules/easy-fit/dist/easy-fit.js').default;
let activity;



var mongoDB = "mongodb://localhost:27017/training_app";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var RideStringSchema = new Schema({
  data: String,
  date: Date,
  distance: Number,
  nPwr: Number,
  tss: Number
})

var Ride = mongoose.model("Ride", RideStringSchema);

function uploadDB(ride,res){
  console.log(ride)
  const dbRide = new Ride({
  data: JSON.stringify(ride.sessions[0]),
  date: ride.sessions[0].timestamp,
  distance: ride.sessions[0].total_distance,
  nPwr: getNP(ride),
  tss: 100
});
dbRide.save(function(err){
  if (err) console.log(err);
  res.send("Ride uploaded")
});
}

function parseFIT (res) {
  fs.readFile("temp/file.fit", function(err, content) {
    // fs.readFile("temp\ride_file-1624827283371.fit", function(err, content) {
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
        // console.log(data.activity);
        var ride = data.activity;
        // console.log(activity)
        // console.log(data.activity);
        uploadDB(data.activity, res);
      }

    });


  });
}


function getNP(activity){
  // console.log(activity.sessions[0].laps[2].records.length);
  // console.log(activity.sessions);
  remove_stops(activity);

  // console.log(activity.sessions[0].laps[2].records.length);
  var np = rideNormalisedPower(activity);
  // console.log(activity)
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
  console.log(activity.sessions[0])
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

const app = express();
app.use(cors());

const port = 3000

app.get('/', (req, res) => {
  // parseFit(res);
  res.sendFile(path.join(__dirname, './public', 'index.html'));

});

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
     rideArr.push(rideObj);
   }
   console.log(rideArr);
   res.locals.rideArray = rideArr;
   res.send(res.locals.rideArray);
   // console.log(res)
});

});

 // app.post('/file_upload', fit_upload.uploadFile, fit_upload.afterUpload, function (req, res, next){
  app.post('/file_upload', upload.any('file'), function (req, res){
    // Need to make the parse and database logging promise based then build into async middleware functions
    parseFIT(res);
    // res.redirect('/showRides');
    // uploadDB(activity);

  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
