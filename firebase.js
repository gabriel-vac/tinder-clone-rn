// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD8RWKGqOJU2kk7qS0z_w4i05U0P8FbFzA',
  authDomain: 'tinder-clone-eff04.firebaseapp.com',
  projectId: 'tinder-clone-eff04',
  storageBucket: 'tinder-clone-eff04.appspot.com',
  messagingSenderId: '754283445780',
  appId: '1:754283445780:web:0a1c8f8d6a7c2b52963101',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
