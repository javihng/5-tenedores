import firebase from "firebase/app";

const firebaseConfig ={
    apiKey: "AIzaSyA1UQr6CNz6GWzK4Xe2G7eygfwOz7r8k-A",
    authDomain: "tenedores-e0591.firebaseapp.com",
    projectId: "tenedores-e0591",
    storageBucket: "tenedores-e0591.appspot.com",
    messagingSenderId: "719395759545",
    appId: "1:719395759545:web:9e9c5366492e3b269b0268"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);