const { Schema, model } = require('mongoose');

const schema = new Schema({
    correct: { type: String, required: true },
    incorrect: { type: String, required: true },
    checked: { type: Boolean, default: false },
});

module.exports = model('Sentence', schema);
