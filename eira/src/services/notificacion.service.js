async function guardarNotificacion({tokenFB, finalizacion}) {
    return fetch(`http://localhost:2020/api/notificacionFB`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({tokenFB, finalizacion})
    })
    .then(response => response.json())

}

export {
    guardarNotificacion
}