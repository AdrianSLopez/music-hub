const axios = require("axios");
const base = 'https://spotify81.p.rapidapi.com';
const headers = {
    'X-RapidAPI-Key': 'GET API KEY',
    'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
  };

// get list of tracks related to user search input
const getTracks = async (name, resultLimit) => {
    const options = {
      method: 'GET',
      url: `${base}/search`,
      params: {q:`${name}`, type: 'tracks', limit: `${resultLimit}`},
      headers
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
        url: `${base}/tracks`,
        params: {ids: `${id}`},
        headers
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