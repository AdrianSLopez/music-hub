import React from "react"
  
export default function Logo(props) {
  const logoClick = () => {
    props.sendUrl('/topGlobalSongs')
    props.sendUserSearchTerm('Top global songs')
    props.sendChosenSongId(0)
  }

  return (
    <div className="logo-container">
        <p className="logo-title" onClick={logoClick}>Song search</p>
        <p className="logo-subtitle">by <a href="https://www.linkedin.com/in/adriansalgadocsula/">Adrian Salgado Lopez</a></p>
    </div>
  );
}