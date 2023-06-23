import React from "react"
import SearchResults from "./searchResults";
import SongInfo from "./songInfo";

export default function Body(props) {

  return (
      <div className="body">
        {props.songResults.length === 0? <SearchResults />: <SearchResults results={props.songResults} sendChosenSongId={props.sendChosenSongId}  chosenSongId={props.chosenSongId} userSearchTerm={props.userSearchTerm} sendUrl={props.sendUrl}/>}
        {props.songInfo.length === 0? <SongInfo />: <SongInfo songInfo={props.songInfo}/>}
      </div> 
  );
}