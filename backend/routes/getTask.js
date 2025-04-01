const express = require("express");
const User = require("../models/User");
const getTaskRouter = express.Router();

getTaskRouter.get('/getTask', async (req, res) => {
    try {
        const tasks = await User.find({});
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "something went wrong", err })
    }
});

module.exports = { getTaskRouter };