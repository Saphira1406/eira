import MongoDB, { ObjectId } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config({ path: 'variables.env' })

const client = new MongoDB.MongoClient(process.env.DB_URL)

async function traerPorUsuario(idUsuarioReceptor) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const solicitudes = await db.collection('solicitudes').find({"receptor._id": new ObjectId(idUsuarioReceptor)}).toArray()
        return solicitudes
    })
    .catch(function (err) {
        console.log(err)
    })
}

// acepta la solicitud
async function aceptarSolicitud(emisor, receptor) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        // si tine matricula, es profesional, entonces el emisor es el profesional y receptor el paciente, caso contrario es al revez
        if(emisor.matricula) {
            const agregado = await db.collection('conexiones').updateOne({"medico": new ObjectId(emisor._id)}, {$push: {"pacientes": {...receptor, "_id": new ObjectId(receptor._id)}}})
            await db.collection('solicitudes').updateOne({"emisor._id": new ObjectId(emisor._id), "receptor._id": new ObjectId(receptor._id)}, {$set: {"aceptado": true}})
            return agregado
        } else {
            const agregado = await db.collection('conexiones').updateOne({"medico": new ObjectId(receptor._id)}, {$push: {"pacientes": {...emisor, "_id": new ObjectId(emisor._id)}}})
            await db.collection('solicitudes').updateOne({"emisor._id": new ObjectId(emisor._id), "receptor._id": new ObjectId(receptor._id)}, {$set: {"aceptado": true}})
            return agregado
        }
    })
}

async function enviarSolicitud(emisor, receptor) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const existe = await db.collection('solicitudes').findOne({"emisor._id": new ObjectId(emisor._id), "receptor._id": new ObjectId(receptor._id)})
        if(!existe) {
            const solicitud = await db.collection('solicitudes').insertOne({emisor, receptor, aceptado: false})
            return solicitud
        } else {
            return existe
        }
    })
}

export {
    traerPorUsuario,
    aceptarSolicitud,
    enviarSolicitud
}