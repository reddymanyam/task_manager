const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    task: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 2,
        maxLength: 30,
    }

});

module.exports = mongoose.model('User', userSchema);