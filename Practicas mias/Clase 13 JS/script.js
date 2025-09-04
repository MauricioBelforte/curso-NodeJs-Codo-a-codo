/*
Autor/a
version
fecha
Descripción: Este script utiliza estructuras de control para un login
*/

// Declaramos las variables estáticas mediante codigo
//dandole un valor previo

// let usuario = "admin"; // valor para la comparacion
// let clave = "admin"; // valor para la comparacion, puede ser alfanumerico

// podria solo inicializarlas sin valor

// let usuario;
// let clave;

// let usuario = "";
// let clave = "";

// Declaramos las variables dinamicas mediante prompt

let usuario = prompt("Ingrese su usuario");
//let clave = prompt("Ingrese su clave"); // todo lo que se ingresaes un string
let clave = parseInt(prompt("Ingrese su clave"));

// Estructuras de control if - Modelo
/*
if(condicion) {
    // Bloque de código si la condición es verdadera
} else {
    // Bloque de código si la condición es falsa
}
*/


// Estructuras de control if - Ejemplo

/* if(usuario == "admin" && clave == "admin") {
    document.write("Ingreso exitoso!!!, Bienvenido al sistema");
    console.log("Ingreso exitoso!!!, Bienvenido al sistema");
} else {
    alert("Usuario o clave incorrectos, intente nuevamente");
    console.log("Usuario o clave incorrectos, intente nuevamente");
} */

if(usuario === "admin" && clave === 1234) {
    document.write("Ingreso exitoso!!!, Bienvenido al sistema"); 
    console.log("Ingreso exitoso!!!, Bienvenido al sistema");
} else {
    alert("Usuario o clave incorrectos, intente nuevamente");
    console.log("Usuario o clave incorrectos, intente nuevamente");
}