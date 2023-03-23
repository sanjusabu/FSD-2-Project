const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();

const usersController = require("../controllers/usersController");

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/resetPassword", usersController.reset);
router.post("/forgot", usersController.forgotPassword);
router.post("/adminlogin", usersController.adminlogin);
router.post("/getusers", usersController.getusers);
router.post("/deleteusers", usersController.deleteusers);

module.exports = router;
