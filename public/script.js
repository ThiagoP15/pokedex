const typeColor = {
    bug: "#ADFF2F",
    dragon: "#0000FF",
    electric: "#fed330",
    fairy: "#FF69B4",
    fighting: "#B22222",
    fire: "#FF8C00",
    flying: "#B0C4DE",
    grass: "#3CB371",
    ground: "#D2691E",
    ghost: "#7B68EE",
    ice: "#48D1CC",
    normal: "#C0C0C0",
    poison: "#8A2BE2",
    psychic: "#FA8072",
    rock: "#F5DEB3",
    water: "#1E90FF",
    dark: "#434242",
    steel: "#BDCDD6",
  };
  
  const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
  }
  let searchPoke = 1;
  
  const url = `https://pokeapi.co/api/v2/pokemon/`;
  const card = document.getElementById("card");
  const btn = document.getElementById("btn");
  const form = document.getElementById("form");
  const input = document.getElementById("input_search");

  
  let getPokeData = () => {
   
    let id = Math.floor(Math.random() * 898) + 1;
   
    const finalUrl = url + id;
    
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
      });
  };
  const renderizaPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    if (data) {
      
      input.value = '';
      searchPoke = data.id;
      
      
       console.log(data);
       const hp = data.stats[0].base_stat;
       const imgSrc = data['sprites']['versions']['generation-v']['black-white']['front_default'];
       const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
       const statAttack = data.stats[1].base_stat;
       const statDefense = data.stats[2].base_stat;
       const statSpeed = data.stats[5].base_stat;
       const pokeNumber = data.id;
      
       const themeColor = typeColor[data.types[0].type.name];
       console.log(themeColor);
       card.innerHTML = `
             <p class="hp">
               <span>HP</span>
                 ${hp}
             </p>
             <img src=${imgSrc} />
             <h2 class="poke-name">${pokeName}</h2>
             <h2 class="poke-number">#${pokeNumber}</h2>
             <div class="types">
              
             </div>
             <div class="stats">
               <div>
                 <h3>${statAttack}</h3>
                 <p>Attack</p>
               </div>
               <div>
                 <h3>${statDefense}</h3>
                 <p>Defense</p>
               </div>
               <div>
                 <h3>${statSpeed}</h3>
                 <p>Speed</p>
               </div>
             </div>
       `;
       appendTypes(data.types);
       styleCard(themeColor);
    }

};

  let appendTypes = (types) => {
    types.forEach((item) => {
      let span = document.createElement("SPAN");
      span.textContent = item.type.name;
      document.querySelector(".types").appendChild(span);
    });
  };
  let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach((typeColor) => {
      typeColor.style.backgroundColor = color;
    });
  };
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderizaPokemon(input.value.toLowerCase());
});
  btn.addEventListener("click", getPokeData);
  window.addEventListener("load", getPokeData);
 renderizaPokemon(searchPoke);