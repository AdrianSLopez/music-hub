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
          
          <SongDescription chosenSongId={props.chosenSongId} songInfo={props.songInfo} userSearchTerm={props.userSearchTerm} updatePublicRec={props.updatePublicRec} current={props.current} sendUrl={props.sendUrl} sendUserSearchTerm={props.sendUserSearchTerm} sendChosenSongId={props.sendChosenSongId} sendChosenAlbumId={props.sendChosenAlbumId}/>
      </div>
    </div>
  );
}
  
export default SongInfo;
