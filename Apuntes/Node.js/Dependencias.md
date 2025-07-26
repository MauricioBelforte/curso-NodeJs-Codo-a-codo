
## 📚 Guía de dependencias comunes en proyectos Node.js

### 🧩 ¿Qué son las dependencias?

- Son **librerías externas** que tu proyecto necesita para funcionar.
- Se definen en el archivo `package.json` dentro de las secciones:
  - `"dependencies"` → usadas en tiempo de ejecución.
  - `"devDependencies"` → usadas solo en desarrollo (tests, nodemon, etc).

---

## 🔧 Dependencias recomendadas

### `dependencies`

| Paquete       | Uso principal                                       | Motivo para incluirlo 💡                                |
|---------------|-----------------------------------------------------|---------------------------------------------------------|
| `axios`       | Realizar peticiones HTTP (GET, POST, etc)          | Más versátil que `fetch`, con mejor manejo de errores  |
| `chalk`       | Pintar texto en colores en la consola              | Ideal para logs técnicos visuales                      |
| `dotenv`      | Cargar variables desde `.env`                       | Separación segura de claves, tokens y configs          |
| `express`     | Servidor HTTP ligero y flexible                    | Útil para APIs, webs o interfaces de bots              |
| `node-fetch`  | Alternativa a `axios`, más liviana                 | Buena opción si buscás reducir dependencias            |
| `openai`, `@anthropic-ai/sdk`, etc | Acceder a APIs de modelos IA                  | Depende del proveedor de modelos que uses              |

---

### `devDependencies`

| Paquete     | Uso principal                                  | Motivo para incluirlo 💡                                  |
|-------------|------------------------------------------------|-----------------------------------------------------------|
| `nodemon`   | Reinicia el servidor cuando hay cambios        | Agiliza el desarrollo en local                            |
| `eslint`    | Analiza el código y marca errores de estilo    | Mejora la calidad y coherencia del código                 |
| `prettier`  | Formatea automáticamente el código             | Evita inconsistencias de estilo y mejora la legibilidad   |
| `jest`      | Framework de testing                           | Ideal para pruebas unitarias en funciones críticas        |

---

## 🧪 Ejemplo de `package.json` con dependencias clave

```json
{
  "name": "chatbot-modular",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "dotenv": "^16.0.3",
    "chalk": "^5.3.0",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "eslint": "^8.52.0",
    "prettier": "^3.0.0",
    "jest": "^29.7.0"
  }
}
```

---

## 📌 Buenas prácticas al documentar dependencias

- Siempre explicá **por qué** usás cada librería.
- Usá `npm install nombre --save` para agregar a `"dependencies"`.
- Usá `npm install nombre --save-dev` para agregar a `"devDependencies"`.
- Documentá cada librería en tu README o notas internas.
- Usá scripts `"start"` y `"dev"` para mantener la modularidad y fluidez.

---

