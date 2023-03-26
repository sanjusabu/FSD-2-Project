const HttpError = require("../models/http-error");
const UserModel = require("../models/UserModel");
const express = require("express");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const AdminModel = require("../models/admin");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res, next) => {
  // const errors = validationResult(req);
  console.log(req.body);
  const { name, email, password, mobile } = req.body;
  // console.log(req.body)
  let existingEmail;
  let existingMobile;
  try {
    existingEmail = await UserModel.findOne({ email: email });
    //   existingMobile = await UserModel.findOne({ mobilenumber:mobile});
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingEmail || existingMobile) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdUser = new UserModel({
    name: name,
    email: email,
    password: password,
    mobilenumber: mobile,
  });
  console.log(createdUser, "hjghjg");
  try {
    await createdUser.save();
    // console.log(newuser, "no new user error");
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body)
  // const errors = validationResult(req)

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Login failed, check your crednetials or signup.",
      500
    );
    return next(error);
  }
  // console.log(existingUser)
  if (!existingUser) {
    // console.log(password,existingUser.password)
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );

    return next(error);
  } else {
    const pass = await bcrypt.compare(password, existingUser.password);
    // console.log(pass)
    if (!pass) {
      const error = new HttpError(
        "Invalid credentials, could not log you in.",
        401
      );
      return next(error);
    }
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIn: "1d" }
    );
    // lo;
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  // console.log(existingUser.id + " " + "possible?");

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

const forgotPassword = async (req, res, next) => {
  const client = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "sanjusabu066@gmail.com",
      pass: "mbjbrcvjqvmtltap",
    },
  });
  const otp = Math.floor(1000 + Math.random() * 9000);

  // console.log(process.env.sendMail + "fkjgn");
  const info = await client.sendMail({
    from: "sanjusabu066@gmail.com",
    to: req.body.email,
    subject: "Password Change Code",
    text: `The code for your password change is: ${otp}`,
  });
  console.log(info);
  // console.log("Email Sent");
  res.json({ status: info, code: otp, email: req.body.email });
};
const adminlogin = async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await AdminModel.find({ email, password });
  if (!user) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );

    return next(error);
  }
  res.json(user);
};

const getusers = async (req, res, next) => {
  const user = await UserModel.find({});
  res.json(user);
};

const deleteusers = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  const us = await UserModel.find({ email });
  console.log(us);
  const delmod = await UserModel.deleteOne({
    email: email,
  });
  console.log(delmod);
  res.json(delmod);
};
const reset = async (req, res) => {
  // console.log(req.body);
  let { email, password } = req.body;

  existingEmail = await UserModel.findOne({ email });
  if (!existingEmail) {
    res.json({ message: "email doesnt exist" });
  } else {
    const SALT_WORK_FACTOR = 10;
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    password = await bcrypt.hash(password, salt);
    await UserModel.updateOne(
      { email },
      {
        $set: {
          password: password,
        },
      }
    );
    res.json({ message: "Password updated successfully" });
  }
};
const checkProfile = async (req, res) => {
  const { id } = req.body;
  const _id = ObjectId(id);
  let existingUser;

  existingUser = await UserModel.findOne({ _id });

  if (existingUser.photo != null) {
    res.json({ photo: existingUser.photo });
  } else {
    res.json({ message: "Add Profile Photo" });
  }
};

exports.signup = signup;
exports.login = login;
exports.forgotPassword = forgotPassword;
exports.adminlogin = adminlogin;
exports.getusers = getusers;
exports.deleteusers = deleteusers;
exports.reset = reset;
exports.checkProfile = checkProfile;
