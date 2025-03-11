let pokemons = [];
let offset = 0; 
const limit = 18; 
const container = document.getElementById("container");
const loadMoreBtn = document.getElementById("loadMoreBtn");


async function fetchPok() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
        const data = await response.json();

        pokemons.push(...data.results); 
        offset += limit; 

        displayPoks();

    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
}

function displayPoks() {
    container.innerHTML = "";
    pokemons.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<p style= "cursor:pointer">${pokemon.name}</p>`;

        card.addEventListener("click", async () => {
            const response = await fetch(pokemon.url);
            const details = await response.json();
            
            document.getElementById("modal-img").src = details.sprites.front_default;
            document.getElementById("modal-name").textContent = details.name;
            document.getElementById("modal-type").textContent = details.types.map(t => t.type.name).join(" | ");
            document.getElementById("modal-abs").textContent = details.abilities.map(a => a.ability.name).join(" | ");
            
            document.getElementById("modal").style.display = "flex";
        });

        container.appendChild(card);
    });
}

loadMoreBtn.addEventListener("click", fetchPok);


document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none";
    }
});

fetchPok();
