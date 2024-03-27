// function sendMail(event) {﻿  // JS von Developer Akademie Modul 5, URL von formspree
//     event.preventDefault();
//     const data = new FormData(event.target);

//     fetch("https://formspree.io/f/mbjveadd", {
//         method: "POST",
//         body: new FormData(event.target),
//         headers: {
//             'Accept': 'application/json'
//         }
//     }).then(() => {
//         window.location.href = "./send_mail.html";
//     }).catch((error) => {
//         console.log(error);
//     });
// }


// async function init() {
//     await includeHTML();
// }

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // file bekommt "./templates/header.html" zugewiesen, "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text(); // innerHTML von element ist der header div  
        } else {
            element.innerHTML = 'Page not found.';
        }
    }
}


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



// for (let i = 0; i < syn.length; i++) {
//     const sd = syn[i];

// }
let pokemons = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard', 'squirtle', 'wartortle', 'blastoise', 'caterpie', 'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'ekans', 'arbok', 'pikachu', 'raichu', 'sandshrew', 'sandslash', 'nidorina', 'nidoqueen', 'nidorino', 'nidoking', 'clefairy', 'clefable', 'vulpix', 'ninetales', 'jigglypuff', 'wigglytuff', 'zubat', 'golbat', 'oddish', 'gloom', 'vileplume', 'paras', 'parasect', 'venonat', 'venomoth', 'diglett', 'dugtrio', 'meowth', 'persian', 'psyduck', 'golduck', 'mankey', 'primeape', 'growlithe', 'arcanine', 'poliwag', 'poliwhirl', 'poliwrath', 'abra', 'kadabra', 'alakazam', 'machop', 'machoke', 'machamp', 'bellsprout', 'weepinbell', 'victreebel', 'tentacool', 'tentacruel', 'geodude', 'graveler', 'golem', 'ponyta', 'rapidash', 'slowpoke', 'slowbro', 'magnemite', 'magneton', 'doduo', 'dodrio', 'seel', 'dewgong', 'grimer', 'muk', 'shellder', 'cloyster', 'gastly', 'haunter', 'gengar', 'onix', 'drowzee', 'hypno', 'krabby', 'kingler', 'voltorb', 'electrode', 'exeggcute', 'exeggutor', 'cubone', 'marowak', 'hitmonlee', 'hitmonchan', 'lickitung', 'koffing', 'weezing', 'rhyhorn', 'rhydon', 'chansey', 'tangela', 'kangaskhan', 'horsea', 'seadra', 'goldeen', 'seaking', 'staryu', 'starmie', 'scyther', 'jynx', 'electabuzz', 'magmar', 'pinsir', 'tauros', 'magikarp', 'gyarados', 'lapras', 'ditto', 'eevee', 'vaporeon', 'jolteon', 'flareon', 'porygon', 'omanyte', 'omastar', 'kabuto', 'kabutops', 'aerodactyl', 'snorlax', 'articuno', 'zapdos', 'moltres', 'dratini', 'dragonair', 'dragonite', 'mewtwo', 'mew'];

let types = ['water', 'grass', 'fire', 'bug', 'normal', 'poison', 'electric', 'ground', 'fairy', 'fighting', 'rock', 'ghost', 'psycho', 'ice', 'dragon'];

let colors = ['var(--water-2)', 'var(--grass-2)', 'var(--fire-2)', 'var(--bug-2)', 'var(--normal-2)', 'var(--poison-2)', 'var(--electric-2)', 'var(--ground-2)', 'var(--fairy-2)', 'var(--fighting-2)', 'var(--rock-2)', 'var(--ghost-2)', 'var(--psycho-2)', 'var(--ice-2)', 'var(--dragon-2)'];

let colorsDark = ['var(--water-3)', 'var(--grass-3)', 'var(--fire-3)', 'var(--bug-3)', 'var(--normal-3)', 'var(--poison-3)', 'var(--electric-3)', 'var(--ground-3)', 'var(--fairy-3)', 'var(--fighting-3)', 'var(--rock-3)', 'var(--ghost-3)', 'var(--psycho-3)', 'var(--ice-3)', 'var(--dragon-3)'];


