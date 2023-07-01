import React from "react"

export default function TraverseButton(props) {
    const sendNewUrl = () => {
        if(props.offset == null) return

        let nextUrl = '/'

        switch(props.endpointUsed) {
          case "topGlobalSongs":
            nextUrl = `/topGlobalSongs/?offset=${props.offset}`
            break;
          case "search":
            nextUrl = `/search/?song=${props.userInput}&offset=${props.offset}`
            break;
          case "album":
            nextUrl = `/album/${props.chosenAlbumId}/tracks?limit=10&offset=${props.offset}`
            break;
        }
        
        props.sendUrl(nextUrl)
        props.sendChosenSongId(0)
    }

  return(
    <button onClick={sendNewUrl} className={props.arrow}/>
  )
}