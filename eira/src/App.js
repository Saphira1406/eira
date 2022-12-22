import { Routes, Route, useNavigate } from 'react-router-dom'
import NavbarEira from './components/NavbarEira'
import NavbarEiraLanding from './components/NavbarEiraLanding'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tratamiento from './pages/Tratamiento'
import VerTratamiento from './pages/VerTratamiento'
import EditarTratamiento from './pages/EditarTratamiento'
import MiPerfilProfesional from './pages/MiPerfilProfesional'
import EditarPerfilProfesional from './pages/EditarPerfilProfesional'
import VerHistoriaClinica from './pages/VerHistoriaClinica'
import ListaPacientes from './pages/ListaPacientes'
import MiPerfilPaciente from './pages/pacientes/MiPerfilPaciente'
import EditarPerfilPaciente from './pages/pacientes/EditarPerfilPaciente'
import HistoriaClinicaPaciente from './pages/pacientes/HistoriaClinica'
import FormHistorialClinico from './pages/pacientes/FormHistorialClinico'
import DashboardPaciente from './pages/pacientes/Dashboard'
import Login from './pages/Login'
import UsuarioRegistro from './pages/UsuarioRegistro'
import OlvideContrasena from './pages/OlvideContrasena'
import RecuperarContrasena from './pages/RecuperarContrasena'
import ListadoMedicos from './pages/admin/ListadoMedicos'
import ListadoPacientesAdmin from './pages/admin/ListadoPacientes'
import MensajeFaltaVerificacion from './pages/MensajeFaltaVerificación'
import DashboardMedico from './pages/DashboardMedico'
import DashboardAdmin from './pages/admin/Dashboard'
import PedirRecetas from './pages/pacientes/PedirRecetas'
import SolicitudesPacientes from './pages/pacientes/Solicitudes'
import Solicitudes from './pages/Solicitudes'
import { useEffect, useState } from 'react'
import Error404 from './pages/Error404';
import { UsuarioContext } from './context/UsuarioContext'
import { useContext } from 'react'
import * as NotificacionFB from './services/notificacion.service.js'
import { RecordatoriosContext } from './context/RecordatoriosContext'
import * as RecordatoriosService from './services/recordatorios.service.js'
import * as PacientesService from './services/pacientes.service.js'
import { Toaster, toast } from 'react-hot-toast';
import { SocketContext } from './context/SocketContext'
import Chat from './pages/Chat'

