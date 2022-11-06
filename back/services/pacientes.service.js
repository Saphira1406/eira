import MongoDB, { ObjectId } from 'mongodb'

const client = new MongoDB.MongoClient('mongodb://127.0.0.1:27017')

async function traerTodos () {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const pacientes = await db.collection('pacientes').find().toArray()
        return pacientes
    })
    .catch(function (err) {
        console.log(err)
    })
}

async function traerPorId(idpaciente) {
    return client.connect()
    .then( async function () {
        const db = client.db('eira')
        const paciente = await db.collection('pacientes').findOne({"_id": ObjectId(idpaciente)})
        return paciente
    } )
    .catch(function (err) {
        console.log(err)
    })

}

export {
    traerTodos,
    traerPorId
}