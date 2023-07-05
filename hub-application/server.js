const express = require('express');
const spotify = require('./spotify');
const mongo = require('./db');
const app = express();
const path = require("path");
const port = 4000;

spotify.generateToken()

setInterval(() => {
    api.generateToken()
    console.log("new token generated")
}, 3300000)

app.use(express.static(path.join(__dirname, "../hub-view/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../hub-view/build/index.html"));
});

const search = require('./routes/search.js');
app.use('/search', search);

const topGlobalSongs = require('./routes/topGlobalSongs.js');
app.use('/topGlobalSongs', topGlobalSongs)

const publicRecommendations = require('./routes/publicRecommendations.js');
app.use('/publicRecommendations', publicRecommendations)

const albumTracks = require('./routes/album.js')
app.use('/album', albumTracks)

const artistTopTracks = require('./routes/artistsTopTracks')
app.use('/artistTopTracks', artistTopTracks)

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    await mongo.connect();
});
