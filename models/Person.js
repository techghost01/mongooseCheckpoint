const mongoose = require("mongoose");

const PersonSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    age : {
        type: Number,
        required: true
    },
    favoritefood: [{
        type: String,
        required: true
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Person', PersonSchema)