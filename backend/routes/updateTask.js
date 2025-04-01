const express = require('express');
const User = require('../models/User');
const updateTask = express.Router();

updateTask.patch('/updateTask/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = await User.findByIdAndUpdate(taskId, req.body);

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", err })
    }
})