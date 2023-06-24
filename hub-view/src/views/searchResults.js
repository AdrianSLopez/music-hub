import React from "react"

export default function SearchResults(props) {
  if(props.results === undefined) return (<div>loading...</div>)

  const onSongClick = (e) => {
    e.preventDefault()

    const songId = e.target.getAttribute("data-index-songid")
    props.sendChosenSongId(songId)
    props.sendUrl(`/search/${songId}/details?searchTerm=${props.userSearchTerm}`)
  }

  const songResults = props.results.map( (song) => {
    return <div key={song.id} data-index-songid={song.id} onClick={onSongClick} className={props.chosenSongId === song.id? "searchResults-result-chosen": "searchResults-result"}>{song.title}</div>
  })

  return(
    <div className="searchResults"> 
      <div className="searchResults-container">
        {songResults}
      </div>
    </div>
  )
}