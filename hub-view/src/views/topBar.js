import React from "react"
import Logo from "./logo";
import SearchBar from "./searchBar";

export default function TopBar(props) {
  return (
    <div className="topBar-container">
        <Logo />
        <SearchBar sendUserSearchTerm={props.sendUserSearchTerm} sendUrl={props.sendUrl} userSearchTerm={props.userSearchTerm} sendChosenSongId={props.sendChosenSongId}/>
    </div> 
  );
}