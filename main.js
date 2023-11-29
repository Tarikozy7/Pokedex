const pokeContainer = document.querySelector(".pokeContainer");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");
const pokemonCount = 151;

const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

searchInput.addEventListener("input", (e)=>{
  // console.log(searchInput.value)
  const searchValue = searchInput.value.toLowerCase()
  const pokemonNames = document.querySelectorAll('.pokeName')
//  console.log(pokemonNames)

pokemonNames.forEach((pokemonName)=>{
  if(pokemonName.innerHTML.toLowerCase().includes(searchValue)){
    pokemonName.parentElement.parentElement.style.display="block"
  }else{
    pokemonName.parentElement.parentElement.style.display="none"
  }
})
})

const fetchPokemons = async () => {
  for (let i = 1; i < pokemonCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");
  const pokemonId = pokemon.id.toString().padStart(3,'0')
  const pokemonType = pokemon.types[0].type.name
  const pokemonBg = bg_color[pokemonType]
  pokemonDiv.style.backgroundColor=`${pokemonBg}`

  const pokemonDivInnerHTML = `
  <div class="imageContainer">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
            alt="Pokemon"
          />
        </div>
        <div class="pokeInfo">
          <span class="pokeId">#${pokemonId}</span>
          <h3 class="pokeName">${pokemon.name}</h3>
          <div class="small">
            <small class="pokeExp">
              <i class="fa solid fa-flask"></i>${pokemon.base_experience} Exp
            </small>
            <small class="pokeWeight">
              <i class="fa solid fa-flask"></i>${pokemon.weight} kg
            </small>
          </div>
          <div class="pokeType">
            <i class="fa-brands fa-uncharted"></i>${pokemonType}
          </div>
        </div>
  `;

  pokemonDiv.innerHTML = pokemonDivInnerHTML;
  pokeContainer.appendChild(pokemonDiv);
};

fetchPokemons();
