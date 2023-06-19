const router = require('express').Router();
const api = require('spotify-api');

const _filterTracks = (tracks) => {
    return tracks.map((track) => {
        const artists = track.artists.map((artist) => {
            return {id: artist.id, name: artist.name, url: artist.external_urls.spotify, };
        })
        const time = `${((track.duration_ms)/60000).toFixed(2)} minutes`;

        return {
            id: track.id,
            title: track.name
        };
    });
}

router.get('/', async (req, res) => {
    try {
        const topGlobalSongs = await api.getTopGlobalSongs();
        const filtered = _filterTracks(topGlobalSongs)

        res.json(filtered)
    } catch(error) {
        res.status(500).json(error.toString());
    }
})

module.exports = router