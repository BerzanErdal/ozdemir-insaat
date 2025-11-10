import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB0XtuVwX9Rer8Ey3u0YSW6BYOkQE5crV8",
  authDomain: "ozdemir-insaat-dc45a.firebaseapp.com",
  projectId: "ozdemir-insaat-dc45a",
  storageBucket: "ozdemir-insaat-dc45a.firebasestorage.app",
  messagingSenderId: "860395477723",
  appId: "1:860395477723:web:014adfdc1922a18daa0afe",
  measurementId: "G-PMNJ8GSBHF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);