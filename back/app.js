import express from 'express'

const app = express()

app.listen(2020, function() {
    console.log("Conectado a http://localhost:2020")
})