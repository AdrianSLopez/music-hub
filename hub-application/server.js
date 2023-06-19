const express = require('express');
const api = require('spotify-api');
const mongo = require('./db');
const app = express();
const port = 8888;

api.generateToken()

const search = require('./routes/search.js');
app.use('/search', search);

const history = require('./routes/history.js');
app.use('/history', history);

const topGlobalSongs = require('./routes/topGlobalSongs.js');
app.use('/topGlobalSongs', topGlobalSongs)

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    await mongo.connect();
});
