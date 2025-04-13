// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDEBDDod8WqNtmw8TjykZErzUMuPYnOgV4",
    authDomain: "food-eb59e.firebaseapp.com",
    projectId: "food-eb59e",
    storageBucket: "food-eb59e.firebasestorage.app",
    messagingSenderId: "52058251970",
    appId: "1:52058251970:web:6b36ef3cf0da4c2172d15b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login function
window.login = function(event) {
    event.preventDefault();  // Prevent form from reloading

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Clear previous error message
    errorMessage.innerText = "";

    // Check if the entered email and password match the specific admin credentials
    if (email === "tushar3@gmail.com" && password === "020202") {
        alert("Login successful! Welcome to the NGO page.");
        window.location.href = "admin.html"; // Redirect to NGO page
        return;
    }

    // If not the admin credentials, perform Firebase Authentication login
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful! Welcome " + userCredential.user.email);
            console.log("User:", userCredential.user);
            window.location.href = "customer.html"; // Redirect to donor page after successful login
        })
        .catch((error) => {
            console.error("Error Code:", error.code);
            console.error("Error Message:", error.message);

            // Display proper error message
            if (error.code === "auth/invalid-email") {
                errorMessage.innerText = "Invalid email format.";
            } else if (error.code === "auth/user-not-found") {
                errorMessage.innerText = "No user found with this email.";
            } else if (error.code === "auth/wrong-password") {
                errorMessage.innerText = "Incorrect password.";
            } else {
                errorMessage.innerText = "Login failed. Try again.";
            }
        });
};
