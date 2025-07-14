# Manejo de Errores con Try/Catch

En síncrono: try/catch permite capturar errores en bloques de código específicos para evitar que los errores no controlados rompan el flujo de ejecución.


```javascript
    try {
        let resultado = operacionRiesgosa();
        console.log(resultado);
    } catch (error) {
        console.error("Se capturó un error:", error);
    }

```


En asíncrono: try/catch dentro de funciones async para manejar errores de promesas.

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
