const express = require('express');
const mongo = require('./db');
const port = 8888;
const app = express();

const search = require('./routes/search.js');
app.use('/search', search);

const history = require('./routes/history.js');
app.use('/history', history);

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    await mongo.connect();
});
