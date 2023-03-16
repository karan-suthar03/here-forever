
const firebaseConfig = {
    apiKey: "AIzaSyDjdHKJiE9_0-pGZTqfRWIc_YNvYh7dIyg",
    authDomain: "new-ascii-test.firebaseapp.com",
    projectId: "new-ascii-test",
    storageBucket: "new-ascii-test.appspot.com",
    messagingSenderId: "455636189959",
    appId: "1:455636189959:web:ceb7d59a1702505e86bba2",
    measurementId: "G-F38CHL5MY7"
};

firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref("button-trigger");

// add an event listener to the button
document.getElementById("my-button").addEventListener("click", () => {
    // generate a random number between 0 and 999
   const currentTime = new Date();

let hours = currentTime.getHours();
const minutes = currentTime.getMinutes().toString().padStart(2, '0');
const seconds = currentTime.getSeconds().toString().padStart(2, '0');
let amOrPm = hours < 12 ? 'AM' : 'PM';

if (hours === 0) {
  hours = 12;
} else if (hours > 12) {
  hours -= 12;
}

const formattedHours = hours.toString().padStart(2, '0');
const randomValue = `${formattedHours} ${minutes} ${seconds} ${amOrPm}`;
    
    // update the database with the random number
    dbRef.set(randomValue);
});

dbRef.on("value", (snapshot) => {
    const randomValue = snapshot.val();
    console.log("Value changed to: " + randomValue);

    // Your code to change the background color of the app goes here
});