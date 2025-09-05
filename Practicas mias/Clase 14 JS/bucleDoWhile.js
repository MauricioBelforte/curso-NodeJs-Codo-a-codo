/**
 * Autor/a:
 * version:
 * fecha:
 * El siguiente script genera control de flujos mediante switch y bucle do while
 * Usar variables de tipo let, como banderas para controlar la ejecución de los bucles
 * El programa nos va a saludar dando la bienvenida y el adios
 */

// Inicializamos las variables

let opc;

// Variable de control de ejecucion del bucle

let repite = false; /* variable bandera para controlar la ejecucion del bucle */


do {
    opc = prompt("Bienvenido/a \n Ingrese 1 si desea un saludo \n Ingrese 2 si desea una despedida");

    switch (opc) {

        case "1":
            document.write("<h1>Hola que tengas un lindo día!!! Bienvenido/a</h1>");
            repite = false;
            break;

        case "2":
            document.write("<h1>Adios que tengas un buen día!!!</h1>");
            repite = false;
            break;

        default:
            alert("Opción incorrecta");
            repite = true
            break;
    }
} while (repite);
console.log("Fin del programa")
