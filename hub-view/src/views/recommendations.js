import React from "react"

export default function Recommendations(props) {
    if(props.publicRecommendations === undefined) return 

    const onRecClick = (e) => {
        e.preventDefault()

        const songId = e.target.getAttribute("data-songid")
        const albumId = e.target.getAttribute("data-albumid")
        const artistId = e.target.getAttribute("data-artistid")
        const term = e.target.getAttribute("data-term");
        const offSet = e.target.getAttribute("data-offset")
        const endpointUsed = e.target.getAttribute("data-endpointused")


        props.sendChosenSongId(songId)
        props.sendChosenAlbumId(albumId)
        props.sendChosenArtistId(artistId)
        props.sendUserSearchTerm(term)
        props.sendEndpointUsed(endpointUsed)

        let nextUrl = '/'

        switch(endpointUsed) {
            case "topGlobalSongs":
                nextUrl = `/topGlobalSongs/?offset=${offSet}`
                break;
            case "search":
                nextUrl = `/search/?song=${term}&offset=${offSet}`
                break;
            case "album":
                nextUrl = `/album/${albumId}/tracks?limit=10&offset=${offSet}`
                break;
            case "artistTopTracks":
                nextUrl = `/artistTopTracks/${artistId}`
                break
            default:
                nextUrl = '/topGlobalSongs/?offset=0'
                break
        }

        props.sendUrl(nextUrl)
    }

    const content = props.publicRecommendations.map((rec, i) => {
        return (
            <div className="recommendations-item-container" key={rec._id}>
                <div onClick={onRecClick} data-songid={rec.songId} data-term={rec.userSearchTerm} data-albumid={rec.albumId} data-artistid={rec.artistId} data-endpointused={rec.endpointUsed} data-offset={rec.offset} className={i===0? "recommendations-item-img-first":"recommendations-item-img"}><img  data-index-song={i} src={rec.albumImages[0].url} alt="album"/></div>
                <div className={i===0? "recommendations-item-description-first":"recommendations-item-description"}>Recommended by <br /> {rec.userName}</div>
            </div>
            
        )
    })

    return (   
        <div className="recommendations-section">
            <div>
                <div className="recommendations-title">Public <br/>Recommendations</div>
                <div className="recommendations">
                    {content}
                </div>    
            </div>
        </div>
    );
}