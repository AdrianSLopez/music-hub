import "./App.css";
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
      fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
          setUserSearchTerm(userSearchTerm)
          setSongResults(data)
          setChosenSongId(data[0].id)
          setUrl(`/search/${data[0].id}/details?searchTerm=${userSearchTerm}`)
          return
        })
        .catch(error => {
          console.log(error)
        })
    }else {
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setSongInfo(data.display[0])
        })
    }

    if(refreshPublicRec){
      fetch('/publicRecommendations/recent')
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data[0]._id)
          setPublicRecommendations(data)
        })
        .catch(error => {
          console.log(error)
        })
      
        updatePublicRec(false)
    }
  }, [url, userSearchTerm, chosenSongId,refreshPublicRec]);

  return (
    <div>
      <Background albumImages={songInfo.albumImages}/>

      <TopBar sendUserSearchTerm={sendUserSearchTerm} sendUrl={sendUrl} userSearchTerm={userSearchTerm}/>

      <Body songResults={songResults} songInfo={songInfo} publicRecommendations={publicRecommendations} sendChosenSongId={sendChosenSongId} chosenSongId={chosenSongId} userSearchTerm={userSearchTerm} sendUrl={sendUrl} updatePublicRec={updatePublicRec}/>
    </div>
    
  );
}