import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Debug log
console.log('Firebase Config Loading:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
});

const firebaseConfig = {
  apiKey: "AIzaSyA8qTIH0z6Kjt4l7Sa9x2q-UZi6uD7zTiI",
  authDomain: "dashboard-ff375.firebaseapp.com",
  projectId: "dashboard-ff375",
  storageBucket: "dashboard-ff375.firebasestorage.app",
  messagingSenderId: "186191113586",
  appId: "1:186191113586:web:d92c4686f27e7ae817c1eb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
// import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
// import { getFirestore } from 'firebase/firestore'
// import { getStorage } from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)

// // Initialize Firebase services
// export const auth = getAuth(app)
// export const db = getFirestore(app)
// export const storage = getStorage(app)

// export default app