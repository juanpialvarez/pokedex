class Pokemon{
    constructor(name, height, types){
        this.name = name;
        this.height = height;
        this.types = types;
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
}

let pokeRepository = (function () {
    let pokemonList = [];

    function add(pokemon) {
        let nullValue = false;
        Object.keys(pokemon).every(element => {
            if (pokemon[element] !== null) return true;
            nullValue = true;
            return false
        })
        if (pokemon instanceof Pokemon && Object.keys(pokemon).length === 3 && nullValue === false) pokemonList.push(pokemon);
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
        button.innerText = pokemon.getName;
        button.classList.add('pokemon-button'); 
        let dropdown = document.createElement('li');
        dropdown.classList.add('extra-info');
        dropdown.classList.add('is-visible');
        let dropdownList = document.createElement('ul');
        dropdownList.classList.add('attribute-list')
        Object.keys(pokemon).forEach(attribute => {
            let attributeValue = attribute === '_height' && pokemon[attribute] > 3 ? `${pokemon[attribute]} - big` : pokemon[attribute];
            let listAttribute = document.createElement('li');
            listAttribute.classList.add('attribute');
            listAttribute.innerText = `${attribute.charAt(1).toUpperCase() + attribute.slice(2)}: ${attributeValue}`;
            dropdownList.appendChild(listAttribute);
        })
        dropdown.appendChild(dropdownList);
        container.appendChild(listElement).appendChild(button);
        container.append(dropdown);
        

    }
    return{
        add: add,
        getAll: getAll,
        getByName: getByName,
        addListItem: addListItem
    };
})();

pokeRepository.add(new Pokemon("Bulbasaur", 2.04, ["Grass", "Poison"]));
pokeRepository.add(new Pokemon("Charmander", 2.00, ["Fire"]));
pokeRepository.add(new Pokemon("Squirtle", 1.08, ["Water"]));
pokeRepository.add(new Pokemon("Charizard", 5.07, ["Fire", "Flying"]));

printPokemons(pokeRepository.getAll());

function printPokemons(pokeList){ 
    pokeList.forEach(element => {
        pokeRepository.addListItem(element);
    });   
}



let buttons = document.querySelectorAll('.pokemon-button')
buttons.forEach(button => {
    button.addEventListener('click',  () => {
        let listItem = button.parentElement;
        listItem.nextElementSibling.classList.toggle('is-visible');
      }); 
});
