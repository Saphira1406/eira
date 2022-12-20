async function traer() {
    return fetch('http://localhost:2020/api/pacientes')
    .then(response => response.json())
}

async function traerPorId(id) {
    return fetch(`http://localhost:2020/api/pacientes/${id}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function traerHistoriaClinica(id) {
    return fetch(`http://localhost:2020/api/pacientes/${id}/historia`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function crearHistoriaClinica(idPaciente, historia) {
    return fetch(`http://localhost:2020/api/pacientes/${idPaciente}/historia-clinica`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify(historia)
    })
    .then(response => response.json())
}

async function eliminar(idUsuario) {
    return fetch(`http://localhost:2020/api/pacientes/${idUsuario}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => {
        window.location.replace('/login')
        return response.json()
    })
}

async function editar (idUsuario, usuario) {
    return fetch(`http://localhost:2020/api/pacientes/${idUsuario}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
}

async function traerMisMedicos(idUsuario) {
    return fetch(`http://localhost:2020/api/pacientes/misMedicos/${idUsuario}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function pedidoReceta(receta) {
    return fetch(`http://localhost:2020/api/pacientes/pedidoReceta`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify(receta)
    })
    .then(response => response.json())

}

export {
    traer,
    traerPorId,
    traerHistoriaClinica,
    editar,
    crearHistoriaClinica,
    eliminar,
    traerMisMedicos,
    pedidoReceta
}