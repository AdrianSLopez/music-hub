import React from "react"

export default function AudioPreview(props) {
  if(props.songPreview !== null){
    return (
        <div>
            <audio src={props.songPreview} controls/>
        </div>
    )
  }else {
    return(
        <div className="audioPreview-unavailable"><i>Preview unavailable</i></div>
    )
  }
}