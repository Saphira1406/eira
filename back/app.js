import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import TratamientosRoutes from './routes/tratamientos.route.js'
import PacientesRoutes from './routes/pacientes.route.js'
import ProfesionalesRoutes from './routes/profesionales.route.js'
import AuthRoutes from './routes/auth.route.js'
import NotificacionRoutes from './routes/notificaciones.routes.js'
<<<<<<< HEAD
import ConexionesRoutes from './routes/seguidores.routes.js'
import ChatRoutes from './routes/chat.routes.js'
import MensajesRoutes from './routes/mensajes.routes.js'
import * as SocketIO from 'socket.io'
=======
import UsuariosRoutes from './routes/usuarios.route.js'
>>>>>>> 3e3481e6587e282a6aa189109ba23f266321bba4

const app = express()
app.use(cors())
const server = createServer(app) // crea el server
const serverSocket = new SocketIO.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    },
    trasport: ['websocket']
}) // creo el socket

// online
let usuarios = []

const agregarUsuario = (usuarioId, socketId) => {
    !usuarios.some((usuario) => usuario.usuarioId === usuarioId) && 
        usuarios.push({usuarioId, socketId})
}

const eliminarUsuario = (socketId) => {
    usuarios = usuarios.filter(usuario => usuario.socketId !== socketId)
}

const getUsuario = (usuarioId) => {
    return usuarios.find( usuario => usuario.usuarioId === usuarioId )
}

serverSocket.on('connection', (socket) => {
    console.log("usuario coenctado", socket.id)
   

  socket.on("agregarUsuario", (usuarioId) => {
      agregarUsuario(usuarioId, socket.id)
      serverSocket.emit("getUsuarios", usuarios)
  })

  socket.on("logout", (socket) => {
      eliminarUsuario(socket)
      serverSocket.emit("getUsuarios", usuarios)
      console.log("se fue uno")
  })

  //mandar mensaje y obtener
  socket.on("enviarMensaje", ({emisorId, receptorId, mensaje}) => {
      const usuario = getUsuario(receptorId)
      usuario ? serverSocket.to(usuario.socketId).emit("getMensaje", { //entonces porque como no esta coenctado e otro user tira error de socketid
          emisorId, 
          mensaje
      }) : null
  })

  socket.on('disconnect', () => {
      console.log("usuario desconectado", socket.id)
      eliminarUsuario(socket.id)
      serverSocket.emit("getUsuarios", usuarios)
      
  })
  
})


app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/', TratamientosRoutes)
app.use('/', PacientesRoutes)
app.use('/', ProfesionalesRoutes)
app.use('/', AuthRoutes)
app.use('/', NotificacionRoutes)
<<<<<<< HEAD
app.use('/', ConexionesRoutes)
app.use('/', ChatRoutes)
app.use('/', MensajesRoutes)
=======
app.use('/', UsuariosRoutes)
>>>>>>> 3e3481e6587e282a6aa189109ba23f266321bba4

const host = process.env.HOST || '0.0.0.0'
const puerto = process.env.PORT || 2020

server.listen(2020, function() {
    console.log("Conectado a http://localhost:2020")
})
/*
app.listen(puerto, host, function() {
    console.log("Conectado a http://localhost:2020")
})*/

