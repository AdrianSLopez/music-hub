const router = require('express').Router();
const api = require('spotify-api');

const _filterTracks = (tracks) => {
    return tracks.map((track) => {
        const artists = track.artists.map((artist) => {
            return {id: artist.id, name: artist.name, url: artist.external_urls.spotify, };
        })
        const time = `${((track.duration_ms)/60000).toFixed(2)} minutes`;

        return {
            title: track.name, 
            artists, 
            songUrl: track.external_urls.spotify,
            albumName: track.album.name, 
            albumUrl: track.album.external_urls.spotify, 
            albumImages: track.album.images, 
            albumReleaseDate: track.album.release_date,
            trackNumber: track.track_number,
            time: time.replace('.', ':'),
            preview: track.preview_url
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