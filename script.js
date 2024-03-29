// /* Responsive Design */

// function showMenu() {
//     // document.getElementById('overlay-menu').classList.add('show-overlay-menu');
//     document.getElementById('overlay-menu').classList.remove('overlay-menu-d-none');
// }
// function closeMenu() {
//     // document.getElementById('overlay-menu').classList.remove('show-overlay-menu');
//     document.getElementById('overlay-menu').classList.add('overlay-menu-d-none');
// }

// /* function getId(id) {
//     return document.getElementById(id);
// } 
// Plus bei Zahlen
// function getPriceFromInput() {
//     let price = +getValueFromInput('price');
//     return price;   
// }

// For-Schleife:

// f o r down enter i left tab Arrayname left tab Elementname
// */

let pokemons = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard', 'squirtle', 'wartortle', 'blastoise', 'caterpie', 'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'ekans', 'arbok', 'pikachu', 'raichu', 'sandshrew', 'sandslash', 'nidoran-f', 'nidorina', 'nidoqueen', 'nidoran-m', 'nidorino', 'nidoking', 'clefairy', 'clefable', 'vulpix', 'ninetales', 'jigglypuff', 'wigglytuff', 'zubat', 'golbat', 'oddish', 'gloom', 'vileplume', 'paras', 'parasect', 'venonat', 'venomoth', 'diglett', 'dugtrio', 'meowth', 'persian', 'psyduck', 'golduck', 'mankey', 'primeape', 'growlithe', 'arcanine', 'poliwag', 'poliwhirl', 'poliwrath', 'abra', 'kadabra', 'alakazam', 'machop', 'machoke', 'machamp', 'bellsprout', 'weepinbell', 'victreebel', 'tentacool', 'tentacruel', 'geodude', 'graveler', 'golem', 'ponyta', 'rapidash', 'slowpoke', 'slowbro', 'magnemite', 'magneton', 'farfetchd', 'doduo', 'dodrio', 'seel', 'dewgong', 'grimer', 'muk', 'shellder', 'cloyster', 'gastly', 'haunter', 'gengar', 'onix', 'drowzee', 'hypno', 'krabby', 'kingler', 'voltorb', 'electrode', 'exeggcute', 'exeggutor', 'cubone', 'marowak', 'hitmonlee', 'hitmonchan', 'lickitung', 'koffing', 'weezing', 'rhyhorn', 'rhydon', 'chansey', 'tangela', 'kangaskhan', 'horsea', 'seadra', 'goldeen', 'seaking', 'staryu', 'starmie', 'mr-mime', 'scyther', 'jynx', 'electabuzz', 'magmar', 'pinsir', 'tauros', 'magikarp', 'gyarados', 'lapras', 'ditto', 'eevee', 'vaporeon', 'jolteon', 'flareon', 'porygon', 'omanyte', 'omastar', 'kabuto', 'kabutops', 'aerodactyl', 'snorlax', 'articuno', 'zapdos', 'moltres', 'dratini', 'dragonair', 'dragonite', 'mewtwo', 'mew'];



let types = ['water', 'grass', 'fire', 'bug', 'normal', 'poison', 'electric', 'ground', 'fairy', 'fighting', 'rock', 'psychic', 'ice', 'dragon', 'flying', 'ghost', 'dark', 'steel'];

let colors = ['var(--water-2)', 'var(--grass-2)', 'var(--fire-2)', 'var(--bug-2)', 'var(--normal-2)', 'var(--poison-2)', 'var(--electric-2)', 'var(--ground-2)', 'var(--fairy-2)', 'var(--fighting-2)', 'var(--rock-2)', 'var(--psychic-2)', 'var(--ice-2)', 'var(--dragon-2)', 'var(--flying-2)', 'var(--ghost-2)', 'var(--dark-2)', 'var(--steel-2)'];

