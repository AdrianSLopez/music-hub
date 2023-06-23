import React from "react"

export default function SongImage(props) {
    const vinyls = ['./assets/orange-vinyl.png', './assets/red-vinyl.png', './assets/yellow-vinyl.png']
    return (
        <div className="right-body-songInfo-image-container">
            <div className="right-body-songInfo-image"><a href={props.albumUrl}><img src={props.albumImages[1].url} alt="Song Cover"/></a></div>
            <div className="right-body-songInfo-vinyl"><img src={require(`${vinyls[Math.floor(Math.random(3)*3)]}`)} alt="vinyl"/></div>
        </div>
    );
}
