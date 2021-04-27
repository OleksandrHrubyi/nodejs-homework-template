const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  favorite: {
    type: String,
    default: false,
  },
});

contactsSchema.path("name").validate((value) => {
  const re = /[A-Z a-z]\w+/;
  return re.test(String(value));
});

contactsSchema.virtual("strPhone").get(function () {
  return `${this.phone} phone`;
});

const Contact = model("contact", contactsSchema);

module.exports = Contact;
