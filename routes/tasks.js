const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); 

// --- API Endpoints ---

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 }); // Get all tasks, newest first
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = new Task({
        title,
        description
    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask); // 201 Created
    } catch (err) {
        res.status(400).json({ message: 'Error creating task', error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (req.body.title != null) {
            task.title = req.body.title;
        }
        if (req.body.description != null) {
            task.description = req.body.description;
        }
        if (req.body.completed != null) {
            task.completed = req.body.completed;
        }
        
        const updatedTask = await task.save();
        res.json(updatedTask);

    } catch (err) {
        res.status(400).json({ message: 'Error updating task', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        res.json({ message: 'Task deleted successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

module.exports = router;
