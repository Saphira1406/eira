import MongoDB, { ObjectId } from 'mongodb'

const client = new MongoDB.MongoClient('mongodb://127.0.0.1:27017')

async function traerTodos () {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const profesionales = await db.collection('medicos').find().toArray()
        return profesionales
    })
    .catch(function (err) {
        console.log(err)
    })
}

async function traerPorId(idProfesional) {
    return client.connect()
    .then( async function () {
        const db = client.db('eira')
        const profesional = await db.collection('medicos').findOne({"_id": ObjectId(idProfesional)})
        return profesional
    } )
    .catch(function (err) {
        console.log(err)
    })

}

async function editar (id, usuario) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const usuarioEditado = await db.collection('medicos').updateOne({"_id": new ObjectId(id)}, {$set: usuario})
        return usuarioEditado
    })
    .catch(function (err) {
        console.log(err)
    })
}

async function eliminar (id) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const usuarioEliminado = await db.collection('medicos').deleteOne({"_id": ObjectId(id)})

        return usuarioEliminado
    })
    .catch(function (err) {
        console.log(err)
    })
}

export {
    traerTodos,
    traerPorId,
    editar,
    eliminar
}