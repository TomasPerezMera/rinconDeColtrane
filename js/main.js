/*Inventario del Catálogo*/

const catalogo = [];

class Album {
    constructor(id, name, year, price, amount) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.price = price;
        this.amount = amount;
        catalogo.push(this);
    }
}

const uno = new Album(1, "Blue Train", 1957, 30400, 0);
const dos = new Album(2, "Soultrane", 1958, 27600, 0);
const tres = new Album(3, "Giant Steps", 1959, 48, 0);
const cuatro = new Album(4, "Thelonious Monk with John Coltrane", 1961, 24840, 0);
const cinco = new Album(5, "My Favorite Things", 1961, 40570, 0);
const seis = new Album(6, "John Coltrane and Johnny Hartman", 1963, 45600, 0);
const siete = new Album(7, "A Love Supreme", 1964, 50300, 0);
const ocho = new Album(8, "Meditations", 1965, 38880, 0);
const nueve = new Album(9, "Ascension", 1966, 27180, 0);

console.log(catalogo);


/*Asignación de Botones*/
const itemCounts = {};

catalogo.forEach(album => {
    itemCounts[album.id] = 0;
});

function updateCounterDisplay(albumId) {
    const counter = document.querySelector(`.item-counter[data-id="${albumId}"]`);
    counter.textContent = itemCounts[albumId];
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("increase-btn")) {
        const albumId = event.target.getAttribute("data-id");
        itemCounts[albumId]++;
        updateCounterDisplay(albumId);
    }

    if (event.target.classList.contains("decrease-btn")) {
        const albumId = event.target.getAttribute("data-id");
        if (itemCounts[albumId] > 0) itemCounts[albumId]--;
        updateCounterDisplay(albumId);
    }
});


/*Lógica del E-Commerce*/

let precioCarrito = 0;
let seguirComprando = true;

function totalCarrito() {
    return(`El precio total de tu carrito es: $` + (precioCarrito) + `.`)
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
        alert("Esperamos que estés satisfecho con la compra!\nRecuerda que puedes continuar explorando nuestro sitio, para llevarte los mejores álbumes que el jazz tiene para ofrecer.")
    }
}

function finalizarCompra() {
    alert("Muy bien! Tu orden ha sido recibida con éxito... Y gracias a la magia del Santo Coltrane, ¡te vas a llevar los ítems de tu carrito, de forma GRATUITA!\n¿¡No dan ganas de tocar un sólo de saxofón de 30 minutos de tanta alegría?!");
    exitLoop();
}

function excesoCantidad() {
    alert("Lo sentimos, has seleccionado demasiadas veces este ítem! Por favor, elige otro disco para comprar, o finaliza tu compra.");
    procesoCompra();
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
                    `Nombre: ${album.name}, Precio: $${precioCarrito}, Cantidad: ${album.amount}`
                ).join("\n");
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


alert("Bienvenido al rincón de Coltrane! Un pequeño, pero importante rincón de Internet, donde podrás adquirir algunos de los álbumes más célebres del legendario saxofonista.")

alert("A continuación, procederemos a listar los ítems disponibles. Debido al stock limitado, se permite un máximo de 3 unidades por cada compra - elije con cuidado!")


function mostrarCatalogo() {
    let catalogoContent = "";
    for (const item of catalogo) {
        catalogoContent += `${item.name}, Año: ${item.year} - Precio: $${item.price*1100}\n`;
    }
    return catalogoContent;
}

alert(`El inventario disponible es: \n` + mostrarCatalogo())


procesoCompra();

