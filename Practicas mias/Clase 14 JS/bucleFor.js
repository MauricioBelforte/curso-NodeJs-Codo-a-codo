/**
 * Autor/a: 
 * version:
 * fecha:
 * El siguiente script sirve a index2.html y genera 
 * accion de repeticion con bucle for
 * Vamos a generar una calculadora de promedios
 */


// inicializamos las variables declaradas

let cant, nota, suma, promedio;

// nota se inicializa con prompt, para que el usuario ingrese un valor
// suma se va autoincrementando con la suma de las notas
// promedio lo inicializamos con una formula

suma = 0;
promedio = 0;

// pedimos al usuario que ingrese la cantidad de notas a promediar

cant = parseInt(prompt("Ingrese la cantidad de notas: "));// convertimos a entero

// bucle for 
// cant notas a promediar = 5 por ejemplo

for (let i = 0; i < cant; i++) {

    // pedimos al usuario que ingrese las notas
    nota = parseFloat(prompt("Ingrese la nota: "));// convertimos a flotante

    // mostramos la nota en pantalla
    document.write("<p>Se introdujo la nota: " + nota + "</p>");

    // acumulamos las notas
    suma += nota; // suma = suma + nota

}

// calculamos el promedio
promedio = suma / cant;

document.write(`<p style="font-weight:bold">El promedio final es: ${promedio}</p>`);
document.write(`<p style="color:green; font-weight:bold">El programa ha finalizado</p>`);