let contenedorBotones = document.querySelector('.buttons')
let clearCart = document.getElementById('clearCart')
let carrito = JSON.parse(localStorage.getItem('carrito')) || []
const PRECIO_DOLAR = 1500
console.log(carrito)

function obtenerPrecioVisual (price) {
    return (price).toLocaleString("de-DE")
}

function calcularTotalCarrito() {
    let totalCarrito = (carrito.reduce((total, item) => {
        console.log(item)
        let precioNum = parseFloat(item.price * 1000)
        return total + precioNum
    }, 0))

    return totalCarrito
}

clearCart.addEventListener('click', () => {
    localStorage.setItem('carrito', JSON.stringify([]))
    location.reload()
})

let cantidadProductos = carrito.length

let totalCarrito = (carrito.reduce((total, item) => {
    console.log(item)
    let precioNum = parseFloat(item.price * 1000)
    return total + precioNum
}, 0))

let totalElemento = document.createElement('div')
totalElemento.classList.add('total-carrito')
totalElemento.innerHTML = `
    <h3>Cantidad de productos: ${cantidadProductos}</h3>
    <h3>Precio total: $ ${obtenerPrecioVisual(calcularTotalCarrito())}</h3>
`

contenedorBotones.appendChild(totalElemento)


carrito.forEach(item => {
    let id = item.id
    let titulo = item.title
    let descripcion = item.description
    let precio = item.price
    let imagen = item.image

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
            <h3>$ ${precio}</h3>
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
            localStorage.setItem('carrito', JSON.stringify(carrito))
            
            contenedor.removeChild(articulo)
            contenedorBotones.removeChild(contenedorBotones.lastChild)
    
            let cantidadProductos = carrito.length
    
            totalElemento = document.createElement('div')
            totalElemento.classList.add('total-carrito')
            totalElemento.innerHTML = `
                <h3>Cantidad de productos: ${cantidadProductos}</h3>
                <h3>Precio total: $ ${obtenerPrecioVisual(calcularTotalCarrito())}</h3>
            `
    
            contenedorBotones.appendChild(totalElemento)
            
        })

        boton.addEventListener('keydown', (event) => {

            if (event.key !== 'Enter') return;
            carrito = carrito.filter(producto => {
                console.log(carrito)
                return producto.id !== id
            })
            localStorage.setItem('carrito', JSON.stringify(carrito))
            
            contenedor.removeChild(articulo)
            contenedorBotones.removeChild(contenedorBotones.lastChild)
    
            let cantidadProductos = carrito.length
    
            totalElemento = document.createElement('div')
            totalElemento.classList.add('total-carrito')
            totalElemento.innerHTML = `
                <h3>Cantidad de productos: ${cantidadProductos}</h3>
                <h3>Precio total: $ ${obtenerPrecioVisual(calcularTotalCarrito())}</h3>
            `
    
            contenedorBotones.appendChild(totalElemento)
            
        })
    })
    
    contenedor.appendChild(articulo)
}); 