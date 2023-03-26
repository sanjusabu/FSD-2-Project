const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();

const usersController = require("../controllers/usersController");
const checkAuth = require("../middleware/check-auth");

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/resetPassword", usersController.reset);
router.post("/forgot", usersController.forgotPassword);
router.post("/adminlogin", usersController.adminlogin);
router.post("/getusers", usersController.getusers);
router.post("/deleteusers", usersController.deleteusers);
// router.use(checkAuth);
router.post("/check", usersController.checkProfile);
module.exports = router;
