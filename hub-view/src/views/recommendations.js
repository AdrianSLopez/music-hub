import React from "react"

export default function Recommendations(props) {
    if(props.publicRecommendations === undefined) return 

    // const onRecClick = (e) => {
    //     e.preventDefault()
    //     const index = e.target.getAttribute("data-index-song")
    //     console.log("recommendation clicked on: [" + props.publicRecommendations[index].title + "]" )
    // }

    const content = props.publicRecommendations.map((rec, i) => {
        return (
            <div className="recommendations-item-container" key={rec._id}>
                <img className={i===0? "recommendations-item-img-first":"recommendations-item-img"} data-index-song={i} src={rec.albumImages[0].url} alt="album"/>
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