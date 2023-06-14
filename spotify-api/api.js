const axios = require("axios");
const config = require('../config.json');

// get list of tracks related to user search input
const getTracks = async (name, resultLimit) => {
    const options = {
      method: 'GET',
      url: `${config.base}/search`,
      params: {q:`${name}`, type: 'tracks', limit: `${resultLimit}`},
      headers: config.headers
    };
    
    try {
        // returns potential tracks that user is searching for
        const tracks = await axios.request(options);

        return tracks.data.tracks
    } catch (error) {
        console.error(error);
    }
};

// get info for specific track
const getTrackInfo = async (id) => {
    const options = {
        method: 'GET',
        url: `${config.base}/tracks`,
        params: {ids: `${id}`},
        headers: config.headers
    }
    
    try {
        const trackInfo = await axios.request(options);

        return trackInfo;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    getTracks,
    getTrackInfo
};