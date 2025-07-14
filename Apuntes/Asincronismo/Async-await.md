# async / await

**async y await son extensiones de las promesas** en JavaScript que simplifican la forma de trabajar con operaciones asíncronas. Estos hacen que el código asíncrono sea más fácil de escribir y entender sin las complejidades habituales asociadas con el manejo de promesas. 

## Es lo mismo que una Promesa?

async/await no reemplaza a Promise((resolve, reject) => {}), pero sí te permite usar promesas de forma más simple y legible.

Cuando se escribe new Promise(...), se esta creando una instancia de promesa manualmente. Con async/await, estás esperando una promesa sin tener que encadenar .then().

### Ejemplo con new Promise(...)
Aca tengo que estar enganchando resolve con resultado y reject con error.

```javascript

function obtenerDato() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("¡Dato recibido!");
    }, 1000);
  });
}

obtenerDato()
.then(resultado => {
  console.log(resultado);
})
.catch(error => {
    console.error(error);
  });

```

### ✨ Ahora con async/await:

```javascript

async function mostrarDato() {
  const resultado = await obtenerDato(); // Pausa hasta que se resuelve obtenerDato()
  console.log(resultado);
}
mostrarDato();

```

👉 obtenerDato() devuelve una promesa, porque fue creada con new Promise(...)

⚡ Pero lo que se guarda en resultado ya no es una promesa, sino el valor que esa promesa devuelve cuando se resuelve. En este caso, ¡Dato recibido!.

🔁 Así que:
- obtenerDato() → devuelve una promesa
- await obtenerDato() → devuelve el resultado de la promesa (en este ejemplo, un string)

La función obtenerDato() simula una promesa manualmente. 
Pero no es que hay que escribir new Promise(...) si usamos async/await, como aca abajo

```javascript
// Esto no hace falta si usamos async/await: 
// porque es para usar fetch
function obtenerDato() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("¡Dato recibido!");
    }, 1000);
  });
}
```


Sino que en muchos casos, ya tenés una función que devuelve una promesa y no necesitás crearla desde cero.

💡 Por ejemplo, usando fetch():

```javascript

async function mostrarUsuario() {
  const respuesta = await fetch("https://api.example.com/usuario");
  const datos = await respuesta.json();
  console.log(datos);
}
```


`Ves que el código con async/await parece más secuencial y fácil de leer. Ambos hacen lo mismo, pero async/await te ahorra complejidad, especialmente cuando tenés varias promesas encadenadas.`

## Un await puede devolver solo texto? 
Un await puede devolver cualquier tipo de dato que venga como resultado de una promesa — no solo texto.
📦 Puede devolverte:
- Un string (como "¡Hola!")
- Un número (como 42)
- Un booleano (true o false)
- Un objeto (por ejemplo, { nombre: "Mauricio", edad: 30 })
- Un array (como [1, 2, 3])
- Incluso otra promesa 😮 (aunque eso sí, tendrías que volver a hacer await)
💡 Todo depende de qué esté resolviendo la promesa. Por ejemplo


```javascript

async function obtenerUsuario() {
  return { nombre: "Mauricio", activo: true };
}

async function mostrarUsuario() {
  const usuario = await obtenerUsuario(); // resultado es un objeto
  console.log(usuario.nombre); // "Mauricio"
}
```

Conclusion: .then() en las promesas no frena el flujo. En cambio, await sí lo hace dentro de una función async. Usar await es como decirle al código: “Esperá acá hasta que esté el resultado, y después seguí”


---


## La función async

La palabra clave async se utiliza para declarar una función como asíncrona. Declara que una función puede, en algún momento, esperar a que las promesas se resuelvan sin bloquear la ejecución de otras operaciones. Aquí están los detalles clave:

Devolución de una promesa: Una función async automáticamente devuelve una promesa. Si la función retorna algo que no es una promesa, ese valor será automáticamente envuelto en una promesa.

Sintaxis: Puede ser usada con declaraciones de funciones normales, funciones flecha, y métodos de clase.


## Ejemplo

En el siguiente ejemplo, declaramos una función asincrónica, por lo tanto devolverá automáticamente una promesa. Esto nos permite utilizar los métodos aplicados a las promesas cuando sea invocada la función.

```javascript

async function obtenerDatos() {
    return "Datos recibidos";
}

// La función devuelve una promesa
obtenerDatos().then(console.log); // Imprime "Datos recibidos"
```

Pero todavía, al no utilizar el await dentro de la función, no tenemos un asincronismo real en el código. 


## La palabra clave await

**await sólo puede ser usado dentro de funciones async** y es **usado para pausar la ejecución de la función** hasta que la promesa a la que se llama se resuelva o rechace. El uso de await ayuda a que el código asíncrono se lea de manera más intuitiva, casi como si fuera sincrónico.

```javascript
async function procesarDatos() {
    try {
        // Espera aquí hasta que fetch complete
        const datos = await fetch('https://api.example.com/datos'); 
        // Espera aquí hasta que la conversión a JSON complete
        const json = await datos.json(); 
        console.log(json);
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}
```

## Beneficios del uso de Async/Await

`Claridad y Legibilidad:` Al eliminar la necesidad de encadenar .then() y .catch(), el código se vuelve más claro y fácil de seguir.
`Error Handling:` El manejo de errores se simplifica mediante el uso de bloques try/catch, que son ya familiares para muchos desarrolladores y aplican de igual manera en contexto síncrono y asíncrono.
`Depuración Simplificada:` La depuración de código asíncrono puede ser complicada debido a las cadenas de promesas. Con async/await, puedes usar puntos de interrupción de depuración de manera más efectiva, ya que el flujo del código es más directo y predecible.


## Consideraciones

A pesar de sus ventajas, async/await no reemplaza completamente a las promesas, especialmente en situaciones donde se requiere manejar múltiples promesas concurrentes. En esos casos, funciones como Promise.all() siguen siendo de gran utilidad para optimizar el rendimiento al permitir la ejecución paralela.

En conclusión, async/await es una herramienta poderosa en JavaScript que, cuando se usa adecuadamente, puede hacer que el manejo de la asincronía no sólo sea más manejable, sino también mucho más elegante y eficiente.


