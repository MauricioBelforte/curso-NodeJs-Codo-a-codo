//Fetch
// Objeto opcion carga con las caractísticas de la petición que se va a recibir

const opcion = {
    method: "GET",
    headers: {
        accept: "application/json"
    }
};

// Fetch recibe dos argumentos, la url y las opciones
// fetch(url, opcion).then().then().catch()

// fetch("https://rickandmortyapi.com/api/character/1", opcion)
// //.then() recibe una funcion que se ejecuta cuando la promesa se cumple
// // es como queremos que se ejecute la promesa, o trabajar con la respuesta
// .then(function(response){
//     //Transformamos el string a un json
//     return response.json();

// })

// //transformar la respuesta en un objeto que js pueda reconocer
// //queremos que muestra en consola el nombre y la imagen
// .then(function(datos){
//     console.log(datos.name, datos.image);

// })

// //.catch() recibe una funcion que se ejecuta cuando la promesa falla
// .catch(function(error){
//     //mostrar en consola el error
//     console.error(error);
// })

// Declaramos una funcion que renderiza tarjetas en el frontend a partir del fetch
function pedirDatos() {
    // Llamamos a nuestro fetch
    fetch("https://rickandmortyapi.com/api/character", opcion)
        .then(function (response) {
            return response.json();
        })
        .then(function (personajes) {
            //Manipulacion de objetos del DOM
            const contenedor = document.getElementById("contenedor-tarjetas");

            // Utilizamos un for-each para consultar personajes y renderizarlos en el DOM
            personajes.results.forEach(function (dato) {
                //Creamos el elemento html
                const article = document.createElement('article');
                //Agregamos estilo a article
                article.classList.add("tarjeta");
                //Inyectamos contenido a <article>
                article.innerHTML = `
            <img src="${dato.image}" alt="Imagen del personaje ${dato.name}" class="card_img-size">
            <label>Nombre:</label>
            <p>${dato.name}</p>
            <div>
              <label>Estado:</label>
              <p><i class="fa-solid fa-circle ${dato.status.toLowerCase()}"></i>${dato.status}</p>
              <label>Planeta:</label>
              <p>${dato.location.name}</p>
            </div>
                   
            `
                //Adjuntamos el contenido

                console.log(dato);
                contenedor.appendChild(article);
            });
        })
        .catch(function (error) {
            console.error(error);
        })
}

//Llamamos a la funcion pedirDatos
pedirDatos();