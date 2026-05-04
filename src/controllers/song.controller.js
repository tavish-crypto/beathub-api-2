const songService = require("../services/song.service");
const mongoose = require("mongoose");
const { encodeCursor, decodeCursor } = require('../utils/cursor');
const Song = require("../models/Song");

const createSongController = async (req, res) => {
    try {
        const { title, duration } = req.body;

        if (!title || !duration) {
            return res.status(400).json({
                message: "title and duration is required",
            });
        }

        const newSong = await songService.createSong({
            title,
            duration,
        });

        res.status(201).json({
            message: "Song created successfully",
            song: newSong,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating song",
            error: error.message,
        });
    }
};

const getAllSongsController = async (req, res) => {
    try {
        const songs = await songService.getAllSong();
        res.json(songs);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const updateSongController = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid Object Id",
            });
        }

        const updatedSong = await songService.updateSong(id, updates);

        if (!updatedSong) {
            res.status(404).json({
                error: "Song not found",
            });
        }

        res.status(200).json(updatedSong);
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

const deleteSongController = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid Object Id",
            });
        }

        const deletedSong = await songService.deleteSong(id);

        if (!deletedSong) {
            res.status(404).json({
                error: "Song Not Found",
            });
        }

        res.status(200).send();
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

const getSongsCursor = async (req, res) => {
  try {
    // 1. Limit (with safety cap)
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);

    // 2. Decode cursor if present
    const encodedCursor = req.query.cursor;
    let cursor = null;

    if (encodedCursor) {
      cursor = decodeCursor(encodedCursor);
    }

    // 3. Build query (IMPORTANT: uses $lt)
    const query = cursor ? { _id: { $lt: cursor } } : {};

    // 4. Fetch (limit + 1 to detect next page)
    const songs = await Song.find(query)
    .select('-v')
    .sort({ _id: -1 }) // newest first
    .limit(limit + 1)
    .lean();

    // 5. Check if more data exists
    const hasMore = songs.length > limit;

    if (hasMore) {
      songs.pop(); // remove extra item
    }

    // 6. Generate next cursor
    const nextCursor =
      hasMore && songs.length > 0
        ? encodeCursor(songs[songs.length - 1]._id)
        : null;

    res.status(200).json({
      success: true,
      data: songs,
      pagination: {
        nextCursor,
        hasMore,
        limit,
        count: songs.length
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
    createSongController,
    updateSongController,
    getAllSongsController,
    deleteSongController,
    getSongsCursor
};

