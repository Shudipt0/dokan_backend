const express = require("express");
const validateContact = require("../middlewares/user/contact.validate");
const {
  createContact,
  getAllContact,
} = require("../controllers/contact.controller");
const router = express.Router();

// create route
router.post("/", validateContact, createContact);
router.get("/", getAllContact);

module.exports = router;
