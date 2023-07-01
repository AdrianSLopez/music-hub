import React from "react"
import Recommend from "./recommend";


export default function SongDescription(props) {
  const artistClick = (e) => {
    e.preventDefault() 

    const artistId = e.target.getAttribute("data-artist-id")
    const artistIndex = e.target.getAttribute("data-artist-index")
    
    props.sendUrl(`/artistTopTracks/${artistId}`)
    props.sendUserSearchTerm(props.songInfo.artists[artistIndex].name +"'s Top 10 tracks")
    props.sendChosenSongId(0)
    props.sendChosenArtistId(artistId)
  }

  const albumClick = (e) => {
    e.preventDefault()

    const albumId = e.target.getAttribute("data-album-id")

    props.sendUrl(`/album/${albumId}/tracks?limit=10&offset=0`)
    props.sendUserSearchTerm(props.songInfo.albumName)
    props.sendChosenSongId(0)
    props.sendChosenAlbumId(albumId)
  }

  return (
    <div className="songDescription-container">
        <p className="songDescription-title"><a href={props.songInfo.songUrl}>{props.songInfo.title}</a></p>
        <div className="songDescription-artists">
          {props.songInfo.artists.map((artist, i) => {
              return <button key={artist.id} data-artist-id={artist.id} data-artist-index={i} onClick={artistClick}>{artist.name}{i !== props.songInfo.artists.length-1? `, `:""}</button>
          })}
        </div>

        <div className="songDescription-info">
          <p>
            Track {props.songInfo.trackNumber} on <button onClick={albumClick} data-album-id={props.songInfo.albumId} className="songDescription-album-name">{props.songInfo.albumName}</button>
            <br />
            Released on {props.songInfo.albumReleaseDate}
            <br />
            {props.songInfo.time}
          </p>
        </div>
        
        <Recommend chosenSongId={props.chosenSongId} songInfo={props.songInfo} userSearchTerm={props.userSearchTerm} updatePublicRec={props.updatePublicRec} current={props.current} endpointUsed={props.endpointUsed} chosenAlbumId={props.chosenAlbumId}/>        
    </div>
  );
}