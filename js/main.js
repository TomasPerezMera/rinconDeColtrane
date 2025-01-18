/*Import Product Catalog*/
let catalogo = [];
let  itemCounts = {};
const carrito = [];

fetch('./js/catalog.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        catalogo = data;
        const subGrid = document.querySelector('.subGrid');
        catalogo.forEach(album => {
            itemCounts[album.id] = 0;
        });
        for (const album of data) {
            let albumItem = document.createElement("div");
            albumItem.innerHTML = `
            <div class="d-flex flex-column" id="album-${album.id}">
                <img src="${album.source}" alt="${album.id}º Album Cover" height="400" width="400">
                <h2>
                    ${album.name}
                </h2>
                <h2 class="price">
                    ${new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS',
                        maximumFractionDigits: 0 }).format(album.price)}
                </h2>
                <div class="botones d-flex align-items-center justify-content-center">
                    <button type="button" class="btn btn-outline-light btn-sm fw-bold d-flex justify-content-center align-items-center decrease-btn" data-id="${album.id}">-</button>
                    <button type="button" class="btn btn-light btn-sm fw-bold mx-2 d-flex justify-content-center align-items-center item-counter" data-id="${album.id}" disabled>${album.amount}</button>
                    <button type="button" class="btn btn-outline-light btn-sm fw-bold d-flex justify-content-center align-items-center increase-btn" data-id="${album.id}">+</button>
                </div>
            </div>`
            subGrid.appendChild(albumItem);
        }
})
.catch(error => console.error('Error loading JSON:', error));


/*Media Player*/

const musicToggle = document.getElementById("musicToggle");
const coltraneProject = document.getElementById("coltraneProject");
const musicImg = document.getElementById("musicImg");

musicToggle.addEventListener('click', () => {
    if (coltraneProject.paused) {
        coltraneProject.play();
        musicImg.src = "./assets/pauseButton.png";
    } else {
        coltraneProject.pause();
        musicImg.src = "./assets/playButton.png";
    }
})

coltraneProject.addEventListener('ended', () => {
    musicImg.src = "./assets/playButton.png";
});


/*Asignación de Botones*/

let globalItemCount = 0;

function updateCounterDisplay(albumId) {
    const counter = document.querySelector(`.item-counter[data-id="${albumId}"]`);
    if (counter) {
        counter.textContent = itemCounts[albumId] || 0;
    }
}

document.addEventListener("click", (event) => {
    const albumId = parseInt(event.target.getAttribute("data-id"), 10);
    if (!albumId) return;
    itemCounts[albumId] = itemCounts[albumId] || 0;
    if (event.target.classList.contains("increase-btn")) {
        if (itemCounts[albumId] < 5 && globalItemCount < 5) {
            itemCounts[albumId]++;
            globalItemCount++;
            console.log("ItemCounts after increase:", itemCounts);
            updateCounterDisplay(albumId);
            updateCarrito(albumId);
        } else {
            Toastify({
                text: "Tu carrito está lleno!",
                duration: 3000
                }).showToast();
        }
    }
    if (event.target.classList.contains("decrease-btn")) {
        if (itemCounts[albumId] > 0) {
            itemCounts[albumId]--;
            globalItemCount--;
            console.log("ItemCounts after decrease:", itemCounts);
            updateCounterDisplay(albumId);
            updateCarrito (albumId);
        }
    }
});


/* Función Carrito*/

let precioCarrito = 0;

function totalCarrito() {
    return(`El precio total de tu carrito es: $` + (precioCarrito) + `.`)
}

let pintarCarrito = () => {
    const carritoDisplay = document.querySelector('.carritoDisplay');
    carritoDisplay.innerHTML = "";
    if (precioCarrito === 0) {
        carritoDisplay.textContent = "Tu carrito está vacío.";
        return;
    }
    const carritoText = carrito.map(album => {
        const cantidad = itemCounts[album.id] || 0;
        return `Nombre: ${album.name}, Precio: $${album.price}, Cantidad: ${cantidad}`;
    }).join("<br>");
    const totalText = `El precio total de tu carrito es: ${new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precioCarrito)}.`;
    const content = document.createElement("p");
    content.innerHTML = `Tu carrito actual:<br>${carritoText}<br>${totalText}`;
    carritoDisplay.appendChild(content);
}

document.addEventListener("DOMContentLoaded", pintarCarrito);


function updateCarrito(albumId) {
    const album = catalogo.find(item => item.id === albumId);
    if (!album) {
        console.error(`Album with ID ${albumId} not found in catalogo`);
        return;
    }
    if (album) {
        precioCarrito = Object.keys(itemCounts).reduce((total, id) => {
            const item = catalogo.find(album => album.id === parseInt(id, 10));
            return total + (item.price * (itemCounts[id] || 0));
        }, 0);
        if (itemCounts[albumId] > 0 && !carrito.some(item => item.id === albumId)) {
            carrito.push(album);
        } else if (itemCounts[albumId] === 0) {
            carrito = carrito.filter(item => item.id !== albumId);
        }
        console.log("Updated Carrito:", carrito);
        console.log("Updated Precio Carrito:", precioCarrito);
        pintarCarrito();
    }
    return;
}

console.log('ItemCounts:', itemCounts);
console.log('pintarCarrito called:', carrito, precioCarrito);
console.log('Carrito:', carrito);
console.log('Precio Carrito:', precioCarrito);

console.log(catalogo);