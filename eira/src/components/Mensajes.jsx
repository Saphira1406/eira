import React from 'react'
import { DateTime } from 'luxon'

//moment.locale('es-mx'); 
function Mensajes({mensaje, own}) {

  return (
    <div className={own ? "mensaje-own wrap text-end" : "wrap"}>
        <div><span className="chat-fondo">{mensaje.mensaje}</span></div>
        <div className="mt-2">{DateTime.fromISO(mensaje.created_at).toFormat('ff')}</div>
    
    </div>
  )
}

export default Mensajes