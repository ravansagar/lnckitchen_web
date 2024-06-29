import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAyA73k-WoGcOe6V2HUG3IibF3672tDFpA",
    authDomain: "lnckitchen-brt.firebaseapp.com",
    projectId: "lnckitchen-brt",
    storageBucket: "lnckitchen-brt.appspot.com",
    messagingSenderId: "656428632077",
    appId: "1:656428632077:web:e9d0f8c5459b005cd6ad44",
    measurementId: "G-1N9WZVD5NW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const messaging = getMessaging(app);
export { app, analytics, auth, database, messaging };
