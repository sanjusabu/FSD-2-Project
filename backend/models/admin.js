const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
});

module.exports = mongoose.model("Admin", userSchema);
