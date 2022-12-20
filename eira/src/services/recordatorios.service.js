async function traerPorIdUsuario(idUsuario) {
    return fetch(`http://localhost:2020/api/recordatorios/${idUsuario}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}




export {
    traerPorIdUsuario
}