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

async function loadLargeDisplay(i, pokemon) {
    document.getElementById('large-display-background').classList.remove('d-none');
    document.getElementById('body').classList.add('no-scroll');

    let url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    let response = await fetch(url);
    currentPokemon = await response.json();
    // console.log(currentPokemon);
    renderPokemonInfo(i, pokemon);
}

function renderPokemonInfo() {
    document.getElementById('pokemon-name').innerHTML = currentPokemon['name'];
    document.getElementById('pokemon-image').src = currentPokemon['sprites']['other']['home']['front_default'];
    // console.log(currentPokemon['sprites']['other']['home']['front_default']);
}



function closeLargeDisplay() {
    document.getElementById('loading-screen').classList.add('d-none');
    document.getElementById('body').classList.remove('no-scroll');
}