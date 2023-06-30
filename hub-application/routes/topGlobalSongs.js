const router = require('express').Router();
const api = require('spotify-api');

const _filterTracks = (tracks) => {
    return tracks.map((track) => {
        return {
            id: track.id,
            title: track.name
        };
    });
}

const _getOffset = (url) => {
    if(url === null) return null;
    
    return url.split('?')[1].split('&')[0].split('=')[1];
}

router.get('/', async (req, res) => {
    try {
        const { offset=0 } = req.query;
        const topGlobalSongs = await api.getTopGlobalSongs(offset);
        const filtered = _filterTracks(topGlobalSongs.tracks)

        res.json({next: _getOffset(topGlobalSongs.next), previous: _getOffset(topGlobalSongs.previous),  tracks: filtered})
    } catch(error) {
        res.status(500).json(error.toString());
    }
})

module.exports = router