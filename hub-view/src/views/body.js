import React from "react"
import SearchResults from "./searchResults";
import SongInfo from "./songInfo";
import Recommendations from "./recommendations";

export default function Body(props) {
  return (
      <div className="body">
        <Recommendations publicRecommendations={props.publicRecommendations} sendChosenSongId={props.sendChosenSongId} sendUserSearchTerm={props.sendUserSearchTerm} sendUrl={props.sendUrl}/>
        {props.songResults.length === 0? <SearchResults />: <SearchResults results={props.songResults} sendChosenSongId={props.sendChosenSongId}  chosenSongId={props.chosenSongId} userSearchTerm={props.userSearchTerm} sendUrl={props.sendUrl} next={props.next} prev={props.prev}/>}  
        {props.songInfo.length === 0? <SongInfo />: <SongInfo chosenSongId={props.chosenSongId} userSearchTerm={props.userSearchTerm} songInfo={props.songInfo} updatePublicRec={props.updatePublicRec} current={props.current}/>}
      </div> 
  );
}