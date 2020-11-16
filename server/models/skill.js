const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  filter: { type: Number, required: true }
});

module.exports = mongoose.model('Skill', skillSchema);
