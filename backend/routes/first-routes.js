const express = require('express');
const router = express.Router();
const Task = require('../db/schema/first');

router.post('/', async (req, res) => {
  console.log('POST /api/tasks body:', req.body);
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err.message);
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const status = req.query.status;
  const filter = status ? { status } : {};
  const tasks = await Task.find(filter);
  res.json(tasks);
});

router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

module.exports = router;
