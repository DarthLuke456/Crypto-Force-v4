// Importa las funciones necesarias desde Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    onAuthStateChanged, 
    signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBm9LKrV2iQhewuSFfw3E9Il79Lva2IwW8",
    authDomain: "crypto-force-456.firebaseapp.com",
    projectId: "crypto-force-456",
    storageBucket: "crypto-force-456.appspot.com",
    messagingSenderId: "909754364846",
    appId: "1:909754364846:web:ea53e8eb6c471e29728e3f",
    measurementId: "G-6LVWZQ6EB5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Cambia entre formularios de Registro e Inicio de Sesión
function toggleForms() {
    const registerFormContainer = document.querySelector('.register-container');
    const loginFormContainer = document.querySelector('.login-container');
    
    if (registerFormContainer.style.display === 'none') {
        registerFormContainer.style.display = 'block';
        loginFormContainer.style.display = 'none';
    } else {
        registerFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
    }
}

// Registro de usuario
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('Registro exitoso. Redirigiendo a dashboard...');
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            alert('Error en el registro: ' + error.message);
        });
});

// Inicio de sesión
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('Inicio de sesión exitoso. Redirigiendo a dashboard...');
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            alert('Error en el inicio de sesión: ' + error.message);
        });
});

// Inicio de sesión con Google
document.getElementById('googleLogin')?.addEventListener('click', function() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(() => {
            alert('Inicio de sesión con Google exitoso. Redirigiendo...');
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            alert('Error en el inicio de sesión con Google: ' + error.message);
        });
});

// Protección del dashboard
if (window.location.pathname.includes('dashboard.html')) {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            alert('Acceso no autorizado. Redirigiendo a inicio de sesión.');
            window.location.href = 'login.html';
        }
    });

    // Cerrar sesión
    document.getElementById('logout')?.addEventListener('click', function() {
        signOut(auth).then(() => {
            alert('Has cerrado sesión. Redirigiendo...');
            window.location.href = 'login.html';
        });
    });
}

// Alternar formularios
document.querySelectorAll('.toggle-form').forEach(button => {
    button.addEventListener('click', toggleForms);
});
