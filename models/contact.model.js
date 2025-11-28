const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
  }
});

const Contact = mongoose.model("Contact",contactSchema);

module.exports = Contact;
