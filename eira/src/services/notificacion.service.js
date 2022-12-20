async function guardarNotificacion({tokenFB, finalizacion}) {
    return fetch(`http://localhost:2020/api/notificacionFB`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({tokenFB, finalizacion})
    })
    .then(response => response.json())

}

async function enviarNotificacion(tokenFB, nombre) {
    const body = {
        "notification": {
            "title": nombre,
            "body": `hola`,
            "click_action": "http://localhost:3000/",
            "icon": "https://i.imgur.com/5zO5cce.png"
        },
        "to": `${tokenFB}`
    } 
    fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAA2OF-olk:APA91bEY5U2cYyMYfkBpaeO4aptN05ZQW8wMLZ004OYWI6-rwrizW2mruy0aMMdkpyUcVCfopWps-ThdhCrD1Z71uunXjNQFUfTadYiUQwoVIZpVjkRGysexOych9DnMOAU5a2PqQhOP'
        },
        body: JSON.stringify(body)
    })    
    .then( res => res.json())
}

export {
    guardarNotificacion,
    enviarNotificacion
}