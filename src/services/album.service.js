const Album = require('../models/Album');

const createAlbum = async (albumData) => {
    return await Album.create(albumData);
};

const getAllAlbum = async () => {
    return await Album.find();
}

const updateAlbum = async (id, updates) => {
    return await Album.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
    })
}

const deleteAlbum = async (id) => {
    return await Album.findByIdAndDelete(id)
}

module.exports = { createAlbum, getAllAlbum, updateAlbum, deleteAlbum };
