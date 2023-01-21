const typeColor = {
    inseto: "#26de81",
    dragao: "#ffeaa7",
    eletrico: "#fed330",
    fada: "#FF0069",
    lutador: "#30336b",
    fogo: "#f0932b",
    voador: "#81ecec",
    grama: "#00b894",
    terra: "#EFB549",
    fantasma: "#a55eea",
    gelo: "#74b9ff",
    normal: "#95afc0",
    veneno: "#6c5ce7",
    psiquico: "#a29bfe",
    pedra: "#2d3436",
    agua: "#0190FF",
};

const url = " https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn")

let pokeData = () => {
    let id = Math.floor(Math.random() * 150) + 1;

    const urlFinal = url + id;

    fetch(urlFinal)
    .then((response) => response.json())
    .then((data) => {
        generateCard(data);
    })
};

let generateCard = (data) => {
    console.log(data);
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCasa() + data.name.slice(1);
    const statAtaque = data.stats[1].base_stat;
    const statDefesa = data.stats[2].base_stat;
    const statVelocidade = data.stats[5].base_stat;


const themeColor = typeColor[data.types[0].type.name];
console.log(themeColor);
card.innerHTML = `
    <p class="hp">
    <span>HP<span/>
    ${hp}
    </p>
    <img src=${imgSrc} />
    <h2 class="poke-name">${pokeName}</h2>
    <div class="types">
    
    </div>
    <div class="stats">
    <div>
    <h3>${statAtaque}</h3>
    <p>Ataque</p>
    </div>
            
        <div>
            <h3>${statDefesa}</h3>
            <p>Defesa</p>
            </div>
            <div>
            <h3>${statVelocidade}</h3>
            <p>Velocidade</p>
            </div>
            </div>
            `;
            appendTypes(data.types);
            styleCard(themeColor);
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

btn.addEventListener("click", pokeData);
window.addEventListener("load", pokeData);