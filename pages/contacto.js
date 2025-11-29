let formulario = document.querySelector('form')
let nombre = document.querySelector('#name')
let email = document.querySelector('#email')
let mensaje = document.querySelector('#message')
console.log(nombre, email, mensaje)


function validar_entrada () {
    entrada_valida = true

    if (nombre?.value.trim() === "" || nombre.value.length < 3 || nombre.value.length > 50 || nombre.value.match(/[0-9]/)) {
        entrada_valida = false
        nombre.classList.add('invalido')
    } else {
        nombre.classList.remove('invalido')
    }

    if (email?.value.trim() === "" || !email.value.includes("@") || !email.value.includes(".") || email.value.length < 5) {
        entrada_valida = false
        email.classList.add('invalido')
    } else {
        email.classList.remove('invalido')
    }

    if (mensaje?.value.trim() === "" || mensaje.value.length > 500) {
        entrada_valida = false
        mensaje.classList.add('invalido')
    } else {
        mensaje.classList.remove('invalido')
    }
    
    return entrada_valida
}

formulario.addEventListener('submit', function (event) {
    event.preventDefault()

    if (validar_entrada()) {
        
        fetch(formulario.action, {
            method: formulario.method,
            body: new FormData(formulario),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert("Mensaje enviado con exito")
                formulario.reset()
            } else {
                alert("Hubo un problema al enviar el mensaje")
            }
        }).catch(error => {
            alert("Hubo un problema al enviar el mensaje", error)
        })
    } else {
        console.log("Entrada invalida")
    }
})