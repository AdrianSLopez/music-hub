import React from "react"
import SongResult from "./songResult"

export default function SearchResults(props) {
  if(props.results === undefined) return (<h1>DISPLAY #1 song on initial load</h1>)

  return(
    <div className="searchResults-container">
      {props.results.map( (song, i) => {
        return <SongResult songInfo={song} key={i}/>
      })}
    </div>
  )
}