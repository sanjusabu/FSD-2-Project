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
  const transac = await TransactionsModel.find({ id: id });
  console.log(transac);
  res.json(transac);
};

exports.postdata = postdata;
exports.getTrans = getTrans;
