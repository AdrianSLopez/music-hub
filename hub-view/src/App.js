import "./App.css";
import React, {useState} from "react"
import Logo from "./views/logo";
import SearchBar from "./views/searchBar";
import SearchResults from "./views/searchResults";
import SongInfo from "./views/songInfo";

export default function App() {
  const [userSearchTerm, setUserSearchTerm] = useState([])
  const [songResults, setSongResults] = useState([])
  const [chosenSongId, setChosenSongId] = useState([])
  const [songInfo, setSongInfo] = useState([])

  const sendSongResults = (inputResults) => {
    setSongResults(inputResults)
  }

  const sendChosenSongId = (song) => {
    setChosenSongId(song)
  }

  const sendUserSearchTerm = (term) => {
    setUserSearchTerm(term)
  }

  const sendSongInfo = (info) => {
    setSongInfo(info)
  }

  return (
    <div>
      <div className="topBar-container">
        <Logo />
        <SearchBar sendSongResults={sendSongResults} sendChosenSongId={sendChosenSongId} sendUserSearchTerm={sendUserSearchTerm} sendSongInfo={sendSongInfo}/>
      </div>
      <div className="body">
        <div className="left-body"> 
          {songResults.length === 0? <SearchResults />: <SearchResults results={songResults} sendChosenSongId={sendChosenSongId} sendSongInfo={sendSongInfo} chosenSongId={chosenSongId} userSearchTerm={userSearchTerm}/>}
         </div>
        <div className="right-body">
          {songInfo.length === 0? <SongInfo />: <SongInfo songInfo={songInfo}/>}
        </div>
      </div>
    </div>
    
  );
}