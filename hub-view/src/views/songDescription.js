import React from "react"


export default function SongDescription(props) {
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
            Track {props.songInfo.trackNumber} on <a href={props.songInfo.albumUrl}>{props.songInfo.albumName}</a>
            <br />
            Released on {props.songInfo.albumReleaseDate}
            <br />
            {props.songInfo.time}
          </p>
        </div>
        
    </div>
  );
}