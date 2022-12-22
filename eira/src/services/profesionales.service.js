async function traer() {
    return fetch('http://localhost:2020/api/profesionales', {
        headers: {
            'autenticacion': localStorage.getItem('token')
        },
    })
    .then(response => response.json())

}

async function traerPorId(idProfesional) {
    return fetch(`http://localhost:2020/api/profesionales/${idProfesional}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        },
    })
    .then(response => response.json())

}

async function traerPacientes(idProfesional) {
    return fetch(`http://localhost:2020/api/profesionales/${idProfesional}/pacientes`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        },
    })
    .then(response => response.json())
}


async function editar (idUsuario, usuario) {
    return fetch(`http://localhost:2020/api/profesionales/${idUsuario}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
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
            'autenticacion': localStorage.getItem('token')
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
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => {
        return response.json()
    })
}

async function verificar(idUsuario) {
    return fetch(`http://localhost:2020/api/profesionales/verificacion/${idUsuario}`, {
        method: 'PATCH',
        headers: {
            'autenticacion': localStorage.getItem('token')
        },
    })
    .then(response => response.json())
}

async function traerPedidosRecetas(id) {
    return fetch(`http://localhost:2020/api/recetas/${id}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        },
    })
    .then(response => response.json())

}

export {
    traer,
    traerPorId,
    editar,
    eliminar,
    traerPacientes,
    eliminarPaciente,
    verificar,
    traerPedidosRecetas
}