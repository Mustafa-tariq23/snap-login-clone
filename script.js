// Include Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBkVF6_gNBSf6X_Mms_dmfZDplwgoPnzl4",
  authDomain: "loginsignupis.firebaseapp.com",
  projectId: "loginsignupis",
  storageBucket: "loginsignupis.firebasestorage.app",
  messagingSenderId: "599858791279",
  appId: "1:599858791279:web:93a8d164c3988f3b035e9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Switch between Login and Signup forms
function switchForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginText = document.getElementById('loginText');
    const signupText = document.getElementById('signupText');

    if (formType === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        loginText.classList.add('active');
        signupText.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        loginText.classList.remove('active');
        signupText.classList.add('active');
    }
}

// Handle Login
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        // Add login credentials to Firestore
        await addDoc(collection(db, 'loginCredentials'), {
            username: username,
            password: password,
            timestamp: new Date()
        });

        alert('Login credentials saved!');
    } catch (error) {
        alert(`Failed to save login: ${error.message}`);
    }
});

// Handle Signup
document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic client-side validation
    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        // Add signup credentials to Firestore
        await addDoc(collection(db, 'signupCredentials'), {
            username: username,
            email: email,
            password: password,
            timestamp: new Date()
        });

        alert('Signup credentials saved!');
    } catch (error) {
        alert(`Failed to save signup: ${error.message}`);
    }
});

// Expose switchForm to global scope for onclick handler
window.switchForm = switchForm;