import React from "react"
import SearchResults from "./searchResults";
import SongInfo from "./songInfo";
import Recommendations from "./recommendations";

export default function Body(props) {
  return (
      <div className="body">
        <div className="results-and-info">
          {props.songResults.length === 0? <SearchResults />: <SearchResults results={props.songResults} sendChosenSongId={props.sendChosenSongId}  chosenSongId={props.chosenSongId} userSearchTerm={props.userSearchTerm} sendUrl={props.sendUrl} next={props.next} prev={props.prev} endpointUsed={props.endpointUsed} chosenAlbumId={props.chosenAlbumId}/>} 
          {props.songInfo.length === 0? <SongInfo />: <SongInfo chosenSongId={props.chosenSongId} endpointUsed={props.endpointUsed} chosenAlbumId={props.chosenAlbumId} userSearchTerm={props.userSearchTerm} songInfo={props.songInfo} current={props.current} sendUrl={props.sendUrl} sendUserSearchTerm={props.sendUserSearchTerm} sendChosenSongId={props.sendChosenSongId} sendChosenAlbumId={props.sendChosenAlbumId} sendChosenArtistId={props.sendChosenArtistId} chosenArtistId={props.chosenArtistId}/>}
        </div>

        <div className="public-recommendations-title"><p>Public Recommendations</p></div>
        <Recommendations publicRecommendations={props.publicRecommendations} sendChosenSongId={props.sendChosenSongId} sendUserSearchTerm={props.sendUserSearchTerm} sendUrl={props.sendUrl} sendChosenAlbumId={props.sendChosenAlbumId} sendEndpointUsed={props.sendEndpointUsed} sendChosenArtistId={props.sendChosenArtistId}/>
      </div> 
  );
}