import Pokemon from "./pokemon.js";

let pokeRepository = (function () {
    let pokemonList = [];
    let apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=15&offset=${0}`

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

    function addListItem(pokemon){
        let container = document.querySelector('.pokemon-list');
        let listElement = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.getName;
        button.classList.add('pokemon-button'); 
        container.appendChild(listElement).appendChild(button);
        button.addEventListener('click', () => {
            loadDetails(pokemon)
            .then(() => showDetails(pokemon));    
        })
        calpitalizeFirst(button);     
    }

    function calpitalizeFirst(element){
        element.innerText = element.innerText.charAt(0).toLocaleUpperCase() + element.innerText.slice(1);
    }

    function showDetails(pokemon){
        console.log(pokemon);
    }

    function getAll(){
        return pokemonList;
    }

    function loadDetails(pokemon){
        let url = pokemon.getUrl;
        return fetch(url)
        .then(response => response.json())
        .then(data => {
            pokemon.image = data.sprites.front_default;
            pokemon.height = data.height;
            pokemon.types = data.types;
        })
        .catch(e => console.log(e));
    }

    return{
        getAll: getAll,
        loadList:loadList,
        add: add,
        addListItem: addListItem,
        loadDetails: loadDetails,
    };
})();


pokeRepository.loadList()
.then(() => {
    pokeRepository.getAll().forEach(element => {
        pokeRepository.addListItem(element);
    })
})


