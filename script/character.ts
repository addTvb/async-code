const img = document.querySelector('#character-img') as HTMLImageElement;
const fullName = document.querySelector('#character-name') as HTMLSpanElement;
const characterStatus = document.querySelector('#character-status') as HTMLSpanElement;
const gender = document.querySelector('#character-gender') as HTMLSpanElement;
const species = document.querySelector('#character-species') as HTMLSpanElement;

const id = window.location.search.split('=')[1];

interface ICharacter {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: string[];
	url: string;
	created: string;
}

fetch(`https://rickandmortyapi.com/api/character/${id}`)
	.then((res) => res.json())
	.then((data: ICharacter) => {
		img.src = data.image;
		fullName.textContent = data.name;
		characterStatus.textContent = data.status;
		gender.textContent = data.gender;
		species.textContent = data.species;
	});
