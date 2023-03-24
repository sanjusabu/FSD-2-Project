const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator');
// const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const TransSchema = new Schema({
  portfolio: { type: String, required: true },
  ticker: { type: String, required: true },
  date: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  action: { type: String, required: true },
  total: { type: Number, required: true },
  id: { type: String, required: true },
});

module.exports = mongoose.model("TransactionsModel", TransSchema);
