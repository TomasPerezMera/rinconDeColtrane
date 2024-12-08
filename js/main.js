/*Inventario del Catálogo*/

class Album {
    constructor(id, name, year, price) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.price = price;
    }
}

const uno = new Album(1, "Blue Train", 1957, 30);
const dos = new Album(2, "Soultrane", 1958, 27);
const tres = new Album(3, "Giant Steps", 1959, 48);
const cuatro = new Album(4, "Thelonious Monk with John Coltrane", 1961, 24);
const cinco = new Album(5, "My Favorite Things", 1961, 40);
const seis = new Album(6, "John Coltrane and Johnny Hartman", 1963, 45);
const siete = new Album(7, "A Love Supreme", 1964, 50);
const ocho = new Album(8, "Meditations", 1965, 38);
const nueve = new Album(9, "Ascension", 1966, 27);


const catalogo = [uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve];

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
        alert("Muchas gracias por tu compra! El precio total de tu carrito es: $" + (precioCarrito*1100))
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
    alert("Muy bien! Tu orden ha sido recibida con éxito... Y gracias a la magia del Santo Coltrane, ¡te vas a llevar los ítems de tu carrito, de forma GRATUITA!\n¿¡No dan ganas de tocar un sólo de saxofón de 30 minutos de tanta alegría?!");
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
            precioCarrito += uno.price;
            alert("Has añadido el ítem: "+ uno.name +" a tu carrito!")
            compraLoop();
            break;
        case 2:
            precioCarrito += dos.price;
            alert("Has añadido el ítem: "+ dos.name +" a tu carrito!")
            compraLoop();
            break;
        case 3:
            precioCarrito += tres.price;
            alert("Has añadido el ítem: "+ tres.name +" a tu carrito!")
            compraLoop();
            break;
        case 4:
            precioCarrito += cuatro.price;
            alert("Has añadido el ítem: "+ cuatro.name +" a tu carrito!")
            compraLoop();
            break;
        case 5:
            precioCarrito += cinco.price;
            alert("Has añadido el ítem: "+ cinco.name +" a tu carrito!")
            compraLoop();
            break;
        case 6:
            precioCarrito += seis.price;
            alert("Has añadido el ítem: "+ seis.name +" a tu carrito!")
            compraLoop();
            break;
        case 7:
            precioCarrito += siete.price;
            alert("Has añadido el ítem: "+ siete.name +" a tu carrito!")
            compraLoop();
            break;
        case 8:
            precioCarrito += ocho.price;
            alert("Has añadido el ítem: "+ ocho.name +" a tu carrito!")
            compraLoop();
            break;
        case 9:
            precioCarrito += nueve.price;
            alert("Has añadido el ítem: "+ nueve.name +" a tu carrito!")
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



function mostrarCatalogo() {
    const catalogoContent = "";
    for (const item of catalogo) {
        catalogoContent += "Nombre: ${item.name}, Precio: $${item.price*1100}\n";
    }
    console.log(catalogoContent);
}

mostrarCatalogo(catalogo);

/*
alert("1 - WIP - $100\n2 - WIP - $200\n3 - WIP - $300\n4 - WIP - $400\n5 - WIP - $500\n6 - WIP - $600\n7 - WIP - $700\n8 - WIP - $800\n9 - WIP - $900\n")
*/

procesoCompra();

