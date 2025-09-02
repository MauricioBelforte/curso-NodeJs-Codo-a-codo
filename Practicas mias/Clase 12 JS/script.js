/*
 * Organización del código:
 * El código en JS se puede estructurar en las secciones generales:
 * 1. Comentarios de la cabecera.
 * 2. Importación de librerías externas.
 * 3. Importación de módulos locales.
 * 4. Definición de variables globales.
 * 5. Declaración de funciones.
 * 6. Ejecución principal del código, procesos.
 * 7. Resultados. 
 */


// Instrucciones de salida por consola
console.log("Hola");
console.log(8+4);
console.log("8+4");


// Funcion alert

// alert("Hola este es un alert");

document.write("<h1>Hola este es un mensaje desde JavaScript</h1>");

var condicion = true;
        if(condicion){
            var edad1 = 25;
            let edad2 = 32;
        }
        console.log(edad1); // 25
     //   console.log(edad2); // Error: edad2 is not define


     // Declaración de variables con let
// No posee propiedad de hoisting
// console.log("Valor de y antes de la declaración:", y); // Error: y is not defined
let y = 20;
// let y = 30; // Error: y has already been declared
y = "hola"; //reasignacion de variable
console.log("Valor de y después de la declaración:"+ y); // Salida: hola

// Declaración de variables con const
// No posee hoisting
// console.log("Valor de z antes de la declaración:"+ z); // Error: z is not defined
const z = 30;
console.log("Valor de z después de la declaración:"+ z); // Salida: 30

//console.log("Valor de c antes de la declaración:"+ c); // Error: c is not defined
const p = 60;
console.log(`Valor de c después de la declaración: ${p}`); // Salida: 60
// las comillas francesas se utilizan para concatenar variables con texto y 
// tambien se llaman backticks