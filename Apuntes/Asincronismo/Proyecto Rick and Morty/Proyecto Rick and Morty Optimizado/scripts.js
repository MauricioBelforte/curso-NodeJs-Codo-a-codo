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
function pedirdatos() {
    // Llamamos a nuestro fetch
    fetch("https://rickandmortyapi.com/api/character", opcion)
        .then(response => response.json())
        .then(datos => {
            //Manipulacion de objetos del DOM
            const contenedor = document.getElementById("contenedor-tarjetas");

            // Utilizamos un for-each para consultar datos y renderizarlos en el DOM
            // datos.results devuelve un array con los personajes
            datos.results.forEach(personaje => {

                const article = crearArticulo(personaje); // Crea el articulo
                contenedor.appendChild(article); // Agrega el articulo al contenedor main
            });
        })
        .catch(function (error) {
            console.error(error);
        })
}

//Llamamos a la funcion pedirdatos
pedirdatos();











function crearArticulo(personaje) {
    //Creamos el elemento html
    const article = document.createElement('article');
    //Agregamos estilo a article
    article.classList.add("tarjeta");
    //Inyectamos contenido a <article>



    // 📸 Imagen del personaje
    const imagen = document.createElement('img');
    imagen.src = personaje.image;
    imagen.alt = `Imagen del personaje ${personaje.name}`;
    imagen.classList.add('card_img-size');

    // 🔤 Bloque Nombre
    const bloqueNombre = document.createElement('div');
    bloqueNombre.classList.add('flex');

    const labelNombre = document.createElement('label');
    labelNombre.textContent = 'Nombre:';

    const pnombre = document.createElement('p');
    pnombre.textContent = personaje.name;

    bloqueNombre.appendChild(labelNombre);
    bloqueNombre.appendChild(pnombre);

    // 🎯 Bloque Estado
    const bloqueEstado = document.createElement('div');
    bloqueEstado.classList.add('flex');

    const labelEstado = document.createElement('label');
    labelEstado.textContent = 'Estado:';

    const picon = document.createElement('p');
    const i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-fw','fa-lg', 'fa-circle', personaje.status.toLowerCase());
    //personaje.status.toLowerCase() devuelve una palabra como Dead Unknown Alive las pasa a minusculas y el mensaje i.classList.add() le dice esa palabra es una clase, agregala  
    picon.appendChild(i);
    picon.append(` ${personaje.status}`);

    bloqueEstado.appendChild(labelEstado);
    bloqueEstado.appendChild(picon);

    // 🌍 Bloque Planeta
    const bloquePlaneta = document.createElement('div');
    bloquePlaneta.classList.add('flex');

    const labelPlaneta = document.createElement('label');
    labelPlaneta.textContent = 'Planeta:';

    const pplaneta = document.createElement('p');
    pplaneta.textContent = personaje.location.name;

    bloquePlaneta.appendChild(labelPlaneta);
    bloquePlaneta.appendChild(pplaneta);

    // 🧩 Armar el artículo
    article.appendChild(imagen);
    article.appendChild(bloqueNombre);
    article.appendChild(bloqueEstado);
    article.appendChild(bloquePlaneta);

    /*     article.innerHTML = `
                <img src="${personaje.image}" alt="Imagen del personaje ${personaje.name}" class="card_img-size">
                <label>Nombre:</label>
                <p>${personaje.name}</p>
                <div>
                  <label>Estado:</label>
                  <p><i class="fa-solid fa-circle ${personaje.status.toLowerCase()}"></i>${personaje.status}</p>
                  <label>Planeta:</label>
                  <p>${personaje.location.name}</p>
                </div>
                       
                `
        //Adjuntamos el contenido
    
        console.log(personaje); */

    return article
}