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

  const saveSong = () => {
    fetch('/publicRecommendations/add', {
      method: "POST",
      body: JSON.stringify({
        _id: props.chosenSongId,
        userSearchTerm: props.userSearchTerm,
        albumImages: props.songInfo.albumImages,
        userName: "tony tony chopper"
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .catch(error => {
      console.log(error)
    })

    props.updatePublicRec(true)
  }

  return (
    <div className="songInfo">
      <div className="songInfo-container">
          <SongImage albumUrl={props.songInfo.albumUrl} albumImages={props.songInfo.albumImages}/>

          <AudioPreview songPreview={props.songInfo.preview}/>

          <button onClick={saveSong}>
            share
          </button>

          <SongDescription songInfo={props.songInfo}/>
      </div>
    </div>
  );
}
  
export default SongInfo;
