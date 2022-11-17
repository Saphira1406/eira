import MongoDB from 'mongodb'
import { ObjectId } from 'mongodb'
//import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
dotenv.config({ path: 'variables.env' })

const client = new MongoDB.MongoClient(process.env.DB_URL)


async function login({email, password}) {
    return client.connect()
    .then(async function() {
        const db = client.db('eira')
        const usuario = await db.collection('pacientes').findOne({ email }) || await db.collection('medicos').findOne({ email })
       // const usuarioProfesional = await db.collection('medicos').findOne({ email })
        /*if(usuario) {
            const passwordValida = await bcrypt.compare(password, usuario.password)
            if(passwordValida) {
                return { ...usuario, password: undefined }
            }
        }*/

         if(usuario) {
            if(usuario.password === password) {
                return { ...usuario, password: undefined }
            }
        }
    })
}

export {
    login
}