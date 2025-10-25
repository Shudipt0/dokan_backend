const express = require("express");
const { createUser, loginUser, userProfile, getAllUsers } = require("../controllers/user.controller");
const { checkAuthentication, checkAuthorization } = require("../middlewares/user/check.auth");

const router = express.Router();

// register route
router.post("/register", createUser);

// login route
router.post("/login", loginUser);

// all users route
router.get("/", checkAuthentication, checkAuthorization, getAllUsers);

// profile route
router.get("/profile/:id", checkAuthentication,  userProfile);

module.exports = router;
