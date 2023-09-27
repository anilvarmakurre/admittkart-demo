// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBo18-BqDAnJGHPaiQMNHl5Yz9dGxaiw_8",
    authDomain: "otp-app-b1226.firebaseapp.com",
    projectId: "otp-app-b1226",
    storageBucket: "otp-app-b1226.appspot.com",
    messagingSenderId: "532193557755",
    appId: "1:532193557755:web:c631c8a532d4f73d3c845e"

}
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);