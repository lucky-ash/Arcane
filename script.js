const form = document.getElementById("watchlistForm");
const contenedor = document.getElementById("contenedor-tarjetas");

// Cargar entradas guardadas al iniciar
document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("watchlist")) || [];
  data.forEach(entrada => crearTarjeta(entrada));
});

// Manejar el envío del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const entrada = {
    titulo: document.getElementById("titulo").value,
    tipo: document.getElementById("tipo").value,
    genero: document.getElementById("genero").value.split(",").map(g => g.trim()),
    estado: document.getElementById("estado").value,
    imagen: document.getElementById("imagen").value,
    sinopsis: document.getElementById("sinopsis").value,
    critica: document.getElementById("critica").value,
    puntuacion: document.getElementById("puntuacion").value,
    cita: document.getElementById("cita").value,
    favorito: document.getElementById("favorito").checked
  };

  guardarEnLocalStorage(entrada);
  crearTarjeta(entrada);
  form.reset();
});

function guardarEnLocalStorage(entrada) {
  const data = JSON.parse(localStorage.getItem("watchlist")) || [];
  data.push(entrada);
  localStorage.setItem("watchlist", JSON.stringify(data));
}

function crearTarjeta(item) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";
  tarjeta.innerHTML = `
    <img src="${item.imagen}" alt="${item.titulo}">
    <h2>${item.titulo}</h2>
    <p><strong>Tipo:</strong> ${item.tipo}</p>
    <p><strong>Estado:</strong> ${item.estado}</p>
    <p><strong>Puntuación:</strong> ${item.puntuacion}/10</p>
    <p><strong>Sinopsis:</strong> ${item.sinopsis}</p>
    <p><strong>Crítica:</strong> ${item.critica}</p>
    <p><em>"${item.cita}"</em></p>
    ${item.favorito ? "<p style='color:gold;'>★ Favorito</p>" : ""}
  `;
  contenedor.appendChild(tarjeta);
}
