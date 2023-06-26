import React from "react"
import AudioPreview from "./audioPreview";
import SongImage from "./songImage";
import SongDescription from "./songDescription";
import Recommend from "./recommend";

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
          
          <Recommend chosenSongId={props.chosenSongId} songInfo={props.songInfo} userSearchTerm={props.userSearchTerm} updatePublicRec={props.updatePublicRec}/>
          <SongDescription songInfo={props.songInfo}/>
      </div>
    </div>
  );
}
  
export default SongInfo;
