
alert("Bienvenido al rincón de Coltrane! Un pequeño, pero importante rincón de Internet, donde podrás adquirir algunos de los álbumes más célebres del legendario saxofonista.")

alert("A continuación, procederemos a listar los ítems disponibles. Se permite un máximo de 3 unidades por cada compra - elije con cuidado!")

alert("1 - WIP - $100\n2 - WIP - $200\n3 - WIP - $300\n4 - WIP - $400\n5 - WIP - $500\n6 - WIP - $600\n7 - WIP - $700\n8 - WIP - $800\n9 - WIP - $900\n")

alert("Muy bien! Ahora que has visto la selección disponible, es momento de que elijas tus álbumes deseados.\nTambién podrás solicitar ver la lista nuevamente, o despedirte del sitio sin realizar una compra (aunque no recomendamos que te vayas con las manos vacías -- la obra de Coltrane vuela!)")

let precioCarrito = 0;
let primerSeleccion = parseInt(prompt("Selecciona el artículo deseado. Puedes cancelar la compra marcando 0."));
let seguirComprando = true;

function compraLoop() {
    const seguirComprando = confirm("¿Deseas seguir comprando?");
    if(seguirComprando) {
        procesoCompra();
    } else {
        alert("Muchas gracias por tu compra! El precio total de tu carrito es: " + precioCarrito)
        finalizarCompra();
    }
}

function exitLoop() {
    const repetir = confirm("¿Deseas repetir el proceso de compra?");
    if(repetir) {
        alert("Oído cocina! Un dulce saxofón nos transporta al principio del proceso de compras...")
        procesoCompra();
    } else {
        alert("Esperamos que estés satisfecho con la compra!\nPero, como nunca se puede tener suficiente Coltrane en la vida, procederemos a recargar la página, a modo de tentar a tus deseos...")
        location.reload();
    }
}

function finalizarCompra() {
    alert("Muy bien! Tu orden ha sido recibida con éxito... Y gracias a la magia del Santo Coltrane (y sin ninguna relación a que ésta sea la versión 1 del proyecto...), ¡te vas a llevar los ítems de tu carrito, de forma GRATUITA!\n¿¡No dan ganas de tocar un sólo de saxofón de 30 minutos de tanta alegría?!");
    exitLoop();
}

function procesoCompra() {
    switch(primerSeleccion) {
        case 1:
            precioCarrito = 100;
            alert("Has añadido el ítem 1: WIP a tu carrito!")
            compraLoop();
        case 2:
            precioCarrito = 200;
            alert("Has añadido el ítem 2: WIP a tu carrito!")
            compraLoop();
        case 3:
            precioCarrito = 300;
            alert("Has añadido el ítem 3: WIP a tu carrito!")
            compraLoop();
        case 4:
            precioCarrito = 400;
            alert("Has añadido el ítem 4: WIP a tu carrito!")
            compraLoop();
        case 5:
            precioCarrito = 500;
            alert("Has añadido el ítem 5: WIP a tu carrito!")
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
    }
}

procesoCompra();