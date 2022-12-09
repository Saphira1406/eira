import MongoDB from 'mongodb'
import { ObjectId } from 'mongodb'

const client = new MongoDB.MongoClient('mongodb://127.0.0.1:27017')

async function traerPorUsuario (id) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const pacientes = await db.collection('conexiones').findOne({"medico": ObjectId(id)})
        if(!pacientes){
            return []
        } else {
            return pacientes.pacientes
        }
    })
    .catch(function (err) {
        console.log(err)
    })
}
/*
async function seguir(idFrom, seguido) {
    return client.connect()
    .then(async function () {
        const db = client.db('red-social')
        const existe = await db.collection('seguidos').findOne({"seguidor": ObjectId(idFrom), "seguidos._id": ObjectId(seguido._id)})
        if(!existe) {
            const seguir = await db.collection('seguidos').updateOne({"seguidor": ObjectId(idFrom)}, {$push: {"seguidos": seguido}})
            return seguir
        } else {
            const seguir = await db.collection('seguidos').updateOne({"seguidor": ObjectId(idFrom)},{$pull: {"seguidos": {"_id": new ObjectId(seguido._id)}}})
            return seguir
        }
    })
    .catch(function (err) {
        console.log(err)
    })
}

async function traerTodos () {
    return client.connect()
    .then(async function () {
        const db = client.db('red-social')
        const seguidos = await db.collection('seguidos').find({}).toArray()
        return seguidos
    })
    .catch(function (err) {
        console.log(err)
    })
}
*/
export {
    traerPorUsuario,
    //seguir,
    //traerTodos
}