// Load Large View of Pokemon Card

let currentPokemon;

const powerfulAndImportantMoves = ["hyper-beam", "blast-burn", "hydro-cannon", "frenzy-plant", "zap-cannon", "ice-burn", "focus-punch", "gunk-shot", "earthquake", "sky-attack", "psystrike", "megahorn", "rock-wrecker", "shadow-force", "draco-meteor", "hyperspace-fury", "doom-desire", "light-of-ruin", "tackle", "growl", "tail-whip", "water-gun", "bubble", "ember", "peck", "thunder-shock", "quick-attack", "gust", "confusion", "poison-sting", "bite", "vine-whip", "psychic", "hyper-fang", "screech", "flamethrower", "giga-impact", "prismatic-laser", "g-max-cannonade", "g-max-hydrosnipe", "g-max-one-blow", "g-max-rapid-flow", "protect", "recover", "toxic", "stealth-rock", "will-o-wisp", "thunder-wave", "rapid-spin", "dragon-dance", "volt-switch", "u-turn", "thunderbolt", "ice-beam", "earth-power", "close-combat", "swords-dance", "dragon-claw", "toxic-spikes", "spore", "explosion", "moonblast", "dark-pulse", "scald", "bullet-punch", "power-whip"];

async function loadAbout(pokemon) {
    let array = [];
    let abilityZero = '';
    let abilityOne = '';

    if (pokemon['abilities'] && pokemon['abilities'].length > 0 && pokemon['abilities'][0]['ability'] && pokemon['abilities'][0]['ability']['name']) {
        abilityZero = pokemon['abilities'][0]['ability']['name'];
    }
    if (pokemon['abilities'] && pokemon['abilities'].length > 1 && pokemon['abilities'][1]['ability'] && pokemon['abilities'][1]['ability']['name']) {
        abilityOne = pokemon['abilities'][1]['ability']['name'];
    }
    pushAboutToPokemonJSON(pokemon, array, abilityOne, abilityZero);
}

