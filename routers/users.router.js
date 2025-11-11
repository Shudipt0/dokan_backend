const express = require("express");
const { createUser, loginUser, userProfile, getAllUsers, updateUser } = require("../controllers/user.controller");
const { checkAuthentication, checkAuthorization } = require("../middlewares/user/check.auth");
const validateUser = require("../middlewares/user/user.validate");

const router = express.Router();

// register route
router.post("/register", validateUser, createUser);

// login route
router.post("/login", loginUser);

// all users route
router.get("/", checkAuthentication, checkAuthorization, getAllUsers);

// profile route
router.get("/profile/:id", checkAuthentication,  userProfile);

// update user
router.put("/:id", checkAuthentication, checkAuthorization, updateUser);



module.exports = router;
