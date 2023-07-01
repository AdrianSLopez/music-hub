import React from "react"
import Recommend from "./recommend";


export default function SongDescription(props) {
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
              return  <p key={artist.id}>&nbsp;<a  href={artist.url}>{artist.name}</a>{i !== props.songInfo.artists.length-1? `, `:""}</p>
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
        
        <Recommend chosenSongId={props.chosenSongId} songInfo={props.songInfo} userSearchTerm={props.userSearchTerm} updatePublicRec={props.updatePublicRec} current={props.current}/>        
    </div>
  );
}