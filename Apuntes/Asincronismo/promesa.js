  // Cómo crear una promesa:
  // Se puede ejecutar directamente aca
  
  const promesa = new Promise((resolve, reject) => {
      // Simulamos un valor para que la condición se cumpla (o no)
        const x = 42;
      // Operación asincrónica simulada
      setTimeout(() => {
        if (x === 42) {
          resolve("¡Éxito!"); // La promesa se resuelve exitosamente
        } else {
          reject("Fallo."); // La promesa falla y se rechaza
        }
      }, 2000);
    });


    // Manejo de la promesa

    promesa
    .then((valor) => {
      console.log(valor); // Se ejecuta si la promesa se resuelve exitosamente.// Salida valor = "¡Éxito!"
    })
    .catch((error) => {
      console.error(error); // Se ejecuta si la promesa se rechaza // Salida error = "Fallo."
    })
    .finally(() => { 
      console.log('Operación completada'); // Se ejecuta independientemente de si la promesa se resolvió o se rechazó // Salida "Operación completada"
        // Se ejecuta al finalizar la resolucion
    });