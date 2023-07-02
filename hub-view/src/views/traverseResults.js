import React from "react"
import TraverseButton from "./traverseButton"

export default function TraverseResults(props) {
  return(
    <div className={props.className}> 
        <TraverseButton userInput={props.userSearchTerm} direction='previous' offset={props.prev} sendUrl={props.sendUrl} sendChosenSongId={props.sendChosenSongId} arrow={'fa fa-arrow-left'} endpointUsed={props.endpointUsed} chosenAlbumId={props.chosenAlbumId}/>
        <TraverseButton userInput={props.userSearchTerm} direction='next' offset={props.next} sendUrl={props.sendUrl} sendChosenSongId={props.sendChosenSongId} arrow={'fa fa-arrow-right'} endpointUsed={props.endpointUsed} chosenAlbumId={props.chosenAlbumId}/>
    </div>
  )
}