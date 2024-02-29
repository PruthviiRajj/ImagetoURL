import { initializeApp } from "firebase/compat/app";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import ref from "firebase/compat/database";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyBMBU0cOxpiyfNqggGQ8OQwONcHFuO2y8k",
    authDomain: "image-1cac7.firebaseapp.com",
    projectId: "image-1cac7",
    storageBucket: "image-1cac7.appspot.com",
    messagingSenderId: "842841816186",
    appId: "1:842841816186:web:c0d370ac9ad9383a6f0fc3",
    databaseURL : "https://image-1cac7-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };

  export  const fire = firebase.initializeApp(firebaseConfig);


  export const storage = firebase.storage();
  

  export default firebaseConfig;