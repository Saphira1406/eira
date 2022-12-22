import { useEffect, useState } from 'react'
import * as PacientesService from "../services/pacientes.service.js"
import * as ProfesionalesService from "../services/profesionales.service.js"
import IconoUsuarioAzul from '../imgs/icono-usuario-azul.png';

function ChatUsuarios({chat, usuarioLogueado}) {
    const [usuario, setUsuario] = useState([])

    useEffect(() => {
        // id del amigo chat
        const receptorId = chat?.usuarios.find((usuario) => usuario !== usuarioLogueado._id)
        !usuarioLogueado.matricula ?
          ProfesionalesService.traerPorId(receptorId)
          .then( usuario => setUsuario(usuario) ) :
          PacientesService.traerPorId(receptorId)
          .then( usuario => setUsuario(usuario) )
    }, [])

  return (
    <li className="hover">
      <div className="d-flex align-items-center mb-3">
        <img src={IconoUsuarioAzul} alt="" className="img-fluid me-1"/>
        <p className="mb-0">{usuario.nombre} {usuario.apellido}</p>
      </div>
    </li>
  );
}

export default ChatUsuarios;
