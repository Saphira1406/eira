async function traerPorUsuario(idUsuario) {
    return fetch(`http://localhost:2020/api/solicitudes/${idUsuario}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        },
    })
    .then(response => response.json())
}

async function agregarUsuario(emisor, receptor) {
    return fetch(`http://localhost:2020/api/solicitudes`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({emisor, receptor})
    })
    .then(response => response.json())
}

async function enviarSolicitud(emisor, receptor) {
    return fetch(`http://localhost:2020/api/solicitud`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({emisor, receptor})
    })
    .then(response => response.json())
}

export {
    traerPorUsuario,
    agregarUsuario,
    enviarSolicitud
}