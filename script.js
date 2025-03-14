const types = ['water', 'grass', 'fire', 'bug', 'normal', 'poison', 'electric', 'ground', 'fairy', 'fighting', 'rock', 'psychic', 'ice', 'dragon', 'flying', 'ghost', 'dark', 'steel'];

const colors = ['var(--water-2)', 'var(--grass-2)', 'var(--fire-2)', 'var(--bug-2)', 'var(--normal-2)', 'var(--poison-2)', 'var(--electric-2)', 'var(--ground-2)', 'var(--fairy-2)', 'var(--fighting-2)', 'var(--rock-2)', 'var(--psychic-2)', 'var(--ice-2)', 'var(--dragon-2)', 'var(--flying-2)', 'var(--ghost-2)', 'var(--dark-2)', 'var(--steel-2)'];

const colorsLight = ['var(--water-3)', 'var(--grass-3)', 'var(--fire-3)', 'var(--bug-3)', 'var(--normal-3)', 'var(--poison-3)', 'var(--electric-3)', 'var(--ground-3)', 'var(--fairy-3)', 'var(--fighting-3)', 'var(--rock-3)', 'var(--psychic-3)', 'var(--ice-3)', 'var(--dragon-3)', 'var(--flying-3)', 'var(--ghost-3)', 'var(--dark-3)', 'var(--steel-3)'];

let currentIndex = 1;
let currentTypeIndex = 1;
let count = 0;
let pokemonsLength = 1000;
const offsetX = '400px';
const chevronUp = document.getElementById('chevron-up');
const suggestionsList = document.getElementById('suggestions');
const input = document.getElementById('name');
const xMark = document.getElementById('x-mark-suggestions');
const cardBtn = document.getElementById('card-btn');
const cardBtnTwo = document.getElementById('card-btn-2');
const moreTypeBtn = document.getElementById('more-type-btn');

// Load Initial Page - Display Small Pokemon Cards 

async function init() {
    showLoadingScreen();
    renderButtons();
    await loadSmallCardsBatch();
    loadAll();
    // hideLoadingScreen();
}


async function loadSmallCardsBatch() {
    document.getElementById('card-btn-2').setAttribute('disabled', true);
    cardBtn.setAttribute('disabled', true);
    document.getElementById('type-card-container').innerHTML = '';
    for (let i = currentIndex; i < currentIndex + 25 && i <= pokemonsLength; i++) {
        await loadSmallCards(i);
        hideLoadingScreen();
    }
    currentIndex += 25;
    if (currentIndex >= pokemonsLength) {
        cardBtn.setAttribute('disabled', true);
        document.getElementById('card-btn-2').setAttribute('disabled', true);
        cardBtn.style.cursor = 'default';
        cardBtn.style.pointerEvents = 'none';
        cardBtn.style.display = 'none';
    } else {
        cardBtn.disabled = false;
        document.getElementById('card-btn-2').disabled = false;
        console.log('cardbtn enabled')
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

    renderSmallCards(i, pokemon)
}

function renderSmallCards(i, pokemon) {
    document.getElementById('card-container').innerHTML += renderSmallCardsHTML(i, pokemon);
    showColorTypeOne(i, pokemon);
}

function showColorTypeOne(i, pokemon) {
    let foundFirstType = false; // Initialisierung der Flag-Variable
    for (let j = 0; j < types.length; j++) {
        let typeName = types[j];
        let color = colors[j];
        let colorLight = colorsLight[j];

        if (pokemon['types']['0']['type']['name'] == typeName) {
            document.getElementById(`card${i}`).style.background = `radial-gradient(ellipse at ${offsetX} bottom, ${color}, ${colorLight}, black, ${color})`;
            document.getElementById(`card-type-1-${i}`).style.backgroundColor = `${colorLight}`;
            foundFirstType = true;
            break;
        }
    }
    showColorTypeTwo(i, pokemon);
}

function showColorTypeTwo(i, pokemon) {
    let foundSecondType = false;
    for (let j = 0; j < types.length; j++) {
        let typeName = types[j];
        let colorLight = colorsLight[j];

        if (pokemon['types'].length > 1 && pokemon['types']['1']['type']['name'] == typeName) {

            document.getElementById(`card-type-2-${i}`).style.backgroundColor = `${colorLight}`;
            document.getElementById(`card-type-2-${i}`).innerHTML = `${pokemon['types']['1']['type']['name']}`;
            foundSecondType = true;
            break;
        }
    }
}

// Loading Screen

function showLoadingScreen() {
    document.getElementById('loading-screen').classList.add('background-color');
    document.getElementById('body').classList.add('no-scroll');
    document.getElementById('loading-screen').classList.remove('d-none');
}

function scrollUp() {
    window.scrollTo({
        top: 0
    });
}

function hideLoadingScreen() {
    document.getElementById('loading-screen').classList.add('d-none');
    document.getElementById('body').classList.remove('no-scroll');
    document.getElementById('loading-screen').classList.remove('background-color');
}

// Scroll to Top and Bottom of Page

window.onscroll = function () {
    if (window.scrollY > 600) {
        chevronUp.style.display = 'flex';
    } else {
        chevronUp.style.display = 'none';
    }
}

function scrollDown() {
    window.scrollTo({
        top: document.body.scrollHeight - 1200,
        behavior: 'smooth'
    });
}

// Input Field Autocomplete Suggestions

input.addEventListener('input', function () {
    let searchInput = this.value.toLowerCase();
    let matches = [];
    for (let i = 0; i < pokemonsLength; i++) {
        if (pokemonJSON['name'][i] && pokemonJSON['name'][i].startsWith(searchInput)) {
            matches.push(capitalize(pokemonJSON['name'][i]));
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
    suggestionsList.innerHTML = suggestionsHTML;
    suggestionsList.style.boxShadow = '14px 14px 2px 1px rgba(89, 14, 129, 0.2)';

    let suggestionElements = document.querySelectorAll('.suggestion');
    for (let i = 0; i < suggestionElements.length; i++) {
        suggestionElements[i].addEventListener('click', function () {
            input.value = this.textContent;
            clearSuggestions();
        });
    }
}

function clearSuggestions() {
    suggestionsList.innerHTML = '';
    suggestionsList.style.boxShadow = 'none';
    xMark.innerHTML = '';
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function displayPokemon() {
    let inputField = document.getElementById('name');
    let pokemonName = inputField.value;
    pokemonName = pokemonName.toLowerCase();
    for (let i = 0; i < pokemonsLength; i++) {
        if (pokemonJSON['name'][i] === pokemonName) {
            inputField.value = '';
            clearSuggestions();
            loadBigPokemonCard(i + 1);
            break;
        }
    }
}