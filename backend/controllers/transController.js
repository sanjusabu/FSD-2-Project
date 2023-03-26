const express = require("express");
const TransactionsModel = require("../models/TransactionsModel");
const HttpError = require("../models/http-error");

const postdata = async (req, res) => {
  console.log(req.body);
  const { portfolio, ticker, date, quantity, price, action, total, id } =
    req.body;

  const transmodel = await TransactionsModel({
    portfolio,
    ticker,
    date,
    quantity,
    price,
    action,
    total,
    id,
  });
  try {
    await transmodel.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Transactions saving failed", 500);
    return next(error);
  }
  res.json(transmodel);
};

const getTrans = async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const transac = await TransactionsModel.find({ id });
  console.log(transac);
  res.json(transac);
};
const getnum = async (req, res) => {
  const { id } = req.body;

  // console.log(req.body);
  const nums = await TransactionsModel.find({ id: id });
  // console.log(nums.length);
  res.json({ len: nums.length, names: nums });
};
const deleteTrans = async (req, res) => {
  // console.log(req.body);
  const { id, deleteticker } = req.body;
  const delmod = await TransactionsModel.deleteMany({
    id,
    ticker: deleteticker,
  });
  res.json(delmod);
};

const csvdata = (req, res, next) => {
  // console.log(req.body);
  const { data, portfolio, id } = req.body;
  // console.log(data);
  data.map(async (dat) => {
    console.log(
      dat.Ticker,
      dat.date,
      dat.Action,
      dat.Quantity,
      dat.Price,
      dat.Total
    );
    let transmodel = await TransactionsModel({
      portfolio: portfolio,
      ticker: dat.Ticker,
      date: dat.date,
      quantity: dat.Quantity,
      price: dat.Price,
      action: dat.Action,
      total: dat.Total,
      id,
    });
    await transmodel.save();
  });
};
exports.postdata = postdata;
exports.getTrans = getTrans;
exports.getnum = getnum;
exports.deleteTrans = deleteTrans;
exports.csvdata = csvdata;