let colorsLight = ['var(--water-3)', 'var(--grass-3)', 'var(--fire-3)', 'var(--bug-3)', 'var(--normal-3)', 'var(--poison-3)', 'var(--electric-3)', 'var(--ground-3)', 'var(--fairy-3)', 'var(--fighting-3)', 'var(--rock-3)', 'var(--psychic-3)', 'var(--ice-3)', 'var(--dragon-3)', 'var(--flying-3)', 'var(--ghost-3)', 'var(--dark-3)', 'var(--steel-3)'];


let currentIndex = 0;
let offsetX = '400px';
let chevronUp = getId('chevron-up');
function getId(id) {
    return document.getElementById(id);
}
// Scroll to Top of Page

window.onscroll = function () {
    if (window.scrollY > 600) {
        chevronUp.style.display = 'flex';
    } else {
        chevronUp.style.display = 'none';
    }
}

// Input Field Autocomplete Suggestions

let input = getId('name');
let suggestions = getId('suggestions');
let xMark = getId('x-mark-suggestions');

input.addEventListener('input', function () {
    let searchInput = this.value.toLowerCase();
    let matches = [];
    for (let i = 0; i < pokemons.length; i++) {
        if (pokemons[i].startsWith(searchInput)) {
            matches.push(capitalize(pokemons[i]));
        }
        if (matches.length === 8) {
            break;
        }
    }
    if (matches.length > 0) {
        displaySuggestions(matches);
    } else {
        clearSuggestions();
    }
});

function displaySuggestions(matches) {
    xMark.innerHTML = `<img class="cursor" src="./icons/circle-xmark-regular.svg" alt="X-Mark"></img>`;
    let suggestionsHTML = '';

    for (let i = 0; i < matches.length; i++) {
        suggestionsHTML += '<div class="suggestion">' + matches[i] + '</div>';
    }
    suggestions.innerHTML = suggestionsHTML;
    suggestionElements.style.boxShadow = 'box-shadow: 14px 14px 2px 1px rgba(89, 14, 129, 0.2)';

    let suggestionElements = document.querySelectorAll('.suggestion');
    for (let i = 0; i < suggestionElements.length; i++) {
        suggestionElements[i].addEventListener('click', function () {
            input.value = this.textContent;
            clearSuggestions();
        });
    }
}

function clearSuggestions() {
    suggestions.innerHTML = '';
    suggestions.style.boxShadow = 'none';
    xMark.innerHTML = '';
}

// function displaySuggestions(matches) {
//     let suggestionsHTML = '';
//     for (let i = 0; i < matches.length; i++) {
//         suggestionsHTML += '<div class="suggestion">' + matches[i] + '</div>';
//     }
//     suggestions.innerHTML = suggestionsHTML;

//     let suggestionElements = document.querySelectorAll('.suggestion');
//     for (let i = 0; i < suggestionElements.length; i++) {
//         suggestionElements[i].addEventListener('click', function () {
//             input.value = this.textContent;
//             clearSuggestions();
//         });
//     }
// }

// function clearSuggestions() {
//     suggestions.innerHTML = '';
// }

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}




function renderButtons() {
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        getId('type-btn-container').innerHTML += renderButtonsHTML(type);
    }

}




async function init() {
    getId('type-card-container').innerHTML = '';
    for (i = currentIndex; i < currentIndex + 20 && i < pokemons.length; i++) {
        await loadSmallCards(i);
    }
    currentIndex += 20;
    if (currentIndex > pokemons.length - 1) {
        getId('card-btn').setAttribute('disabled', 'true');
        getId('card-btn').style.cursor = 'default';
        getId('card-btn').style.pointerEvents = 'none'; // removes :hover and :active
        getId('card-btn').style.display = 'none';
        // console.log('disabled')
        // getId('card-btn').style.curser = 'default';
    }
}

