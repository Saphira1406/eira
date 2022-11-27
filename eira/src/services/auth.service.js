async function login(email, password) {
    return fetch('http://localhost:2020/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body:JSON.stringify({email, password})
    })
    .then(response => {
        if(response.status === 200) {
            return response.json()
        }
        throw new Error('Error de autenticación')
    })
}

async function registro (usuario) {
    return fetch('http://localhost:2020/api/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
}

export {
    registro,
    login
}