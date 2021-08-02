

const EasyFit = require('./node_modules/easy-fit/dist/easy-fit.js').default;
let activity;

const fs = require('fs');

// Exported functions
const parse = async function() {

  console.log("Trying to parse")
  await read();

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


exports.parse = parse;
exports.getNP = getNP;

// Module functions
const read = fs.readFile("temp/file.fit", function(err, content) {
  var ride;
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
      ride = data.activity;
    }

  });

  console.log("Result of Ride: " + ride);
});


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
