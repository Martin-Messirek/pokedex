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

// async function includeHTML() {
//     let includeElements = document.querySelectorAll('[w3-include-html');
//     for (let i = 0; i < includeElements.length; i++) {
//         const element = includeElements[i];
//         file = element.getAttribute("w3-include-html"); // file bekommt "./templates/header.html" zugewiesen, "includes/header.html"
//         let resp = await fetch(file);
//         if (resp.ok) {
//             element.innerHTML = await resp.text(); // innerHTML von element ist der header div  
//         } else {
//             element.innerHTML = 'Page not found.';
//         }
//     }
// }


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
let pokemons = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran♀', 'Nidorina', 'Nidoqueen', 'Nidoran♂', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', 'Farfetch\'d', 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo', 'Mew'];

let currentPokemon;

function getId(id) {
    return document.getElementById(id);
}

async function init() {
    let url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);

    renderPokemonInfo();


}

function renderPokemonInfo() {
    getId('pokemon-name').innerHTML = currentPokemon['name'];
    getId('pokemon-image').src = currentPokemon['sprites']['other']['home']['front_default'];
    console.log(currentPokemon['sprites']['other']['home']['front_default']);
}




