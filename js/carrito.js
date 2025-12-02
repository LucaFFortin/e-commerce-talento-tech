let contenedorBotones = document.querySelector('.buttons')
let clearCart = document.getElementById('clearCart')
let carrito = JSON.parse(localStorage.getItem('carrito')) || []

clearCart.addEventListener('click', () => {
    localStorage.setItem('carrito', JSON.stringify([]))
    location.reload()
})

let cantidadProductos = carrito.length

let preciototal = carrito.reduce((total, item) => {
    let precioNum = parseFloat(item.precio.replace('ARS ', '').replace('.', '').replace(',', '.').trim())
    console.log(precioNum, total);
    return total + precioNum
}, 0)

let totalElemento = document.createElement('div')
totalElemento.classList.add('total-carrito')
totalElemento.innerHTML = `
    <h3>Cantidad de productos: ${cantidadProductos}</h3>
    <h3>Precio total: ARS ${preciototal.toLocaleString('es-AR')}</h3>
`

contenedorBotones.appendChild(totalElemento)


carrito.forEach(item => {

    let titulo = item.titulo
    let descripcion = item.descripcion
    let precio = item.precio
    let imagen = item.imgSrc

    let precioPublicacion = new Intl.NumberFormat('es-AR', {
        currency: 'ARS',
        style: 'currency'
    }).format(precio)

    let articulo = document.createElement('article')
    articulo.setAttribute('tabindex', '0')
    articulo.classList.add('product')
    articulo.innerHTML = `
        <h3>${titulo}</h3>
        <p>${descripcion}</p>
        <strong>AR${precioPublicacion}</strong>
        <img src=".${imagen}" alt="${titulo}">
    `

    let contenedor = document.querySelector('.contenedor-carrito')

    articulo.addEventListener('click', () => {
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
            <h3>Precio total: ARS ${preciototal.toLocaleString('es-AR')}</h3>
        `

        contenedorBotones.appendChild(totalElemento)
        
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
            <h3>Precio total: ARS ${preciototal.toLocaleString('es-AR')}</h3>
        `

        contenedorBotones.appendChild(totalElemento)
        
    })
    

}); 