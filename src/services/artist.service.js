const Artist = require('../models/Artist');

const createArtist = async (artistData) => {
    const newArtist = await Artist.create(artistData);
    return newArtist;
};

const getAllArtist = async () => {
    return await Artist.find();
};

const updateArtist = async (id, updates) => {
    return await Artist.findByIdAndUpdate(id, updates, {
        runValidators: true,
        new: true
    });
};

const deleteArtist = async (id) => {
    return await Artist.findByIdAndDelete(id);
};

module.exports = { createArtist, getAllArtist, updateArtist, deleteArtist };