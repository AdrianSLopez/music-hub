const router = require('express').Router();
const api = require('spotify-api');
const database = require('../db');

router.use((req, res, next) => {
    const {  query } = req;
    const { song } = req.query;

    if(song != undefined) {
        query.metadata = {
            lastSearched: new Date()
        };
    }

    next();
});

const _filterResults = (tracks) => {
    return tracks.map((track) => {
        const id = track.data.id;
        const artists = track.data.artists.items.map((artist) => {
            return artist.profile.name;
        }).join(", ");
        const display = `${track.data.name} by ${artists}`;

        return {id, display};
    });
};

router.get('/', async (req, res) => {
    try {
        const { song, limit=10, metadata } = req.query;

        const songs = await api.getTracks(song, limit);
        const results = _filterResults(songs);

        res.json({ searchTerm: song, results});

        const data = { searchTerm: song, searchCount: limit, lastSearched: metadata.lastSearched};
        
        (await database.find('History', song) == null)? database.save('History',  data ) : database.update('History', data );
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

const _filterSongInfo = (track) => {
    return track.map((trackInfo) => {
        const artists = trackInfo.artists.map((artist) => {
            return artist.name;
        }).join(", ");
        const title = `${trackInfo.name} by ${artists}`;
        const albumInfo = `Track ${trackInfo.track_number} from album titled ${trackInfo.album.name}`;
        const releaseDate = `Released in ${trackInfo.album.release_date}`;
        const time = `${((trackInfo.duration_ms)/60000).toFixed(2)} minutes`;
        return {title, albumInfo, releaseDate, time: time.replace('.', ':')};
    });
};

router.get('/:id/details', async (req, res) => {
    try {
        const { id } = req.params
        const { searchTerm } = req.query

        const trackInfo = await api.getTrackInfo(id)
        const display = _filterSongInfo(trackInfo.data.tracks);
        const selection = { id, display }

        res.json({ searchTerm, ...selection});

        const dbSearch = await database.find('History', searchTerm)

        if(dbSearch.selections == undefined) {
            database.update('History', {searchTerm, selections: [selection]})
        }else {
            updatedSelections = dbSearch.selections
            updatedSelections.push(selection)
            database.update('History', {searchTerm, selections: updatedSelections})
        }
    } catch (error) {
        res.status(500).json(error.toString());        
    }
});

module.exports = router;