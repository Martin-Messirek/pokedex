// Load Large View of Pokemon Card

let currentPokemon;
const powerfulAndImportantMoves = ["hyper-beam", "blast-burn", "hydro-cannon", "frenzy-plant", "zap-cannon", "ice-burn",
    "focus-punch", "gunk-shot", "earthquake", "sky-attack", "psystrike", "megahorn", "rock-wrecker", "shadow-force",
    "draco-meteor", "hyperspace-fury", "doom-desire", "light-of-ruin", "tackle", "growl", "tail-whip", "water-gun",
    "bubble", "ember", "peck", "thunder-shock", "quick-attack", "gust", "confusion", "poison-sting", "bite", "vine-whip",
    "psychic", "hyper-fang", "screech", "flamethrower"];

async function pushAboutToPokemonJSON(pokemon) {
    let array = [];
    let abilityZero = '';
    let abilityOne = '';

    if (pokemon['abilities'] && pokemon['abilities'].length > 0 && pokemon['abilities'][0]['ability'] && pokemon['abilities'][0]['ability']['name']) {
        abilityZero = pokemon['abilities'][0]['ability']['name'];
    }
    if (pokemon['abilities'] && pokemon['abilities'].length > 1 && pokemon['abilities'][1]['ability'] && pokemon['abilities'][1]['ability']['name']) {
        abilityOne = pokemon['abilities'][1]['ability']['name'];
    }

    const height = await pokemon['height'];
    const weight = await pokemon['weight'];

    array.push(abilityZero);
    array.push(abilityOne);
    array.push(height * 10); // in cm
    array.push(weight / 10); // in kg

    pokemonJSON.about.push(array);
}


async function pushStatsToPokemonJSON(pokemon) {
    let array = [];
    const hitPoints = await pokemon['stats']['0']['base_stat'];
    const attack = await pokemon['stats']['1']['base_stat']
    const defense = await pokemon['stats']['2']['base_stat'];
    const specialAttack = await pokemon['stats']['3']['base_stat'];
    const specialDefense = await pokemon['stats']['4']['base_stat'];
    const speed = await pokemon['stats']['5']['base_stat'];
    array.push(hitPoints);
    array.push(attack);
    array.push(defense);
    array.push(specialAttack);
    array.push(specialDefense);
    array.push(speed);
    pokemonJSON.stats.push(array);
}

async function pushMovesToPokemonJSON(pokemon) {
    let array = [];
    for (let i = 0; i < pokemon['moves'].length; i++) {
        const move = await pokemon['moves'][i]['move']['name'];
        // console.log(move)
        if (powerfulAndImportantMoves.includes(move)) {
            array.push(move);
        }
    }
    pokemonJSON.moves.push(array)
    // console.log(array)
}

// document.getElementById('card-container').addEventListener('click', function (event) {
//     console.log('clicked')
//     if (event.target.classList.contains('card')) {
//         console.log('Card clicked');
//         // Here you can access the clicked card's ID and dataset
//         const cardId = event.target.id;
//         const cardPokemon = event.target.dataset.pokemon;
//         loadBigPokemonCard(cardId, cardPokemon);
//     }
// });


function loadBigPokemonCard(i, pokemon) {
    console.log(i)
    // console.log(pokemon);
    document.getElementById('big-pokemon-card-container').classList.remove('d-none');
    document.getElementById('body').classList.add('no-scroll');


    // console.log(currentPokemon);
    renderBigPokemonCard(i, pokemon);
}

function renderBigPokemonCard(i, pokemon) {
    console.log(i)
    document.getElementById('big-pokemon-card-container').innerHTML = renderBigPokemonCardHTML(i, pokemon);
    bigShowColorTypeOne(i, pokemon)
}

