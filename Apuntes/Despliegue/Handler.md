
### ⚙️ ¿Qué es un `handler`?

Un *handler* es simplemente una **función que maneja una request HTTP** entrante. Es el núcleo de un endpoint: recibe la petición, procesa los datos, y responde algo.

En Node.js + Vercel (`api/*.js`), la estructura típica es:

```js
export default function handler(req, res) {
  // acá validás método, inputs, lógica, etc.
  res.status(200).json({ message: "Todo OK!" });
}
```

---

### 📍 ¿Dónde se usa?

En Vercel, cada archivo dentro de la carpeta `/api` **exporta un único handler**. Vercel lo detecta automáticamente como un endpoint serverless.

Ejemplos:
- `/api/chat.js` → define `handler(req, res)`
- Se convierte en endpoint: `https://tuapp.vercel.app/api/chat`

En backend local (por ejemplo, Express), el concepto es similar, aunque se usa de forma más explícita:

```js
app.post('/api/chat', (req, res) => {
  // este callback es un handler
});
```

---

### ✅ ¿Es obligatorio?

Sí, en los endpoints: **sin handler, no hay lógica**. Es donde definís qué pasa con la request.

- En Vercel es *obligatorio exportarlo* (`export default handler`)
- En Express o frameworks similares, es el **callback de cada ruta**

---

### 🌐 ¿Es solo para Vercel o también local?

Sirve en ambos contextos, pero cambia la forma de declararlo:

| Entorno | Forma de usar handler | Requiere exportación |
|--------|------------------------|----------------------|
| Vercel | `export default function handler(req, res)` | ✅ Sí |
| Express local | `app.get(..., (req, res) => {})` | ❌ No, se define en línea |
| Otros serverless (Netlify, AWS) | Similar a Vercel, con formato específico | ✅ En general, sí |

