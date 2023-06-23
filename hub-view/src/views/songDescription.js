import React from "react"


export default function SongDescription(props) {
  return (
    <div className="right-body-songInfo-info-container">
        <p><a href={props.songInfo.songUrl}>{props.songInfo.title}</a></p>
        <div className="right-body-songInfo-info-title">
        <p>by</p>
        {props.songInfo.artists.map((artist, i) => {
            return  <p key={artist.id}>&nbsp;<a  href={artist.url}>{artist.name}</a>{i !== props.songInfo.artists.length-1? ",":""}</p>
        })}
        </div>
        <p>Track {props.songInfo.trackNumber} on <a href={props.songInfo.albumUrl}>{props.songInfo.albumName}</a></p>
        <p>Released on {props.songInfo.albumReleaseDate}</p>
        <p>{props.songInfo.time}</p>
    </div>
  );
}