
async function crear(usuarios) {
    return fetch(`http://localhost:2020/api/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarios)
    })
}

async function traer(idUsuario) {
    return fetch(`http://localhost:2020/api/chat/${idUsuario}`, {
        headers: {
            //'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function traerMensajes(chatId) {
    return fetch(`http://localhost:2020/api/mensajes/${chatId}`, {
        headers: {}
    })
    .then(response => response.json())
}

async function enviarMensaje(mensaje){
    return fetch(`http://localhost:2020/api/mensajes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensaje)
    })
    .then(response => response.json())

}

async function traerUno(usuarioId1, usuarioId2) {
    return fetch(`http://localhost:2020/api/chat/${usuarioId1}/${usuarioId2}`, {
        headers: {
            //'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}


export {
    crear,
    traer,
    traerMensajes,
    enviarMensaje,
    traerUno
}