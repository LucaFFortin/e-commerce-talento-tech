productos = document.querySelectorAll('.product')

// Carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || []
console.log(carrito);
productos.forEach(producto => {
    producto.addEventListener('click', () => {
        console.log(producto.children);
        
        const titulo = producto.children[0].innerText
        const descripcion = producto.children[1].innerText
        const precio = producto.children[2].innerText
        const imgSrc = producto.children[3].attributes.src.value

        for (let i = 0; i < carrito.length; i++) {
            if (carrito[i].titulo === titulo) { return }
        }

        carrito.push({
            titulo: titulo,
            descripcion: descripcion,
            precio: precio.replace('ARS ', '').replace('.', ''),
            imgSrc: imgSrc
        })
        
        localStorage.setItem('carrito', JSON.stringify(carrito))
        console.log(localStorage.getItem('carrito'));
    })
});

productos.forEach(producto => {
    producto.addEventListener('keydown', (event) => {

        if (event.key !== 'Enter') return;

        console.log(producto.children);
        
        const titulo = producto.children[0].innerText
        const descripcion = producto.children[1].innerText
        const precio = producto.children[2].innerText
        const imgSrc = producto.children[3].attributes.src.value

        for (let i = 0; i < carrito.length; i++) {
            if (carrito[i].titulo === titulo) { return }
        }

        carrito.push({
            titulo: titulo,
            descripcion: descripcion,
            precio: precio.replace('ARS ', '').replace('.', ''),
            imgSrc: imgSrc
        })
        
        localStorage.setItem('carrito', JSON.stringify(carrito))
        console.log(localStorage.getItem('carrito'));
    })
});