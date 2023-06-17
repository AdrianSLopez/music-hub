import React from "react"

function handleSubmit(e) {
  // Prevent the browser from reloading the page
  e.preventDefault();

  // Read the form data
  const form = e.target;
  const formData = new FormData(form);

  console.log(form.method);
  console.log(formData)

  // You can pass formData as a fetch body directly:
  fetch(`/search/?song=youmightbesleeping`, { method: form.method, body: formData });

  // Or you can work with it as a plain object:
  // const formJson = Object.fromEntries(formData.entries());
  // console.log(formJson);
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
