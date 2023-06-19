import React from "react"

export default function SearchResults(props) {
  if(props.results === undefined) return (<h1>DISPLAY #1 song on initial load</h1>)

  const onSongClick = (e) => {
    e.preventDefault()

    const songId = e.target.getAttribute("data-index-songid")

    fetch(`/search/${songId}/details?searchTerm=${props.userSearchTerm}`)
      .then(response => {
          return response.json()
      })
      .then(data => {
        props.sendChosenSongId(songId)
        props.sendSongInfo(data.display[0])
      })
      .catch( e => { 
        console.log(e)
      })
    
  }

  const songResults = props.results.map( (song) => {
    return <div key={song.id} data-index-songid={song.id} onClick={onSongClick} className={props.chosenSongId === song.id? "searchResults-container-result-chosen": "searchResults-container-result"}>{song.title}</div>
  })

  return(
    <div className="searchResults-container">
      {songResults}
    </div>
  )
}