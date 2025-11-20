const express = require("express");
const validateContact = require("../middlewares/user/contact.validate");
const {
  createContact,
  getAllContact,
  getContactInfo,
} = require("../controllers/contact.controller");
const { checkAuthorization, checkAuthentication } = require("../middlewares/user/check.auth");
const router = express.Router();

// create route
router.post("/", validateContact, createContact);
router.get("/", checkAuthentication, checkAuthorization, getAllContact);
router.get("/:id", checkAuthentication, checkAuthorization, getContactInfo);

module.exports = router;
