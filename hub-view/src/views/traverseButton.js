import React from "react"

export default function TraverseButton(props) {
    const sendNewUrl = () => {
        if(props.offset ==null) return

        let url = (props.userInput.toLowerCase().split(' ').join('') === 'topglobalsongs')? `/topGlobalSongs?offset=${props.offset}`:`/search/?song=${props.userInput}&offset=${props.offset}`
        
        props.sendUrl(url)
        props.sendChosenSongId(0)
    }

  return(
    <button onClick={sendNewUrl} className={props.arrow}/>
  )
}