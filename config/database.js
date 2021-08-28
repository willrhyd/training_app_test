const mongoose = require('mongoose');

require('dotenv').config();

const conn = process.env.DB_STRING;

const connect = mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new Schema({
  name: String,
  ftp: {type:Number, default:300},
  username: String,
  hash: String,
  salt: String,
})

const RideSchema = new Schema({
  data: String,
  date: Date,
  distance: Number,
  nPwr: Number,
  tss: Number,
  user: String,
})

const Ride = mongoose.model("Ride", RideSchema);
const User = mongoose.model("User", UserSchema);


// Expose the connection
exports.connect = connect;
exports.Ride = Ride;
exports.User = User;
