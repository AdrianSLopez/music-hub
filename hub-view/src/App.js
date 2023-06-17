import "./App.css";
import React from "react"
import TopBar from "./pieces/TopBar"
import SearchBar from "./pieces/searchBar";
import SearchResults from "./pieces/searchResults";
import SongInfo from "./pieces/SongInfo";

function App() {
  return (
    <div>
      <TopBar />
      <div className="body">  
        <div className="left-body"> 
          <SearchBar />
          <SearchResults />
        </div>
        <div className="right-body">
          <SongInfo />
        </div>
      </div>
      
    </div>
  );
}
  
export default App;
