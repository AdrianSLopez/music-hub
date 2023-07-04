const router = require('express').Router();
const api = require('../spotify');

const _filterTracks = (tracks) => {
    return tracks.map((track) => {
        const artists = track.artists.map((artist) => {
            return artist.name;
        }).join(", ");

        return {
            id: track.id,
            title: `${track.name} by ${artists}`

        };
    });
}

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const tracks = await api.getArtistTopTracks(id);
        const filtered = _filterTracks(tracks.tracks)
        
        res.json({tracks: filtered, current: null, next: null, previous: null})

    } catch(error) {
        res.status(500).json(error.toString());
    }
})

module.exports = router