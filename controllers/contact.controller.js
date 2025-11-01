const Contact = require("../models/contact.model");

async function createContact(req, res) {
  const contactInfo = req.body;
  try {
    await Contact.create(contactInfo);
    res.status(200).json({
      message: "Contact info created!",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getAllContact(req, res) {
  try {
    const contacts = await Contact.find({});
    res.status(200).json({
      status: "ok",
      contacts: contacts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = { createContact, getAllContact };
