import Pokemon from "./pokemon.js";

let pokeRepository = (function () {
    let pokemonList = [];
    let apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=200&offset=0`
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
        listElement.classList.add('group-list-item')
        let button = document.createElement('button');
        button.innerText = pokemon.getName;
        button.classList.add('pokemon-button'); 
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.classList.add('btn-block-sm');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemon-modal');
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
        let title = document.getElementById('pokemon-modal-label');
        title.innerText = pokemon.getName
        calpitalizeFirst(title)
        let pokemonModal = document.querySelector('.modal-body');
        pokemonModal.innerHTML = '';
        let height = document.createElement('h3')
        height.innerText = `Height: ${pokemon.getHeight}\n
        Type: ${pokemon.getType}`;
        let image = document.createElement('img');
        image.src = pokemon.getImage;
        pokemonModal.appendChild(height)
        pokemonModal.appendChild(image)
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
            let types = [];
            data.types.forEach(element => {
                types.push(element.type.name)
            });
            pokemon.types = types;
        })
        .catch(e => console.log(e));
    }

    function nextPage(){
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.next) apiUrl = data.next
        })
        .then(()=>{
            pokemonList = []
            let list = document.querySelector('.pokemon-list');
            list.innerHTML = ''
            loadMain()
        })
        .catch(e => console.log(e))
    }

    function previousPage(){
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.previous) apiUrl = data.previous
        })
        .then(()=>{
            pokemonList = []
            let list = document.querySelector('.pokemon-list');
            list.innerHTML = ''
            loadMain()
        })
        .catch(e => console.log(e))
    }

    function loadMain(){  
        loadList()
            .then(()=>{
                getAll().forEach(pokemon => addListItem(pokemon));
            })
        let previous = document.getElementById('previous');
        let next = document.getElementById('next');
        previous.addEventListener('click', previousPage)
        next.addEventListener('click', nextPage)
        let search = document.querySelector('#search-submit');
        search.addEventListener('click', ()=>{
            searchPokemon();
        })
    }

    function searchPokemon(){
            let pokemon = document.getElementById('search').value;
            if(pokemon){
                pokemonList = []
                let list = document.querySelector('.pokemon-list');
                list.innerHTML = ''
                apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}/`;
                fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    let pokemon = new Pokemon()
                    pokemon.name= data.name,
                    pokemon.url= data.url
                    addListItem(pokemon);
                })
                .catch(e => console.log(e))
            }else{
                pokemonList = []
                let list = document.querySelector('.pokemon-list');
                list.innerHTML = ''
                apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=200&offset=0`
                loadMain()
            }
    }


    return{
        searchPokemon:searchPokemon,
        previousPage: previousPage,
        nextPage: nextPage,
        loadMain: loadMain,
        getAll: getAll,
        loadList:loadList,
        add: add,
        addListItem: addListItem,
        loadDetails: loadDetails,
    };

})();

pokeRepository.loadMain()

