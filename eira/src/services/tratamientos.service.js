async function crear(tratamiento) {
    return fetch('http://localhost:2020/api/tratamientos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify(tratamiento)
    })
    .then(response => response.json())
}

async function editarMedicamento(id, tratamiento, tipo) {
    return fetch(`http://localhost:2020/api/tratamientos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({tratamiento, tipo})
    })
    .then(response => response.json())
}

async function editarComida(id, comidaAntigua, comidaNueva) {
    return fetch(`http://localhost:2020/api/tratamientos/comida/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({comidaAntigua, comidaNueva})
    })
    .then(response => response.json())
}

async function traerPorIdPaciente(idPaciente, idProfesional) {
    return fetch(`http://localhost:2020/api/tratamientos/paciente/${idPaciente}/${idProfesional}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function traerPorIdProfesional(idPaciente, idProfesional) {
    return fetch(`http://localhost:2020/api/tratamientos/profesional/${idProfesional}/paciente/${idPaciente}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function traerPorId(id) {
    return fetch(`http://localhost:2020/api/tratamientos/${id}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function eliminar(id) {
    return fetch(`http://localhost:2020/api/tratamientos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

export {
    crear,
    traerPorIdPaciente,
    editarMedicamento,
    traerPorId,
    editarComida,
    eliminar,
    traerPorIdProfesional
}