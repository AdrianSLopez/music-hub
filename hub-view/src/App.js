import "./App.css";
import React, {useState, useEffect} from "react"
import TopBar from "./views/topBar";
import Background from "./views/background";
import Body from "./views/body";

export default function App() {
  const [userSearchTerm, setUserSearchTerm] = useState('Displaying top global songs')
  const [songResults, setSongResults] = useState([])
  const [chosenSongId, setChosenSongId] = useState(0)
  const [songInfo, setSongInfo] = useState([])
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
  }, [url, userSearchTerm, chosenSongId]);

  return (
    <div>
      <Background albumImages={songInfo.albumImages}/>

      <TopBar sendUserSearchTerm={sendUserSearchTerm} sendUrl={sendUrl} userSearchTerm={userSearchTerm}/>

      <Body songResults={songResults} songInfo={songInfo} sendChosenSongId={sendChosenSongId} chosenSongId={chosenSongId} userSearchTerm={userSearchTerm} sendUrl={sendUrl}/>
    </div>
    
  );
}