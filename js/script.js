// Carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || []


let contenedorProductos = document.querySelector('.contenedor-productos')
async function renderizarProductos () {
    
    const dolarPrice = 1500.0

    await fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            data.forEach(producto => {
                if (producto.category === "electronics") {
                    let productoHTML = `
                <article class="producto" tabindex="0" data-id="${producto.id}">
                    <div class="texto-producto">
                        <h3>${producto.title}</h3>
                        <p>${producto.description}</p>
                    </div>
                    <div class="datos-producto">
                        <img src="${producto.image}" alt="${producto.title}">
                        <h4>$ ${(producto.price * dolarPrice).toLocaleString("de-DE")}</h4>
                        <button>Añadir al carrito</button>
                    </div>
                </article>
                    `
                    contenedorProductos.innerHTML += productoHTML
                }
        })
    })

    let productos = document.querySelectorAll(".producto")
    console.log(productos);

    productos.forEach(producto => {
        const boton = producto.children[1].children[2]
        console.log(producto);
        
        const id = Number(producto.attributes[2].value)

        boton.addEventListener('click', () => {
            let id = producto.attributes[2].value
            let price = producto.querySelector('h4').textContent.slice(1)
            let title = producto.querySelector('h3').textContent
            let description = producto.querySelector('p').textContent
            let image = producto.querySelector('img').attributes[0].value
                
            let item = {
                "id": id,
                "price": price,
                "title": title,
                "description": description,
                "image": image
            }

            carrito.push(item)
            localStorage.setItem('carrito', JSON.stringify(carrito))
        })
        
        producto.addEventListener('keydown', (event) => {

            if (event.key !== 'Enter') return;

            let id = producto.attributes[2].value
            let price = producto.querySelector('h4').textContent
            let title = producto.querySelector('h3').textContent
            let description = producto.querySelector('p').textContent
            let image = producto.querySelector('img').attributes[0].value
                
            let item = {
                "id": id,
                "price": price,
                "title": title,
                "description": description,
                "image": image
            }

            carrito.push(item)
            localStorage.setItem('carrito', JSON.stringify(carrito))
        })
    })
}

renderizarProductos()


