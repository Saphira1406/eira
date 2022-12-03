importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js");

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
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/manifest/images/icon-72x72.png"
    }

    return self.registration.showNotificaction(
        notificationTitle,
        notificationOptions
    )

});