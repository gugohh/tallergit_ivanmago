let lista = document.createElement('ul')
document.body.appendChild(lista)

// Url de la api para el fetch
const urlBase = 'https://fakestoreapi.com/products';

// Creación de la lista con todos los titulos de productos
fetch(urlBase).then(data => data.json()).then(json => {
    // Iteramos el objeto devuelto por la api
    json.map(element => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(element.title));
        lista.appendChild(li);
    }

    )
})



// Función encargada de pintar todos los productos de una categoria
let cambio = (value) => {
    
    fetch(`${urlBase}/category/${value}`)
    .then(res => res.json())
    .then(json => {
        lista.innerHTML = '';
        json.map(element => {
            element
            lista.innerHTML += `
            <div class="container">
            <img class="image" src="${element.image}" />
            <h2 class="tittle">${element.tittle}</h2>
            <p class="price">${element.price} €!</p>
            <p class="description">${element.description}</p>
            </div>
            `;
        })
    })
}



// Creamos un select con todas las categorias como option, este select tiene un onchange que lanza la función cambio.
fetch(`${urlBase}/categories`)
    .then(res => res.json())
    .then(json => {
        let select = document.createElement('select')
        select.setAttribute('onchange', "cambio(this.value)"); // Aqui insertamos la función como atributo on change.
        document.body.appendChild(select);

        let option = document.createElement('option');
        option.appendChild(document.createTextNode('Todas las categorías'));
        select.appendChild(option);

        json.map(element => {
            option = document.createElement('option');
            option.value = element;
            option.appendChild(document.createTextNode(element));
            select.appendChild(option);
        }

        )

        console.log(select.value);

    })