const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const sprite = document.getElementById('sprite');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value.toLowerCase();

    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchTerm}`);

        if (!response.ok) {
            alert('Pokémon not found');
            return;
        }

        const data = await response.json();

        // Clear previous types
        types.innerHTML = '';

        // Set Pokemon details
        pokemonName.textContent = data.name.toUpperCase();
        pokemonId.textContent = `${data.id}`;
        weight.textContent = `${data.weight}`;
        height.textContent = `${data.height}`;

        // Add type tags
        data.types.forEach(typeInfo => {
            const typeTag = document.createElement('span');
            typeTag.textContent = typeInfo.type.name.toUpperCase();
            typeTag.classList.add('type-tag');
            types.appendChild(typeTag);
        });

        // Set stats
        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;

        // Set sprite
        sprite.src = data.sprites.front_default;
        sprite.alt = data.name;

    } catch (error) {
        alert('Pokémon not found');
    }
});

searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('search-button').click();
    }
});