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