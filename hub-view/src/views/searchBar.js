import React, { useState } from "react"
import SearchResults from "./searchResults";

export default function SearchBar() {
  const [songs, setSongs] = useState([])
  // console.log(songs)
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    
    if(formData.get('song') === ''){
      console.log("No song inputted")
      return
    }
    
    fetch(`/search/?song=${formData.get('song')}`)
      .then(response => {
          return response.json()
      }).then(data => {
          setSongs(data.filteredTracks)
      })
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <input name="song" placeholder="Search for a song..."/>
      </form>
      
      {songs.length === 0? <SearchResults />: <SearchResults results={songs}/>}
    </div>
  );
}
