const mongoose = require('mongoose');

const readSchema = new mongoose.Schema({
    image: {
        type: String
    },
    title: String,
    description: String,

}, { timestamps: true });

module.exports = mongoose.model('Read', readSchema);
