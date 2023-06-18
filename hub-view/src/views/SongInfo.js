import React from "react"

const SongInfo = (props) => {
  if(props.songInfo === undefined) return(
    <div>
      <h1>#1 Popular Song</h1>
        <div><h1>IMAGE</h1></div>
        <div><h2>EMBED</h2></div>
        <div><h2>SONG INFO</h2></div>
        <div><h2>ARTIST HEADSHOT</h2></div>
    </div>
  )

  return (
    <div>
        <div>
          <a href={props.songInfo.albumUrl}><img src={props.songInfo.albumImages[1].url} alt="Song Cover"/></a>
        </div>

        <div className="songInfo-song-title-container">
          <div><h2><a href={props.songInfo.songUrl}>{props.songInfo.title}</a> by</h2></div>
          <div className="songInfo-artists-container">
            {props.songInfo.artists.map((artist, i) => {
              return  <h2 key={artist.id}>&nbsp;<a  href={artist.url}>{artist.name}</a>{i !== props.songInfo.artists.length-1? ",":""}</h2>
            })}
          </div>
        </div>

        <div>
          <h2>Track {props.songInfo.trackNumber} on <a href={props.songInfo.albumUrl}>{props.songInfo.albumName}</a></h2>
          <h3>{props.songInfo.time}</h3>
          <h3>Released {props.songInfo.albumReleaseDate}</h3>
        </div>
        <div><h2>ARTIST HEADSHOT</h2></div>
    </div>
  );
}
  
export default SongInfo;
