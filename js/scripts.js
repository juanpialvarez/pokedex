class Pokemon{
    constructor(name = null,
        height = null,
        types = null, 
        url = null){

        this.name = name;
        this.height = height;
        this.types = types;
        this.url = url;
    }

    get getName(){
        return this._name;
    }
    get getHeight(){
        return this._height;
    }
    get getType(){
        return this._type;
    }

    set name(newName){
        if (typeof newName === "string" || newName instanceof String) this._name = newName;
    }
    set height(newHeight){
        if (typeof newHeight === "number" || newHeight instanceof Number) this._height = newHeight;
    }
    set types(newTypes){
        if (Array.isArray(newTypes)) this._types = newTypes;
    }
    set url(newURL){
        if (typeof newURL === "string" || newURL instanceof String) this._url = newURL;
    }
}

let pokeRepository = (function () {
    let pokemonList = [];
    let apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${15}&offset=${0}`
    
    function loadList() {
        return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          data.results.forEach(item => {
            let pokemon = new Pokemon()
            pokemon.name= item.name,
            pokemon.url= item.url
            add(pokemon);
          });
        })
        .catch(e => console.log(e))
      }

    function add(pokemon) {
        let nullValue = false;
        Object.keys(pokemon).every(element => {
            if (pokemon[element] !== null) return true;
            nullValue = true;
            return false
        })
        if (pokemon instanceof Pokemon) pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function getByName(name){
        return pokemonList.filter(pokemonList => pokemonList.getName === name)
    }

    function addListItem(pokemon){
        let container = document.querySelector('.pokemon-list');
        let listElement = document.createElement('li');
        let button = document.createElement('button');
        console.log(pokemon.getName)
        button.innerText = pokemon.getName;
        button.classList.add('pokemon-button'); 
        container.appendChild(listElement).appendChild(button);
        button.addEventListener('click', () => {
            showDetails(pokemon)
        })        
    }

    function showDetails(pokemon){
        console.log(pokemon)
    }

    return{
        loadList:loadList,
        add: add,
        getAll: getAll,
        getByName: getByName,
        addListItem: addListItem
    };
})();

// pokeRepository.add(new Pokemon("Bulbasaur", 2.04, ["Grass", "Poison"]));
// pokeRepository.add(new Pokemon("Charmander", 2.00, ["Fire"]));
// pokeRepository.add(new Pokemon("Squirtle", 1.08, ["Water"]));
// pokeRepository.add(new Pokemon("Charizard", 5.07, ["Fire", "Flying"]));
pokeRepository.loadList()
.then(() => {
    pokeRepository.getAll().forEach(element => {
        console.log(element)
        pokeRepository.addListItem(element);
    })
})

printPokemons(pokeRepository.getAll());

function printPokemons(pokeList){ 
    pokeList.forEach(element => {
        console.log(element)
        pokeRepository.addListItem(element);
    });   
}

// fetch('https://pokeapi.co/api/v2/pokemon/?limit=15&offset=0',{
//     method: 'GET'
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch()
