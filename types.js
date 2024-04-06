// Load the Pokemon JSON in Batches and them push into an Array
let allPokemonsLoaded = false;
let pokemonJSON =
{
    'name': [],
    'types': [],
    'id': [],
    'img': [],
    'about': [],
    'stats': [],
    'moves': [],
    'other moves': []
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

        for (const pokemon of responses) { // Iterieren Sie über die Pokemon-Daten, nicht über die Response-Objekte
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
    await pushAboutToPokemonJSON(pokemon);
    await pushStatsToPokemonJSON(pokemon);
    await pushMovesToPokemonJSON(pokemon);
}

// Load Small Cards - Display Pokemon by Type

// Render Pokemon-Type Buttons

function renderButtons() {
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        document.getElementById('type-btn-container').innerHTML += renderButtonsHTML(type);
    }
}

function loadType(clickedType) {
    showLoadingScreen();
    if (!allPokemonsLoaded) {
        // Wenn die Pokemons noch nicht vollständig geladen sind, warte auf deren Abschluss
        setTimeout(() => {
            loadType(clickedType); // Wiederholen Sie den Aufruf, wenn die Pokemons noch nicht geladen sind
        }, 600); // Warten Sie für 1 Sekunde und überprüfen erneut
        return;
    }
    hideLoadingScreen();
    currentIndex = 1;  // it is set to 51 onload
    document.getElementById('card-container').innerHTML = '';
    document.getElementById('type-card-container').innerHTML = '';
    loadMoreTypePokemons(clickedType);
}

// function loadMoreTypePokemons(clickedType) {
// console.log('clicked' + clickedType);
// moreTypeBtn.setAttribute('disabled', 'false');
// moreTypeBtn.style.cursor = 'pointer';
// moreTypeBtn.style.pointerEvents = 'auto';
// moreTypeBtn.style.display = 'inline';

// for (let i = 1; i < pokemonsLength; i++) {

// for (let i = currentTypeIndex; i < currentTypeIndex + 50 && i < pokemonsLength; i++) {

// let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
// let response = await fetch(url);

// if (!response.ok) {
//     console.error('Fehler beim Laden von Daten für Pokemon:', url);
//     return;
// }
// let pokemon = await response.json();
function loadMoreTypePokemons(clickedType) {
    for (let i = 1; i < pokemonsLength; i++) {
        // Überprüfen Sie, ob das aktuelle Pokémon den angeklickten Typ hat
        if (pokemonJSON['types'][i]) {
            let typeNullSearched = pokemonJSON['types'][i]['0']['type']['name'];
            let typeOneSearched = '';
            if (pokemonJSON['types'][i].length > 1) {
                typeOneSearched = pokemonJSON['types'][i]['1']['type']['name'];
            }
            if (typeNullSearched === clickedType || typeOneSearched === clickedType) {
                renderSmallCardsSameType(i);
            }
        }
    }
}






// console.log(pokemon['types'])
// if (!pokemon['types']) continue; // Skip if types are not defined
// let typeNullSearched = pokemonJSON['types'][i]['0']['type']['name'];
// let typeOneSearched = '';
// if (pokemonJSON['types'][i].length > 1) {
//     typeOneSearched = pokemonJSON['types'][i]['1']['type']['name'];
// }
// if (typeNullSearched === clickedType || typeOneSearched === clickedType) {
//     renderSmallCardsSameType(i);
// count++;
// if (count === 50) {
//     break;
// }
// }
// currentTypeIndex++;
// }

// currentTypeIndex++;

// let typeCount = 0;
// for (let i = currentTypeIndex; i < pokemonsLength; i++) {
//     const pokemon = pokemons[currentTypeIndex];
//     let typeNullSearched = pokemon['types']['0']['type']['name'];
//     // console.log('Pokemon: ' + pokemon['name']);
//     let typeOneSearched = '';
//     if (pokemon['types'].length > 1) {
//         typeOneSearched = pokemon['types']['1']['type']['name'];
//     }
//     if (typeNullSearched === clickedType || typeOneSearched === clickedType) {
//         typeCount++;
//     }
//     // console.log('Type Count: ' + typeCount);
//     if (typeCount == 0) {
//         moreTypeBtn.setAttribute('disabled', 'true');
//         moreTypeBtn.style.cursor = 'default';
//         moreTypeBtn.style.pointerEvents = 'none'; // removes :hover and :active
//         moreTypeBtn.style.display = 'none';
//     }
//     showMoreTypeButton(clickedType);
// }




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

        if (pokemonJSON['types'][i]['0']['type']['name'] == typeName) {
            document.getElementById(`card${i}`).style.background = `radial-gradient(ellipse at ${offsetX} bottom, ${color}, ${colorLight}, black, ${color})`;
            document.getElementById(`card-type-1-${i}`).style.backgroundColor = `${colorLight}`;
            foundFirstType = true; // Setze die Flag auf true, da der erste Typ gefunden wurde
            break;
        }
    }
    showColorTypeTwoSameType(i, pokemon);
}

function showColorTypeTwoSameType(i, pokemon) {
    // Überprüfen Sie, ob das Pokémon zwei Typen hat, bevor Sie auf den zweiten Typ zugreifen
    if (pokemonJSON['types'][i].length > 1) {
        for (let j = 0; j < types.length; j++) {
            let typeName = types[j];
            let colorLight = colorsLight[j];

            // Wenn der zweite Typ vorhanden ist, setzen Sie die Hintergrundfarbe des entsprechenden Elements
            if (pokemonJSON['types'][i]['1']['type']['name'] == typeName) {
                document.getElementById(`card-type-2-${i}`).style.backgroundColor = `${colorLight}`;
                document.getElementById(`card-type-2-${i}`).innerHTML = `${pokemonJSON['types'][i]['1']['type']['name']}`;
                return; // Beenden Sie die Schleife, nachdem der zweite Typ gefunden wurde
            }
        }
    }
    // Wenn das Pokémon keinen zweiten Typ hat, setzen Sie einfach das Element auf leer
    document.getElementById(`card-type-2-${i}`).innerHTML = '';
}
// function showColorTypeTwoSameType(i, pokemon) {
//     let foundSecondType = false;
//     for (let j = 0; j < types.length; j++) {
//         let typeName = types[j];
//         let colorLight = colorsLight[j];

//         if (pokemonJSON['types'][i].length > 1 > 1 && pokemonJSON['types'][i]['1']['type']['name'] == typeName) {

//             document.getElementById(`card-type-2-${i}`).style.backgroundColor = `${colorLight}`;
//             document.getElementById(`card-type-2-${i}`).innerHTML = `${pokemonJSON['types'][i]['1']['type']['name']}`;
//             foundSecondType = true;
//             break;
//         }
//     }
// }
// function showMoreTypeButton(clickedType) {
//     let index = types.indexOf(clickedType);
//     document.getElementById('more-type-btn-text').innerHTML = `Load ${clickedType}
//                             Pokémons`;
//     moreTypeBtn.style.backgroundColor = `${colorsLight[index]}`;
//     moreTypeBtn.onmouseover = function () {
//         this.style.backgroundColor = `${colors[index]}`;
//     }
//     moreTypeBtn.onmouseout = function () {
//         this.style.backgroundColor = `${colorsLight[index]}`;
//     }
// }
