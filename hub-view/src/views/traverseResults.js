import React from "react"
import TraverseButton from "./traverseButton"

export default function TraverseResults(props) {
  return(
    <div className="searchResults-traverse-container"> 
        <TraverseButton userInput={props.userSearchTerm} direction='previous' offset={props.prev} sendUrl={props.sendUrl} sendChosenSongId={props.sendChosenSongId} arrow={'fa fa-arrow-left'}/>
        <TraverseButton userInput={props.userSearchTerm} direction='next' offset={props.next} sendUrl={props.sendUrl} sendChosenSongId={props.sendChosenSongId} arrow={'fa fa-arrow-right'}/>
    </div>
  )
}