const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  date: { type: Date, required: true },
  appType: { type: String, required: true },
  budget: { type: Number, required: false },
  deadline: { type: Number, required: false },
  detail: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  file: { type: Array, required: false }
});

module.exports = mongoose.model('Project', projectSchema);
