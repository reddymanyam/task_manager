const express = require("express");
const app = express();
const PORT = process.env.PORT || 7777;



app.listen(PORT, (req, res) => {
    // res.status(201).send("server is running at port", PORT);
    console.log("server is running at port", PORT);

})