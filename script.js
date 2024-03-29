
let types = ['water', 'grass', 'fire', 'bug', 'normal', 'poison', 'electric', 'ground', 'fairy', 'fighting', 'rock', 'psychic', 'ice', 'dragon', 'flying', 'ghost', 'dark', 'steel'];

let colors = ['var(--water-2)', 'var(--grass-2)', 'var(--fire-2)', 'var(--bug-2)', 'var(--normal-2)', 'var(--poison-2)', 'var(--electric-2)', 'var(--ground-2)', 'var(--fairy-2)', 'var(--fighting-2)', 'var(--rock-2)', 'var(--psychic-2)', 'var(--ice-2)', 'var(--dragon-2)', 'var(--flying-2)', 'var(--ghost-2)', 'var(--dark-2)', 'var(--steel-2)'];

let colorsLight = ['var(--water-3)', 'var(--grass-3)', 'var(--fire-3)', 'var(--bug-3)', 'var(--normal-3)', 'var(--poison-3)', 'var(--electric-3)', 'var(--ground-3)', 'var(--fairy-3)', 'var(--fighting-3)', 'var(--rock-3)', 'var(--psychic-3)', 'var(--ice-3)', 'var(--dragon-3)', 'var(--flying-3)', 'var(--ghost-3)', 'var(--dark-3)', 'var(--steel-3)'];

let currentIndex = 1;
let currentTypeIndex = 1;
let count = 0;
let pokemonsLength = 1026;
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

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Type Buttons

function renderButtons() {
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        getId('type-btn-container').innerHTML += renderButtonsHTML(type);
    }
}
// Load Small Cards

// let pokemons = [];
// async function loadAll(clickedType) {

//     for (let i = 1; i <= pokemonsLength; i++) {
//         let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
//         let response = await fetch(url);

//         if (!response.ok) {
//             console.error('Fehler beim Laden von Daten für Pokemon:', url);
//             return;
//         }

//         let pokemon = await response.json();
//         pokemons.push(pokemon);

//     } console.log(pokemons);
// }


loadAll();


let pokemons = [];

async function loadBatch(startIndex, batchSize) {
    const promises = [];
    for (let i = startIndex; i < startIndex + batchSize; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        promises.push(fetch(url));
    }

    const responses = await Promise.all(promises);

    for (const response of responses) {
        if (!response.ok) {
            console.error('Fehler beim Laden von Daten für Pokemon:', response.url);
            return;
        }
        const pokemon = await response.json();
        pokemons.push(pokemon);
    }
}

async function loadAll(clickedType) {
    const batchSize = 50;
    for (let i = 1; i <= pokemonsLength; i += batchSize) {
        if (i + batchSize > pokemonsLength) {
            // Falls das nächste Batch über die maximale Anzahl hinausgehen würde, berechne die tatsächliche Restmenge
            const remainingPokemons = pokemonsLength - i;
            await loadBatch(i, remainingPokemons);
        } else {
            await loadBatch(i, batchSize);
        }
    }

    console.log(pokemons);
}
























async function init() {
    getId('type-card-container').innerHTML = '';
    for (i = currentIndex; i < currentIndex + 50 && i <= pokemonsLength; i++) {
        await loadSmallCards(i);
    }
    currentIndex += 50;
    if (currentIndex >= pokemonsLength) {
        getId('card-btn').setAttribute('disabled', 'true');
        getId('card-btn').style.cursor = 'default';
        getId('card-btn').style.pointerEvents = 'none'; // removes :hover and :active
        getId('card-btn').style.display = 'none';
    }
}

async function loadSmallCards(i) {

    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);

    if (!response.ok) {
        console.error('Fehler beim Laden von Daten für Pokemon:', url);
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
// getId('type-card-container').innerHTML = '';
// for (i = currentIndex; i < currentIndex + 20 && i < pokemons.length; i++) {
//     await loadSmallCards(i);


function loadType(clickedType) {
    currentIndex = 1;  // set to 51 onload
    getId('card-container').innerHTML = '';
    getId('type-card-container').innerHTML = '';

    loadMoreTypePokemons(clickedType);

}

async function loadMoreTypePokemons(clickedType) {

    for (let i = currentTypeIndex; i <= pokemonsLength; i++) {
        let pokemon = await pokemons[i];
        // console.log(pokemon)
        let typeNullSearched = pokemon['types'][0]['type']['name'];
        let typeOneSearched = '';
        if (pokemon['types'][i] > 1) {
            typeOneSearched = pokemon['types'][1]['type']['name'];
        }

        if (typeNullSearched === clickedType || typeOneSearched === clickedType) {
            renderSmallCardsSameType(i, pokemon);
            count++;
            if (count === 50) {
                break;
            }
        }
        currentTypeIndex++;
    }
    currentTypeIndex++;

    let typeCount = 0;
    for (let i = currentTypeIndex; i < pokemonsLength; i++) {
        const pokemon = pokemons[currentTypeIndex];
        let typeNullSearched = pokemon['types'][0]['type']['name'];
        console.log('Pokemon: ' + pokemon);
        let typeOneSearched = '';
        if (pokemon['types'][i] > 1) {
            typeOneSearched = pokemon['types'][1]['type']['name'];
        }



        if (typeNullSearched === clickedType || typeOneSearched === clickedType) {
            typeCount++;
        }
        // console.log('Type Count: ' + typeCount);
        if (typeCount == 0) {
            getId('more-type-btn').setAttribute('disabled', 'true');
            getId('more-type-btn').style.cursor = 'default';
            getId('more-type-btn').style.pointerEvents = 'none'; // removes :hover and :active
            getId('more-type-btn').style.display = 'none';
        }
        showMoreTypeButton(clickedType);
    }

}



function renderSmallCardsSameType(i, pokemon) {
    getId('type-card-container').innerHTML += renderSmallCardsHTML(i, pokemon);
    showColorTypeOne(i, pokemon);
}






function showMoreTypeButton(clickedType) {
    getId('more-type-btn-container').innerHTML = `<button onclick="loadMoreTypePokemons('${clickedType}')" class="btn load-cards-btn more-type-btn" id="more-type-btn">Load ${clickedType} Pokémons</button>`;
    let index = types.indexOf(clickedType);
    getId('more-type-btn').style.backgroundColor = `${colorsLight[index]}`;
    getId('more-type-btn').onmouseover = function () {
        this.style.backgroundColor = `${colors[index]}`;
    }
    getId('more-type-btn').onmouseout = function () {
        this.style.backgroundColor = `${colorsLight[index]}`;
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
    // console.log(currentPokemon['sprites']['other']['home']['front_default']);
}




