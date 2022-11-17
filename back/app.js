import express from 'express'
import cors from 'cors'
import TratamientosRoutes from './routes/tratamientos.route.js'
import PacientesRoutes from './routes/pacientes.route.js'
import ProfesionalesRoutes from './routes/profesionales.route.js'
import AuthRoutes from './routes/auth.route.js'

const app = express()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/', TratamientosRoutes)
app.use('/', PacientesRoutes)
app.use('/', ProfesionalesRoutes)
app.use('/', AuthRoutes)

const host = process.env.HOST || '0.0.0.0'
const puerto = process.env.PORT || 2020

app.listen(2020, function() {
    console.log("Conectado a http://localhost:2020")
})
 /* 
app.listen(puerto, host, function() {
    console.log("Conectado a http://localhost:2020")
})*/

