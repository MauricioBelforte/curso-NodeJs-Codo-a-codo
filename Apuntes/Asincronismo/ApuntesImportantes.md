# Resumen para entender con mis palabras

Cuando pensamos en Promesas hay que pensar si esta resuelta o no esta resuelta. 
Quien resuelve las promesas? El .then() y el await 

# Version correcta

"Cuando trabajamos con promesas, lo clave es entender si están resueltas o pendientes.
No es que .then() o await las resuelvan directamente, sino que esperan a que lo hagan (por eso el asincronismo), y luego ejecutan acciones con el resultado."

# DATO IMPORTANTE 
Dentro del segundo .then() es donde se trabaja. Porque en su parametro data estan justamente los datos.

# Quien resuelve la promesa?
El código dentro del constructor new Promise(...) es el que decide cómo se resuelve.
Cuando usás new Promise(...), estás creando la promesa, y el que realmente la resuelve (o la rechaza) es **el código que está dentro de esa función constructora (el que esta marcado debajo)**.

Dentro de new Promise(**(resolve, reject) => { ... }**), vos tenés el control total:
- Llamás a resolve(valor) para resolverla con un resultado exitoso.
- Llamás a reject(error) para rechazarla con un error.
Ese bloque es lo que se ejecuta cuando creás la promesa. Vos decidís cuándo y cómo se resuelve.


🔧 ¿Qué recibe new Promise(...)?
El constructor Promise recibe una función callback con dos parámetros: resolve y reject.

```javascript

new Promise((resolve, reject) => {
  // lógica interna
});

```

## 🔍 ¿Y qué son resolve y reject?
`- Son funciones que vienen predefinidas por el motor de JavaScript.`
`- Están ahí para que vos las llames cuando querés decir: “Listo, terminé bien” (resolve) o “algo salió mal” (reject).`
- Son funciones que controlan el estado interno de la promesa.


- La función (resolve, reject) => { ... } es la función ejecutora.
- resolve y reject son funciones que vos no definís, pero sí usás.
- Cuando vos llamás a resolve(...), se dispara la resolución de la promesa.
- Si llamás a reject(...), se dispara el rechazo de la promesa.



# 📦 fetch()

Este método por sí solo **devuelve una promesa** que eventualmente se resuelve con un objeto Response cuando la solicitud HTTP termina.


```javascript
const promesa = fetch('https://api.example.com/data'); // promesa pendiente
```

```js
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => console.log("Datos:", data))
  .catch(error => console.error("Error:", error));
```

El fetch retorna una promesa pendiente. El .then() es un mensaje que entienden las promesas.

- fetch() lanza la petición → la promesa queda pendiente.
- El primer .then() dice: “cuando tengas el resultado, pasamelo”.
- .then(response => response.json()) es un encadenamiento:
- response es el objeto Response que te da fetch cuando la promesa se resuelve.

Qué es response.json()?
Es un método del objeto Response que **devuelve una promesa**. Esa promesa se resuelve con los datos convertidos de texto plano JSON ejemplo:  "{ "id": 1, "title": "Hola" }"; a un objeto JavaScript ejemplo: { id: 1, title: "Hola" }
Este metodo lee el cuerpo del Response, que normalmente es un string en formato JSON. (Es decir que lee el body: ReadableStram y ahi esta el JSON)

```javascript
// Objeto Response
Response {body: ReadableStream, bodyUsed: false, headers: Headers, ok: true, status: 200, ...}
```

- Lo interpreta usando JSON.parse() internamente, y lo convierte en un objeto Javascript.
- Finalmente response.json() devuelve una promesa que resuelve en un objeto JavaScript, no un string.


- El callback (response => response.json()) devuelve una nueva promesa (la de convertir el cuerpo en JSON) *La devuelve porque en el lenguaje JavaScript en las funciones flecha con una sola linea el return esta implicito*.
- Por eso, ese primer .then() también devuelve una promesa. Es decir, el primer .then() "hereda" la promesa que devuelve el callback.
- Cuando llega la respuesta del servidor, recién ahí la promesa se resuelve y se ejecuta el callback del primer .then() con el Response.
 Entonces, el siguiente .then() en la cadena espera automáticamente a que esa nueva promesa se resuelva.

🔁 En detalle

```javascript
fetch('...')
  .then(response => response.json()) // 🔄 devuelve una promesa
  .then(data => console.log(data));   // ✅ se ejecuta cuando esa promesa se resuelve
```

Es como si le dijeras: “No sigas hasta que tengas los datos procesados en JSON.” Esa es la magia del encadenamiento de promesas.

- ✅ Lo que recibe el segundo .then(data => ...): ese objeto JavaScript ya convertido.

Sin el segundo .then() no puedo acceder a los datos, solo son accesibles dentro del callback. Explicacion:
En el primer .then(response => response.json()), lo que tenés todavía no son los datos, sino una nueva promesa que va a resolverse con esos datos en formato objeto JavaScript.
📦 En otras palabras:
- El primer .then() recibe el Response, y llama a response.json(), que genera otra promesa.
- El segundo .then(data => ...) recibe el resultado final: ese objeto con los datos ya parseados y listos para usar.
💡 Así que sí, necesitás ese segundo .then() si querés trabajar directamente con los datos convertidos desde el JSON.



