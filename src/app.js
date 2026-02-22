const express = require("express");

const app = express();

app.use(express.json());

app.use("/api/users", require("../src/routes/user.route"));
app.use("/api/songs", require("../src/routes/song.route"));
app.use("/api/playlist", require("../src/routes/playlist.route"));
app.use('/api/artist', require('../src/routes/artist.route'));
app.use('/api/album', require("../src/routes/album.route"));

app.get("/", (req, res) => {
    res.send("Hello, TAVISH!!  WUDUUU??");
});

module.exports = app;