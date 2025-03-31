const express = require("express");
const app = express();
const { User } = require('./models/User');
const connectDB  = require('./config/database');

const PORT = process.env.PORT || 7777;



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