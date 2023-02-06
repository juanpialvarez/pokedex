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

    return{
        add: add,
        getAll: getAll
    };
})();

pokeRepository.add(new Pokemon("Bulbasaur", 2.04, ["Grass", "Poison"]))
pokeRepository.add(new Pokemon("Charmander", 2.00, ["Fire"]))
pokeRepository.add(new Pokemon("Squirtle", 1.08, ["Water"]))
pokeRepository.add(new Pokemon("Charizard", 5.07, ["Fire", "Flying"]))

let Charizard = new Pokemon("Charizard", 5.07, ["Fire", "Flying"])

printPokemons(pokeRepository.getAll());

function printPokemons(pokeList){ 
    pokeList.forEach(element => {
        let heighWrite = element.getHeight > 3 ?
        `Height: ${element.getHeight} - That's big`:
        `Height: ${element.getHeight}`
        document.write(`<p> Name: ${element.getName} 
        <br>
        ${heighWrite}
        <br>
        Type: ${element.getType}
        <br>
        <br>
        </p>`)  
    });   
}




