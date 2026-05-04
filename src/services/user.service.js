const User = require("../models/User");

const createUser = async (userData) => {
    const newUser = await User.create(userData);
    return newUser;
};

const getAllUsers = async () => {
    return await User.find();
};

const updateUser = async (id, updates) => {
    return await User.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
};

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = { createUser, getAllUsers, updateUser, deleteUser };
