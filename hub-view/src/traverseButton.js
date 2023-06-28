import React from "react"

export default function TraverseButton(props) {
    const sendNewUrl = () => {
        if(props.offset ==null) return
        props.sendUrl(`/search/?song=${props.userInput}&offset=${props.offset}`)
        props.sendChosenSongId(0)
    }

  return(
    <button onClick={sendNewUrl} className={props.arrow}/>
  )
}