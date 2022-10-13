import MongoDB from 'mongodb'

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

export {
    traerTodos,
}