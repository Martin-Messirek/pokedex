function renderButtonsHTML(type) {
    return /*html*/ `
    <button onclick="loadType('${type}')" class="type-btn btn ${type}">${type}</button>`;
}

function renderSmallCardsHTML(i, pokemon, type) {
    return /*html*/ `
    <div class="card" id="card${i}">
        <h2 class="card-h2">
            ${pokemon['name']}
        </h2>
        <div class="small-card-main">
            <div>
                <div id="card-type-1-${i}" class="card-type">
                    ${pokemon['types']['0']['type']['name']}
                </div>
                <div id="card-type-2-${i}" class="card-type">
                    ${type}
                </div>
            </div>
            <div class="small-img-container">
                <img id="small-pokemon-image" class="small-pokemon-image" src="${pokemon['sprites']['other']['home']['front_default']}" alt="">
            </div>
        </div>
    </div>
    `;
}



