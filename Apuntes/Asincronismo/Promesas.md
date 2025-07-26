# Promesas facil de entender

¿Qué es una promesa?
Una promesa representa un valor que aún no está disponible, pero lo estará más adelante. Puede terminar en tres estados:
- ✅ Cumplida (fulfilled): se resuelve con un resultado.
- ❌ Rechazada (rejected): hubo un error.
- ⏳ Pendiente (pending): sigue en proceso.

## Declaracion:
```javascript
    const miPromesa = new Promise((resolve, reject) => {
      const todoOk = true;

      if (todoOk) {
        resolve("¡Promesa cumplida!");
      } else {
        reject("Ups, algo salió mal");
      }
    });
```
- resolve(valor) se llama cuando todo sale bien.
- reject(error) se llama cuando algo falla.



🔧 ¿Qué recibe new Promise(...)?
El constructor Promise recibe una función callback con dos parámetros: resolve y reject.

```javascript

new Promise((resolve, reject) => {
  // lógica interna
});

```

## 🔍 ¿Y qué son resolve y reject?
- `Son funciones que vienen predefinidas por el motor de JavaScript`.
- E`stán ahí para que vos las llames cuando querés decir: “Listo, terminé bien” (resolve) o “algo salió mal” (reject)`.
- Son funciones que controlan el estado interno de la promesa.


- La función (resolve, reject) => { ... } es la función ejecutora.
- resolve y reject son funciones que vos no definís, pero sí usás.
- Cuando vos llamás a resolve(...), se dispara la resolución de la promesa.
- Si llamás a reject(...), se dispara el rechazo de la promesa.




## Encadenando con .then() y .catch()

El .then() es un mensaje que entienden las promesas.

```javascript
  miPromesa.then((resultado) => {
      console.log("Éxito:", resultado); // En resultado se guarda "¡Promesa cumplida!"  
    }).catch((error) => {
      console.error("Error:", error); // En error se guarda "Ups, algo salió mal"
    });

```

## LO MAS IMPORTANTE
**- .then() recibe el valor que se pasó a resolve()** en el argumento de la funcion resolve(), en este caso se llama resultado.
**- .catch() captura lo que se pasó a reject()** en el argumento de la funcion reject(), en este caso se llama error.


resolve("¡Promesa cumplida!") ───▶ then((resultado) => ...)
reject("Ups, algo salió mal") ───▶ catch((error) => ...)

Estas flechas son muy útiles para que el lector vea "cómo viaja" el dato desde la promesa hacia el código que lo maneja.
 

`Dentro del new Promise(...), los nombres resolve y reject son solo parámetros de función, así que podés usar cualquier nombre que quieras. Lo importante es la posición de esos parámetros y cómo los usás.`

Por ejemplo, esto funciona igual que el típico resolve, reject:

```javascript
const promesaPersonalizada = new Promise((cumple, falla) => {
  const exitoso = true;

  if (exitoso) {
    cumple("Todo salió bien");
  } else {
    falla("Algo falló");
  }
});

promesaPersonalizada
  .then((msg) => console.log("Éxito:", msg))
  .catch((err) => console.error("Error:", err));

```

🔍 Lo clave es que cumple está en la primera posición (como resolve) y falla en la segunda (como reject).

Cuando vos creás una promesa con new Promise(...), estás generando un objeto especial (una instancia)que tiene métodos incorporados como .then() y .catch(). Estos métodos están disponibles porque el objeto que retorna el constructor de Promise tiene una interfaz estándar en JavaScript diseñada para manejar flujos asíncronos.


🔍 ¿Qué hacen .then() y .catch()?
- .then(callback): Se ejecuta si la promesa fue resuelta exitosamente (resolve).
- .catch(callback): Se ejecuta si la promesa fue rechazada (reject).
Y sí: podrías pensarlo como que son “mensajes” que la instancia de la promesa sabe interpretar gracias a su prototipo interno (Promise.prototype).


*Un callback es simplemente la declaracion de toda una función que se pasa como argumento a otra función, y se ejecuta en un momento determinado, generalmente cuando una tarea termina.*


Con .then() no se pausa la ejecución de tu función. Es decir, el código sigue corriendo inmediatamente después, y el .then() se ejecuta cuando la promesa se resuelve, pero no bloquea las líneas siguientes.


---



# Promesas
¿Qué son las promesas?

Son un **mecanismo para manejar operaciones asíncronas**. Permiten manejar el eventual resultado de una operación asincrónica, ya sea un éxito o un fallo. 

Las promesas representan un valor que puede no estar disponible aún, pero que eventualmente se resolverá o rechazará, **permitiendo que el código continúe ejecutándose en paralelo sin bloquear la ejecución principal**.

¿Para qué se utilizan las Promesas?
Simplifican el manejo de secuencias de operaciones asíncronas y el manejo del flujo de ejecución en escenarios donde se depende de datos o eventos que tardan tiempo en completarse, como:

- Solicitudes de red (p.ej., AJAX/fetch).
- Lecturas de archivos en aplicaciones basadas en Node.js.
- Operaciones de bases de datos.
- Operaciones que requieran esperar por un evento o respuesta antes de continuar.



## Cómo crear una promesa:

```javascript
    const promesa = new Promise((resolve, reject) => {
        // Simulamos un valor para que la condición se cumpla (o no)
        const x = 42;
        // Operación asincrónica simulada
        setTimeout(() => {
            if (x === 42) {
                resolve("¡Éxito!"); // La promesa se resuelve exitosamente
            } else {
                reject("Fallo."); // La promesa falla y se rechaza
            }
        }, 2000);
    });
```

