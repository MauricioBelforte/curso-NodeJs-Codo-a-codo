
# 🛡️ Documentación Técnica: CORS (Cross-Origin Resource Sharing)

## 📘 ¿Qué es CORS?

CORS es un mecanismo de seguridad implementado por los navegadores que **restringe las peticiones HTTP entre orígenes distintos**. Su objetivo es proteger al usuario evitando que scripts maliciosos accedan a recursos de otros dominios sin permiso.

Ejemplo: una app en `https://frontend.com` intentando acceder a `https://api.backend.com`.

---

## ⚠️ Fallas comunes en entornos serverless o desacoplados

| Falla | Causa probable | Comportamiento típico |
|------|----------------|------------------------|
| ❌ Error 403 / 405 | Método no permitido por CORS | La request no llega al handler |
| ❌ Error 500 | El backend no maneja OPTIONS | La preflight falla y el frontend no recibe respuesta útil |
| ❌ Request bloqueada | Faltan headers `Access-Control-*` | El navegador cancela la request antes de ejecutarla |
| ❌ Inconsistencia entre local y producción | En producción el `origin` cambia | Solo falla en despliegues públicos |

---

## 🧪 Cómo testear CORS correctamente

1. Usar **frontend local** con distintos orígenes (`localhost`, `127.0.0.1`, IP externa).
2. Probar desde **GitHub Pages** o Vercel para simular producción.
3. Usar herramientas como [Hoppscotch](https://hoppscotch.io/) que permiten configurar el header `Origin`.

---

## 🧰 Soluciones y buenas prácticas

### 🔧 Backend (Node.js/Vercel)

```js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // o origen específico
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // lógica normal del endpoint
}
```

#### ✅ Recomendaciones:
- Aceptá `OPTIONS` explícitamente.
- Usá `'*'` solo si querés acceso irrestricto (ideal para pruebas o APIs públicas).
- Para producción, usá un listado blanco de orígenes confiables.

---

### 🧱 Frontend

- Siempre asegurate de usar `Content-Type: application/json` si el backend lo requiere.
- Evitá enviar credenciales si no estás configurando `Access-Control-Allow-Credentials`.
- Logueá errores de red para distinguir entre problemas CORS vs. lógica del backend.

---

## 🧼 Checklist de blindaje CORS

- [x] Manejo de método `OPTIONS`
- [x] Headers `Access-Control-*` en cada endpoint
- [x] Validación del `origin` dinámico si es necesario
- [x] Tests desde distintos entornos: local, Pages, Vercel
- [x] Logging defensivo de preflight y fallos de integración

---

## 📚 Recursos adicionales

- [MDN Web Docs – CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Vercel – Handling CORS](https://vercel.com/docs/edge-network/cors)
- [RFC estándar CORS](https://fetch.spec.whatwg.org/#http-cors-protocol)

---

> Documentado por Mauricio Belforte · Arquitectura modular para IA embebible  
> ⚙️ Última revisión: [fecha actualizada manualmente]
```

