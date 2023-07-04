const router = require('express').Router();
const api = require('../spotify');

const _filterTracks = (tracks) => {
    return tracks.map((track) => {
        const id = track.id;
        const artists = track.artists.map((artist) => {
            return artist.name;
        }).join(", ");
        const title = `${track.name} by ${artists}`;

        return {id, title};
    });
};

const _getOffset = (url) => {
    if(url === null) return null;

    return url.split('&')[3].split('=')[1]
}

router.get('/', async (req, res) => {
    try {
        const { song, limit=10, offset=0, metadata } = req.query;
        const tracks = await api.getTracks(song, offset, limit);
        const filteredTracks = _filterTracks(tracks.items);

        res.json({tracks: filteredTracks, current:_getOffset(tracks.href), next:_getOffset(tracks.next), previous: _getOffset(tracks.previous)});
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

const _filterSongInfo = (track) => {
    return track.map((trackInfo) => {
        const artists = trackInfo.artists.map((artist) => {
            return {id: artist.id, name: artist.name, url: artist.external_urls.spotify, };
        })
        const time = `${((trackInfo.duration_ms)/60000).toFixed(2)} minutes`;

        return {
            title: trackInfo.name, 
            artists, 
            songUrl: trackInfo.external_urls.spotify,
            albumId: trackInfo.album.id,
            albumName: trackInfo.album.name, 
            albumUrl: trackInfo.album.external_urls.spotify, 
            albumImages: trackInfo.album.images, 
            albumReleaseDate: trackInfo.album.release_date,
            trackNumber: trackInfo.track_number,
            time: time.replace('.', ':'),
            preview: trackInfo.preview_url
        };
    });
};

router.get('/:id/details', async (req, res) => {
    try {
        const { id } = req.params
        const { searchTerm } = req.query
        const trackInfo = await api.getTrackInfo(id)
        const display = _filterSongInfo(trackInfo);
        const selection = { id, info:display }
        
        res.json({ searchTerm, ...selection});
    } catch (error) {
        res.status(500).json(error.toString());        
    }
});

module.exports = router;