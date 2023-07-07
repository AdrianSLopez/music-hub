import React, {useRef} from "react"
import AudioControls from "./audioControls";

export default function AudioPreview(props) {
  const audio = useRef();

  if(props.songPreview === null) {
    return(
      <div className="audioPreview-unavailable"><i>Preview unavailable</i></div>
    )
  } else{
    return (
        <div className="audio-preview-container">
            <audio ref={audio} src={props.songPreview}/>
            <AudioControls audioSrc={audio}/>
        </div>
    )
  }
}