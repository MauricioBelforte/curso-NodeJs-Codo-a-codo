# Callbacks

Un callback es una función que se pasa a otra función como argumento y se ejecuta después de que una operación específica se completa. En JavaScript, esto es esencial para manejar operaciones asíncronas, como solicitudes de red o temporizadores, ya que permite que el programa continúe ejecutándose sin bloqueos mientras espera que se complete la operación.


```javascript

function mostrarMensaje() {
    console.log("Hola, este mensaje se muestra después de 3 segundos");
}
// setTimeout usa un callback para ejecutar mostrarMensaje después de 3000 milisegundos
setTimeout(mostrarMensaje, 3000);

```


📌 ¿Qué pasa en detalle?
- mostrarMensaje es una función que imprime un mensaje en consola.
- setTimeout(mostrarMensaje, 3000) le dice a JavaScript:
👉 “Ejecutá esta función una vez después de esperar 3 segundos.”
Durante esos 3000 milisegundos, no se ejecuta nada de esa función solo se programa para el futuro. Una vez que se cumple el tiempo, el callback (mostrarMensaje) se dispara.


Si lo quisieras escribir con una función anónima (sin nombre), sería así:

```javascript
setTimeout(() => {
  console.log("Hola, este mensaje se muestra después de 3 segundos");
}, 3000);
```


# Veamos otro ejemplo:
La función procesarElemento toma un elemento y un callback como argumentos.
Usa setTimeout para simular una operación asíncrona que tarda 1 segundo.
Después del retraso, llama al callback con un mensaje que incluye el elemento procesado.
Luego de la definición de elementos, usamos forEach para iterar sobre cada elemento en el arreglo elementos.
Para cada elemento, invocamos a procesarElemento, pasando el elemento y un callback que imprime el resultado.

```javascript

function procesarElemento(elemento, callback) {
    setTimeout(() => {
        callback("Elemento procesado: " + elemento);
    }, 1000);
}

const elementos = [1, 2, 3, 4, 5];
elementos.forEach(elemento => {
    procesarElemento(elemento, resultado => {
        console.log(resultado);
    });
});
```

Este ejemplo demuestra cómo los callbacks pueden ser utilizados para manejar la asincronía en operaciones que implican iterar sobre un conjunto de datos y procesar cada ítem de manera asíncrona. Esto es común en aplicaciones web donde, por ejemplo, podrías necesitar cargar o procesar una lista de recursos obtenidos desde un servidor.

# Callback Hell

El Callback Hell, o "Pyramid of Doom", es una situación donde múltiples callbacks se anidan unos dentro de otros. Esto puede ocurrir cuando varias operaciones asíncronas dependen unas de otras. Esto hace que el código sea difícil de leer y mantener.

Problemas Asociados:
Legibilidad Reducida: La profundidad de anidamiento hace que el código sea difícil de seguir.
Gestión de Errores Complicada: Cada nivel de anidación requiere su propio manejo de errores, lo que puede llevar a código repetitivo y complicado.
Mantenimiento Difícil: Modificar el código en uno de los niveles de anidación puede afectar a los niveles subsecuentes.


## Ejemplo de callback Hell
Inicio del Proceso: Se imprime un mensaje inicial para indicar el comienzo.
Primera Tarea: Se utiliza setTimeout para simular una tarea que tarda 1 segundo. Una vez completada, imprime un mensaje.
Segunda Tarea: Dentro del primer setTimeout, se inicia otro setTimeout después de que la primera tarea ha completado. Esto simula otra tarea que también tarda 1 segundo.
Tercera Tarea: De manera similar, dentro del segundo setTimeout, se inicia un tercer setTimeout. 
Después de completar esta tarea, imprime un mensaje final.


```javascript
console.log("Inicio del proceso");
setTimeout(() => {
    console.log("Primera tarea completada");
    setTimeout(() => {
        console.log("Segunda tarea completada");
        setTimeout(() => {
            console.log("Tercera tarea completada");
            console.log("Todos los procesos terminados");
        }, 1000); // Tercera tarea tarda 1 segundo
    }, 1000); // Segunda tarea tarda 1 segundo
}, 1000); // Primera tarea tarda 1 segundo


```


Este código ilustra un "Callback Hell" porque las funciones de callback están anidadas dentro de otras funciones de callback, creando un código que se desplaza hacia la derecha y es difícil de leer y mantener. Esta estructura puede llevar a errores y dificultades al intentar rastrear el flujo de ejecución del programa, especialmente en aplicaciones más complejas donde las operaciones asíncronas son comunes.


## Callback Hell (Solución)

Función tareaAsincrona: Esta función toma un mensaje como argumento y retorna una promesa. 
La promesa se resuelve después de un retraso de 1 segundo, durante el cual se imprime el mensaje.
Encadenamiento de Promesas: Iniciamos el proceso con un mensaje. Llamamos a tareaAsincrona para la primera tarea y esperamos a que se resuelva antes de llamar a la siguiente tarea. 
Utilizamos .then() para encadenar cada tarea secuencialmente, lo que asegura que cada tarea comience sólo después de que la anterior haya terminado. Al final, imprimimos un mensaje cuando todas las tareas han terminado.
Manejo de Errores: Usamos .catch() al final del encadenamiento para capturar y manejar cualquier error que pueda ocurrir durante las operaciones asíncronas.


```javascript

function tareaAsincrona(mensaje) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(mensaje);
            resolve();
        }, 1000);
    });
}
console.log("Inicio del proceso");
tareaAsincrona("Primera tarea completada")
    .then(() => tareaAsincrona("Segunda tarea completada"))
    .then(() => tareaAsincrona("Tercera tarea completada"))
    .then(() => {
        console.log("Todos los procesos terminados");
    })
    .catch(error => {
        console.error("Error durante el proceso", error);
    });


console.log("Inicio del proceso");
setTimeout(() => {
    console.log("Primera tarea completada");
    setTimeout(() => {
        console.log("Segunda tarea completada");
        setTimeout(() => {
            console.log("Tercera tarea completada");
            console.log("Todos los procesos terminados");
        }, 1000); // Tercera tarea tarda 1 segundo
    }, 1000); // Segunda tarea tarda 1 segundo
}, 1000); // Primera tarea tarda 1 segundo


```

Comparando ambos enfoques, las promesas no solo evitan el anidamiento profundo y mejora la legibilidad del código, sino que también facilita el manejo de errores y el flujo de control en general.  


## Promesas

```javascript

function tareaAsincrona(mensaje) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(mensaje);
            resolve();
        }, 1000);
    });
}
console.log("Inicio del proceso");
tareaAsincrona("Primera tarea completada")
    .then(() => tareaAsincrona("Segunda tarea completada"))
    .then(() => tareaAsincrona("Tercera tarea completada"))
    .then(() => {
        console.log("Todos los procesos terminados");
    })
    .catch(error => {
        console.error("Error durante el proceso", error);
    });

```