async function loadSmallCards(i) {
    // console.log('load');
    const element = pokemons[i];
    let url = `https://pokeapi.co/api/v2/pokemon/${element}`;
    let response = await fetch(url);

    if (!response.ok) {
        console.error('Fehler beim Laden von Daten für Pokemon:', element);
        return;
    }
    let pokemon = await response.json();
    // console.log(pokemon)
    renderSmallCards(i, pokemon)
}


function renderSmallCards(i, pokemon) {
    getId('card-container').innerHTML += renderSmallCardsHTML(i, pokemon);
    showColorTypeOne(i, pokemon);
}


function showColorTypeOne(i, pokemon) {
    for (let j = 0; j < types.length; j++) {
        let typeName = types[j];
        let color = colors[j];
        let colorLight = colorsLight[j];

        if (pokemon['types']['0']['type']['name'] == `${typeName}`) {
            getId(`card${i}`).style.background = `radial-gradient(ellipse at ${offsetX} bottom, ${color}, ${colorLight}, black, ${color})`;
            //     getId(`card-type-1-${i}`).style.backgroundColor = `${colorLight}`;
            // }

            // if (pokemon['types']['0']['type']['name'] == `${typeName}`) {
            // getId(`card${i}`).style.background = `radial-gradient(ellipse at ${offsetX} bottom, ${color}, ${colorLight}, ${color},  ${colorLight}, #fff,  #000, ${colorLight}, ${color}, ${colorLight}, ${color}, ${colorLight})`;

            // getId(`card${i}`).style.background = `radial-gradient(ellipse at ${offsetX} top, ${color}, ${colorLight}, #333, #fff, #000, ${colorLight},  ${color}, ${colorLight}, ${colorLight})`;


            getId(`card-type-1-${i}`).style.backgroundColor = `${colorLight}`;
        }


        showColorTypeTwo(i, j, pokemon, typeName, color, colorLight);
    }
}

function showColorTypeTwo(i, j, pokemon, typeName, color, colorLight) {
    for (let j = 0; j < types.length; j++) {
        // let color = colors[j];
        // let colorLight = colorsLight[j];
        if (pokemon['types'].length > 1 && pokemon['types']['1']['type']['name'] == `${typeName}`) {
            // console.log(pokemon['types'].length)
            getId(`card-type-2-${i}`).style.backgroundColor = `${colorLight}`;
            getId(`card-type-2-${i}`).innerHTML = `${pokemon['types']['1']['type']['name']}`;

            // } 
        }
    }
}
// var color = '#ff0000'; // Beispielwert für die Farbe, kann durch eine andere Farbe ersetzt werden

// document.getElementById('my-id').style.background = `radial-gradient(ellipse at top, ${color}, #000000), radial-gradient(ellipse at bottom, rgb(100, 102, 133), #000000)`;



async function loadType(clickedType) {
    getId('card-container').innerHTML = '';
    getId('type-card-container').innerHTML = '';
    for (let i = 1; i <= 1025; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);

        if (!response.ok) {
            console.error('Fehler beim Laden von Daten für Pokemon:', element);
            return;
        }

        let pokemon = await response.json();

        let typeNullSearched = pokemon['types'][0]['type']['name'];
        let typeOneSearched = pokemon['types'][0]['type']['name'];

        if (typeNullSearched === clickedType || typeOneSearched === clickedType) {
            renderSmallCardsSameType(i, pokemon)
        }
    }
}

function renderSmallCardsSameType(i, pokemon) {
    getId('type-card-container').innerHTML += renderSmallCardsHTML(i, pokemon);
    showColorTypeOne(i, pokemon);
}




















let currentPokemon;



async function loadLargeDisplay() {
    let url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    let response = await fetch(url);
    currentPokemon = await response.json();
    // console.log(currentPokemon);

    renderPokemonInfo();


}

function renderPokemonInfo() {
    getId('pokemon-name').innerHTML = currentPokemon['name'];
    getId('pokemon-image').src = currentPokemon['sprites']['other']['home']['front_default'];
    // console.log(currentPokemon['sprites']['other']['home']['front_default']);
}




