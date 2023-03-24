const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();
const multer = require("multer");
const UserModel = require("../models/UserModel");
// const usersController = require("../controllers/uploadController");
const { ObjectId } = require("mongodb");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "../frontend/images");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/add", upload.single("photo"), async (req, res) => {
  const { id, name } = req.body;
  const newid = ObjectId(id);
  //   let user = await UserModel.findOne({ _id: id });
  console.log(
    "-------------------------------------------------------------------------------"
  );
  console.log(req.body);
  await UserModel.updateOne(
    { _id: newid },
    {
      $set: {
        photo: name,
      },
    }
  );
  res.json({ name: name });
});
// console.log(upload.storage.getDestination);

module.exports = router;
