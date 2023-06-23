import React from "react"

const AudioPreview = (props) => {
  if(props.songPreview !== null){
    return (
        <div>
            <audio className="audio-element" src={props.songPreview} controls/>
        </div>
    )
  }else {
    return(
        <div><i>Preview unavailable</i></div>
    )
  }
}
  
export default AudioPreview;
