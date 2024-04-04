function renderButtonsHTML(type) {
    return /*html*/ `
    <button onclick="loadType('${type}')" class="type-btn btn ${type}">${type}</button>`;
}


function renderSmallCardsHTML(i, pokemon) {
    return /*html*/ `
    <div onclick="loadBigPokemonCard('${i}', '${pokemon}')" class="card" id="card${i}">
        <h2 class="card-h2">
            ${pokemon['name']}
        </h2>
        <div class="small-card-main">
            <div>
                <div id="card-type-1-${i}" class="card-type">
                    ${pokemon['types']['0']['type']['name']}
                </div>
                <div id="card-type-2-${i}" class="card-type">
                </div>
            </div>
            <div class="small-img-container">
                <img id="small-pokemon-image" class="small-pokemon-image" src="${pokemon['sprites']['other']['home']['front_default']}" alt="">
            </div>
        </div>
        <div class="id-number">#${pokemon['id']}</div>
    </div>
    `;
}


function renderSmallCardsSameTypeHTML(i, pokemon) {
    return /*html*/ `
    <div onclick="loadBigPokemonCard('${i}', '${pokemon}')" class="card" id="card${i}">
        <h2 class="card-h2">
            ${pokemonJSON['name'][i]}
        </h2>
        <div class="small-card-main">
            <div>
                <div id="card-type-1-${i}" class="card-type">
                    ${pokemonJSON['types'][i]['0']['type']['name']}
                </div>
                <div id="card-type-2-${i}" class="card-type">
                </div>
            </div>
            <div class="small-img-container">
                <img id="small-pokemon-image" class="small-pokemon-image" src="${pokemonJSON['img'][i]}" alt="">
            </div>
        </div>
        <div class="id-number">#${pokemonJSON['id'][i]}</div>
    </div>
    `;
}

function renderBigPokemonCardHTML(i, pokemon) {
    return /*html*/ `
    <div onclick="closeLargeDisplay()" class="big-pokemon-card-background" id="big-pokemon-card-background">
        <div onclick="doNotClose(event)" class="big-pokemon-card" id="big-pokemon-card${i}">
            <section class="image-section" id="image-section">
                <h2 class="big-card-h2">
                     ${pokemonJSON['name'][i - 1]}
                </h2>
                <div class="big-card-main">
                    <div>
                        <div id="big-card-type-1-${i}" class="card-type">
                             ${pokemonJSON['types'][i - 1]['0']['type']['name']}
                        </div>
                        <div id="big-card-type-2-${i}" class="card-type">
                        </div>
                    </div>
                </div>
                <div class="big-img-container">
                        <img id="big-pokemon-image" class="big-pokemon-image" src="${pokemonJSON['img'][i - 1]}" alt="">
                    </div>
                <div class="id-number">#${pokemonJSON['id'][i - 1]}</div>
            </section>
            <section class="info-section" id="info-section">
                <nav class="info-section-nav" id="info-section-nav">
                    <h2>About</h2>
                    <h2>Stats</h2>
                    <h2>Moves</h2>
                </nav>
                <div class="about" id="about">
                    <table>
                        <tr>
                            <th>Height:</th>
                            <td id="heigth"></td>
                        </tr>
                        <tr>
                            <th>Weight:</th>
                            <td id="Weight"></td>
                        </tr>
                        <tr>
                            <th>Abilities:</th>
                            <td>
                                <div id="ability-zero"></div>
                                <div id="ability-one"></div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="stats" id="stats">
                </div>
                <div class="moves" id="moves">
                    <ul id="powerful-moves">
                        <li></li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
    `;
}

