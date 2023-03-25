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
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
const csrfProtection = csrf({ cookie: true });
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method);
  next();
});

app.use(cors(({credentials: true, origin: process.env.CLIENT_URL})))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, csrf-token"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
}); //cors error

app.use(csrfProtection);

app.use(express.static("public"));
app.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ csrfToken: req.csrfToken() });
});
app.post("/", (req, res, next) => {
  res
    .status(200)
    .json({ csrfToken: req.csrfToken() });
});
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
