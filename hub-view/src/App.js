import "./App.css";
import React, {useState, useEffect} from "react"
import Logo from "./views/logo";
import SearchBar from "./views/searchBar";
import SearchResults from "./views/searchResults";
import SongInfo from "./views/songInfo";

export default function App() {
  const [userSearchTerm, setUserSearchTerm] = useState('topGlobalSongs')
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
      <div className="bg-color-cover">
        {songInfo.albumImages!==undefined? <img src={songInfo.albumImages[0].url} className="bg-cover-img" alt="background-color"/>: <div></div>}
      </div>
      <div className="topBar-container">
        <Logo />
        <SearchBar sendUserSearchTerm={sendUserSearchTerm} sendUrl={sendUrl}/>
      </div>
      <div className="body">
        <div className="left-body"> 
          {songResults.length === 0? <SearchResults />: <SearchResults results={songResults} sendChosenSongId={sendChosenSongId}  chosenSongId={chosenSongId} userSearchTerm={userSearchTerm} sendUrl={sendUrl}/>}
         </div>
        <div className="right-body">
          {songInfo.length === 0? <SongInfo />: <SongInfo songInfo={songInfo}/>}
        </div>
      </div>
    </div>
    
  );
}