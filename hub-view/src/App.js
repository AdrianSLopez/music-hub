import "./App.css";
import React, {useState} from "react"
import Logo from "./views/logo";
import SearchBar from "./views/searchBar";
import SearchResults from "./views/searchResults";
import SongInfo from "./views/songInfo";

export default function App() {
  const [songResults, setSongResults] = useState([])

  const sendSongResults = (inputResults) => {
    setSongResults(inputResults)
  }

  return (
    <div>
      <div className="topBar-container">
        <Logo />
        <SearchBar sendSongResults={sendSongResults}/>
      </div>
      <div className="body">
        <div className="left-body"> 
          {songResults.length === 0? <SearchResults />: <SearchResults results={songResults}/>}
         </div>
        <div className="right-body">
          <SongInfo />
        </div>
      </div>
    </div>
    
  );
}