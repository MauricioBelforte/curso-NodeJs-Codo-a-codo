/**
 * autor/a:
 * version:
 * fecha: 
 * El siguiente script sirve a index.html y genera una
 * función que llama a un menú
 * El menú consta de un switch que por recursividad 
 * vuelve a llamarse a si misma
 */

//1- Declaración de las variables
function menu() {
    //Inicializacion de variables por instruccion de entrada
    let opc = prompt("Seleccione una opción:\n1. Sumar\n2. Restar\n3. Salir");

    // Proceso mediante estructura de switch
switch (opc) {
        case "1":
            //inicializar variables
            let num1 = parseInt(prompt("Ingrese el primer número"));
            let num2 = parseInt(prompt("Ingrese el segundo número"));
            document.write("<p>La suma de " + num1 + " más " + num2 + " es igual a " + sumar2(num1, num2) + "</p>");// Llamado de la función sumar2(num1, num2)
            menu();
            break;
        case "2":
            //inicializar variables
            let num3 = parseInt(prompt("Ingrese el primer número"));
            let num4 = parseInt(prompt("Ingrese el segundo número"));
            document.write("<p>La resta de " + num3 + " menos " + num4 + " es igual a " + restar(num3, num4) + "</p>");// Llamado de la función restar(num3, num4)
            menu();
            break;
        case "3":
            document.write("¡Hasta luego!");
            exit(0);// Salir del programa
            break; // No es necesario, pero se coloca por buenas prácticas
        default:
            alert("Opción no válida. Por favor, seleccione una opción válida\n(1 - 2 - 3)");
            menu(); // Llamada recursiva para mostrar el menú nuevamente
            break;
    }
}


