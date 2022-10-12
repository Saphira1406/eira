async function crear(tratamiento) {
    return fetch('http://localhost:2020/api/tratamientos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tratamiento)
    })
    .then(response => response.json())

}

export {
    crear
}