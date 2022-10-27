async function traer() {
    return fetch('http://localhost:2020/api/profesionales')
    .then(response => response.json())

}

async function traerPorId(idProfesional) {
    return fetch(`http://localhost:2020/api/profesionales/${idProfesional}`)
    .then(response => response.json())

}

async function editar (idUsuario, usuario) {
    return fetch(`http://localhost:2020/api/profesionales/${idUsuario}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
}



export {
    traer,
    traerPorId,
    editar
}