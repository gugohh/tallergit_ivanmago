let lista = document.createElement('ul')
document.body.appendChild(lista)

const urlBase = 'https://fakestoreapi.com/products';

fetch(urlBase).then(data => data.json()).then(json => {

    json.map(element => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(element.title));
        lista.appendChild(li);
    }

    )
})

fetch(`${urlBase}/categories`)
    .then(res => res.json())
    .then(json => {
        let select = document.createElement('select')
        select.setAttribute('onchange', "cambio(this.value)");
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
                    <p class="price">${element.price} €</p>
                    <p class="description">${element.description}</p>
                    </div>
                    `;
            })
        })
}
