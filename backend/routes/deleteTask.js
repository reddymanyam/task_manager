const express = require('express');
const User = require('../models/User');
const deleteTaskRouter = express.Router();

deleteTaskRouter.delete('/deleteTask', async (req, res) => {
    try {
        const userId = req.body._id;
        const deletedTask = User.findOneAndDelete({ _id: userId });
        res.status(201).send("Task deleted succesfully", deletedTask);
    } catch (err) {
        res.status(500).json({ message: "Something Went Wrong", err })
    }

});

module.exports = { deleteTaskRouter };