new Promise(executor): El constructor Promise se utiliza para crear una nueva promesa. Recibe una función ejecutora como argumento ( , ) => {}, que a su vez recibe dos funciones: resolve y reject.

executor: Es la función que se ejecuta inmediatamente por el constructor Promise, antes incluso de que el constructor Promise devuelva el objeto promesa recién creado. Esta función generalmente inicia algún trabajo asíncrono y luego, dependiendo del resultado de ese trabajo, llama a resolve o a reject.

resolve(value): Esta función se llama con un valor cuando la operación asíncrona se completa con éxito. Al llamar a resolve, la promesa pasa de estar en estado "pendiente" a "cumplida". 
El valor pasado a resolve es lo que se maneja con el método .then de la promesa.

reject(reason): Esta función se llama con una razón o error cuando la operación asíncrona falla o se encuentra con un error. Al llamar a reject, la promesa pasa de estar en estado "pendiente" a "rechazada". La razón pasada a reject es lo que se maneja con el método .catch de la promesa.


## Métodos de la promesa

```javascript
    promesa.then((valor) => {
        console.log(valor); // Se ejecuta si la promesa se resuelve exitosamente
    }).catch((error) => {
        console.error(error); // Se ejecuta si la promesa se rechaza
    }).finally(() => { 
        console.log('Operación completada.’); // Se ejecuta al finalizar la resolución
    });
```

.then(): Este método se ejecuta si la promesa se resuelve exitosamente. Valor recibe el valor que fue pasado a resolve cuando la promesa fue cumplida. En este caso, imprime el valor resuelto de la promesa a la consola.

.catch(): Este método gestiona los errores, se ejecuta si la promesa se rechaza. Error recibe el error o la razón que fue pasada a reject cuando la promesa fue rechazada. En este caso  Imprime el error a la consola. Este es un mecanismo clave para el manejo de errores en el flujo asíncrono.

.finally(): se ejecuta al final del manejo de la promesa, independientemente de si fue resuelta o rechazada. No recibe ningún argumento, y su propósito es realizar acciones de limpieza o finalización que se deben ejecutar después de que las promesas se han completado.



---

# Promesas en Copilot


Las promesas en JavaScript son un mecanismo para manejar operaciones asíncronas. Representan un valor que puede estar disponible ahora, en el futuro o nunca. Una promesa puede estar en uno de estos tres estados:

```javascript

let promise = new Promise((resolve, reject) => {
  // Aquí va el código asíncrono que puede llamar a resolve o reject
});

// Manejadores de promesa
promise
  .then(result => {
    // Aquí va el código que se ejecuta si la promesa se resuelve con éxito
  })
  .catch(error => {
    // Aquí va el código que se ejecuta si la promesa se rechaza
  });
```
 
`.then(result => { ... })`: Este método se ejecuta cuando la promesa se resuelve exitosamente. El argumento result es el valor pasado a la función resolve.
`.catch(error => { ... })`: Este método se ejecuta cuando la promesa se rechaza. El argumento error es el valor pasado a la función reject.

**Pendiente (Pending):** El estado inicial, no resuelta ni rechazada.
**Resuelta (Fulfilled):** La operación se completó con éxito y la promesa tiene un valor resultante.
**Rechazada (Rejected):** La operación falló y la promesa tiene una razón para el fallo.


## Estructura Básica de una Promesa
Aquí hay un ejemplo básico de cómo se crea y usa una promesa:


```javascript

let promise = new Promise((resolve, reject) => {
  // Simulamos una operación asíncrona usando setTimeout
  setTimeout(() => {
    let success = true; // Cambia esto a false para simular un fallo
    if (success) {
      resolve("Operación exitosa");
    } else {
      reject("Operación fallida");
    }
  }, 1000);
});

promise
  .then(result => {
    console.log(result); // "Operación exitosa"
  })
  .catch(error => {
    console.log(error); // "Operación fallida"
  });

```

## Métodos Principales

then(onFulfilled, onRejected):

onFulfilled: Función que se ejecuta si la promesa se resuelve con éxito.
onRejected: Función que se ejecuta si la promesa es rechazada.
catch(onRejected):

onRejected: Función que se ejecuta si la promesa es rechazada. Es equivalente a promise.then(null, onRejected).
finally(onFinally):

onFinally: Función que se ejecuta cuando la promesa se resuelve o se rechaza, independientemente del resultado.
Ejemplo de Uso Real
Supongamos que queremos hacer una solicitud HTTP para obtener datos de un servidor. Usamos la función fetch que devuelve una promesa.

```javascript

fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json(); // Convertimos la respuesta a JSON
  })
  .then(data => {
    console.log(data); // Aquí manejamos los datos recibidos
  })
  .catch(error => {
    console.error('Hubo un problema con la solicitud:', error);
  });

```




## Beneficios de Usar Promesas

**Manejo de errores:** Promesas proporcionan una forma clara y estructurada de manejar errores en operaciones asíncronas.
**Encadenamiento:** Permiten encadenar múltiples operaciones asíncronas de una manera más legible que el anidamiento de callbacks.
**Legibilidad:** Hacen que el código asíncrono sea más fácil de leer y entender.


## Resumen
Las promesas son una herramienta poderosa en JavaScript para manejar operaciones asíncronas. Permiten escribir código más limpio, más legible y manejar errores de una manera estructurada. Con la llegada de async y await en ES2017, trabajar con promesas se ha vuelto aún más sencillo y expresivo.


