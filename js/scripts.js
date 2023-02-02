//Note

class Pokemon{
    constructor(name, height, type){
        this.name = name;
        this.height = height;
        this.type = type;
    }
}

let pokemon1 = new Pokemon("Bulbasaur", 2.04, ["Grass", "Poison"]);
let pokemon2 = new Pokemon("Charmander", 2, "Fire");
let pokemon3 = new Pokemon("Squirtle", 1.08, "Water");

let pokemonList = [pokemon1, pokemon2, pokemon3]

console.log(pokemonList)