// Load the Pokemon JSON in Batches and them push into an Array

let allPokemonsLoaded = false;
let pokemonJSON =
{
    'name': [],
    'types': [],
    'id': [],
    'img': [],
    'about': [],
    'stats': []
}

async function loadAll() {
    try {
        const batchSize = 50;
        for (let i = 1; i <= pokemonsLength; i += batchSize) {
            if (i + batchSize > pokemonsLength) {
                const remainingPokemons = pokemonsLength - i;
                await loadBatch(i, remainingPokemons);
            } else {
                await loadBatch(i, batchSize);
            }
        }
        allPokemonsLoaded = true; // Markiere den Ladevorgang als abgeschlossen
    } catch (error) {
        console.error('Ein Fehler ist aufgetreten:', error);
    }
}

async function loadBatch(startIndex, batchSize) {
    try {
        const promises = [];
        for (let i = startIndex; i < startIndex + batchSize; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
            promises.push(fetch(url).then(response => response.json())); // Fetch und JSON-Parsing in einem Schritt

        }

        const responses = await Promise.all(promises);

        for (const pokemon of responses) { // Über die Pokemon-Daten iterieren, nicht über die Response-Objekte
            pushToPokemonJSON(pokemon);
        }
    } catch (error) {
        console.error('Ein Fehler ist aufgetreten:', error);
    }
}

async function pushToPokemonJSON(pokemon) {
    const addName = pokemon["name"];
    const addImg = await pokemon['sprites']['other']['home']['front_default'];
    const addTypes = await pokemon['types'];
    const addId = await pokemon['id'];
    pokemonJSON.name.push(addName);
    pokemonJSON.img.push(addImg);
    pokemonJSON.types.push(addTypes);
    pokemonJSON.id.push(addId);
    await loadAbout(pokemon);
    await pushStatsToPokemonJSON(pokemon);
}

// Render Pokemon-Type Buttons

function renderButtons() {
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        document.getElementById('type-btn-container').innerHTML += renderButtonsHTML(type);
    }
}

// Load Small Cards - Display Pokemon by Type

function loadType(clickedType) {
    showLoadingScreen();
    if (!allPokemonsLoaded) {
        // Wenn die Pokemons noch nicht vollständig geladen sind, warte auf deren Abschluss
        setTimeout(() => {
            loadType(clickedType); // den Aufruf wiederholen, wenn die Pokemons noch nicht geladen sind
        }, 600);
        return;
    }
    hideLoadingScreen();
    currentIndex = 1;
    document.getElementById('card-container').innerHTML = '';
    document.getElementById('type-card-container').innerHTML = '';
    loadMoreTypePokemons(clickedType);
}

function loadMoreTypePokemons(clickedType) {
    for (let i = 1; i < pokemonsLength; i++) {
        // Überprüfen, ob das aktuelle Pokémon den angeklickten Typ hat
        if (pokemonJSON['types'][i - 1]) {
            let typeNullSearched = pokemonJSON['types'][i - 1]['0']['type']['name'];
            let typeOneSearched = '';
            if (pokemonJSON['types'][i - 1].length > 1) {
                typeOneSearched = pokemonJSON['types'][i - 1]['1']['type']['name'];
            }
            if (typeNullSearched === clickedType || typeOneSearched === clickedType) {
                renderSmallCardsSameType(i);
            }
        }
    }
}

function renderSmallCardsSameType(i, pokemon) {
    document.getElementById('type-card-container').innerHTML += renderSmallCardsSameTypeHTML(i, pokemon);
    showColorTypeOneSameType(i, pokemon);
}

function showColorTypeOneSameType(i, pokemon) {
    let foundFirstType = false; // Initialisierung der Flag-Variable
    for (let j = 0; j < types.length; j++) {
        let typeName = types[j];
        let color = colors[j];
        let colorLight = colorsLight[j];

        if (pokemonJSON['types'][i - 1]['0']['type']['name'] == typeName) {
            document.getElementById(`card${i}`).style.background = `radial-gradient(ellipse at ${offsetX} bottom, ${color}, ${colorLight}, black, ${color})`;
            document.getElementById(`card-type-1-${i}`).style.backgroundColor = `${colorLight}`;
            foundFirstType = true; // Setze die Flag auf true, da der erste Typ gefunden wurde
            break;
        }
    }
    showColorTypeTwoSameType(i, pokemon);
}

function showColorTypeTwoSameType(i, pokemon) {
    if (pokemonJSON['types'][i - 1].length > 1) {
        for (let j = 0; j < types.length; j++) {
            let typeName = types[j];
            let colorLight = colorsLight[j];

            if (pokemonJSON['types'][i - 1]['1']['type']['name'] == typeName) {
                document.getElementById(`card-type-2-${i}`).style.backgroundColor = `${colorLight}`;
                document.getElementById(`card-type-2-${i}`).innerHTML = `${pokemonJSON['types'][i - 1]['1']['type']['name']}`;
                return; // Die Schleife beenden, nachdem der zweite Typ gefunden wurde
            }
        }
    }
    // Wenn das Pokémon keinen zweiten Typ hat, das Element auf leer setzen
    document.getElementById(`card-type-2-${i}`).innerHTML = '';
}