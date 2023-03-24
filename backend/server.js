// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const userRoutes = require("./routes/user");
const portRoutes = require("./routes/portfolio");
const transRoutes = require("./routes/transactions");
const uploadRoutes = require("./routes/upload");
const app = express();
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
}); //cors error

app.use("/users", userRoutes);
app.use("/port", portRoutes);
app.use("/trans", transRoutes);
app.use("/upload", uploadRoutes);
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const dbUrl =
  "mongodb+srv://SANJU:sanju_123456@cluster0.f8yjf.mongodb.net/FSD2Project?retryWrites=true&w=majority";

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5011);
  })
  .catch((err) => {
    console.log(err);
  });
