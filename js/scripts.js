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

for (let index = 0; index < pokemonList.length; index++) {
    let heighWrite = pokemonList[index].height > 3 ?
    `Height: ${pokemonList[index].height} - That's big`:
    `Height: ${pokemonList[index].height}`
    document.write(`<p> Name: ${pokemonList[index].name} 
    <br>
    ${heighWrite}
    <br>
    Type: ${pokemonList[index].types}
    <br>
    <br>
    </p>`)    
}
