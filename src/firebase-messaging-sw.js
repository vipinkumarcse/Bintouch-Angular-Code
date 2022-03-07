importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyD2yivQtq-Tjqpe8hNmQoyhKHGBcv-9o38",
    authDomain: "omega-art-265906.firebaseapp.com",
    projectId: "omega-art-265906",
    storageBucket: "omega-art-265906.appspot.com",
    messagingSenderId: "653339509277",
    appId: "1:653339509277:web:f6cab6d293b27d718fbcf4",
    measurementId: "G-2YV3PFPEQ4"
  });
  try {

    const messaging = firebase.messaging();
    if('serviceWorker' in navigator) { 
        navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
       console.log("Service Worker Registered");
      messaging.useServiceWorker(registration);  
        }); 
        }

    messaging.setBackgroundMessageHandler(function(payload) {
      console.log("message firbase js payload"+JSON.stringify(payload));
      const notificationTitle = payload.data.title;
      const notificationOptions = {
          body: payload.data.body,
          icon: ''
      };
    
      return self.registration.showNotification(notificationTitle, notificationOptions);
    });
  } catch(e) {
    console.log(e)
  }