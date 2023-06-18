import "./App.css";
import React from "react"
import TopBar from "./views/topBar"
import SearchBar from "./views/searchBar";
import SongInfo from "./views/songInfo";

export default function App() {
  return (
    <div>
      <TopBar />
      <div className="body">  
        <div className="left-body"> 
          <SearchBar />
        </div>
        <div className="right-body">
          <SongInfo />
        </div>
      </div>
      
    </div>
  );
}