Si se imprime console.log(response) antes de llamar a .json(), vas a ver algo como:
```javascript
fetch("https://api.ejemplo.com/data")
  .then(response => {
    console.log(response); // 👉 Lo que se imprime es esto ⬇️
    return response.json();
  })
  .then(data => console.log(data));
```

```consola
Response {
  size: 0,
  timeout: 0,
  [Symbol(Body internals)]: { ... },
  body: ReadableStream,
  headers: Headers {
    'content-type': 'application/json',
    'x-ratelimit-limit': '100',
    'x-ratelimit-remaining': '99'
  },
  ok: true,
  status: 200,
  statusText: 'OK',
  url: 'https://api.ejemplo.com/data',
  redirected: false,
  type: 'cors',
  ...
}
```

*Luego mas adelante el response.json() se encarga de extraer los datos del cuerpo cuando lo llamás en el siguiente paso*


Si tratás de hacer console.log(response.json()) directamente, vas a ver algo curioso: no vas a obtener los datos, sino algo como esto 👇

```javascript

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log(response.json());
  });
```


Resultado en consola:
Promise {<pending>}


🧠 ¿Por qué? Porque .json() es una función asíncrona que retorna una promesa, no los datos directamente.
Para ver el contenido real que devuelve esa promesa, necesitás encadenar otro .then() o usar await. Ejemplo correcto:

```javascript

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => {
    console.log("Datos reales:", data);
  });
```


Esto sí mostrará:

```javascript

Datos reales: {
  userId: 1,
  id: 1,
  title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body: "quia et suscipit\nsuscipit..."
}
```


💡 También podrías usar async/await para hacerlo más legible:
```javascript

async function obtenerDatos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await response.json();
  console.log("Datos con await:", data);
}

obtenerDatos();
```



# 🔍 await fetch(...)

Cuando usás await, estás esperando a que esa promesa se resuelva. Una vez resuelta, el valor que te da await fetch(...) es ese objeto Response.


```javascript
const promesa = fetch('https://api.example.com/data'); // promesa pendiente
```

```javascript
const respuesta = await fetch('https://api.example.com/data'); // respuesta ya disponible
// Salida respuesta = Response
```

🔍 ¿Cómo funciona realmente?
- fetch() devuelve una promesa pendiente.(una promesa sin resolver)
- .then() se registra para reaccionar cuando esa promesa se resuelva.
- await pausa la ejecución hasta que se resuelva y guarda el resultado.
- await fetch(...) → espera esa promesa y devuelve el resultado resuelto: un Response


✅ Confirmación paso a paso:
- fetch(url) → devuelve una promesa pendiente, que representa la solicitud HTTP.
- await fetch(url) → espera a que esa promesa se resuelva.
- Una vez resuelta, el resultado es un objeto Response, que contiene:
- El cuerpo del contenido (aún sin leer),
- Los encabezados,
- El código de estado,
- Entre otras propiedades útiles.





# Ejemplo para convertir a json

```javascript

async function obtenerDatos() {
  const response = await fetch('https://api.example.com/data'); // 💡 resuelto: ya es el objeto Response
  const json = await response.json(); // ⚙️ también devuelve una promesa que se espera con await y se resuelve con un objeto json
  console.log(json);
}

```

🔍 ¿Por qué response.json() devuelve una promesa?
Porque el contenido de la respuesta puede tardar en llegar por completo. Entonces, para leerlo y parsearlo como JSON, el navegador necesita esperar a que todos los datos estén disponibles.


---

# Diferencias entre estos 2 ejemplos

## Ejemplo 1 (Se entiende mejor)

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


procesarDatos();

```

## Ejemplo 2

```javascript

async function processData() {
    try {
        let data = await fetch('https://api.example.com/data').then(res => res.json());
        console.log(data);
    } catch (error) {
        console.error("Error procesando los datos:", error);
    }
}

processData();

```

Tanto await como .then() trabajan con promesas, y en este caso particular cumplen el mismo propósito: esperar que los datos se conviertan en JSON después del fetch. Pero la forma en que lo hacen tiene diferencias importantes.


🧩 ¿Qué hace cada parte?

- **fetch(...)**: inicia la solicitud a la API y **devuelve una promesa** con la respuesta.
- **await fetch(...)**: espera a que llegue la respuesta de la API.
- **.then(res => res.json())**: toma esa respuesta y le dice “cuando llegues, convertite a JSON”.
- **await datos.json()**: espera a que esa respuesta se transforme en objeto JSON.
 
Así que sí:
✅ await datos.json() espera la conversión a JSON,
✅ res => res.json() hace lo mismo, pero con el estilo de .then().


⚖️ ¿Qué estilo conviene?
- Si querés flujo más claro y secuencial, como parece ser tu estilo al trabajar con modularidad y efectos visuales, el uso de await en dos pasos es más elegante.
- Si querés compactar una línea, el .then() es más corto pero menos explícito
