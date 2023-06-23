import React from "react"


export default function Background(props) {

  return (
    <div className="bg-color-cover">
        {props.albumImages!==undefined? <img src={props.albumImages[0].url} className="bg-cover-img" alt="background-color"/>: <div></div>}
    </div>

  );
}