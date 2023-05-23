const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const app = express();
require("dotenv/config")
const PORT = 3000;

const PersonRoute = require('./routes/post')

app.use(bodyParser.json())
app.use('/person', PersonRoute)

app.get('/', (req, res, next) => {
    res.status(200).send('Welcome to Home Page for Mongoose Checkpoint By Ige Daniel');
})

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to DB");
    app.listen(PORT);
});

