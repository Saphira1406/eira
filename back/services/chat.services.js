import MongoDB from 'mongodb'
import { ObjectId } from 'mongodb'

const client = new MongoDB.MongoClient('mongodb://127.0.0.1:27017')

async function crear(usuarios) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const existe = await db.collection('chat').findOne({"usuarios": { $all: [new ObjectId(usuarios[0]), new ObjectId(usuarios[1])] }})
        if(!existe){
            await db.collection('chat').insertOne({"usuarios":usuarios})
        }
        return existe
    })
    .catch(function (err) {
        console.log(err)
    })
}

async function traerPorUsuarioId(id) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const chat = await db.collection('chat').find({"usuarios": { $in: [new ObjectId(id)] }}).toArray()
        return chat
    })
    .catch(function (err) {
        console.log(err)
    })
}

async function traerUno(usuarioId1, usuarioId2) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const chat = await db.collection('chat').findOne({"usuarios": { $all: [new ObjectId(usuarioId1), new ObjectId(usuarioId2)] }})
        return chat
    })
    .catch(function (err) {
        console.log(err)
    })
}

export {
    crear,
    traerPorUsuarioId,
    traerUno
}