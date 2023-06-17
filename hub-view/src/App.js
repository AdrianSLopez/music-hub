import "./App.css";
import React from "react"
import TopBar from "./views/TopBar"
import SearchBar from "./views/searchBar";
import SearchResults from "./views/searchResults";
import SongInfo from "./views/SongInfo";

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
