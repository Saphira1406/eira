import MongoDB from 'mongodb'
import { ObjectId } from 'mongodb'

const client = new MongoDB.MongoClient('mongodb://127.0.0.1:27017')
//const client = new MongoDB.MongoClient("mongodb+srv://sergio:eira@cluster0.luq2ol6.mongodb.net/?retryWrites=true&w=majority")

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
       /* const existeTratamiento = await db.collection('tratamientos').findOne({'id_medico': tratamiento.id_medico, 'id_paciente': tratamiento.id_paciente})
        if(!existeTratamiento){
            const tratamientoNuevo = await db.collection('tratamientos').insertOne(tratamiento)
            return tratamientoNuevo
        } else {
          const tratamientoActualizado = await db.collection('tratamientos').updateOne(
                {'_id': new Object(existeTratamiento._id)},
                 {$set: {tratamiento:tratamiento.tratamiento}} 
                )
          
           return tratamientoActualizado*/
        // console.log(existeTratamiento.tratamiento)
        //}
        
        
    })
    .catch(err => console.log(err))
}

async function traerPorIdPaciente(idPaciente) {
    return client.connect()
    .then(async function() {
        const db = client.db('eira')
        const tratamientos = await db.collection('tratamientos').find({"id_paciente": ObjectId(idPaciente)}).toArray()
        return tratamientos
    })
    .catch(err => console.log(err))
}

async function traerPorId(id) {
    return client.connect()
    .then(async function() {
        const db = client.db('eira')
        const tratamiento = await db.collection('tratamientos').findOne({"_id": ObjectId(id)})
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

async function editarMedicamento (id, idObj, tratamiento, tipo) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        if(tipo === "medicamentos") {
            const tratamientoActualizado = await db.collection('tratamientos').updateOne(
                { "_id": new ObjectId(id), "tratamiento.medicamentos.id": idObj },
                { $set: {"tratamiento.medicamentos.$": tratamiento }}
             )
            return tratamientoActualizado
            
        } else if ( tipo === "ejercicios" ) {
            const tratamientoActualizado = await db.collection('tratamientos').updateOne(
                { "_id": new ObjectId(id), "tratamiento.ejercicios.id": idObj },
                { $set: {"tratamiento.ejercicios.$": tratamiento }}
             )
            return tratamientoActualizado
        }
       
      
    })
    .catch(function (err) {
        console.log('hubo un error', err)
    })
}

async function editarComida (id, comidaAntigua, comidaNueva) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
       /* await db.collection('tratamientos').updateOne(
                { "_id": new ObjectId(id)},
                { $pull: {"tratamiento.comidas": comidaAntigua }}
             )

             const comidaActualizada = await db.collection('tratamientos').updateOne(
                { "_id": new ObjectId(id)},
                { $push: {"tratamiento.comidas": comidaNueva }}
             )
        return comidaActualizada*/

       const comidaActualizada = await db.collection("tratamientos").updateOne(
            { "_id": new ObjectId(id), "tratamiento.comidas": comidaAntigua},
            { $set: {"tratamiento.comidas.$": comidaNueva} }
        )

        return comidaActualizada
    })
    .catch(function (err) {
        console.log('hubo un error', err)
    })
}

export {
    traerTodos,
    crear,
    traerPorIdPaciente,
    traerPorId,
    eliminar,
    editarMedicamento,
    editarComida
}