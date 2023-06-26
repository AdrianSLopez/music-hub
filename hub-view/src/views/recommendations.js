import React from "react"

export default function Recommendations(props) {
    if(props.publicRecommendations === undefined) return 

    const onRecClick = (e) => {
        e.preventDefault()

        const songId = e.target.getAttribute("data-index-songid")
        const term = e.target.getAttribute("data-index-term");
        props.sendChosenSongId(songId)
        props.sendUserSearchTerm(term)

        if(term.toLowerCase().split(' ').join('') === 'topglobalsongs') {
            props.sendUrl('/topGlobalSongs')
        }else {
            props.sendUrl(`/search/?song=${term}`)            
        }
    }

    const content = props.publicRecommendations.map((rec, i) => {
        return (
            <div className="recommendations-item-container" key={rec._id}>
                <div onClick={onRecClick} data-index-songid={rec.songId} data-index-term={rec.userSearchTerm} className={i===0? "recommendations-item-img-first":"recommendations-item-img"}><img  data-index-song={i} src={rec.albumImages[0].url} alt="album"/></div>
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