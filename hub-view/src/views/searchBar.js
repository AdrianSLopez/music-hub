import React from "react"

export default function SearchBar(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const userInput = formData.get('song')

    if(userInput === '') return
    
    fetch(`/search/?song=${userInput}`)
      .then(response => {
          return response.json()
      })
      .then(data => {
          props.sendSongResults(data.filteredTracks)
      })
      .catch( e => { 
        console.log(e)
      })
  }

  return (
    <div className="searchBar-container">
      <form method="post" onSubmit={handleSubmit}>
        <input name="song" placeholder="Search for a song..."/>
      </form>
    </div>
  );
}
