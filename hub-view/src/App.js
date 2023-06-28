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
  const [songInfo, setSongInfo] = useState([])
  const [refreshPublicRec, setrefreshPublicRec] = useState(true)
  const [publicRecommendations, setPublicRecommendations] = useState([])
  const [url, setUrl] = useState('/topGlobalSongs')
  const [next, setNext] = useState(10)
  const [prev, setPrev] = useState(null)

  const sendChosenSongId = (song) => {
    setChosenSongId(song)
  }

  const sendUserSearchTerm = (term) => {
    setUserSearchTerm(term)
  }

  const sendUrl = (newUrl) => {
    setUrl(newUrl)
  }

  const updatePublicRec = (refresh) => {
    setrefreshPublicRec(refresh)
  }

  useEffect(() => {
    if(!url.includes('details')){
      //fetch data from topGlobalSongs or user searchterm
      fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
          let tracks =  (url === '/topGlobalSongs')? data: data.tracks;

          if(url !== '/topGlobalSongs'){
            setNext(data.next)
            setPrev(data.prev)
          }

          setUserSearchTerm(userSearchTerm)
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
          setSongInfo(data.display[0])
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
  }, [url, userSearchTerm, chosenSongId,refreshPublicRec]);

  return (
    <div className="app-container">
      <Background albumImages={songInfo.albumImages}/>

      <TopBar sendUserSearchTerm={sendUserSearchTerm} sendUrl={sendUrl} userSearchTerm={userSearchTerm} sendChosenSongId={sendChosenSongId}/>

      <Body sendUserSearchTerm={sendUserSearchTerm} songResults={songResults} songInfo={songInfo} publicRecommendations={publicRecommendations} sendChosenSongId={sendChosenSongId} chosenSongId={chosenSongId} userSearchTerm={userSearchTerm} sendUrl={sendUrl} updatePublicRec={updatePublicRec} next={next} prev={prev}/>
    </div>
    
  );
}