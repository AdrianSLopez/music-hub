import React from "react"

const SongInfo = (props) => {
  if(props.songInfo === undefined) return(
    <div>
      loading....
    </div>
  )

  const vinyls = ['./assets/orange-vinyl.png', './assets/red-vinyl.png', './assets/yellow-vinyl.png']
  return (
    <div className="right-body-songInfo-container">
        <div className="right-body-songInfo-image-container">
          <div className="right-body-songInfo-image"><a href={props.songInfo.albumUrl}><img src={props.songInfo.albumImages[1].url} alt="Song Cover"/></a></div>
          <div className="right-body-songInfo-vinyl"><img src={require(`${vinyls[Math.floor(Math.random(3)*3)]}`)} alt="vinyl"/></div>
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
