const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
