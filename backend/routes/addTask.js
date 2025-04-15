const express = require('express');
const User = require("../models/User");
const addTaskRouter = express.Router();

addTaskRouter.post('/addTask', async (req, res) => {
    try {
        const task = new User(req.body);
        task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: "something went wrong", err })
    }
});

module.exports = { addTaskRouter };