import MongoDB, { ObjectId } from 'mongodb'

const client = new MongoDB.MongoClient('mongodb://127.0.0.1:27017')

async function traerPorUsuarioId (idUsuario) {
    return client.connect()
    .then(async function () {
        const db = client.db('eira')
        /*const recordatorios = await db.collection('recordatorios').find({"recordatorios.11:30": {
            "$elemMatch": {
              "idUsuario": new ObjectId("6389252219f0146ac7146f9c")
            }
          }}).toArray()*/
          const recordatorios = await db.collection('recordatorios').findOne({"idUsuario": new ObjectId(idUsuario) })

        return recordatorios
    })
    .catch(function (err) {
        console.log(err)
    })
}
 export {
    traerPorUsuarioId
 }