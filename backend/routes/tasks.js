const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('project');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    deadline: req.body.deadline,
    project: req.body.project
  });

  try {
    const newTask = await task.save();
    // Add the task to the project
    await Project.findByIdAndUpdate(req.body.project, { $push: { tasks: newTask._id } });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.deadline = req.body.deadline || task.deadline;
    task.project = req.body.project || task.project;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Remove task reference from the project
    await Project.findByIdAndUpdate(task.project, { $pull: { tasks: task._id } });
    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