let currentIndex = 0;

function getId(id) {
    return document.getElementById(id);
}


// Input Field Autocomplete Suggestions

let input = document.getElementById('name');
let suggestions = document.getElementById('suggestions');

input.addEventListener('input', function () {
    let searchInput = this.value.toLowerCase();
    let matches = [];
    for (let i = 0; i < pokemons.length; i++) {
        if (pokemons[i].startsWith(searchInput)) {
            matches.push(capitalize(pokemons[i]));
        }
        if (matches.length === 5) {
            break;
        }
    }
    displaySuggestions(matches);
});

function displaySuggestions(matches) {
    let suggestionsHTML = '';
    for (let i = 0; i < matches.length; i++) {
        suggestionsHTML += '<div class="suggestion">' + matches[i] + '</div>';
    }
    suggestions.innerHTML = suggestionsHTML;

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
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}









async function init() {
    // getId('card-container').innerHTML = '';
    for (i = currentIndex; i < currentIndex + 20 && i < pokemons.length; i++) {
        await loadSmallCards(i);
    }
    currentIndex += 20;
    if (currentIndex > pokemons.length - 1) {
        getId('card-btn').setAttribute('disabled', 'true');
        getId('card-btn').style.cursor = 'default';
        getId('card-btn').style.pointerEvents = 'none'; // removes :hover and :active
        getId('card-btn').style.display = 'none';
        console.log('disabled')
        // getId('card-btn').style.curser = 'default';
    }
}

async function loadSmallCards(i) {
    console.log('load');
    const element = pokemons[i];
    let url = `https://pokeapi.co/api/v2/pokemon/${element}`;
    let response = await fetch(url);

    if (!response.ok) {
        console.error('Fehler beim Laden von Daten für Pokemon:', element);
        return;
    }
    let pokemon = await response.json();
    renderSmallCards(i, pokemon)
}


function renderSmallCards(i, pokemon) {
    let type;
    if (pokemon['types']['1'] === undefined) {
        type = '';
    } else {
        type = pokemon['types']['1']['type']['name'];

    }

    getId('card-container').innerHTML += `
            <div class="card" id="card${i}">
            <h2 class="card-h2">${pokemon['name']}</h2>
                <div class="small-card-main">
                    <div>
                    
                        <div id="card-type-1-${i}" class="card-type">${pokemon['types']['0']['type']['name']}</div>
                        <div id="card-type-2-${i}" class="card-type">${type}</div>
                    </div>
                    <div class="small-img-container">
                        <img id="small-pokemon-image" class="small-pokemon-image" src="${pokemon['sprites']['other']['home']['front_default']}" alt="">
                    </div>
                </div>
            </div>`;



    for (let j = 0; j < types.length; j++) {
        let type = types[j];
        let color = colors[j];
        let colorDark = colorsDark[j];
        if (pokemon['types']['0']['type']['name'] == `${type}`) {
            getId(`card${i}`).style.backgroundColor = `${color}`;
            getId(`card-type-1-${i}`).style.backgroundColor = `${colorDark}`;
            if (getId(`card-type-2-${i}`).innerHTML == '') {
                getId(`card-type-2-${i}`).style.display = 'none';
            } else {
                getId(`card-type-2-${i}`).style.backgroundColor = `${colorDark}`;
            }
        }
    }
}
async function loadType(clickedType) {
    getId('card-container').innerHTML = '';
    for (let i = 0; i < pokemons.length; i++) {
        const element = pokemons[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${element}`;
        let response = await fetch(url);

        let pokemon = await response.json();
        let typeSearched = pokemon['types'][0]['type']['name']
        let typeFound;
        if (typeSearched === clickedType) {
            renderSmallCards(i, pokemon)
        }
    }
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
    console.log(currentPokemon['sprites']['other']['home']['front_default']);
}




