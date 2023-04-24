const express = require("express");
const TransactionsModel = require("../models/TransactionsModel");
const HttpError = require("../models/http-error");
const REDIS_PORT = 6379;
const redis = require('redis');
const client = redis.createClient();
// client.on('error', err => console.log('Redis Client Error', err));
client.connect()

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
    // await client.del(`transLists?transid=${id}`)
    // const transLists = await client.get(`transLists?transid=${id}`);
    // console.log(transLists);
  } catch (err) {
    console.log(err);
    const error = new HttpError("Transactions saving failed", 500);
    return next(error);
  }
  res.json(transmodel);
};

const getTrans = async (req, res) => {
  const { id } = req.body;
  let result;
  // const transLists = await client.get(`transLists?transid=${id}`);
  // console.log(transLists.length,transLists);
  // console.log();

    try{
      result = await TransactionsModel.find({ id });
      // client.setEx(`transLists?transid=${id}`, 10000 ,JSON.stringify(result));
      // console.log(result);
    }
    catch (error) {
      res.status(500).json({ error: error.message });
      return next(error);
    }
  
  // console.log(transLists.length,transLists);
  res.json(result);
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

const deleteAll = async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const delmod = await TransactionsModel.deleteMany({id});

};

const csvdata = async (req, res, next) => {
  // console.log(req.body);
  const { data, portfolio, id } = req.body;
  // console.log(data);
  data.map(async (dat) => {

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
  // result = await TransactionsModel.find({ id });
  // client.setEx(`transLists?transid=${id}`, 10000 ,JSON.stringify(result));
};
exports.postdata = postdata;
exports.getTrans = getTrans;
exports.getnum = getnum;
exports.deleteTrans = deleteTrans;
exports.deleteAll = deleteAll;
exports.csvdata = csvdata;
