import express from 'express'
import cors from 'cors'
import TratamientosRoutes from './routes/tratamientos.route.js'

const app = express()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/', TratamientosRoutes)

app.listen(2020, function() {
    console.log("Conectado a http://localhost:2020")
})