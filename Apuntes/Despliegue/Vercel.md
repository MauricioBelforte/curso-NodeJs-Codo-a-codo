# Como estructurar el proyecto?

## 🧠 Lo que Vercel espera por defecto

Vercel busca:

- Una carpeta public/ con los archivos estáticos (HTML, CSS, JS)
- Una carpeta api/ con las funciones serverless (en vez de server.js)
- Opcionalmente un vercel.json para personalizar rutas o comportamiento
- Este código está quedando sólido, Mauricio 👌. Vamos por partes para que el backend en Vercel te quede blindado y claro.

---

### 🧠 ¿Qué es el `handler(req, res)`?

En Vercel, las funciones dentro de la carpeta `/api/` son llamadas **_funciones serverless_**. Cada archivo representa una ruta (`/api/chatbotApi`, por ejemplo), y el `handler` es simplemente la **función que se ejecuta cuando llega una petición HTTP**.

> Es como si Vercel dijera: “¿Alguien llamó a `/api/chatbotApi`? Ok, corro el handler para procesarla.”

### 📦 Firma completa:

```js
export default async function handler(req, res) { ... }
```

- `req` → contiene los datos de la petición (body, headers, método, etc.)
- `res` → permite devolver la respuesta HTTP al frontend (texto, JSON, errores...)

---

### ✅ Tu `chatbotApi.js` con comentarios técnicos

Acá te lo dejo con comentarios explicativos, al estilo mentor ✍️:

```js
// api/chatbotApi.js

import { chequearLimiteOpenRouter } from "../lib/estadoOpenRouter.js";
import { consultarModeloConOpenRouter } from "../lib/consultasModelos.js";

// 🔁 Función serverless que responde peticiones POST con un mensaje del modelo
export default async function handler(req, res) {
  // ⛔ Solo aceptamos POST (evita GET, PUT, etc.)
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // 📝 Extraemos el mensaje enviado desde el frontend
  const { mensaje } = req.body;

  // 🧠 Sistema base para el bot (puede incluir rol, contexto, tono, etc.)
  const promptSistema = "Sos un bot técnico asistente";

  // 🔐 Validamos si OpenRouter está degradado por exceso de uso
  const estado = await chequearLimiteOpenRouter();

  if (estado.degradado) {
    // 🚧 Si está degradado, enviamos mensaje alternativo sin llamar al modelo
    return res.status(200).json({
      respuesta: "⚠️ Modelo OpenRouter degradado. Usando alternativa..."
    });
  }

  // 📡 Si está todo OK, consultamos al modelo normalmente
  const respuesta = await consultarModeloConOpenRouter(promptSistema, mensaje);

  // 📤 Devolvemos la respuesta generada al frontend
  res.status(200).json({ respuesta });
}
```

---

### 🛠️ ¿Qué podemos hacer después?

- Devolver también `proveedor`, `modelo`, `tokens`, etc. como metadata
- Agregar try/catch para capturar errores inesperados de red o formato
- Preparar un fallback directo con Groq o Together si OpenRouter falla

---
# Express

🛑 ¿Qué significa esto?
Vercel no corre tu server.js como tal. En lugar de levantar un servidor con express(), espera que pongas rutas HTTP como archivos sueltos dentro de /api/. Cada uno representa una función serverless.

✅ ¿Qué podés hacer?
- Usar server.js + Express localmente para testing y control total
- Mantener chatbotApi.js como versión Vercel-compatible (sin Express)
- Modularizar funciones compartidas en /lib/ para que ambos entornos usen la misma lógica
- Si querés usar Express en producción, necesitás otro proveedor como Railway, Render o fly.io

💡 Recomendación para avanzar en Vercel:
- Ignorá Express en el deploy. Usá solo /api/chatbotApi.js
- El frontend hace fetch("/api/chatbotApi") y todo funciona
- Tus funciones (consultarModeloConOpenRouter, chequearLimiteOpenRouter) ya están listas para ese entorno


