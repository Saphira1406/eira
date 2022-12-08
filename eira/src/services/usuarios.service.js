async function olvideContrasena(email) {
    return fetch(`http://localhost:2020/api/usuarios/olvideContrasena`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email)
    })
    .then(response => response.json())
}

async function recuperarContrasena(token, email, password) {
    return fetch(`http://localhost:2020/api/usuarios/${token}/${email}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(password)
    })
    .then(response => response.json())
}

export {
    olvideContrasena,
    recuperarContrasena
}