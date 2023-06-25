import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";



const firebaseConfig = {
    apiKey : "AIzaSyA0eTXsZY1xnw4Uq_XDxz1ScyDF5y9Jh8w",
    authDomain: "login-5bd39.firebaseapp.com",
    projectId: "login-5bd39",
    storageBucket: "login-5bd39.appspot.com",
    messagingSenderId: "496887687154",
    appId: "1:496887687154:web:5198d820cfefe651e52d6b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();


var username = document.getElementById('username')
var email = document.getElementById('email')
var password = document.getElementById('password')
var confirmpassword = document.getElementById('confirmpassword')

window.signup=function(e){
    e.preventDefault();
    var obj={
        username:username.value,
        email:email.value,
        password:password.value,
        confirmpassword:confirmpassword.value,
    }
    createUserWithEmailAndPassword(auth,obj.email,obj.password)
    .then(function(success){
        alert("Signup Successful")
    })
    .catch(function(err){
        alert("error"+err)
    })
    console.log(obj)
};