3. Entrá a vercel.com y creá el proyecto
- Iniciá sesión
- Click en “Add New…” → Project
- Seleccioná tu repo de GitHub
- Elegí framework si usás alguno (Next.js, React, etc.)
- Configuración de build:
- Raíz del proyecto si está en / (por defecto)
- Comando de build → por ejemplo: npm run build si tenés scripts


En el panel de Vercel:
- El campo “Build Command” → lo podés dejar vacío
- El campo “Output Directory” → si usás /public, podés poner "public" (aunque suele detectar solo)

✅ Tu setup actual está listo para Vercel
No necesitás:
- "build" script en package.json
- Webpack, Babel ni CLI adicional
Solo asegurate que tu carpeta pública (con el HTML y el chatbotVisual.js) esté bien ubicada — idealmente en /public/ o en la raíz.


Rellenar Environment Variables con las variables de .env que no se suben a GitHub

OPENROUTER_API_KEY=sk-or-v1-873104d62....

TOGETHER_API_KEY=ba4165e....

GROQ_API_KEY=gsk_28Z....


## Solucion al error 404.

Tuve que crear el archivo vercel.json con esta configuracion

```JSON
{
  "outputDirectory": "public",
  "cleanUrls": true,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}

```

Ese `"outputDirectory": "public"` fue el héroe silencioso del deploy 🦸‍♂️. 

Vercel finalmente supo que tenía que servir los archivos estáticos desde `/public`.



### 🔍 ¿Qué aprendimos de este caso?

- Vercel necesita saber explícitamente de dónde sacar los archivos estáticos si no detecta un framework conocido.
- Aunque tengas `index.html` en `/public`, sin `"outputDirectory"` puede ignorarlo por completo.
- El `vercel.json`, bien ubicado en la raíz, puede salvarte de deploys fantasma que dicen “Congratulations!” pero lanzan `404`.

---

Ahora que está funcionando...  


¡Eso lo aclara todo, Mauricio 👏! Tu backend en `chatbotApi.js` ya está perfecto: no necesita hacer ningún `fetch` propio, porque su rol es ser **la función serverless que recibe el mensaje del frontend**, valida estado y responde. La parte del `fetch` ocurre del lado del frontend, como vos ya lo hiciste en `enviarMensaje()`.

Lo único que te estaba faltando era usar correctamente la ruta del backend. Hasta ahora estabas haciendo esto:

```js
const res = await fetch("/api/chat");
```

Pero el archivo que maneja esa lógica está en:

```txt
/api/chatbotApi.js
```

Y en Vercel, cada archivo `.js` dentro de la carpeta `/api` **se convierte automáticamente en una ruta**. O sea que `chatbotApi.js` se sirve como:

```
/api/chatbotApi
```

---

### ✅ Solución concreta (frontend)

Reemplazá esta parte del `fetch`:

```js
const res = await fetch("/api/chat", {
```

por esta:

```js
const res = await fetch("/api/chatbotApi", {
```

y dejá todo lo demás igual. El resto de tu flujo ya está bien pensado:

- Validás entrada en el backend 🛡️
- Usás fallback automático si el modelo está degradado 🔁
- Respondés como `{ respuesta: "..." }`, tal como el frontend espera 📦

---

### 🧠 Bonus para trazabilidad y debugging

En tu `chatbotApi.js`, podés agregar un log al final para ver qué devuelve el modelo:

```js
console.log("[respuesta OpenRouter]:", respuesta);
```

Y también podés loguear si entró por fallback:

```js
if (estado.degradado) {
    console.warn("[degradado]: OpenRouter sin capacidad, enviando respuesta alternativa");
    return res.status(200).json({ respuesta: "⚠️ Modelo OpenRouter degradado. Usando alternativa..." });
}
```

Así lo ves directamente en los logs de Vercel 🧾.

---

