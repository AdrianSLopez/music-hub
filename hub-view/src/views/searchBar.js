import React from "react"

function handleSubmit(e) {
  // Prevent the browser from reloading the page
  e.preventDefault();

  // Read the form data
  const form = e.target;
  const formData = new FormData(form);

  console.log(formData.get('song'))

  // You can pass formData as a fetch body directly:
  // fetch(`/search/?song=youmightbesleeping`).then( response => {
  //   console.log(response)
  //   return response.json
  // })
}

const SearchBar = () => {
  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <input name="song" placeholder="Search for a song..."/>
      </form>
        
    </div>
  );
}

export default SearchBar;
