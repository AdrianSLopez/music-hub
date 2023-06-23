import React from "react"

export default function SongImage(props) {
    const vinyls = ['./assets/orange-vinyl.png', './assets/red-vinyl.png', './assets/yellow-vinyl.png']
    return (
        <div className="songImage-container">
            <div className="songImage-image"><a href={props.albumUrl}><img src={props.albumImages[1].url} alt="Song Cover"/></a></div>
            <div className="songImage-image-vinyl"><img src={require(`${vinyls[Math.floor(Math.random(3)*3)]}`)} alt="vinyl"/></div>
        </div>
    );
}
