# 🧠 ¿Por qué usamos `JSON.stringify()` y `JSON.parse()`?

Aunque **JSON** significa _JavaScript Object Notation_, no es lo mismo que un objeto JavaScript. JSON es un **formato de texto plano (es solo una cadena de texto, un string)** que permite representar datos estructurados, ideal para enviar o almacenar información.

---

## 🧩 Diferencias clave entre JSON y objetos JavaScript

```js
// Objeto Javascript
const persona = {
  nombre: "Mauricio",
  edad: 30
};

// Objeto JSON
const json = '{"nombre":"Mauricio","edad":30}';
```

- `persona`: es un **objeto JavaScript**
- `json`: es una **cadena de texto con formato JSON**

---

## 🔄 ¿Para qué se usan `JSON.stringify()` y `JSON.parse()`?

### `JSON.stringify(objeto)`

Convierte un objeto JavaScript en una cadena JSON:

```js
const jsonPersona = JSON.stringify(objetoPersonaJS);
// Resultado: '{"nombre":"Mauricio","edad":30}'
```

Se usa cuando querés:

- Enviar datos por red (`fetch`, sockets)
- Guardarlos en `localStorage` o en un archivo
- Registrarlos para logging o debugging


📦 `JSON.stringify()` en JavaScript sirve para **convertir un objeto o valor en una cadena JSON válida** — es decir, transforma datos JavaScript (como objetos, arrays, números o strings) en un texto plano que puede ser enviado por red, almacenado o registrado en logs.

---

### 🧠 Ejemplo básico

```js
const datos = { usuario: "Mauricio", mensaje: "Hola bot" };

const json = JSON.stringify(datos);

console.log(json);
// 👉 Resultado: '{"usuario":"Mauricio","mensaje":"Hola bot"}'
```

---

### 🚀 ¿Para qué se usa en proyectos como el tuyo?

- Para enviar datos al backend con `fetch(...)`, como hiciste vos:

  ```js
  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: mensajeDelUsuario })
  });
  ```

  > Sin el `JSON.stringify`, el `body` sería un objeto, y eso no se puede enviar directamente en una petición HTTP — tiene que ser texto plano es decir un string que va por la url del navegador.

---


---

### `JSON.parse(cadena)`

Convierte una cadena JSON en un objeto JavaScript:

```js
const objetoPersonaJS = JSON.parse(jsonPersona);
// Resultado: { nombre: "Mauricio", edad: 30 }
```

Se usa para:

- Leer datos guardados previamente
- Convertir respuestas JSON de una API en objetos utilizables

---

## 🚫 ¿Por qué no usar directamente el objeto JavaScript?

Porque:

- Los objetos no son texto → **no se pueden transmitir ni guardar fácilmente**
- JSON es un **formato universal**, compatible con otros lenguajes y sistemas
- Un objeto JS puede contener funciones, fechas, `undefined` o símbolos, que **JSON no admite**

---

## 📦 Analogía rápida

Pensá en un objeto JS como una maleta con cosas complejas. Para enviarla por correo (red o almacenamiento), necesitás empaquetarla como un paquete plano y estándar: eso es **JSON**.

---

## ✅ Ejemplo práctico con `localStorage`

```js
// Guardar objeto
const persona = { nombre: "Mauricio", edad: 30 };
localStorage.setItem("usuario", JSON.stringify(persona));

// Recuperar objeto
const json = localStorage.getItem("usuario");
const usuario = JSON.parse(json);
console.log(usuario.nombre); // "Mauricio"
```

---

> 🌟 TIP: JSON solo admite datos estructurados simples. Si necesitás guardar clases, métodos o estados complejos, tendrás que transformarlos a estructuras serializables.


---

# 🕹 Guardar puntajes de jugadores con `localStorage` y JSON

Cuando desarrollás un juego o una app donde necesitás persistir información como los puntajes entre sesiones del navegador, podés usar `localStorage` junto con `JSON.stringify()` y `JSON.parse()` para guardar y recuperar datos fácilmente.


🧠 ¿Por qué funciona?
localStorage es parte de la Web Storage API y almacena los datos de forma persistente, atados a un dominio. Esto significa que los datos no se borran al cerrar el navegador (a diferencia de sessionStorage).

---


## 🎯 Ejemplo básico

```js
// Guardar objeto
const persona = { nombre: "Mauricio", edad: 30 };
localStorage.setItem("usuario", JSON.stringify(persona));

// Recuperar objeto
const json = localStorage.getItem("usuario");
const usuario = JSON.parse(json);
console.log(usuario.nombre); // "Mauricio"
```

---

## 🧠 ¿Podés guardar puntajes de jugadores? ¡Sí!

Ejemplo:

```js
// 1. Puntajes iniciales
const puntajes = {
  jugador1: 120,
  jugador2: 85,
  jugador3: 200
};

// 2. Guardar en localStorage
localStorage.setItem("puntajesGuardados", JSON.stringify(puntajes));

// 3. Recuperar después
const data = localStorage.getItem("puntajesGuardados");
const puntajesRecuperados = JSON.parse(data);

console.log(puntajesRecuperados.jugador2); // 85
```

---

## ⚙️ Función reutilizable para actualizar puntaje

```js
function actualizarPuntaje(jugador, nuevoPuntaje) {
  const json = localStorage.getItem("puntajesGuardados");
  const puntajes = json ? JSON.parse(json) : {};

  puntajes[jugador] = nuevoPuntaje;
  localStorage.setItem("puntajesGuardados", JSON.stringify(puntajes));
}
```

---

## ✅ Ventajas

- Persistencia entre recargas
- Simple de implementar
- Ideal para apps front-end sin back-end

---

## ⚠️ Consideraciones

- Solo guarda **strings**, por eso se usa `JSON.stringify()`/`JSON.parse()`
- Capacidad limitada (~5MB)
- No es seguro para datos sensibles (cualquiera con acceso al navegador puede verlo)

---

## 🧩 Bonus: recuperar y mostrar en pantalla

```js
function mostrarPuntajes() {
  const json = localStorage.getItem("puntajesGuardados");
  const puntajes = json ? JSON.parse(json) : {};

  for (const jugador in puntajes) {
    console.log(`${jugador}: ${puntajes[jugador]} puntos`);
  }
}

mostrarPuntajes();
```

---

