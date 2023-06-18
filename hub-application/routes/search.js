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

const _filterTracks = (tracks) => {
    return tracks.map((track) => {
        const id = track.id;
        const artists = track.artists.map((artist) => {
            return artist.name;
        }).join(", ");
        const displayTitle = `${track.name} by ${artists}`;

        return {id, displayTitle};
    });
};

router.get('/', async (req, res) => {
    try {
        const { song, limit=10, metadata } = req.query;
        const tracks = await api.getTracks(song, limit);
        const filteredTracks = _filterTracks(tracks.items);

        res.json({ searchTerm: song, filteredTracks});

        // save to database
        // const data = { searchTerm: song, searchCount: limit, lastSearched: metadata.lastSearched};
        // (await database.find('search-history', song) == null)? database.save('search-history',  data ) : database.update('search-history', data );
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

const _filterSongInfo = (track) => {
    return track.map((trackInfo) => {
        const artists = trackInfo.artists.map((artist) => {
            return {id: artist.id, name: artist.name, url: artist.external_urls.spotify, };
        })
        const displayArtist = trackInfo.artists.map((artist) => {
            return artist.name
        }).join(", ");
        const title = `${trackInfo.name} by ${displayArtist}`;
        const albumInfo = `Track ${trackInfo.track_number} from album titled ${trackInfo.album.name}`;
        const releaseDate = `Released in ${trackInfo.album.release_date}`;
        const time = `${((trackInfo.duration_ms)/60000).toFixed(2)} minutes`;

        return {title, artists, albumInfo, albumUrl: trackInfo.album.external_urls.spotify, albumImages: trackInfo.album.images, releaseDate, time: time.replace('.', ':')};
    });
};

router.get('/:id/details', async (req, res) => {
    try {
        const { id } = req.params
        const { searchTerm } = req.query
        const trackInfo = await api.getTrackInfo(id)
        const display = _filterSongInfo(trackInfo);
        const selection = { id, display }
        
        res.json({ searchTerm, ...selection});
        // const dbSearch = await database.find('search-history', searchTerm)

        // if(dbSearch.selections == undefined) {
        //     database.update('search-history', {searchTerm, selections: [selection]})
        // }else {
        //     updatedSelections = dbSearch.selections
        //     updatedSelections.push(selection)
        //     database.update('search-history', {searchTerm, selections: updatedSelections})
        // }
    } catch (error) {
        res.status(500).json(error.toString());        
    }
});

module.exports = router;