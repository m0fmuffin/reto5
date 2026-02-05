const noticias = document.getElementById("noticias");
const actualizar = document.getElementById("actualizar");
 
async function obtenerNoticias() {
    noticias.innerHTML = '<p id="cargando" class="cargando">Cargando noticias...</p>';

    const url = 'https://newsapi.org/v2/top-headlines?' +
          'country=mx&' +
          'apiKey=4719b00722d643198884978bc09763c3';

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error en la respuesta de la API");
        }

        const datos = await respuesta.json();

        mostrarNoticias(datos.data);

    } catch (error) {
        noticias.innerHTML = '<p id="cargando" class="cargando">No se pudieron cargar las noticias. Intenta más tarde.</p>';
        console.error("Error:", error);
    }
}


function mostrarNoticias(noticias) {

    if (!noticias || noticias.length === 0) {
        noticias.innerHTML = '<p id="cargando" class="cargando">No hay noticias disponibles.</p>';
        return;
    }

    noticias.innerHTML = "";

    noticias.forEach(noticia => {

        const noticiaElemento = document.createElement("div");
        noticiaElemento.classList.add("noticia");

        noticiaElemento.innerHTML = `
            ${noticia.urlToImage ? `<img src="${noticia.urlToImage}" alt="Imagen noticia">` : ""}
            <h2>
                <a href="${noticia.url}" target="_blank">
                    ${noticia.title}
                </a>
            </h2>
            <p>${noticia.description || "Sin descripción disponible."}</p>
        `;

        noticias.appendChild(noticiaElemento);
    });
}


actualizar.addEventListener("click", obtenerNoticias);


document.addEventListener("DOMContentLoaded", obtenerNoticias);
