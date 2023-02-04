
async function fetchPokemon(pokemon) {
    const endpoint = new URL(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const response = await fetch(endpoint);
    const pokemonData = await response.json();
    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonImage.id = 'pokemon-image';
    document.getElementById('pokedex-image').appendChild(pokemonImage);
    document.querySelector('#pokemon-name').innerText = pokemonData.name;
    document.querySelector('#height').innerText = pokemonData.height;
    let type = "";
    const pokemonTypes = pokemonData.types;
    for (let index = 0; index < pokemonTypes.length; index++) {
        type = `${type} ${pokemonData.types[index].type.name}`;
    }
    document.querySelector('#type').innerText = type;
}
document.querySelector('#button-submit').addEventListener('click', () => {
    let pokemonImage = document.getElementById('pokemon-image') ? document.getElementById('pokemon-image') : false;
    if (pokemonImage) {
        document.getElementById('pokedex-image').removeChild(pokemonImage);
    }
    let pokemon = document.querySelector('#pokemon').value; 
    pokemon = pokemon.toLowerCase();
    fetchPokemon(pokemon);
})

class Pokemon{
    constructor(name, height, types){
        this.name = name;
        this.height = height;
        this.types = types;
    }
}

let pokemonList = [];

console.log(document.querySelector('#height').textContent);

document.querySelector('#button-add').addEventListener('click', () => { 
    let newPokemon= new Pokemon( document.querySelector('#pokemon-name').textContent,
    document.querySelector('#height').textContent,
    document.querySelector('#type').textContent); 
    let nameList = [];
    for (let index = 0; index < pokemonList.length; index++) {
        nameList.push(pokemonList[index].name)
    }
    if (!nameList.includes(newPokemon.name)) {
        pokemonList.push(newPokemon)
    }    
})

document.querySelector('#button-remove').addEventListener('click', () => { 
    let pokemonName= document.querySelector('#pokemon-name').textContent;
    let nameList = [];
    for (let index = 0; index < pokemonList.length; index++) {
        nameList.push(pokemonList[index].name)
    }
    pokemonList.splice(nameList.indexOf(pokemonName), 1) 
})

