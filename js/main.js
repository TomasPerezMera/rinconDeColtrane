/*Importar y Pintar Product Catalog*/

let catalogo = [];
let  itemCounts = {};
const carrito = [];

function precioARS(precio) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(precio);
}

let showToast = (message) => {
    Toastify({
        text: message,
        style: {
            background: "linear-gradient(to right, #2551a8, #72419d)",
        },
        duration: 2000
    }).showToast();
}

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
                <h2 id="albumTitle-${album.id}">
                    ${album.name}
                </h2>
                <h2 class="price">
                    ${precioARS(album.price)}
                </h2>
                <div class="botones d-flex align-items-center justify-content-center">
                    <button type="button" class="btn btn-outline-light btn-sm fw-bold d-flex justify-content-center align-items-center decrease-btn" data-id="${album.id}">-</button>
                    <button type="button" class="btn btn-light btn-sm fw-bold mx-2 d-flex justify-content-center align-items-center item-counter" data-id="${album.id}" disabled>${album.amount}</button>
                    <button type="button" class="btn btn-outline-light btn-sm fw-bold d-flex justify-content-center align-items-center increase-btn" data-id="${album.id}">+</button>
                </div>
            </div>`
            subGrid.appendChild(albumItem);
            if(album.id == 4 || album.id == 5) {
                const albumTitle = document.getElementById(`albumTitle-${album.id}`);
                if (albumTitle) {
                    albumTitle.innerText = `${album.name}\n\n`;
                }
            }
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
            updateCounterDisplay(albumId);
            updateCarrito(albumId);
        } else {
            showToast("Tu carrito está lleno!");
        }
    }
    if (event.target.classList.contains("decrease-btn")) {
        if (itemCounts[albumId] > 0) {
            itemCounts[albumId]--;
            globalItemCount--;
            updateCounterDisplay(albumId);
            updateCarrito (albumId);
        }
    }
});

/* Función Carrito*/

let precioCarrito = 0;

function totalCarrito() {
    const montoCompra = document.querySelector('.montoCompra');
    montoCompra.innerHTML = "";
    const totalText = `El precio total de tu compra es: ${precioARS(precioCarrito)}.`;
    montoCompra.innerText = totalText;
}

let pintarCarrito = () => {
    const carritoDisplay = document.querySelector('.carritoDisplay');
    carritoDisplay.innerHTML = "";
    if (precioCarrito === 0) {
        carritoDisplay.textContent = "Tu carrito está vacío.";
        const montoCompra = document.querySelector('.montoCompra');
        montoCompra.innerText = "";
        return;
    }
    const carritoText = carrito.map(album => {
        const cantidad = itemCounts[album.id] || 0;
        return `${album.name} (x${cantidad}) = ${precioARS(album.price)}`;
    }).join("<br>");
    const content = document.createElement("p");
    content.innerHTML = `<p>
                            Tu carrito actual:
                        </p>
                        <p>
                        <br><br>${carritoText}
                        </p>`;
    carritoDisplay.appendChild(content);
    totalCarrito();
}

document.addEventListener("DOMContentLoaded", pintarCarrito);


function updateCarrito(albumId) {
    const album = catalogo.find(item => item.id === albumId);
    if (album) {
        precioCarrito = Object.keys(itemCounts).reduce((total, id) => {
            const item = catalogo.find(album => album.id === parseInt(id, 10));
            return total + (item.price * (itemCounts[id] || 0));
        }, 0);
        if (itemCounts[albumId] > 0 && !carrito.some(item => item.id === albumId)) {
            carrito.push(album);
        } else if (itemCounts[albumId] === 0) {
            const index = carrito.findIndex(item => item.id === albumId);
            if (index !== -1) carrito.splice(index, 1);
        }
        pintarCarrito();
    }
    return;
}

/*Botones de Compra*/

const carritoBtn = document.getElementById('carritoBtn');
const trashBtn = document.getElementById('trashBtn');

trashBtn.addEventListener("click", () => {
    if (precioCarrito === 0) {
        showToast("Error - tu carrito ya está vacío!");
        return
    }
    carrito.forEach(album => {
        itemCounts[album.id] = 0;
    });
    globalItemCount = 0;
    carrito.length = 0;
    precioCarrito = 0;
    pintarCarrito();
    for (const album of catalogo) {
        const counter = document.querySelector(`.item-counter[data-id="${album.id}"]`);
        if (counter) {
            counter.textContent = 0;
        }
    }
    showToast("Vaciaste tu carrito!")
});

carritoBtn.addEventListener("click", () => {
    if (precioCarrito === 0) {
        showToast("Tu carrito está vacío!");
    } else {
        showToast("Gracias por tu compra!");
        carrito.forEach(album => {
            itemCounts[album.id] = 0;
        });
        globalItemCount = 0;
        carrito.length = 0;
        precioCarrito = 0;
        pintarCarrito();
        for (const album of catalogo) {
            const counter = document.querySelector(`.item-counter[data-id="${album.id}"]`);
            if (counter) {
                counter.textContent = 0;
            }
        }
    }
});

console.log(catalogo);