async function pushAboutToPokemonJSON(pokemon, array, abilityOne, abilityZero) {
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

function loadBigPokemonCard(i) {
    document.getElementById('big-pokemon-card-container').classList.remove('d-none');
    document.getElementById('body').classList.add('no-scroll');
    renderBigPokemonCard(i);
}

function renderBigPokemonCard(i) {
    document.getElementById('big-pokemon-card-container').innerHTML = renderBigPokemonCardHTML(i);
    renderMovesHTML(i);
    renderOtherMovesHTML(i);
    renderChart(i);
    bigShowColorTypeOne(i);
}

function bigShowColorTypeOne(i) {
    let foundFirstType = false; // Initialisierung der Flag-Variable
    for (let j = 0; j < types.length; j++) {
        let typeName = types[j];
        if (pokemonJSON['types'][i - 1]['0']['type']['name'] == typeName) {
            let color = colors[j];
            let colorLight = colorsLight[j];
            document.getElementById(`big-pokemon-card${i}`).style.background = `radial-gradient(ellipse at ${offsetX} bottom, ${color}, ${colorLight}, black, ${color})`;
            document.getElementById(`big-card-type-1-${i}`).style.backgroundColor = `${colorLight}`;
            foundFirstType = true; // Setze die Flag auf true, da der erste Typ gefunden wurde
            break;
        }
    }
    bigShowColorTypeTwo(i);
}

function bigShowColorTypeTwo(i) {
    if (pokemonJSON['types'][i - 1].length > 1) {
        for (let j = 0; j < types.length; j++) {
            let typeName = types[j];
            let colorLight = colorsLight[j];
            if (pokemonJSON['types'][i - 1]['1']['type']['name'] == typeName) {
                document.getElementById(`big-card-type-2-${i}`).style.backgroundColor = `${colorLight}`;
                document.getElementById(`big-card-type-2-${i}`).innerHTML = `${pokemonJSON['types'][i - 1]['1']['type']['name']}`;
                return;
            }
        }
    }
    document.getElementById(`big-card-type-2-${i}`).innerHTML = '';
}

async function renderMovesHTML(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    let movesHTML = '';
    for (let j = 0; j < pokemon['moves'].length; j++) {
        const move = await pokemon['moves'][j]['move']['name'];
        if (powerfulAndImportantMoves.includes(move)) {
            movesHTML += '<li>' + move + '</li>';
            document.getElementById('powerful-moves').innerHTML = movesHTML;
        }
    }
}

async function renderOtherMovesHTML(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    let movesHTML = '';
    for (let j = 0; j < pokemon['moves'].length; j++) {
        const move = await pokemon['moves'][j]['move']['name'];
        if (!-powerfulAndImportantMoves.includes(move)) {
            movesHTML += '<li>' + move + '</li>';
            document.getElementById('other-moves').innerHTML = movesHTML;
        }
    }
}

function arrowLeft(i) {
    if (i > 1) {
        i--;
    } else if (i === 1) {
        i = pokemonsLength - 1;
    }
    renderBigPokemonCard(i);
}

function arrowRight(i) {
    if (i < pokemonsLength - 1) {
        i++;
    } else if (i === pokemonsLength - 1) {
        i = 1;
    }
    renderBigPokemonCard(i);
}

function selectInfoSection(selected) {
    addAndRemoveBorders(selected);
    let options = ['about', 'stats', 'moves']
    for (let i = 0; i < options.length; i++) {
        const optionsH2 = `${options[i]}-h2`;
        const optionsContent = options[i];
        if (optionsContent !== selected) {
            notSelectedH2(selected, optionsH2, optionsContent);
        }
        if (optionsContent == selected) {
            selectedH2(selected, optionsH2, optionsContent);
        }
        if (selected == 'about') {
            selectedAbout();
        }
        if (selected == 'moves') {
            selectedMoves();
        }
        if (selected == 'stats') {
            selectedStats();
        }
    }
}

function addAndRemoveBorders(selected) {
    document.getElementById(`${selected}-h2`).classList.add('border-side-and-top');
    document.getElementById(`${selected}-h2`).classList.remove('border-bottom');
    document.getElementById(selected).classList.remove('d-none');
}

function notSelectedH2(selected, optionsH2, optionsContent) {
    document.getElementById(optionsH2).classList.remove('border-side-and-top');
    document.getElementById(optionsH2).classList.add('border-bottom');
    document.getElementById(optionsContent).classList.add('d-none');
    document.getElementById(optionsH2).style.color = 'var(--zinc-333)';
    const element = document.getElementById(optionsH2);
    element.addEventListener('mouseenter', function () {
        if (optionsContent !== selected) {
            this.style.color = '#fff';
        }
    });
    element.addEventListener('mouseleave', function () {
        if (optionsContent !== selected) {
            this.style.color = 'var(--zinc-333)';
        }
    });
}

function selectedH2(selected, optionsH2, optionsContent) {
    document.getElementById(optionsH2).style.color = 'var(--zinc-767)';
    const element = document.getElementById(optionsH2);
    element.addEventListener('mouseenter', function () {
        if (optionsContent == selected) {
            this.style.color = 'var(--zinc-767)';
        }
    });
    element.addEventListener('mouseleave', function () {
        if (optionsContent == selected) {
            this.style.color = 'var(--zinc-767)';
        }
    });
}

function selectedAbout() {
    document.getElementById('outer-info-section-main').style.borderTopLeftRadius = '0';
    document.getElementById('outer-info-section-main').style.borderTopRightRadius = 'var(--border-radius)';
}

function selectedMoves() {
    document.getElementById('outer-info-section-main').style.borderTopRightRadius = '0';
    document.getElementById('outer-info-section-main').style.borderTopLeftRadius = 'var(--border-radius)';
}

function selectedStats() {
    document.getElementById('outer-info-section-main').style.borderTopRightRadius = 'var(--border-radius)';
    document.getElementById('outer-info-section-main').style.borderTopLeftRadius = 'var(--border-radius)';
}

function closeLargeDisplay() {
    document.getElementById('big-pokemon-card-container').classList.add('d-none');
    document.getElementById('body').classList.remove('no-scroll');
}

function doNotClose(event) {
    event.stopPropagation();
}