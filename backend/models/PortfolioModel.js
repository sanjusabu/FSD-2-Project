const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const portSchema = new Schema({
  portfolio: { type: String, required: true },
  platform: { type: String, required: true },
  type: { type: String, required: true },
  openingDate: { type: String, required: true },
  id: { type: String, required: true },
  images: { type: Array },
});

module.exports = mongoose.model("PortfolioModel", portSchema);
