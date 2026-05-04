const Song = require('../models/Song');

const createSong = async (songData) => {
    const newSong = await Song.create(songData)
    return newSong;
}

const getAllSong = async () => {
    return await Song.find();
}

const updateSong = async (id, updates) => {
    return await Song.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
    });
};

const deleteSong = async (id) => {
    return await Song.findByIdAndDelete(id);
};

module.exports = { createSong, getAllSong, updateSong, deleteSong };