import React from "react"

export default function SongResult(props) {
  return(
    <div className="searchResults-container-result">{props.songInfo.displayTitle}</div>
  )
}