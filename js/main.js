/*Import Product Catalog*/
let catalogo = [];
const itemCounts = {};

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

/* Función Carrito*/

let precioCarrito = 0;

function totalCarrito() {
    return(`El precio total de tu carrito es: $` + (precioCarrito) + `.`)
}

let pintarCarrito = () => {
    const carritoDisplay = document.querySelector('.carritoDisplay');
        let carritoText = document.createElement("p");
        carritoText.innerHTML = `Tu carrito está vacío.`
        carritoDisplay.appendChild(carritoText);
}

document.addEventListener("DOMContentLoaded", pintarCarrito());

function updateCarrito(albumId) {
    return;
}


/*Asignación de Botones

El itemCounts tiene que ser global!! En plan 3 vinilos máx x compra!

algo como un while{itemCounts <= 3}.... (googlesearch: JS simbolo menor o igual?)*/

function updateCounterDisplay(albumId) {
    const counter = document.querySelector(`.item-counter[data-id="${albumId}"]`);
    if (counter) {
        counter.textContent = itemCounts[albumId];
    }
}

let globalItemCount = 0;

document.addEventListener("click", (event) => {
    const albumId = event.target.getAttribute("data-id");
    if (!albumId) return;
    if (event.target.classList.contains("increase-btn")) {
        if (itemCounts[albumId] < 3 && globalItemCount < 5) {
            itemCounts[albumId]++;
            globalItemCount++;
            updateCounterDisplay(albumId);
            updateCarrito(albumId);
            console.log(globalItemCount);
        } else {
            Toastify({
                text: "Ups! Carrito lleno!",
                duration: 3000
                }).showToast();
        }
    }
    if (event.target.classList.contains("decrease-btn")) {
        if (itemCounts[albumId] > 0) {
            itemCounts[albumId]--;
            globalItemCount--;
            updateCounterDisplay(albumId);
            updateCarrito(albumId);
        }
    }
});



/*Lógica del E-Commerce - Mucho Legacy code del prompt-based early development*/

let seguirComprando = true;



function exitMessage() {
    return("Esperamos que estés satisfecho con la compra!\nRecuerda que puedes continuar explorando nuestro sitio, para llevarte los mejores álbumes que el jazz tiene para ofrecer.")
}

function compraLoop() {
    const seguirComprando = confirm("¿Deseas seguir comprando?");
    if(seguirComprando) {
        procesoCompra();
    } else {
        alert(`Muchas gracias por tu compra! ` + totalCarrito())
        finalizarCompra();
    }
}

function exitLoop() {
    const repetir = confirm("¿Deseas repetir el proceso de compra?");
    if(repetir) {
        alert("Oído cocina! Un dulce saxofón nos transporta al principio del proceso de compras...");
        catalogo.forEach(catalogo => catalogo.amount = 0);
        precioCarrito = 0;
        procesoCompra();
    } else {
        alert(exitMessage());
    }
}

function finalizarCompra() {
    alert("Muy bien! Tu orden ha sido recibida con éxito... Y gracias a la magia del Santo Coltrane, ¡te vas a llevar los ítems de tu carrito, de forma GRATUITA!\n¿¡No dan ganas de tocar un sólo de saxofón de 30 minutos de tanta alegría?!");
    exitLoop();
}

