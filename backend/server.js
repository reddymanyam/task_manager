const express = require("express");
const app = express();
const { User } = require('./models/User');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 7777;

app.use(express.json());

const { getTaskRouter } = require('./routes/getTask');
const { addTaskRouter } = require('./routes/addTask');
const { deleteTaskRouter } = require('./routes/deleteTask');

app.use('/', getTaskRouter);
app.use('/', addTaskRouter);
app.use('/', deleteTaskRouter);

connectDB()
    .then(() => {
        console.log("database connection established..!");
        app.listen(PORT, () => {                           //creating the port (port is nothing but a server...!)
            console.log(`Server is running at PORT:${PORT}`)
        })
    })
    .catch((err) => {
        console.log("database connection is not established")
    })