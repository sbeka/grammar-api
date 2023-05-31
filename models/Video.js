const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    youtubeCode: { type: String, required: true },
    viewCount: { type: Number },
});

module.exports = model('Video', schema);
