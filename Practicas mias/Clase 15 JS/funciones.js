/**
 * autor/a:
 * version:
 * fecha: 
 * El siguiente script sirve a index.html y genera funciones 
 * para calculos aritméticos
 */

//Una Función es un bloque de código que se ejecuta las veces que se necesite
// y que puede recibir valores de entrada y devolver un valor de salida o no devolver nada
// Este bloque queda tipo encapsulado y se puede reutilizar en cualquier parte del código
//Las veces que necesitemos realizar la operación/ acción que contiene la función

// Las funciones se definen con la palabra reservada function


// 1. Declaración de la función
// funcion sin parametros

function saludar() {
    alert("Hola, bienvenido a mi pagina");
}

saludar();

// Los parámetros son valores que se le pasan a la función al declararla
// function nombreFuncion(parametro1, parametro2, parametro3, ...){bloque de código}

function saludar2(nombre) {
    alert("Hola " + nombre + " bienvenido");
    
}

saludar2("maury");

// Esto sigue siendo una funcion sin retorno o void (vacío)
// Todo lo que se carga hasta ahora queda en la memoria

// 2.1 Llamado de la función con parámetros
// Extra de Nombres de funciones y variables
// Teoria de nombres de variables y funciones
// CamelCase: saludarDos muy usado en JS
// PascalCase: Saludar2 muy usado en clases y objetos en POO
// snake_case: saludar_2 (no se usa en JS)
// kebab-case: saludar-2 (no se usa en JS)
// no se puede empezar con un número, ni usar palabras reservadas, ni guiones bajos
// ni guiones medios, ni espacios, ni caracteres especiales, ni tildes, ni ñ
// no se puede usar el mismo nombre de una variable o función ya declarada
// Se acostumbra a usar nombres descriptivos, en las funciones se usa un verbo
// (terminan en "ar", "er", "ir")

saludar2("Juan"); // Juan es un argumento

// El argumento es el valor que se le pasa a la función en el momento de llamarla


function sumar(num1, num2) {
    let suma = num1 + num2;
    alert("La suma de los números es: " + suma);
}

//lamado de sumar

sumar(5,3);


// funcion suma con return


function suma2(num1, num2) {
    let suma = num1 + num2;
    return suma;
}


console.log(suma2(5,8)*2);


function restar(num1,num2) {
    return num1 - num2;
}

document.write(" <p>La resta de 5 menos 3 es igual a " + restar(5,3) + "</p>");

//funcion suma tipo flecha

let sumar3 = (num1, num2) => num1 + num2;

// Llamado de la función sumar3

document.write("<p>La suma de 15 mas 3 es igual a " + sumar3(15, 3) + "</p>");

// funcion flecha de mas de una linea

let sumar4 = (num1, num2) => {
    let suma = num1 + num2;
    return suma;
}

// Llamado de la función sumar4

document.write("<p>La suma de 25 mas 3 es igual a " + sumar4(25, 3) + "</p>");


function saludar3(nombre1, nombre2, nombre3) {
    alert("Hola, " + nombre1 + " bienvenido a mi página");   
    alert("Hola, " + nombre2 + " bienvenido a mi página");
    alert("Hola, " + nombre3 + " bienvenido a mi página");
}

 saludar3("Rodrigo", "Pedro", "Diego");


let sumar6 = (num1, num2, num3, num4) => {
    let resultado = num1 + num2 + num3 + num4;
    return resultado;
}

let sumar5 = (num1, num2, num3, num4) =>num1 + num2 + num3 + num4;

document.write(sumar5(5, 10, 15, 20));