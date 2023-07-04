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

const _getOffset = (url) => {
    if(url === null) return null;
    
    return url.split('?')[1].split('&')[0].split('=')[1];
}

router.get('/:id/tracks', async (req, res) => {
    try {
        const { id } = req.params
        const { limit=10, offset=0 } = req.query
        const tracks = await api.getAlbumTracks(id, limit, offset);
        const filtered = _filterTracks(tracks.items)
        
        res.json({tracks: filtered, current:_getOffset(tracks.href), next:_getOffset(tracks.next), previous: _getOffset(tracks.previous)})

    } catch(error) {
        res.status(500).json(error.toString());
    }
})

module.exports = router