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
            ${pokemonJSON['name'][i - 1]}
        </h2>
        <div class="small-card-main">
            <div>
                <div id="card-type-1-${i}" class="card-type">
                    ${pokemonJSON['types'][i - 1]['0']['type']['name']}
                </div>
                <div id="card-type-2-${i}" class="card-type"></div>
            </div>
            <div class="small-img-container">
                <img id="small-pokemon-image" class="small-pokemon-image" src="${pokemonJSON['img'][i - 1]}" alt="">
            </div>
        </div>
        <div class="id-number">#${pokemonJSON['id'][i - 1]}</div>
    </div>
    `;
}

function renderBigPokemonCardHTML(i) {
    return /*html*/ `
    <div onclick="closeLargeDisplay()" class="big-pokemon-card-background" id="big-pokemon-card-background">
        <div onclick="doNotClose(event)" class="big-pokemon-card" id="big-pokemon-card${i}">
            <section class="image-section" id="image-section">
                <div class="x-mark-big-card-container">
                    <img class="x-mark-big-card" onclick="closeLargeDisplay()" class="cursor large-icon" src="./icons/circle-xmark-regular.svg" alt="X-Mark">
                </div>
                <h2 class="big-card-h2">
                    ${pokemonJSON['name'][i - 1]}
                </h2>
                
                <div class="big-card-main">
                    <div>
                        <div id="big-card-type-1-${i}" class="card-type">
                             ${pokemonJSON['types'][i - 1]['0']['type']['name']}
                        </div>
                        <div id="big-card-type-2-${i}" class="card-type"></div>
                        <div class="big-id-number">#${pokemonJSON['id'][i - 1]}</div>
                    </div>
                    <div class="big-img-container">
                        <img id="big-pokemon-image" class="big-pokemon-image" src="${pokemonJSON['img'][i - 1]}" alt="">
                    </div>
                </div>
                
            <div class="big-card-chevrons">
                    <div>
                        <img onclick="arrowLeft(${i})" id="chevron-left-${i}" class="big-card-chevron-left"src="./icons/chevron-left-solid.svg" alt="">
                    </div>
                    <div>
                        <img onclick="arrowRight(${i})" id="chevron-right-${i}" class="big-card-chevron-right"src="./icons/chevron-right-solid.svg" alt="">
                    </div>
                </div>   
            </section>
            <section class="info-section" id="info-section">
                <nav class="info-section-nav" id="info-section-nav">
                    <h2 onclick="selectInfoSection('about')" id="about-h2" class="info-section-h2 border-side-and-top about-h2">About</h2>
                    <h2 onclick="selectInfoSection('stats')" id="stats-h2" class="info-section-h2 border-bottom">Stats</h2>
                    <h2 onclick="selectInfoSection('moves')" id="moves-h2" class="info-section-h2 border-bottom">Moves</h2>
                </nav>
                
                <div class="outer-info-section-main" id="outer-info-section-main">
                    <div class="info-section-main" id="info-section-main">
                        <div class="about" id="about">
                            <table class="table-about">
                                <tr>
                                    <th>Height:</th>
                                    <td class="about-numbers" id="heigth">${pokemonJSON['about'][i - 1][2]} cm</td>
                                </tr>
                                <tr>
                                    <th>Weight:</th>
                                    <td class="about-numbers" id="Weight">${pokemonJSON['about'][i - 1][3]} kg</td>
                                </tr>
                                <tr>
                                    <th>Abilities:</th>
                                    <td>
                                        <div id="ability-zero">${pokemonJSON['about'][i - 1][0]}</div>
                                        <div id="ability-one">${pokemonJSON['about'][i - 1][1]}</div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="stats d-none" id="stats">
                            <div>
                                <canvas id="myChart"></canvas>
                            </div>
                        </div>
                        <div class="moves d-none" id="moves">
                            <div>
                                <h2>Powerful Moves</h2>
                                <ol id="powerful-moves" class="powerful-moves"></ol>
                            </div>
                            <div>
                                <h2>Other Moves</h2>
                                <ol id="other-moves"></ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    `;
}