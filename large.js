// Load Large View of Pokemon Card

let currentPokemon;
const powerfulAndImportantMoves = ["hyper-beam", "blast-burn", "hydro-cannon", "frenzy-plant",
    "zap-cannon", "ice-burn", "focus-punch", "gunk-shot", "earthquake", "sky-attack", "psystrike",
    "megahorn", "rock-wrecker", "shadow-force", "draco-meteor", "hyperspace-fury", "doom-desire",
    "light-of-ruin", "tackle", "growl", "tail-whip", "water-gun", "bubble", "ember", "peck",
    "thunder-shock", "quick-attack", "gust", "confusion", "poison-sting", "bite", "vine-whip",
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
    let powerfulMoves = [];
    let otherMoves = [];

    for (let i = 0; i < pokemon['moves'].length; i++) {
        const move = await pokemon['moves'][i]['move']['name'];

        if (powerfulAndImportantMoves.includes(move)) {
            powerfulMoves.push(move);
            console.log(powerfulMoves)
            console.log(i)

        } else {
            otherMoves.push(move);

        }
    }

    console.log(pokemon['moves'])
    pokemonJSON.moves.push(powerfulMoves);
    pokemonJSON['other moves'].push(otherMoves);
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

// Hilfsfunktion, die das Laden des Bildes asynchron erwartet














function loadBigPokemonCard(i) {
    // if (i === 1) {
    //     console.log('Alert!! i is 1 ------ i === ' + i);
    //     let element = document.getElementById(`chevron-left-${i}`);
    //     if (element) {
    //         element.classList.add('d-none');
    //     } else {
    //         // Wenn das Element nicht sofort gefunden wird, versuche es erneut nach einer Verzögerung
    //         setTimeout(() => {
    //             let retryElement = document.getElementById(`chevron-left-${i}`);
    //             if (retryElement) {
    //                 retryElement.classList.add('d-none');
    //             }
    //         }, 500); // Warte für 0,5 Sekunden und überprüfe erneut
    //     }
    // }


    // console.log(i);
    // console.log(pokemon);
    document.getElementById('big-pokemon-card-container').classList.remove('d-none');
    document.getElementById('body').classList.add('no-scroll');
    // console.log(currentPokemon);
    renderBigPokemonCard(i);



}

function renderBigPokemonCard(i) {
    // console.log(i)
    document.getElementById('big-pokemon-card-container').innerHTML = renderBigPokemonCardHTML(i);

    bigShowColorTypeOne(i)
}

function bigShowColorTypeOne(i) {
    let foundFirstType = false; // Initialisierung der Flag-Variable
    for (let j = 0; j < types.length; j++) {
        let typeName = types[j];
        // let color = colors[j];
        // let colorLight = colorsLight[j];
        // console.log(pokemonJSON['types'][i])

        // if (pokemonJSON['types'] && pokemonJSON['types'].length > 0 && pokemonJSON['types']['0']['type'] && pokemonJSON['types']['0']['type']['name']) {

        if (pokemonJSON['types'][i]['0']['type']['name'] == typeName) {
            let color = colors[j];
            let colorLight = colorsLight[j];
            // console.log('Type One Big')
            document.getElementById(`big-pokemon-card${i}`).style.background = `radial-gradient(ellipse at ${offsetX} bottom, ${color}, ${colorLight}, black, ${color})`;
            document.getElementById(`big-card-type-1-${i}`).style.backgroundColor = `${colorLight}`;
            foundFirstType = true; // Setze die Flag auf true, da der erste Typ gefunden wurde
            break;
        }
        // }


    }
    bigShowColorTypeTwo(i);
    renderMovesHTML(i);
    // if (i === 1) {
    //     console.log(i + ' === 1')
    //     let element = document.getElementById(`chevron-left-${i}`);
    //     if (element) {
    //         element.classList.add('d-none');
    //     } else {
    //         // Wenn das Element nicht sofort gefunden wird, versuche es erneut nach einer Verzögerung
    //         setTimeout(() => {
    //             let retryElement = document.getElementById(`chevron-left-${i}`);
    //             if (retryElement) {
    //                 retryElement.classList.add('d-none');
    //             }
    //         }, 50); // Warte für 1 Sekunde und überprüfe erneut
    //     }
    // }

}

function bigShowColorTypeTwo(i) {
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




function renderMovesHTML(i) {

    let movesHTML = '';
    const moves = pokemonJSON['moves'][i - 1];

    if (moves.length > 0) {
        for (let j = 0; j < moves.length; j++) {
            movesHTML += '<li>' + moves[j] + '</li>';
        }
    }

    return movesHTML;
}

function renderOtherMovesHTML(i) {

    let movesHTML = '';
    const otherMoves = pokemonJSON['other moves'][i - 1];

    if (otherMoves.length > 0) {
        for (let j = 0; j < otherMoves.length; j++) {
            movesHTML += '<li>' + otherMoves[j] + '</li>';
        }
    }

    return movesHTML;
}

function arrowLeft(i) {
    // console.log('left ' + i)
    if (i > 1) {
        i--;
    } else if (i === 1) {
        i = currentIndex - 1;
        // console.log('current Index: ' + currentIndex)
    }


    // console.log(i + ' === 1')
    // let element = document.getElementById(`chevron-left-${i}`);
    // if (element) {
    //     element.classList.add('d-none');
    // } else {
    //     // Wenn das Element nicht sofort gefunden wird, versuche es erneut nach einer Verzögerung
    //     setTimeout(() => {
    //         let retryElement = document.getElementById(`chevron-left-${i}`);
    //         if (retryElement) {
    //             retryElement.classList.add('d-none');
    //         }
    //     }, 50); // Warte für 1 Sekunde und überprüfe erneut
    //  }
    // }


    // console.log('left inside i--' + i)
    // } else {
    //     console.log('d-none left ' + i)
    //     // document.getElementById(`chevron-left-${i}`).classList.add('d-none');

    renderBigPokemonCard(i);
}

function arrowRight(i) {
    // console.log('right ' + i)
    if (i < currentIndex - 1) {
        i++;
        // console.log('right inside i++' + i)
    } else if (i === currentIndex - 1) {
        i = 1;
        // document.getElementById(`chevron-right-${i}`).classList.add('d-none');

    }
    renderBigPokemonCard(i);
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


function selectInfoSection(selected) {
    // console.log(selected)
    document.getElementById(`${selected}-h2`).classList.add('border-side-and-top');
    document.getElementById(`${selected}-h2`).classList.remove('border-bottom');
    document.getElementById(selected).classList.remove('d-none');
    let options = ['about', 'stats', 'moves']
    for (let i = 0; i < options.length; i++) {
        const optionsH2 = `${options[i]}-h2`;
        const optionsContent = options[i];
        // console.log(optionsH2)
        if (optionsContent !== selected) {
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
        if (optionsContent == selected) {
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
        if (selected == 'about') {
            document.getElementById('outer-info-section-main').style.borderTopLeftRadius = '0';
            document.getElementById('outer-info-section-main').style.borderTopRightRadius = 'var(--border-radius)';
        }
        if (selected == 'moves') {
            document.getElementById('outer-info-section-main').style.borderTopRightRadius = '0';
            document.getElementById('outer-info-section-main').style.borderTopLeftRadius = 'var(--border-radius)';
        }
        if (selected == 'stats') {
            document.getElementById('outer-info-section-main').style.borderTopRightRadius = 'var(--border-radius)';
            document.getElementById('outer-info-section-main').style.borderTopLeftRadius = 'var(--border-radius)';
        }
    }
}







function closeLargeDisplay() {
    document.getElementById('big-pokemon-card-container').classList.add('d-none');
    document.getElementById('body').classList.remove('no-scroll');
}

function doNotClose(event) {
    event.stopPropagation();
}