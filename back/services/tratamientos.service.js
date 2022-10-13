import MongoDB from 'mongodb'
import { ObjectId } from 'mongodb'

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

async function traerPorId(idPaciente) {
    return client.connect()
    .then(async function() {
        const db = client.db('eira')
        const tratamiento = await db.collection('tratamientos').find({"id_paciente": ObjectId(idPaciente)}).toArray()
        return tratamiento
    })
    .catch(err => console.log(err))
}

async function eliminar (id) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const tratameintoEliminado = await db.collection('tratamientos').deleteOne({"_id": ObjectId(id)})
        return tratameintoEliminado
    })
    .catch(function (err) {
        console.log('hubo un error', err)
    })
}

async function editar (id, tratamiento) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const tratameintoEliminado = await db.collection('tratamientos').updateOne({"_id": new ObjectId(id)}, {$set: tratamiento})
        return tratameintoEliminado
    })
    .catch(function (err) {
        console.log('hubo un error', err)
    })
}

export {
    traerTodos,
    crear,
    traerPorId,
    eliminar,
    editar
}