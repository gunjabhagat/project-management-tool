const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
  deadline: { type: Date },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

module.exports = mongoose.model('Task', TaskSchema);

