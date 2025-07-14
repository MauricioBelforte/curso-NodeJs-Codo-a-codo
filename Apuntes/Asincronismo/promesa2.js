// Ejemplo de Uso de Promesas con then, catch, y finally
// Se puede ejecutar directamente aca

function obtenerDatosDeAPI() {
  return new Promise((resolve, reject) => {
    // Simulando una llamada a API con setTimeout
    setTimeout(() => {
      // Supongamos que esta es una operación que puede fallar aleatoriamente
      const fallo = Math.random() > 0.5; // 50% de probabilidad de fallo
      if (fallo) {
        reject("Error: No se pudo obtener los datos.");
      } else {
        resolve("Datos obtenidos exitosamente.");
      }
    }, 1000); // Simulamos un retraso de 1 segundo
  });
}


// Usando la función que devuelve la promesa
obtenerDatosDeAPI()
  .then(datos => {
    // Se ejecuta si la promesa se resuelve exitosamente
    console.log(datos);
  })
  .catch(error => {
    // Se ejecuta si la promesa se rechaza
    console.error(error);
  })
  .finally(() => {
    // Se ejecuta independientemente del resultado anterior
    console.log("Operación completada.");
  });
