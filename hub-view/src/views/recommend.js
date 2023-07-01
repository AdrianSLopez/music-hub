import React, {useState, useRef} from "react"

export default function Recommend(props) {
  const [formName, setFormName] = useState("");
  const hrtBtn = useRef();

  const handleSubmit = (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const displayName = formData.get("display-name");

      if(displayName==='') {
        form[0].focus()
        return
      }

      fetch('/publicRecommendations/add', {
        method: "POST",
        body: JSON.stringify({
          endpointUsed: props.endpointUsed,
          songId: props.chosenSongId,
          albumId: props.chosenAlbumId,
          artistId: props.chosenArtistId,
          userSearchTerm: props.userSearchTerm,
          title: props.songInfo.title,
          albumImages: props.songInfo.albumImages,
          userName: displayName,
          offset: props.current
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .catch(error => {
        console.log(error)
      })
  
      props.updatePublicRec(true)
      setFormName("")
      form[1].focus()
    }

  return (   
      <div className="recommend-container">
          <form method="post" onSubmit={handleSubmit}>
              <label className="recommend-label">Recommended by: </label>
              <input type="text" name="display-name" placeholder="Name..." value={formName} onChange={(e)=>{setFormName(e.target.value)}} className="recommend-input"/>
              <button className="rcmnd-btn" ref={hrtBtn}><i type="submit" className="fa fa-heart"/> </button>
          </form>
      </div>
  );
}