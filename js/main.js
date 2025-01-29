/*Variables globales y funciones recurrentes*/

let catalogo = [];
let  itemCounts = {};
const carrito = [];

let precioARS = (precio) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(precio);
}

let showToast = (message, time) => {
    Toastify({
        text: message,
        style: {
            background: "linear-gradient(to right, #2551a8, #72419d)",
        },
        duration: time || 2000,
    }).showToast();
}

/*Importacion del Catalogo*/

fetch('./js/catalog.json')
    .then(response => response.json())
    .then(data => {
        catalogo = data;
        const subGrid = document.querySelector('.subGrid');
        catalogo.forEach(album => {
            itemCounts[album.id] = 0;
        });
        for (const album of data) {
            let albumItem = document.createElement("div");
            albumItem.className = `albumContainer`;
            albumItem.innerHTML = `
            <div class="flipContainer">
                <div class="flipCard">
                    <div class="albumFront">
                        <img class="albumImage" src="${album.source}" alt="${album.id}º Album Cover" height="400" width="400">
                    </div>
                    <div class="albumDescription">
                        <span>${album.description}</span>
                    </div>
                </div>
            </div>
            <h2 id="albumTitle-${album.id}" class="albumTitle">
                ${album.name}
            </h2>
            <h2 class="price">
                ${precioARS(album.price)}
            </h2>
            <div class="botones d-flex align-items-center justify-content-center">
                <button type="button" class="btn btn-outline-light btn-sm fw-bold d-flex justify-content-center align-items-center decrease-btn" data-id="${album.id}">-</button>
                <button type="button" class="btn btn-light btn-sm fw-bold mx-2 d-flex justify-content-center align-items-center item-counter" data-id="${album.id}" disabled>${album.amount}</button>
                <button type="button" class="btn btn-outline-light btn-sm fw-bold d-flex justify-content-center align-items-center increase-btn" data-id="${album.id}">+</button>
            </div>`;
            subGrid.appendChild(albumItem);
            const flipCard = albumItem.querySelector(".flipCard");
            flipCard.addEventListener("click", () => {
                flipCard.classList.toggle("flipped");
            });
        }
})
.catch(error => console.error('Error loading JSON:', error));

/*Media Player*/

const musicToggle = document.getElementById("musicToggle");
const coltraneProject = document.getElementById("coltraneProject");
const musicImg = document.getElementById("musicImg");

let musicToggleClick = () => {
    if (coltraneProject.paused) {
        coltraneProject.play();
        musicImg.src = "./assets/pauseButton.png";
        return;
    }
    coltraneProject.pause();
    musicImg.src = "./assets/playButton.png";
}
musicToggle.addEventListener('click', musicToggleClick);

const musicEnd = () => {
    musicImg.src = "./assets/playButton.png";
    showToast("Gracias por escuchar la selección de obras de Coltrane!", 3000);
};
coltraneProject.addEventListener('ended', musicEnd);


/*Lógica y Asignación de Botones*/

let globalItemCount = 0;
let albumId = null;

const updateCounterDisplay = (albumId) => {
    const counter = document.querySelector(`.item-counter[data-id="${albumId}"]`);
    if (counter) {
        counter.textContent = itemCounts[albumId] || 0;
    }
};

const sumarItem = (albumId) => {
    if (itemCounts[albumId] < 5 && globalItemCount < 5) {
        itemCounts[albumId]++;
        globalItemCount++;
        updateCounterDisplay(albumId);
        updateCarrito(albumId);
    } else {
        showToast("Tu carrito está lleno!");
    }
};

const restarItem = (albumId) => {
    if (itemCounts[albumId] > 0) {
        itemCounts[albumId]--;
        globalItemCount--;
        updateCounterDisplay(albumId);
        updateCarrito(albumId);
    }
};

/*Event Listeners de los Botones de Cantidad*/

