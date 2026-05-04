const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')
const Song = require('../models/Song')
const Playlist = require('../models/Playlist')
const authorize = require('../middleware/authorize');
router.get('/top-artists',authenticate,authorize('admin'),async(req,res)=>{
    try {
        const songs = await Song.find().limit(5)
        res.status(200).json({
            success: true,
            data: songs
        })

        
    } catch (error) {
         res.status(500).json({
      success: false,
      error: error.message
    });     
    }
})

router.get('/most-active-users',authenticate, async(req,res)=>{
    try {
        const playlists = await Playlist.find().limit(5)
        res.status(200).json({
            success: true,
            data: playlists
        })
        
    } catch (error) {
        res.status(500).json({
      success: false,
      error: error.message
    });
        
    }
})
module.exports = router;