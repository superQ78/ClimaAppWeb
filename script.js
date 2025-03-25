const api_key = "8a82e58f3b5c8c9f8b41afcd06d8c376"; 
const ciudades = ["Los Cabos", "Ciudad Obregon", "La paz"];
const container = document.getElementById("ciudades-container");

document.addEventListener("DOMContentLoaded", () => {
    ciudades.forEach(ciudad => obtenerClima(ciudad));
});

document.getElementById("btn_consultar").onclick = function () {
    const ciudad = document.getElementById("campo_ciudad").value;
    if (ciudad) {
        obtenerClima(ciudad);
        document.getElementById("campo_ciudad").value = "";
    }
};

function obtenerClima(ciudad) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${api_key}&units=metric&lang=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert(`No se encontró la ciudad: ${ciudad}`);
                return;
            }
            mostrarClima(data);
        })
        .catch(() => alert("Error al obtener datos"));
}

function mostrarClima(data) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <input type="text" value="${data.name}" class="ciudad-input">
        <p><span class="temp">${data.main.temp}</span>°C</p>
        <p><span class="desc">${data.weather[0].description}</span></p>
        <p><span class="hum">${data.main.humidity}</span>% humedad</p>
        <button class="btn-small btn-actualizar">Actualizar</button>
        <button class="btn-small btn-eliminar">Eliminar</button>
    `;

    card.querySelector(".btn-actualizar").addEventListener("click", () => {
        const nuevaCiudad = card.querySelector(".ciudad-input").value;
        obtenerClima(nuevaCiudad);
        card.remove();
    });

    card.querySelector(".btn-eliminar").addEventListener("click", () => {
        card.remove();
    });

    container.appendChild(card);
}
