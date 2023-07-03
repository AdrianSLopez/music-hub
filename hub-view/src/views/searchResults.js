import React from "react"
import TraverseResults from "./traverseResults"

export default function SearchResults(props) {
  if(props.results === undefined) return (<div>loading...</div>)

  const onSongClick = (e) => {
    e.preventDefault()

    const songId = e.currentTarget.getAttribute("data-index-songid")
    props.sendChosenSongId(songId)
    props.sendUrl(`/search/${songId}/details?searchTerm=${props.userSearchTerm}`)
  }

  const songResults = props.results.map( (song) => {
    return <div key={song.id} data-index-songid={song.id} onClick={onSongClick} className={props.chosenSongId === song.id? "searchResults-result-chosen": "searchResults-result"}>{song.title}</div>
  })

  return(
    <div className="searchResults"> 
      <div className="searchResults-topBar">
        <p>Results ({props.prev === null? 1: Number(props.prev)+11}-{props.prev === null? props.results.length: 10+props.results.length + Number(props.prev)}): </p>
        <TraverseResults  className="searchResults-traverse-container" userSearchTerm={props.userSearchTerm} sendUrl={props.sendUrl} next={props.next} prev={props.prev} sendChosenSongId={props.sendChosenSongId} endpointUsed={props.endpointUsed} chosenAlbumId={props.chosenAlbumId}/>
      </div>

      <div className="searchResults-container">
        {songResults}
      </div>
      <div className="searchResults-bottomBar"><TraverseResults className="searchResults-traverse-container-bottom" userSearchTerm={props.userSearchTerm} sendUrl={props.sendUrl} next={props.next} prev={props.prev} sendChosenSongId={props.sendChosenSongId} endpointUsed={props.endpointUsed} chosenAlbumId={props.chosenAlbumId}/></div>
    </div>
  )
}