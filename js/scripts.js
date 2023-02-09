import Pokemon from "./pokemon.js";

let pokeRepository = (function () {
    let pokemonList = [];
    let apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=8&offset=0`

    function showNext(){
        return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.next) {
                apiUrl = data.next
            }
        })
    }

    function showPrevious(){
        
        return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if(data.previous){
                apiUrl = data.previous
            }  
        })
    }

    function addNavigation(){
        let container = document.getElementById('nav');
        let forwardButton = document.createElement('button');
        forwardButton.classList.add('nav-button')
        forwardButton.id = 'forward-button'
        forwardButton.addEventListener('click', ()=>{
            showNext()
            loadMain()
        });
        forwardButton.innerText = '>'
        let backButton = document.createElement('button')
        backButton.classList.add('nav-button')
        backButton.id = 'back-button'
        backButton.addEventListener('click', ()=>{
            showPrevious()
            loadMain()
        });
        backButton.innerText = '<'
        container.appendChild(backButton);
        container.appendChild(forwardButton);
    }
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
        let container = document.getElementById('pokemon-modal__container');
        container.innerHTML = ''
        let pokemonModal = document.createElement('div');
        pokemonModal.classList.add('pokemon-modal');
        let closeButton = document.createElement('button');
        closeButton.classList.add('pokemon-modal__close');
        closeButton.innerText = 'X';
        closeButton.addEventListener('click', () => {
            container.classList.remove('is-visible');
        })
        let title = document.createElement('h1');
        title.innerText = pokemon.getName;
        calpitalizeFirst(title);
        let text = document.createElement('h3')
        text.innerText = `Height: ${pokemon.getHeight}\n
        Type: ${pokemon.getType}`;
        let image = document.createElement('img');
        image.src = pokemon.getImage;
        image.classList.add('pokemon-image')
        container.appendChild(pokemonModal);
        pokemonModal.appendChild(closeButton);
        pokemonModal.appendChild(title);
        pokemonModal.appendChild(text);
        pokemonModal.appendChild(image);
        container.classList.add('is-visible');
        container.addEventListener('click', (action)=>{
            let target = action.target;
            if(target === container) container.classList.remove('is-visible');
        });
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

    window.addEventListener('keydown', (e) => {
        let container = document.querySelector('#pokemon-modal__container');
        if (e.key === 'Escape' && container.classList.contains('is-visible')) {
            container.classList.remove('is-visible');
        }
    });

    function loadMain(){ 
        pokemonList = [];
        let container = document.querySelector('.container');
        container.innerHTML = '';
        let title =  document.createElement('p');
        title.classList.add('pokedex-title');
        title.innerText = 'Pokedex';
        let list = document.createElement('ul');
        list.classList.add('pokemon-list');
        let navigation =  document.createElement('nav');
        navigation.id = 'nav'
        container.append(title);
        container.append(list);
        container.append(navigation);
        addNavigation()
        loadList()
        .then(() => {
            getAll().forEach(element => {
                addListItem(element);
            })
        });
    }

    return{
        loadMain: loadMain,
        addNavigation: addNavigation,
        getAll: getAll,
        loadList:loadList,
        add: add,
        addListItem: addListItem,
        loadDetails: loadDetails,
    };

})();

pokeRepository.loadMain()

