import "./App.css";
import "./responsive.css"
import React, {useState, useEffect} from "react"
import TopBar from "./views/topBar";
import Background from "./views/background";
import Body from "./views/body";

export default function App() {
  const [userSearchTerm, setUserSearchTerm] = useState('Top global songs')
  const [songResults, setSongResults] = useState([])
  const [chosenSongId, setChosenSongId] = useState(0)
  const [chosenAlbumId, setChosenAlbumId] = useState([])
  const [songInfo, setSongInfo] = useState([])
  const [refreshPublicRec, setrefreshPublicRec] = useState(true)
  const [publicRecommendations, setPublicRecommendations] = useState([])
  const [endpointUsed, setEndpointUsed] = useState('topGlobalSongs')
  const [url, setUrl] = useState('/topGlobalSongs/?offset=0')
  const [current, setCurrent] = useState(0)
  const [next, setNext] = useState(10)
  const [prev, setPrev] = useState(0)

  const sendChosenSongId = (song) => setChosenSongId(song)
  const sendUserSearchTerm = (term) => setUserSearchTerm(term)
  const sendUrl = (newUrl) => setUrl(newUrl)
  const sendChosenAlbumId = (albumId) => setChosenAlbumId(albumId)
  const sendEndpointUsed = (endpoint) => setEndpointUsed(endpoint)


  const updatePublicRec = (refresh) => {
    setrefreshPublicRec(refresh)
  }

  useEffect(() => {
    if(!url.includes('details')){ 
      setEndpointUsed(url.split('/')[1])

      fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
          const tracks = data.tracks;
          
          url.includes('topGlobalSongs')? setCurrent(data.next === null? Number(data.previous)+10:Number(data.next)-10 ): setCurrent(data.current);

          setNext(data.next)
          setPrev(data.previous)
          setSongResults(tracks);
          setChosenSongId(chosenSongId===0? tracks[0].id: chosenSongId)
          setUrl(`/search/${chosenSongId===0? tracks[0].id: chosenSongId}/details?searchTerm=${userSearchTerm}`)
          return
        })
        .catch(error => {
          console.log(error)
        })
    }else {
      //fetch data from specific song id
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setSongInfo(data.info[0])
        })
    }

    //fetch public recommendations
    if(refreshPublicRec){
      fetch('/publicRecommendations/recent')
        .then(response => {
          return response.json();
        })
        .then(data => {
          if(data.length !== 0) {
            setPublicRecommendations(data)
          }
        })
        .catch(error => {
          console.log(error)
        })
      
        updatePublicRec(false)
    }
  }, [url, userSearchTerm, chosenSongId, refreshPublicRec]);

  return (
    <div className="app-container">
      <Background albumImages={songInfo.albumImages}/>

      <TopBar sendUserSearchTerm={sendUserSearchTerm} sendUrl={sendUrl} userSearchTerm={userSearchTerm} sendChosenSongId={sendChosenSongId}/>

      <Body sendUserSearchTerm={sendUserSearchTerm} sendEndpointUsed={sendEndpointUsed} sendChosenAlbumId={sendChosenAlbumId} songResults={songResults} songInfo={songInfo} publicRecommendations={publicRecommendations} sendChosenSongId={sendChosenSongId} chosenSongId={chosenSongId} userSearchTerm={userSearchTerm} sendUrl={sendUrl} updatePublicRec={updatePublicRec} next={next} prev={prev} current={current} endpointUsed={endpointUsed} chosenAlbumId={chosenAlbumId}/>
    </div>
    
  );
}