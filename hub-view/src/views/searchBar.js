import React from "react"

export default function SearchBar(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const form = e.currentTarget;
    const formData = new FormData(form);
    const userInput = formData.get('song')

    if(userInput === '') return

    props.sendUserSearchTerm(userInput)
    props.sendChosenSongId(0)
    
    if(userInput.toLowerCase().split(' ').join('') === 'topglobalsongs') {
      props.sendUrl('/topGlobalSongs')
    }else {
      props.sendUrl(`/search/?song=${userInput}`)      
    }

    form[0].value = "";
  }

  return (
    <div className="searchBar-container">
      <form method="post" onSubmit={handleSubmit} >
        <input name="song" className="searchBar-input" placeholder={`${props.userSearchTerm}`}/>
      </form>
    </div>
  );
}
