import * as NotificacionMail from '../services/mail.services.js'
import fetch from 'node-fetch'
import { DateTime } from 'luxon'

function enviarNotificacionMail(req, res) {

    console.log(req.body)
    NotificacionMail.enviarNotificacionMail(req.body.email)
    .then((resp) => {
        resp ? res.status(200).json({response: true, message: "Se envió el correo"}) :
        res.status(404).json({
            response: false,
            message: "Hubo un error" //aaca
        })
    })
}

function enviarNotificacionFB(req, res) {
    const body = {
        "notification": {
            "title": "Recordatorio",
            "body": "Test push notification",
            "click_action": "http://localhost:3000/",
            "icon": "https://i.imgur.com/5zO5cce.png"
        },
        "to": `${req.body.tokenFB}`
    } // aca hacer un interval
   /* fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAA2OF-olk:APA91bEY5U2cYyMYfkBpaeO4aptN05ZQW8wMLZ004OYWI6-rwrizW2mruy0aMMdkpyUcVCfopWps-ThdhCrD1Z71uunXjNQFUfTadYiUQwoVIZpVjkRGysexOych9DnMOAU5a2PqQhOP'
        },
        body: JSON.stringify(body)
    })    
    .then( res => res.json())
    .then( resp => console.log(resp) )*/

    /*const timer = setInterval(() => {
        console.log("time time")
        
    }, 2000)*/
  
    console.log(req.body)
    const fecha = Date.now()
    //console.log(new Date(fecha))
    //console.log("fecha parseada", DateTime.fromISO('2017-05-15').toMillis())
    const finalizacion = DateTime.fromObject({ year: 2022, month: 12, day: 7, hour: 18, minute: 34 }).toMillis()
    console.log("convert", DateTime.fromISO('2023-01-08T02:59:00.000Z').toMillis())
  console.log(finalizacion)
    if(fecha <= finalizacion) {
        console.log("SIGO MANDANDO NOTIS")
    } else {
        console.log("NO MANDO, PARO")
    }
   


}

export {
    enviarNotificacionMail,
    enviarNotificacionFB
}