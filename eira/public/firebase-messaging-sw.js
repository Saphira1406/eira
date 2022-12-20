importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js");

//const tokenFB = localStorage.getItem('tokenFB')

const firebaseConfig = {
  apiKey: "AIzaSyC2nrnEyqKMlhuM5C0JD0Gvt8b4-oY795g",
  authDomain: "eira-37fcb.firebaseapp.com",
  projectId: "eira-37fcb",
  storageBucket: "eira-37fcb.appspot.com",
  messagingSenderId: "931496108633",
  appId: "1:931496108633:web:b799aed8d3db9395e28748"
};

// eslint-disable-next-line no-undef
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload => {
    console.log("recibiste una noti cuando no estabas.,");
    /*const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/manifest/images/icon-72x72.png"
    }*/

    self.addEventListener('push', function(event) {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: "/manifest/images/icon-72x72.png"
        }
        event.waitUntil(
          self.registration.showNotification(notificationTitle, notificationOptions)
        );
      });

    /*return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    )*/
});

const recordatorios = {
    "20:34": [
      {
        "nombre": "ibuprofeno"
      },
      {
        "nombre": "tafirol"
      }
    ],
    "20:35": [
      {
        "nombre": "aspirina"
      },
      {
        "nombre": "levotiroxina"
      }
    ]
  };
 
setInterval(() => {
   /* self.registration.showNotification("aaaaaaaa", {
        body: "descrip",
        
      });*/
      const localStorage = self.window.localStorage;
      const tokenFB = localStorage.getItem('tokenFB')
      const date = new Date()
      /* y como puedo hacer que en el service worker, tengo una objeto como este, recordatorios = { "11:30": [{"nombre": "ibuprofeno"}, {"nombre": "tafirol"}], "14:30": [{"nombre": "aspirina"}, {"nombre": "levotiroxina"}]}, y lo que quiero es que pregunte si el horario es el actual, haga un console log*/
      const horaC = date.getHours() < 10 ?  `0${date.getHours()}` : date.getHours()
      const minutosC = date.getMinutes() < 10 ?  `0${date.getMinutes()}` : date.getMinutes()
      
      let horaActual = `${horaC}:${minutosC}`
      const horarios = Object.keys(recordatorios)

      for(let i=0; i< horarios.length; i++){
        let clave = horarios[i];
        if(horarios[i] === horaActual) {
            console.log("Lanzo notifiacion push", recordatorios[clave])
            for (let recordatorio of recordatorios[clave]) {
                console.log(recordatorio.nombre);
                const body = {
                  "notification": {
                      "title": recordatorio.nombre,
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
            //console.log(recordatorios[clave][0].nombre);
        }
       
      }
        
  }, 1000 * 60)