
const options = {method: 'GET', headers: {accept: 'application/json'}};
const container = document.getElementById('personajes');
//Declaramos el contenedor anclándonos en el id=“personajes” definido en el HTML.
const pedirDatos = () => {
  fetch('https://rickandmortyapi.com/api/character', options)
   .then(response => response.json())
   .then(response => {
       // Incorporamos el código que se iterará por cada elemento del array generado con el json recibido. 
       response.results.map((personaje) => {
         const article = document.createElement('article');
         article.setAttribute('class', 'character');
         article.innerHTML = `
         <img src="${personaje.image}" alt="${personaje.name}">
         <h2>${personaje.name}</h2>
         <div>
         <p>${personaje.species}</p>
         </div>`;
         container.appendChild(article);
      });
      
    })
    .catch(err => console.error(err));
}
  
pedirDatos();
// Llamamos a la función para que se ejecute automáticamente cuando se cargue el archivo. También lo podemos hacer ante un evento determinado.