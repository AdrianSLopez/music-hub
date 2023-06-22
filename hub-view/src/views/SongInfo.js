import React from "react"

const SongInfo = (props) => {
  if(props.songInfo === undefined) return(
    <div>
      loading....
    </div>
  )

  return (
    <div className="right-body-songInfo-container">
        <div className="right-body-songInfo-image-container">
          <a href={props.songInfo.albumUrl}><img src={props.songInfo.albumImages[1].url} alt="Song Cover"/></a>
        </div>

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
    </div>
  );
}
  
export default SongInfo;
