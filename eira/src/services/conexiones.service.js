async function traerSeguidores (idUsuario) {
    return fetch(`http://localhost:2020/api/conexiones/${idUsuario}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function seguir(seguir) {
    return fetch(`http://localhost:2020/api/seguir`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify(seguir)
    })
    .then(response => response.json())
}

async function traerTodos() {
    return fetch("http://localhost:2020/api/seguidores", {
        headers:{
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

export {
    traerSeguidores,
    seguir,
    traerTodos
}