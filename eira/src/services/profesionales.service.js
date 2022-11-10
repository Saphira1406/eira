async function traer() {
    return fetch('http://localhost:2020/api/profesionales')
    .then(response => response.json())

}

async function traerPorId(idProfesional) {
    return fetch(`http://localhost:2020/api/profesionales/${idProfesional}`)
    .then(response => response.json())

}

async function traerPacientes(idProfesional) {
    return fetch(`http://localhost:2020/api/profesionales/${idProfesional}/pacientes`)
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

async function eliminar(idUsuario) {
    return fetch(`http://localhost:2020/api/profesionales/${idUsuario}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
      
        window.location.replace('/')
        return response.json()
    })
}

async function eliminarPaciente(idProfesional, idPaciente) {
    return fetch(`http://localhost:2020/api/profesionales/${idProfesional}/pacientes/${idPaciente}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        return response.json()
    })
}


export {
    traer,
    traerPorId,
    editar,
    eliminar,
    traerPacientes,
    eliminarPaciente
}