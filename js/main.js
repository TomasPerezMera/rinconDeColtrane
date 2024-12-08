/*Inventario del Catálogo*/

function Album(id, name, year, price) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.price = price;
}

const cero = new Album(0, "NaN", 1, 1)
const uno = new Album(1, "Blue Train", 1957, 30);
const dos = new Album(2, "Soultrane", 1958, 27);
const tres = new Album(3, "Giant Steps", 1959, 48);
const cuatro = new Album(4, "Thelonious Monk with John Coltrane", 1961, 24);
const cinco = new Album(5, "My Favorite Things", 1961, 40);
const seis = new Album(6, "John Coltrane and Johnny Hartman", 1963, 45);
const siete = new Album(7, "A Love Supreme", 1964, 50);
const ocho = new Album(8, "Meditations", 1965, 38);
const nueve = new Album(9, "Ascension", 1966, 27);


const catalogo = [cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve];

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

function compraLoop() {
    const seguirComprando = confirm("¿Deseas seguir comprando?");
    if(seguirComprando) {
        procesoCompra();
    } else {
        alert("Muchas gracias por tu compra! El precio total de tu carrito es: $" + precioCarrito)
        finalizarCompra();
    }
}

function exitLoop() {
    const repetir = confirm("¿Deseas repetir el proceso de compra?");
    if(repetir) {
        alert("Oído cocina! Un dulce saxofón nos transporta al principio del proceso de compras...")
        procesoCompra();
    } else {
        alert("Esperamos que estés satisfecho con la compra!\nRecuerda que puedes continuar explorando nuestro sitio, para llevarte los mejores álbumes que el jazz tiene para ofrecer.")
    }
}

function finalizarCompra() {
    alert("Muy bien! Tu orden ha sido recibida con éxito... Y gracias a la magia del Santo Coltrane (y sin ninguna relación a que ésta sea la versión 1 del proyecto...), ¡te vas a llevar los ítems de tu carrito, de forma GRATUITA!\n¿¡No dan ganas de tocar un sólo de saxofón de 30 minutos de tanta alegría?!");
    exitLoop();
}

function procesoCompra() {
    let primerSeleccion = prompt("Selecciona el artículo deseado. Puedes cancelar la compra marcando 0.");
    if (primerSeleccion === null) {
        alert("Has cancelado la compra. ¡Te esperamos la próxima vez!");
        return;
    }
    primerSeleccion = parseInt(primerSeleccion);
    switch(primerSeleccion) {
        case 1:
            precioCarrito += 100;
            alert("Has añadido el ítem 1: WIP a tu carrito!")
            compraLoop();
            break;
        case 2:
            precioCarrito += 200;
            alert("Has añadido el ítem 2: WIP a tu carrito!")
            compraLoop();
            break;
        case 3:
            precioCarrito += 300;
            alert("Has añadido el ítem 3: WIP a tu carrito!")
            compraLoop();
            break;
        case 4:
            precioCarrito += 400;
            alert("Has añadido el ítem 4: WIP a tu carrito!")
            compraLoop();
            break;
        case 5:
            precioCarrito += 500;
            alert("Has añadido el ítem 5: WIP a tu carrito!")
            compraLoop();
            break;
        case 6:
            precioCarrito += 600;
            alert("Has añadido el ítem 6: WIP a tu carrito!")
            compraLoop();
            break;
        case 7:
            precioCarrito += 700;
            alert("Has añadido el ítem 7: WIP a tu carrito!")
            compraLoop();
            break;
        case 8:
            precioCarrito += 800;
            alert("Has añadido el ítem 8: WIP a tu carrito!")
            compraLoop();
            break;
        case 9:
            precioCarrito += 900;
            alert("Has añadido el ítem 9: WIP a tu carrito!")
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

alert("A continuación, procederemos a listar los ítems disponibles. Se permite un máximo de 3 unidades por cada compra - elije con cuidado!")

alert("1 - WIP - $100\n2 - WIP - $200\n3 - WIP - $300\n4 - WIP - $400\n5 - WIP - $500\n6 - WIP - $600\n7 - WIP - $700\n8 - WIP - $800\n9 - WIP - $900\n")

alert("Muy bien! Ahora que has visto la selección disponible, es momento de que elijas tus álbumes deseados.\nTambién podrás solicitar ver la lista nuevamente, o despedirte del sitio sin realizar una compra (aunque no recomendamos que te vayas con las manos vacías -- la obra de Coltrane vuela!)")

procesoCompra();

