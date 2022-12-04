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

exports.postdata = postdata;
