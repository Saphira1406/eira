async function traer() {
    return fetch('http://localhost:2020/api/pacientes')
    .then(response => response.json())

}

export {
    traer
}