document.addEventListener("click", (event) => {
    albumId = parseInt(event.target.getAttribute("data-id"), 10);
    if (!albumId) return;
    itemCounts[albumId] = itemCounts[albumId] || 0;
    if (event.target.classList.contains("increase-btn")) {
        sumarItem(albumId);
    } else if (event.target.classList.contains("decrease-btn")) {
        restarItem(albumId);
    }
});

/* Función Carrito*/

let precioCarrito = 0;

let wipeCarrito = () => {
    carrito.forEach(album => {
        itemCounts[album.id] = 0;
    });
    carrito.length = 0;
    precioCarrito = 0;
    globalItemCount = 0;
    catalogo.forEach(album => {
        const counter = document.querySelector(`.item-counter[data-id="${album.id}"]`);
        if (counter) {
            counter.textContent = 0;
        }
    });
    pintarCarrito();
}

let totalCarrito = () => {
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
        return `${album.name} (x${cantidad}) = ${precioARS(album.price*cantidad)}`;
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

let updateCarrito = (albumId) => {
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

/*Lógica de Botones de Compra*/

const carritoBtn = document.getElementById('carritoBtn');
const trashBtn = document.getElementById('trashBtn');

const trashBtnClick = () => {
    if (precioCarrito === 0) {
        showToast("Error - tu carrito ya está vacío!");
        return
    }
    wipeCarrito();
    showToast("Vaciaste tu carrito!")
}

const carritoBtnClick = () => {
    if (precioCarrito === 0) {
        showToast("Tu carrito está vacío!");
        return;
    }
    showToast("Muchas gracias por tu compra!", 9000);
    showToast("Tu compra consistió de: " + carrito.map(album => `${album.name} (x${itemCounts[album.id]})`).join(", ")+".", 5500);
    showToast("Tu carrito ha sido vaciado.", 4000);
    addToHistory(carrito);
    wipeCarrito();
}

/*Event Listeners de la Compra*/
const compraEventListeners = () => {
    carritoBtn.addEventListener("click", carritoBtnClick);
    trashBtn.addEventListener("click", trashBtnClick);
};
compraEventListeners();


/*History y Dropdown Logic*/

const historyDropdown = document.querySelector('.historyDropdown');
let history = JSON.parse(localStorage.getItem('history')) || [];
const wipeHistoryBtn = document.getElementById('wipeHistoryBtn');

let updateHistory = () => {
    historyDropdown.innerHTML = "";
    if (history.length === 0) {
        historyDropdown.textContent = "No hay historial de compras.";
        wipeHistoryBtn.style.display = "none";
        return;
    }
    wipeHistoryBtn.style.display = "block";
    const historyList = document.createElement("ul");
    history.forEach((item, index) => {
        const listarItem = document.createElement("li");
        listarItem.classList.add("itemListado");
        listarItem.innerHTML = `<strong>Compra ${index + 1}:</strong>${item.items}`
        const precioTotal = document.createElement("li");
        precioTotal.textContent = `Precio total: ${precioARS(item.totalPrice)}`;
        precioTotal.classList.add("precioTotal");
        listarItem.appendChild(precioTotal);
        historyList.appendChild(listarItem);
    });
    const heading = document.createElement("p");
    heading.textContent = "Historial de Compras:";
    historyDropdown.appendChild(heading);
    historyDropdown.appendChild(historyList);
}
updateHistory();

let addToHistory = (carrito) => {
    const purchaseDetails = carrito.map(album => {
        const cantidad = itemCounts[album.id];
        return `<ul>
                    <li><strong>${album.name}</strong> - x${cantidad}, Total: ${precioARS(album.price * cantidad)}</li>
                </ul>`;
    }).join("");
    const totalPrice = carrito.reduce((total, album) => total + (album.price * itemCounts[album.id]), 0);
    const purchaseEntry = {
        items: purchaseDetails,
        totalPrice: totalPrice
    };
    history.unshift(purchaseEntry);
    if (history.length > 3) {
        history.pop();
    }
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory();
}

let wipeHistoryClick = () => {
    history = [];
    localStorage.removeItem('history');
    updateHistory();
}
wipeHistoryBtn.addEventListener('click', wipeHistoryClick);