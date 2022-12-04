const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();

const portController = require("../controllers/portController");

router.post("/form", portController.form);
router.post("/getform", portController.getformdets);

module.exports = router;
