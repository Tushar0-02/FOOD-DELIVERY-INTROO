const firebaseConfig = {
    apiKey: "AIzaSyDEBDDod8WqNtmw8TjykZErzUMuPYnOgV4",
    authDomain: "food-eb59e.firebaseapp.com",
    projectId: "food-eb59e",
    storageBucket: "food-eb59e.appspot.com",
    messagingSenderId: "52058251970",
    appId: "1:52058251970:web:6b36ef3cf0da4c2172d15b"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  