function bigShowColorTypeOne(i, pokemon) {
    let foundFirstType = false; // Initialisierung der Flag-Variable
    for (let j = 0; j < types.length; j++) {
        let typeName = types[j];
        // let color = colors[j];
        // let colorLight = colorsLight[j];
        console.log(pokemonJSON['types'][i])

        // if (pokemonJSON['types'] && pokemonJSON['types'].length > 0 && pokemonJSON['types']['0']['type'] && pokemonJSON['types']['0']['type']['name']) {

        if (pokemonJSON['types'][i]['0']['type']['name'] == typeName) {
            let color = colors[j];
            let colorLight = colorsLight[j];
            console.log('Type One Big')
            document.getElementById(`big-pokemon-card${i}`).style.background = `radial-gradient(ellipse at ${offsetX} bottom, ${color}, ${colorLight}, black, ${color})`;
            document.getElementById(`big-card-type-1-${i}`).style.backgroundColor = `${colorLight}`;
            foundFirstType = true; // Setze die Flag auf true, da der erste Typ gefunden wurde
            break;
        }
        // }


    }
    bigShowColorTypeTwo(i, pokemon);

}

function bigShowColorTypeTwo(i, pokemon) {
    if (pokemonJSON['types'][i].length > 1) {
        for (let j = 0; j < types.length; j++) {
            let typeName = types[j];
            let colorLight = colorsLight[j];
            if (
                // pokemonJSON['types'] && pokemonJSON['types'].length > 1 && pokemonJSON['types']['1']['type'] && pokemonJSON['types']['1']['type']['name']) {
                //  && 
                pokemonJSON['types'][i]['1']['type']['name'] == typeName) {
                document.getElementById(`big-card-type-2-${i}`).style.backgroundColor = `${colorLight}`;
                document.getElementById(`big-card-type-2-${i}`).innerHTML = `${pokemonJSON['types'][i]['1']['type']['name']}`;
                // foundSecondType = true;
                return;
            }
        }

    }
    document.getElementById(`big-card-type-2-${i}`).innerHTML = '';
}














// function bigShowColorTypeOne(i, pokemon) {
//     let foundFirstType = false; // Initialisierung der Flag-Variable
//     for (let j = 0; j < types.length; j++) {
//         let typeName = types[j];
//         // let color = colors[j];
//         // let colorLight = colorsLight[j];
//         console.log(pokemon['types'])

//         if (pokemon['types'] && pokemon['types'].length > 0 && pokemon['types']['0']['type'] && pokemon['types']['0']['type']['name']) {

//             if (pokemon['types']['0']['type']['name'] == typeName) {
//                 let color = colors[j];
//                 let colorLight = colorsLight[j];
//                 console.log('Type One Big')
//                 document.getElementById(`big-pokemon-card${i}`).style.background = `radial-gradient(ellipse at ${offsetX} bottom, ${color}, ${colorLight}, black, ${color})`;
//                 document.getElementById(`big-card-type-1-${i}`).style.backgroundColor = `${colorLight}`;
//                 foundFirstType = true; // Setze die Flag auf true, da der erste Typ gefunden wurde
//                 break;
//             }
//         }


//     }
//     bigShowColorTypeTwo(i, pokemon);

// }

// function bigShowColorTypeTwo(i, pokemon) {
//     let foundSecondType = false;
//     for (let j = 0; j < types.length; j++) {
//         let typeName = types[j];
//         let colorLight = colorsLight[j];
//         if (pokemon['types'] && pokemon['types'].length > 1 && pokemon['types']['1']['type'] && pokemon['types']['1']['type']['name']) {
//             if (pokemon['types'].length > 1 && pokemon['types']['1']['type']['name'] == typeName) {
//                 document.getElementById(`big-card-type-2-${i}`).style.backgroundColor = `${colorLight}`;
//                 document.getElementById(`big-card-type-2-${i}`).innerHTML = `${pokemon['types']['1']['type']['name']}`;
//                 foundSecondType = true;
//                 break;
//             }
//         }
//     }
// }










function closeLargeDisplay() {
    document.getElementById('big-pokemon-card-container').classList.add('d-none');
    document.getElementById('body').classList.remove('no-scroll');
}

function doNotClose(event) {
    event.stopPropagation();
}