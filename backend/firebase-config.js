// const firebaseConfig = {
//     apiKey: "AIzaSyCKI-h-Siv2_gnTFhuUk-D9OY4DgQ2pYVk",
//     authDomain: "weshare-76b77.firebaseapp.com",
//     projectId: "weshare-76b77",
//     storageBucket: "weshare-76b77.appspot.com",
//     messagingSenderId: "376288806772",
//     appId: "1:376288806772:web:b542decaae7dc046534e21"
// };

// export { firebaseConfig };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Initialize Firebase
const firebaseApplication = initializeApp(firebaseConfig);
const firebaseStorage = getStorage();
const firebaseDatabase = getDatabase();

export { firebaseStorage, firebaseDatabase };