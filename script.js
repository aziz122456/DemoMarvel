// Store the timestamp, API key, and hash value for making API requests to the Marvel API.
let timestamp = "1685949370592";
let apiKey = "b6f24f967eeba6468217f204ffe6c822";
let hashValue  = "f405bea536fae779d9f7928b8de65577"; 

// Reference different HTML elements in the document using their respective IDs or class names.
let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

// Create a new Date object representing the current date and time.
let date = new Date();

// Function to display words in the input box and remove elements.
function displayWords(value) {
  input.value = value;
  removeElements();
}

// Function to remove elements from the list container.
function removeElements() {
  listContainer.innerHTML = "";
}

// Event listener triggered when a key is released while the input element is focused.
input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }

  // Construct the API request URL using the provided parameters.
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  // Send an HTTP GET request to the API URL and retrieve the JSON response.
  const response = await fetch(url);
  const jsonData = await response.json();

  // Iterate over the results in the JSON data and create elements for each result.
  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

// Event listener triggered when the button element is clicked.
button.addEventListener("click", getRsult = async () => {
  if (input.value.trim().length < 1) {
    alert("Input cannot be blank");
  }
  showContainer.innerHTML = "";

  // Construct the API request URL using the provided parameters.
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

  // Send an HTTP GET request to the API URL and retrieve the JSON response.
  const response = await fetch(url);
  const jsonData = await response.json();

  // Iterate over the results in the JSON data and display the character information.
  jsonData.data["results"].forEach((element) => {
    showContainer.innerHTML = `<div class="card-container">
      <div class="container-character-image">
      <img src="${
        element.thumbnail["path"] + "." + element.thumbnail["extension"]
      }"/></div>
      <div class="character-name">${element.name}</div>
      <div class="character-description">${element.description}</div>
      </div>`;
  });
});

// Call the getRsult function when the window finishes loading.
window.onload = () => {
  getRsult();
};
