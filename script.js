const contenedorNoticias = document.getElementById("noticias");
const botonActualizar = document.getElementById("actualizar");
const mensajeCargando = document.getElementById("cargando");

async function obtenerNoticias() {
    const temas = ["technology", "music", "sports", "science", "health", "movies", "gaming", "fashion"];


    const temaRandom = temas[Math.floor(Math.random() * temas.length)];

    const url = `https://gnews.io/api/v4/search?q=${temaRandom}&lang=es&max=1&apikey=93b52d1f32ca885bb85e8e29d1e3298c`;


    contenedorNoticias.innerHTML = '<p id="cargando" class="cargando">Cargando. . . .</p>';

    try {
          const respuesta = await fetch(url);

          if (!respuesta.ok) {
            throw new Error("Error en la API.");
        }

        const datos = await respuesta.json();

        mostrarNoticias(datos.articles);

    } catch (error) {

        contenedorNoticias.innerHTML = `
            <p class="cargando">
                No se pudieron cargar las noticias. Intenta más tarde.</p>
        `;

        console.error("Error:", error);
    }
}

function mostrarNoticias(listaNoticias) {

    if (!listaNoticias || listaNoticias.length === 0) {
        contenedorNoticias.innerHTML = `
            <p class="cargando">No hay noticias disponibles.</p>
        `;
        return;
    }

    contenedorNoticias.innerHTML = "";

    listaNoticias.forEach(noticia => {

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("noticia");

        tarjeta.innerHTML = `
            ${noticia.image ? `<img src="${noticia.image}" alt="Imagen noticia">` : ""}
            
            <h2>
                <a href="${noticia.url}" target="_blank">
                    ${noticia.title}
                </a>
            </h2>
            
            <p>${noticia.description || "Sin descripción disponible."}</p>
        `;

        contenedorNoticias.appendChild(tarjeta);
    });
}


botonActualizar.addEventListener("click", obtenerNoticias);

document.addEventListener("DOMContentLoaded", obtenerNoticias);
