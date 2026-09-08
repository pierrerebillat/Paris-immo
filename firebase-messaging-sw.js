// Service worker Firebase Cloud Messaging — Paris Immo
// Doit être servi depuis la racine de l'app (même dossier que index.html).
// Quand l'app est fermée ou en arrière-plan, le SDK affiche automatiquement les
// messages qui contiennent un bloc `notification` (titre, corps, icône) et ouvre
// `webpush.fcm_options.link` au clic — les deux sont fournis par le job.
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBUJUwmAALNCtlqKmz1FTBUew9Rv_0rEWo",
  authDomain: "paris-immo-26595.firebaseapp.com",
  projectId: "paris-immo-26595",
  storageBucket: "paris-immo-26595.firebasestorage.app",
  messagingSenderId: "305267172723",
  appId: "1:305267172723:web:8b457a1bb4a7850f5d1106"
});

const messaging = firebase.messaging();

// Messages « data only » (sans bloc notification) : on affiche nous-mêmes.
messaging.onBackgroundMessage(payload => {
  if (payload.notification) return; // déjà affiché par le SDK
  const d = payload.data || {};
  self.registration.showNotification(d.title || '🏠 Paris Immo', {
    body: d.body || 'Nouvelle annonce',
    icon: 'icons/icon-192.png',
    badge: 'icons/badge-72.png',
    data: d,
    tag: d.annonceId || 'paris-immo',
    vibrate: [200, 100, 200],
  });
});

self.addEventListener('notificationclick', event => {
  const url = event.notification?.data?.url;
  if (!url) return; // le SDK gère le clic des messages avec fcm_options.link
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