import { getAuth, signInAnonymously } from 'firebase/auth'
import { getToken, onMessage } from 'firebase/messaging'
import { messaging } from './firebase/firebase.js'

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(JSON.parse(localStorage.getItem('usuario')))
  const [tokenFB, setTokenFB] = useState(localStorage.getItem('tokenFB'))
  const [misRecordatorios, setMisRecordatorios] = useState({})

  let navigate = useNavigate();
  const socket = useContext(SocketContext)
  const recordatorios = useContext(RecordatoriosContext)
  
  //localStorage.setItem("misRecordatorios", JSON.stringify(recordatorios))
 
  useEffect(
    () => {
      const token = localStorage.getItem('token')
      if(!token) {
        navigate('/login', { replace: true })
      }
      // eslint-disable-next-line
    }, [])

    //console.log(tokenFB)
  function onLogin({usuario, token}) {
      // #####################################
      signInAnonymously(getAuth())
      .then(user => console.log("Auth de firebase",user))
      activarMensajes(usuario)
      //######################################
    localStorage.setItem('usuario', JSON.stringify(usuario))
    setUsuarioLogueado(usuario)
    localStorage.setItem('token', token)
    RecordatoriosService.traerPorIdUsuario(usuario._id)
    .then(resp => {
      setMisRecordatorios(resp)
      localStorage.setItem("misRecordatorios", JSON.stringify(resp))
      
    })
    if(usuario.admin) {
      navigate(`/admin`, { replace: true })
    } else if(!usuario.matricula) {
      navigate(`/paciente`, { replace: true })
    } else {
      navigate(`/medico`, { replace: true })
    }

     socket.emit("agregarUsuario", usuario._id) // cuando me logueo, comunico al socket

 
  }

    const activarMensajes = async (usuario) => {

      const token = await getToken(messaging, {
        vapidKey: "BPplatmpPbXXLUc_fijIyClE1YncaoMQ8ivkU2zTBG14aqv0DhuI3WoFxPLXG6_kVeEc_yxQMHaX5yr6ElwrCmE"
       })
       .catch( error => console.log("Hubo un error al generar el token.,") )
       
       if(token) {
        //console.log("tu token es:", token)
        setTokenFB(token)
        localStorage.setItem('tokenFB', token)
        PacientesService.editar(usuario._id,{nombre: usuario.nombre, apellido: usuario.apellido, telefono: usuario.telefono, email: usuario.email, dni: usuario.dni, "fbNotification": token})
      } else {
        console.log("no tenes token..")
      }
    }

    useEffect( () => {
      onMessage(messaging, message => {
        console.log("tu mensaje", message)
        toast(message.notification.body, {
          icon: '🔔',
        })
       // NotificacionFB.enviarNotificacion({tokenFB, nombre: "porbando", descripcion: "testeansd"})
      })
    }, [])

   /* const recordatorios = {
      "01:00": [
        { nombre:"ibuprofeno", descripcion:"No te olvides de tomar" },
        { nombre:"tafirol", descripcion:"No te olvides de tomar" },
      ],
      "11:24": [
        { nombre:"test", descripcion:"tomar medicamento" },
      ]
    }*/
    
    const test = localStorage.getItem('tokenFB') 
    const horas = 1
    const horaComienzo = "11:45"
    console.log("CONTEXCT RECOR",recordatorios)
    function agregarRecordatorio(horaComienzo, frecuencia) {

       /* let horarioToma = "11:30"
        recordatorios[horarioToma] = []
        recordatorios[horarioToma].push({ nombre:"test22", descripcion:"tomar medicamento" })*/
        //recordatorios["11:24"].push({ nombre:"test", descripcion:"tomar medicamento" },)

        let horaCom = parseInt(horaComienzo.split(":")[0]);
        let minutosCom = parseInt(horaComienzo.split(":")[1]);
        let horaComienzo24 = horaCom + minutosCom / 60; // 24hs

        let numHoras = Math.floor(24 / frecuencia)
        let horaActual = horaComienzo24

        for(let i=0; i< numHoras; i++) {
          let hora = Math.floor(horaActual) // 14.35 -> 14
          let minutos = Math.round((horaActual % 1) * 60) // 35

          if(hora < 10) {
            hora = "0" + hora
          }
          if(minutos < 10) {
            minutos = "0" + minutos
          }

          if (!recordatorios[hora + ":" + minutos]) {
            recordatorios[hora + ":" + minutos] = [];
          }

          recordatorios[hora+":"+ minutos].push({ nombre:"probadno", descripcion:"tomar medicamento" })

          horaActual = (horaActual + frecuencia) % 24 // como el formato es de 24hs, sirve para q no se pase de ese horario
        }
    }
   //agregarRecordatorio("12:10",6)
   // console.log("-->",recordatorios)

    const date = new Date()
    const time = `${date.getHours()}:${date.getMinutes()}`

    console.log("TU TOKEN",tokenFB)

    if(!recordatorios[time]) {
      console.log("no hago nada")
    } else {
      console.log("LANZO NOTIFICACION")
      //NotificacionFB.enviarNotificacion({tokenFB})
     /* for(let i=0; i<recordatorios.length; i++) {
        console.log("a")
      }*/
      for(let clave of recordatorios[time]) {
        console.log("clave",clave.nombre)
        //NotificacionFB.enviarNotificacion({tokenFB, nombre: clave.nombre, descripcion: clave.descripcion})
      }
    }
    //console.log("RECOR",recordatorios[time])


   /* setInterval(() => {
      const date = new Date()
    const time = `${date.getHours()}:${date.getMinutes()}`

    console.log("TU TOKEN",tokenFB)

    if(!recordatorios[time]) {
      console.log("no hago nada")
    } else {
      console.log("LANZO NOTIFICACION")
      //NotificacionFB.enviarNotificacion({tokenFB})
     /* for(let i=0; i<recordatorios.length; i++) {
        console.log("a")
      }*/
      /*for(let clave of recordatorios[time]) {
        console.log("clave",clave.nombre)
        //NotificacionFB.enviarNotificacion({tokenFB, nombre: clave.nombre, descripcion: clave.descripcion})
      }
    }
    console.log(time)
    }, 1000 * 60)*/

    setInterval(() => {
      //console.log("holaa")
    //  NotificacionFB.enviarNotificacion({tokenFB, nombre: "porbando", descripcion: "testeansd"})
    }, 5000)
  
   useEffect( () => {
    /*if(usuarioLogueado) {
      RecordatoriosService.traerPorIdUsuario(usuarioLogueado._id)
      .then(resp => console.log("MONGO",resp))
    }*/
    
   }, [])

  return (
    <UsuarioContext.Provider value={{usuarioLogueado, setUsuarioLogueado}} >
      <SocketContext.Provider value={socket} >
        <RecordatoriosContext.Provider value={recordatorios} >
      {!usuarioLogueado && <NavbarEiraLanding />}
      {usuarioLogueado && <NavbarEira />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={onLogin}/>} />
        <Route path='/olvideCntrasena' element={<OlvideContrasena />} />
        <Route path='/recuperarContrasena/:token/:email' element={<RecuperarContrasena />} />
        <Route path='/profesional/pacientes' element={<ListaPacientes activarMensajes={activarMensajes} />} />
        <Route path='/historia-clinica/:id' element={<VerHistoriaClinica />} />
        <Route path='/tratamiento/:id' element={<Tratamiento />} />
        <Route path='/ver-tratamiento/:id' element={<VerTratamiento />} />
        <Route path='/editar-tratamiento/:id' element={<EditarTratamiento />} />
        <Route path='/mi-perfil/:id' element={<MiPerfilProfesional />} />
        <Route path='/editar-perfil/:id' element={<EditarPerfilProfesional />} />
        <Route path='/registro' element={<UsuarioRegistro />} />
        <Route path='/home/perfil-paciente/:id' element={<MiPerfilPaciente />} />
        <Route path='/paciente' element={<DashboardPaciente />} />
        <Route path='/paciente/editar-perfil/:id' element={<EditarPerfilPaciente />} />
        <Route path='/paciente/historia-clinica' element={<HistoriaClinicaPaciente />} />
        <Route path='/paciente/formulario-historia-clinica' element={<FormHistorialClinico />} />
        <Route path='/paciente/pedir-recetas' element={<PedirRecetas />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/admin' element={<DashboardAdmin />} />
        <Route path='/admin/medicos' element={<ListadoMedicos />} />
        <Route path='/admin/Pacientes' element={<ListadoPacientesAdmin />} />
        <Route path='/falta-verificacion' element={<MensajeFaltaVerificacion />} />
        <Route path='/medico' element={<DashboardMedico />} />
        <Route path='/solicitudes' element={<Solicitudes />} />
        <Route path='/paciente/solicitudes' element={<SolicitudesPacientes />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
      <Footer />
      <Toaster position="top-right" />
      </RecordatoriosContext.Provider>
      </SocketContext.Provider>
    </UsuarioContext.Provider>
  );
}

export default App;
