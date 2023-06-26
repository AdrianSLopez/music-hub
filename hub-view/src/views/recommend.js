import React from "react"

export default function Recommend(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const form = e.target;
        const formData = new FormData(form);
        const displayName = formData.get("display-name");

        if(displayName==='') return

        fetch('/publicRecommendations/add', {
          method: "POST",
          body: JSON.stringify({
            _id: props.chosenSongId,
            userSearchTerm: props.userSearchTerm,
            title: props.songInfo.title,
            albumImages: props.songInfo.albumImages,
            userName: displayName
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => {
            return
        })
        .catch(error => {
          console.log(error)
        })
    
        props.updatePublicRec(true)
      }

    return (   
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <input type="text" name="display-name" placeholder="Name..."/>
                <button type="submit" className="fa fa-heart"></button>
            </form>
        </div>
    );
}