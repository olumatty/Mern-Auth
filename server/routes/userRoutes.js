const express = require("express");
const userAuth = require("../middleware/userAuth.js");
const getUserData = require("../controller/userContoller.js");

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);

module.exports = userRouter;