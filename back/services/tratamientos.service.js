import MongoDB from 'mongodb'


const client = new MongoDB.MongoClient('mongodb://127.0.0.1:27017')

async function traerTodos() {
    return client.connect()
    .then(async function() {
        const db = client.db('eira')
        const tratamientos = await db.collection('tratamientos').find().toArray()
        return tratamientos
    })
    .catch(err => console.log(err))
}

async function crear(tratamiento) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const tratamientoNuevo = await db.collection('tratamientos').insertOne(tratamiento)
        return tratamientoNuevo
    })
    .catch(err => console.log(err))
}

export {
    traerTodos,
    crear
}