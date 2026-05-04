const Playlist = require('../models/Playlist');

const createPlaylist = async (playlistData) => {
    const newPlaylist = await Playlist.create(playlistData);
    return newPlaylist;
};

const getAllPlaylist = async () => {
    return await Playlist.find();
};

const updatePlaylist = async (id, updates) => {
    return await Playlist.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
};

const deletePlaylist = async (id) => {
    return await Playlist.findByIdAndDelete(id);
};

module.exports = { createPlaylist, getAllPlaylist, updatePlaylist, deletePlaylist };
