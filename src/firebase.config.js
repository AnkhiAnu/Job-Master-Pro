
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLAd5s-XEJEAhq-jC0f5LSWVAQphinSNU",
  authDomain: "online-job-portal-aa4cd.firebaseapp.com",
  projectId: "online-job-portal-aa4cd",
  storageBucket: "online-job-portal-aa4cd.firebasestorage.app",
  messagingSenderId: "943055228628",
  appId: "1:943055228628:web:56e2523f4e8df4a77d7541"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{db};

