/**
 * Autor/a: 
 * version:
 * fecha:
 * El siguiente script sirve a index1.html y genera 
 * accion de repeticion con bucle while
 * Vamos a dar opcion al usuario si queremos registrar o no un dato
 * 
 */


// Inicializacion de variables
let dato;

// Variable de control de ejercicio del bucle

let registrar;

// bucle while

registrar = prompt("Desea registrar un dato? s/n");

while (registrar.toLowerCase() === "s") {
    // Inicializo la variable dato con el valor que ingresa el usuario
    dato = prompt("Ingrese un dato");
    //motramos el dato en pantalla, html, en el navegador
    document.write("<h1> Usted ingreso " + dato + "</h1>");

    // preguntamos si desea registrar otro dato
    // actualizamos la variable registrar

    registrar = prompt("Desea registrar otro dato? s/n");
}