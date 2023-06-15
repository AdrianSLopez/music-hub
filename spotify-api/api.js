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
        console.log("ERROR IN GENERATING TOKEN");
        console.error(error);
    }

}

// get list of tracks related to user search input
const getTracks = async (name, limit) => {
    const options = {
        method: 'get',
        url: `${config.spotifyBaseURL}/search?q=${name}&type=track&market=US&limit=${limit}`,
        headers
    }
    
    try {
        const tracks = await axios.request(options);
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
        console.log("ERRORS IN SINGLE TRACK METHOD")
        console.error(error)
    }
};

module.exports = {
    generateToken,
    getTracks,
    getTrackInfo
};