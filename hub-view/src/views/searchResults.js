import React from "react"

export default function SearchResults(props) {
  if(props.results === undefined) return (<h1>DISPLAY #1 song on initial load</h1>)
  return(
    <ul>
      {props.results.map( (song, i) => {
        return <li key={i}>{song.displayTitle}</li>
      })}
    </ul>
  )
}