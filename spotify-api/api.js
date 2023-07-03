const axios = require("axios");
const fs = require('fs')
const config = require('../../config.json');
const headers = {
    Authorization: `${config.spotifyToken.token_type} ${config.spotifyToken.access_token}`
}

//generate spotify Token
const generateToken = async () => {
    const options = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization: 'Basic ' + (new Buffer.from(config.clientID+ ':' + config.clientSecret).toString('base64')),
        },
        params: {
            grant_type: 'client_credentials'
        },
        json: true
    }

    try {
        const token = await axios.request(options)
        const file = fs.readFileSync('config.json')

        var json = JSON.parse(file.toString())
        json.spotifyToken = token.data
        fs.writeFileSync('config.json', JSON.stringify(json))
    } catch (error) {
        console.error(error);
    }

}

// get list of tracks related to user search input
const getTracks = async (name, offset, limit) => {
    const options = {
        method: 'get',
        url: `${config.spotifyBaseURL}/search?q=${name}&type=track&market=US&offset=${offset}&limit=${limit}`,
        headers
    }
    
    try {
        const tracks = await axios.request(options);
        
        if(tracks.data.tracks.items.length === 0) tracks.data.tracks.next = null
        
        return tracks.data.tracks
    } catch (error) {
        console.error(error);
    }
};

// get info for specific track
const getTrackInfo = async (id) => {
    const options = {
        method: 'get',
        url: `${config.spotifyBaseURL}/tracks/${id}`,
        headers
    }
    
    try {
        const trackInfo = await axios.request(options);
        return [trackInfo.data];
    } catch (error) {
        console.error(error)
    }
};


const getTopGlobalSongs = async (offset=0) => {
    const options = {
        method: 'get',
        url: `${config.spotifyBaseURL}/playlists/37i9dQZEVXbNG2KDcFcKOF/tracks?offset=${offset}&limit=10`,
        headers
    }

    try {
        const songs = await axios.request(options);
        const tracks =  songs.data.items.map((item) => {
            return item.track
        });

        return {next:songs.data.next, previous:songs.data.previous, tracks}
    } catch (error) {
        console.error(error)
    }
}

const getAlbumTracks = async (id, limit=10, offset=0) => {
    const options = {
        method: 'get',
        url: `${config.spotifyBaseURL}/albums/${id}/tracks?limit=${limit}&offset=${offset}`,
        headers
    }

    try {
        const songs = await axios.request(options);
        
        return songs.data
    } catch (error) {
        console.error(error)
    }
}

const getArtistTopTracks = async (id) => {
    const options = {
        method: 'get',
        url: `${config.spotifyBaseURL}/artists/${id}/top-tracks?market=US`,
        headers
    }

    try {
        const songs = await axios.request(options);
        
        return songs.data
    } catch (error) {
        console.error(error)
    }
}
module.exports = {
    generateToken,
    getTracks,
    getTrackInfo,
    getTopGlobalSongs,
    getAlbumTracks,
    getArtistTopTracks
};