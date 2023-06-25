import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";



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


var email = document.getElementById('email')
var password = document.getElementById('password')

window.login=function(e){
    e.preventDefault();
    var obj={
        email:email.value,
        password:password.value,

    };
    signInWithEmailAndPassword(auth,obj.email,obj.password)
    .then(function(success){
        console.log(success.user.uid)
        alert("Loggined Successfully")
        window.location.href = "dashboard.html"
    })
    .catch(function(err){
        alert("login error "+err)
    })
    
    console.log(obj)
}

