import MongoDB, { ObjectId } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config({ path: 'variables.env' })

const client = new MongoDB.MongoClient(process.env.DB_URL)

async function traerTodos () {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const pacientes = await db.collection('pacientes').find({},{projection: {"password": 0}}).toArray()
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
        return { ...paciente, password: undefined }
    } )
    .catch(function (err) {
        console.log(err)
    })
}

async function traerHistoriaClinica(idpaciente) {
    return client.connect()
    .then( async function () {
        const db = client.db('eira')
        const historiaClinica = await db.collection('historias-clinicas').findOne({"paciente": ObjectId(idpaciente)})
        return historiaClinica
    } )
    .catch(function (err) {
        console.log(err)
    })
}

async function editar (id, usuario) {
    console.log("aca",id)
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const usuarioEditado = await db.collection('pacientes').updateOne({"_id": new ObjectId(id)}, {$set: {...usuario}})
        await db.collection('conexiones').updateMany({"pacientes._id": new ObjectId(id)}, {$set: {"pacientes.$": {...usuario, "_id": new ObjectId(id)}}})
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
        const usuarioEliminado = await db.collection('pacientes').deleteOne({"_id": ObjectId(id)})

        return usuarioEliminado
    })
    .catch(function (err) {
        console.log(err)
    })
}

async function crearHistoriaClinica(historia) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const historiaNueva = await db.collection('historias-clinicas').insertOne({...historia, paciente: new ObjectId(historia.paciente)})
        return historiaNueva
    })
    .catch(err => console.log(err))
}

async function traerMisMedicos(id) {
    return client.connect()
    .then(async function() {
        const db = client.db('eira')
        const medicos = await db.collection('conexiones').find({"pacientes._id": ObjectId(id)}, {projection: {'medico': 1, '_id': 0}}).toArray()
        return medicos
    })
    .catch(err => console.log(err))
}

async function pedidoReceta(receta) {
    return client.connect()
    .then(async function() {
        const db = client.db('eira')
        const pedido = await db.collection('recetas').updateOne({"medico": ObjectId(receta.medico)},{$push: {"recetas": receta.pedido}})
        return pedido
    })
}

export {
    traerTodos,
    traerPorId,
    traerHistoriaClinica,
    editar,
    crearHistoriaClinica,
    eliminar,
    traerMisMedicos,
    pedidoReceta
}