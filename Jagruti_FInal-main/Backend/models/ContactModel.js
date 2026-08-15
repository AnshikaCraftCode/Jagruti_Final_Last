const mongoose = require('mongoose');

const myContact = mongoose.Schema(
  {
    Name: String,
    Email: String,
    Phone: Number,
    Subject: String,
    Message: String,
    City: String,

    type: {
      type: String,
      default: "Contact",
    },
    status: {
   type: String,
   default: "New"
},
  },
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('contact', myContact);