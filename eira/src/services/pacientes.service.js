async function traer() {
    return fetch('http://localhost:2020/api/pacientes')
    .then(response => response.json())
}

async function traerPorId(id) {
    return fetch(`http://localhost:2020/api/pacientes/${id}`)
    .then(response => response.json())
}

async function traerHistoriaClinica(id) {
    return fetch(`http://localhost:2020/api/pacientes/${id}/historia`)
    .then(response => response.json())
}

export {
    traer,
    traerPorId,
    traerHistoriaClinica
}