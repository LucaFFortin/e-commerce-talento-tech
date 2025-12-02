let contenedorBotones = document.querySelector('.buttons')
let clearCart = document.getElementById('clearCart')
let carrito = JSON.parse(localStorage.getItem('carrito')) || []
const PRECIO_DOLAR = 1500
console.log(carrito)

function obtenerPrecioVisual (price) {
    return (price * PRECIO_DOLAR).toLocaleString("de-DE")
}

clearCart.addEventListener('click', () => {
    localStorage.setItem('carrito', JSON.stringify([]))
    location.reload()
})

let cantidadProductos = carrito.length

let totalCarrito = Number(carrito.reduce((total, item) => {
    console.log(item)
    let precioNum = parseFloat(item.price)
    return total + precioNum
}, 0))

let totalElemento = document.createElement('div')
totalElemento.classList.add('total-carrito')
totalElemento.innerHTML = `
    <h3>Cantidad de productos: ${cantidadProductos}</h3>
    <h3>Precio total: $${obtenerPrecioVisual(totalCarrito)}</h3>
`

contenedorBotones.appendChild(totalElemento)


carrito.forEach(item => {
    let id = item.id
    let titulo = item.title
    let descripcion = item.description
    let precio = item.price
    let imagen = item.image

    let precioPublicacion = obtenerPrecioVisual(precio)

    let articulo = document.createElement('article')
    articulo.setAttribute('tabindex', '0')
    articulo.classList.add('producto')
    articulo.setAttribute('data-id', id)
    articulo.innerHTML = `
        <div>
            <h3>${titulo}</h3>
            <p>${descripcion}</p>
        </div>
        <div>
            <img src="${imagen}" alt="${titulo}">
            <h3>$ ${precioPublicacion}</h3>
            <button class="sacar">Eliminar producto</button>
        </div>
    `

    let contenedor = document.querySelector('.contenedor-carrito')

    let botones = articulo.querySelectorAll('button')

    botones.forEach(boton => {
            
        boton.addEventListener('click', (event) => {
            
            carrito = carrito.filter(producto => {
                console.log(carrito)
                return producto.id !== id
            })
            
            contenedor.removeChild(articulo)
            contenedorBotones.removeChild(contenedorBotones.lastChild)
    
            let cantidadProductos = carrito.length

            let totalCarrito = Number(carrito.reduce((total, item) => {
                console.log(item)
                let precioNum = parseFloat(item.price)
                return total + precioNum
            }, 0))
    
            totalElemento = document.createElement('div')
            totalElemento.classList.add('total-carrito')
            totalElemento.innerHTML = `
                <h3>Cantidad de productos: ${cantidadProductos}</h3>
                <h3>Precio total: ${obtenerPrecioVisual(totalCarrito)}</h3>
            `
    
            contenedorBotones.appendChild(totalElemento)
            
        })
    })
    
    
    contenedor.appendChild(articulo)

    articulo.addEventListener('keydown', (event) => {

        if (event.key !== 'Enter') return;
        carrito = carrito.filter(prod => {
            return prod.titulo !== titulo
        })
        contenedor.removeChild(articulo)
        
        contenedorBotones.removeChild(contenedorBotones.lastChild)

        localStorage.setItem('carrito', JSON.stringify(carrito))
        // location.reload()

        cantidadProductos = carrito.length
        preciototal = carrito.reduce((total, item) => {
            let precioNum = parseFloat(item.precio.replace('ARS ', '').replace('.', '').replace(',', '.').trim())
        console.log(precioNum, total);
            return total + precioNum
        }, 0)

        totalElemento = document.createElement('div')
        totalElemento.classList.add('total-carrito')
        totalElemento.innerHTML = `
            <h3>Cantidad de productos: ${cantidadProductos}</h3>
            <h3>Precio total: ${preciototal.toLocaleString('es-AR')}</h3>
        `

        contenedorBotones.appendChild(totalElemento)
        
    })
}); 