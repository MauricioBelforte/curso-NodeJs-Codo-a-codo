# Guia para usar npm

npm es un paquete que viene instalado por defecto con node,asi que se usa de una.


# 🧾 ¿Qué rol cumple npm init?
**Su único propósito es crear el archivo package.json.**
**Una vez que ese archivo ya existe (lo hayas generado con init o manualmente), no tenés que volver a correr el comando.**


---

## 🚀 Inicializar un proyecto Node.js: 3 métodos comparados
Para comenzar un proyecto hay que escribir en consola:

### 1. `npm init`

- **¿Qué hace?**
  - Ejecuta un `asistente` interactivo en la terminal que te va preguntando paso a paso los campos para completar tu `package.json`.
- **Ventajas**
  - Te permite personalizar todos los campos desde el inicio: nombre del paquete, versión, descripción, punto de entrada (`main`), repositorio, autor, licencia, etc.
- **Desventajas**
  - Es más lento si ya sabés lo que querés, porque requiere confirmar cada paso manualmente.
- **Ideal cuando…**
  - Querés que el archivo inicial esté bien documentado y ajustado a los valores reales desde el principio.

---

### 2. `npm init -y`

- **¿Qué hace?**
  - Crea `automáticamente` un archivo `package.json` con valores por defecto, sin hacerte preguntas.

   
- **Valores por defecto que genera**
  ```json
  {
    "name": "nombre-del-folder",
    "version": "1.0.0",
    "main": "index.js",
    "license": "ISC"
  }
  ```
- **Ventajas**
  - Rápido y útil para pruebas, prototipos o cuando sabés que luego vas a editarlo manualmente.
- **Desventajas**
  - Puede dejarte valores genéricos que no representan tu proyecto si no lo modificás luego.
- **Ideal cuando…**
  - Estás haciendo pruebas o querés bootstrapear rápido el entorno.

---

### 3. Crear `package.json` manualmente ✍️

- **¿Qué haces?**
  - Creás el archivo `package.json` `directamente` en la raíz con tus propios valores.
  - No hace falta ejecutar npm init ni npm init -y si ya creaste tu propio package.json manualmente.
  - 
- **¿Cómo hacerlo correctamente?**
  - Debe ser un archivo válido en formato JSON, por ejemplo:
    ```json
    {
      "name": "mi-bot-resiliente",
      "version": "1.0.0",
      "main": "src/index.js",
      "scripts": {
        "start": "node src/index.js"
      },
      "author": "Mauricio Belforte",
      "license": "MIT"
    }
    ```
- **Ventajas**
  - Máximo control sobre la estructura y campos. Podés aplicar naming, estructura y convenciones propias sin el paso interactivo.
- **Desventajas**
  - Podés olvidarte de algún campo necesario si no tenés una plantilla.
- **Ideal cuando…**
  - Querés total precisión y adaptar el archivo a un estándar de producción desde el comienzo.

---

## 🧠 Conclusión

| Método             | Personalización | Velocidad | Recomendado para                   |
|--------------------|------------------|-----------|------------------------------------|
| `npm init`         | Alta             | Media     | Proyectos detallados o públicos    |
| `npm init -y`      | Baja             | Alta      | Prototipos o desarrollos rápidos   |
| Manual (`package.json`) | Máxima           | Variable   | Entornos de producción personalizados |

---




## 📦 ¿Qué pasa si ya hay dependencias en `package.json`?

Cuando el archivo contiene una sección `"dependencies"` o `"devDependencies`, significa que:

- 1) Ya fueron instaladas previamente con `npm install nombre-paquete`
- 2) Se agregaron manualmente al JSON (aunque no estén instaladas aún en `node_modules`)
- 3) El proyecto espera que esas librerías estén disponibles para correr correctamente

---

### 🔍 Ejemplo de `package.json` con dependencias

```json
{
  "name": "mi-bot-fallback",
  "version": "1.0.0",
  "main": "src/index.js",
  "dependencies": {
    "axios": "^1.6.0",
    "chalk": "^5.3.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

---

## 🧠 ¿Qué implica esto?

- Al correr `npm install` desde ese proyecto, se instalan **todas** las dependencias listadas, respetando versiones.
- Si el archivo fue creado a mano, podés tenerlo todo listo para clonar el proyecto y levantarlo con un solo comando.
- `Es ideal si buscás que otros devs (o vos mismo) puedan reproducir el entorno exacto sin depender de pasos interactivos.`
---

## 📌 Consideraciones clave

| Opción             | ¿Instala paquetes? | ¿Requiere edición manual? | ¿Ideal para…?                      |
|--------------------|---------------------|----------------------------|------------------------------------|
| `package.json` con dependencias | No (hasta que hacés `npm install`) | Sí | Proyectos productivos replicables |
| `npm init` / `npm init -y`      | No (solo crea el archivo)          | Sí o Interactivo | Kickstart sin dependencias aún     |

---



node app.js Para ajecutar


/**
 * Crearemos un servidor con el módulo express
 * 1- npm init -y
 * 2- npm install express --save
 * 3- Avanzamos con el código del servidor
 **/


//Para poder instalar mysqlen nuestro proyecto,
npm install mysql2 

//Para manejo de archivos
npm install multer