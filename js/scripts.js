class Pokemon{
    constructor(name, height, types){
        this.name = name;
        this.height = height;
        this.types = types;
    }
}

let pokemonList = [
new Pokemon("Bulbasaur", 2.04, ["Grass", "Poison"]),
new Pokemon("Charmander", 2.00, ["Fire"]),
new Pokemon("Squirtle", 1.08, ["Water"]),
new Pokemon("Charizard", 5.07, ["Fire", "Flying"])
];

console.log(divide(4, 2));
console.log(divide(7, 0));
console.log(divide(1, 4));
console.log(divide(12, -3));

function printPokemons( pokeList){    
    for (let index = 0; index < pokeList.length; index++) {
        let heighWrite = pokeList[index].height > 3 ?
        `Height: ${pokeList[index].height} - That's big`:
        `Height: ${pokeList[index].height}`
        document.write(`<p> Name: ${pokeList[index].name} 
        <br>
        ${heighWrite}
        <br>
        Type: ${pokeList[index].types}
        <br>
        <br>
        </p>`)    
    }
}

printPokemons(pokemonList);

function divide(numer, denomin){
    if (denomin === 0) {
        console.log("Trying to divide by 0");
        return;
    }
    return numer / denomin;
}



