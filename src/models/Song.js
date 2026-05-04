const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    artist: {
        type: String,
        // ref: "Artist",
        required: true,
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
    },
});

module.exports = mongoose.model("Song", songSchema);
