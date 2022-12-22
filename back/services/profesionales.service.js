import MongoDB, { ObjectId } from 'mongodb'

const client = new MongoDB.MongoClient('mongodb://127.0.0.1:27017')
//const client = new MongoDB.MongoClient("mongodb+srv://sergio:eira@cluster0.luq2ol6.mongodb.net/?retryWrites=true&w=majority")

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

async function traerPacientes (idProfesional) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const pacientes = await db.collection('conexiones').findOne({"medico": ObjectId(idProfesional)})
        return pacientes.pacientes
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
        return { ...profesional, password: undefined }
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

async function eliminarPaciente (idProfesional, idPaciente) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        const pacienteEliminado = await db.collection('conexiones').updateOne(
                { "medico": ObjectId(idProfesional) },
                { $pull: { "pacientes": { "_id": new ObjectId(idPaciente) }} }
            )

            await db.collection('tratamientos').deleteMany(
                { "id_medico": new ObjectId(idProfesional), "id_paciente": new ObjectId(idPaciente) }
            )

        return pacienteEliminado
    })
    .catch(function (err) {
        console.log(err)
    })
}

async function verificarMedico(id) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        let verificar = null
        const profesional = await db.collection('medicos').findOne({"_id": ObjectId(id)})
        profesional.verificado ? verificar = false : verificar = true
        const usuarioEditado = await db.collection('medicos').updateOne({"_id": new ObjectId(id)}, {$set: {verificado: verificar}})
        return usuarioEditado
    })
    .catch(function (err) {
        console.log(err)
    })
}

async function traerPedidosRecetas(id) {
    return client.connect()
    .then(async function() {
        const db = client.db('eira')
        const pedidos = await db.collection('recetas').findOne({'medico': ObjectId(id)})
        return pedidos
    })
    .catch(function(err) {
        console.log(err)
    })
}

export {
    traerTodos,
    traerPorId,
    editar,
    eliminar,
    traerPacientes,
    eliminarPaciente,
    verificarMedico,
    traerPedidosRecetas
}