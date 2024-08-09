const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('tasks');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('tasks');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new project
router.post('/', async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    deadline: req.body.deadline
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.deadline = req.body.deadline || project.deadline;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.remove();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
