"use strict";
const img = document.querySelector('#character-img');
const fullName = document.querySelector('#character-name');
const characterStatus = document.querySelector('#character-status');
const gender = document.querySelector('#character-gender');
const species = document.querySelector('#character-species');
const id = window.location.search.split('=')[1];
fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((res) => res.json())
    .then((data) => {
    img.src = data.image;
    fullName.textContent = data.name;
    characterStatus.textContent = data.status;
    gender.textContent = data.gender;
    species.textContent = data.species;
});
