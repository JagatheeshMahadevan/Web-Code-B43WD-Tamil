const pokemonList = document.querySelector('.pokemon-list');
const pagination = document.querySelector('.pagination');

const limit = 50;
let offset = 0;

async function getPokemonList() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    const { results } = data;
    pokemonList.innerHTML = '';
    results.forEach(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      const { name, weight, abilities, moves, sprites } = pokemonData;
      const pokemonCard = document.createElement('div');
      pokemonCard.classList.add('pokemon-card');
      pokemonCard.innerHTML = `
        <img src="${sprites.front_default}" alt="${name}">
        <h2>${name}</h2>
        <p>Weight: ${weight} lbs</p>
        <p>Abilities: ${abilities.map(ability => ability.ability.name).join(', ')}</p>
        <p>Moves: ${moves.map(move => move.move.name).join(', ')}</p>
      `;
      pokemonList.appendChild(pokemonCard);
    });
    showPagination(data.count);
  } catch (error) {
    console.error(error);
  }
}

function showPagination(totalCount) {
  const pages = Math.ceil(totalCount / limit);
  pagination.innerHTML = '';
  for (let i = 1; i <= pages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    if (i === (offset / limit) + 1) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      offset
      = (i - 1) * limit;
  getPokemonList();
  const activeButton = pagination.querySelector('.active');
  if (activeButton) {
    activeButton.classList.remove('active');
  }
  button.classList.add('active');
});
pagination.appendChild(button);
}
}

getPokemonList();