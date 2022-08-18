let canvas;
let SPRITE_PATH_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
let bulbasaur = null;
let pokemonName = [];
let weight= null;
let abl = null;


function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}

function draw() {
    //background(0, 50);
    background(0);
    newCursor();
    

    if(pokemonName.length > 8){
        fill(255);
        textSize(24);
        pokemonName.forEach((element, index) => {
            if((index%2)== 0){
                element.x = 50;
                element.y = 45*index;
                text(element.name, 140, 45*index+35);
                image(element.pImage, element.x, element.y, 80, 80);
                
            } else {
                element.x = 350;
                element.y = 45*index;
                text(element.name, 450, 45*index+35);
                image(element.pImage, element.x, element.y, 80, 80);
            }
        
        });
        
        //image(bulbasaur.pImage, 50,40,80,80);
    }

    if (weight !== null){
        text(weight, 800, 30);
        text(abl,800,55);
    }


    
}

function mouseClicked(){
    if(pokemonName.length === 0){
        getPokemonList()
    }else{
        getPokemonInfo()
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}

async function getPokemonInfo(){
    pokemonName.forEach(async (element) => {
        if (dist(mouseX, mouseY, element.x, element.y)<150){
            const POKEAPI_LIST_URL = 'https://pokeapi.co/api/v2/pokemon/'+element.name;
    const query = await fetch(POKEAPI_LIST_URL);
    const data = await query.json();
    const ability = data.abilities[0];
    abl = ability.ability.name;
    weight = data.weight;
    
        }
    });

}

async function getPokemonList(){
    const POKEAPI_LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
    const query = await fetch(POKEAPI_LIST_URL);
    const data = await query.json();
    const { results } = data;
/*
    console.log(data);
    console.table(results);
    console.log(results[0].name);*/

    for (let i = 0; i < 9; i++) {
        let pokemon = results[i];
    //console.log(results[0]);
    //console.log(bulbasaur);
    //console.log(bulbasaur.url);
    let temporaryArray = pokemon.url.split('/');
    //console.log(temporaryArray);
    //console.log(bulbasaur);
    pokemon.sprite =  SPRITE_PATH_URL + temporaryArray[6] + '.png';

    loadImage(pokemon.sprite, image => {
        pokemon.pImage = image;
        pokemonName.push(pokemon);
    });    
    }

    /*let pokemon = results[0];
    //console.log(results[0]);
    //console.log(bulbasaur);
    //console.log(bulbasaur.url);
    let temporaryArray = pokemon.url.split('/');
    //console.log(temporaryArray);
    //console.log(bulbasaur);
    pokemon.sprite =  SPRITE_PATH_URL + temporaryArray[6] + '.png';
    //console.log(bulbasaur);
    loadImage(pokemon.sprite, image => {
        pokemon.pImage = image;
        console.log(pokemon);
        bulbasaur = pokemon;
    });*/

}
