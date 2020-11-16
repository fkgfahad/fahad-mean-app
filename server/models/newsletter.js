const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const newsletterSchema = mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  }
});

mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('Newsletter', newsletterSchema);
