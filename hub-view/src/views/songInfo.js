import React from "react"
import AudioPreview from "./audioPreview";
import SongImage from "./songImage";
import SongDescription from "./songDescription";

const SongInfo = (props) => {
  if(props.songInfo === undefined) return(
    <div>
      loading....
    </div>
  )

  return (
    <div className="songInfo">
      <div className="songInfo-container">
          <SongImage albumUrl={props.songInfo.albumUrl} albumImages={props.songInfo.albumImages}/>

          <AudioPreview songPreview={props.songInfo.preview}/>
          
          <SongDescription chosenSongId={props.chosenSongId} endpointUsed={props.endpointUsed} chosenAlbumId={props.chosenAlbumId} songInfo={props.songInfo} userSearchTerm={props.userSearchTerm} current={props.current} sendUrl={props.sendUrl} sendUserSearchTerm={props.sendUserSearchTerm} sendChosenSongId={props.sendChosenSongId} sendChosenAlbumId={props.sendChosenAlbumId} sendChosenArtistId={props.sendChosenArtistId} chosenArtistId={props.chosenArtistId}/>
      </div>
    </div>
  );
}
  
export default SongInfo;