function procesoCompra() {
    let primerSeleccion = prompt("Selecciona el artículo deseado. Puedes cancelar la compra marcando 0. También puedes consultar el estado de tu carrito ingresando 10.");
    if (primerSeleccion === null) {
        alert("Has cancelado la compra. ¡Te esperamos la próxima vez!");
        return;
    }
    primerSeleccion = parseInt(primerSeleccion);
    switch(primerSeleccion) {
        case 1:
            if(uno.amount == 3) {
                excesoCantidad();
            } else {
                precioCarrito += uno.price;
                uno.amount++;
                alert("Has añadido el ítem: "+ uno.name +" a tu carrito! Unidades: " + uno.amount)
                compraLoop();
                break;
            }
        case 2:
            if(dos.amount == 3) {
                excesoCantidad();
            } else {
                precioCarrito += dos.price;
                dos.amount++;
                alert("Has añadido el ítem: "+ dos.name +" a tu carrito! Unidades: " + dos.amount)
                compraLoop();
                break;
            }
        case 3:
            if(tres.amount == 3) {
                excesoCantidad();
            } else {
                precioCarrito += tres.price;
                tres.amount++;
                alert(`Has añadido el ítem: `+ tres.name +` a tu carrito! Unidades: ` + tres.amount)
                compraLoop();
                break;
            }
        case 4:
            if(cuatro.amount == 3) {
                excesoCantidad();
            } else {
                precioCarrito += cuatro.price;
                cuatro.amount++;
                alert(`Has añadido el ítem: `+ cuatro.name +` a tu carrito! Unidades: ` + cuatro.amount)
                compraLoop();
                break;
            }
        case 5:
            if(cinco.amount == 3) {
                excesoCantidad();
            } else {
                precioCarrito += cinco.price;
                cinco.amount++;
                alert("Has añadido el ítem: "+ cinco.name +" a tu carrito! Unidades: " + cinco.amount)
                compraLoop();
                break;
            }
        case 6:
            if(seis.amount == 3) {
                excesoCantidad();
            } else {
                precioCarrito += seis.price;
                seis.amount++;
                alert("Has añadido el ítem: "+ seis.name +" a tu carrito! Unidades: " + seis.amount)
                compraLoop();
                break;
            }
        case 7:
            if(siete.amount == 3) {
                excesoCantidad();
            } else {
                precioCarrito += siete.price;
                siete.amount++;
                alert("Has añadido el ítem: "+ siete.name +" a tu carrito! Unidades: " + siete.amount)
                compraLoop();
                break;
            }
        case 8:
            if(ocho.amount == 3) {
                excesoCantidad();
            } else {
                precioCarrito += ocho.price;
                ocho.amount++;
                alert("Has añadido el ítem: "+ ocho.name +" a tu carrito! Unidades: " + ocho.amount)
                compraLoop();
                break;
            }
        case 9:
            if(nueve.amount == 3) {
                excesoCantidad();
            } else {
                precioCarrito += nueve.price;
                nueve.amount++;
                alert("Has añadido el ítem: "+ nueve.name +" a tu carrito! Unidades: " + nueve.amount)
                compraLoop();
                break;
            }
        case 10:
            const carritoActual = catalogo.filter(catalogo => catalogo.amount > 0);
            console.log(carritoActual);
            if (carritoActual.length === 0) {
                alert("Tu carrito está vacío.");
            } else {
                const CarritoLleno = carritoActual.map(album =>
                    `Nombre: ${album.name}, Precio: $${album.price}, Cantidad: ${album.amount}`
                ).join("\n") + `\nEl precio total de tu carrito es: $${precioCarrito}.`;
                alert(`Tu carrito actual:\n${CarritoLleno}`);
            }
            compraLoop();
            break;
        case 0:
            if(precioCarrito == 0) {
                alert("¡Te esperamos aquí para la próxima ocasión de despilfarro musical!")
            } else {
                finalizarCompra();
            }
            break;
        default:
            alert("La selección ingresada no es válida! Recuerda, sólo aceptamos números del 1 al 9, y 0 para finalizar tu compra.");
            procesoCompra();
            break;
    }
}


/*Catalog Display (obsolote)*/

function mostrarCatalogo() {
    let catalogoContent = "";
    for (const item of catalogo) {
        catalogoContent += `${item.name}, Año: ${item.year} - Precio: $${item.price}\n`;
    }
    return catalogoContent;
}

/*alert(`El inventario disponible es: \n` + mostrarCatalogo())
procesoCompra();*/

console.log(catalogo);
