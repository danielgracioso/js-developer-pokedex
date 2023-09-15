const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <button class="detalhes" data-pokemon-details="${pokemon.details}">Mostrar +</button>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

// Evento de clique para cada botão "Mostrar +"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('detalhes')) {
        const pokemonDetails = event.target.getAttribute('data-pokemon-details');

        // Insira as informações no elemento de conteúdo detalhado
        const overlayContent = document.getElementById('pokemon-detail');
        overlayContent.innerHTML = pokemonDetails;

        // Exiba a janela de sobreposição
        const overlay = document.getElementById('pokemon-overlay');
        overlay.style.display = 'block';
    }
});
