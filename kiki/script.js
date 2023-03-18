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
var params = new URLSearchParams(window.location.search);
var username = params.get("data");
const db = firebase.firestore();
const messageContainer = document.querySelector('.messages');
const userRef = db.collection('users').doc(username);
const dmsgs = firebase.database().ref("msgs");
dmsgs.set("");
userRef.get().then((doc) => {
    if (doc.exists) {
        db.collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const message = change.doc.data();
                    const messageElement = document.createElement('li');
                    const textElement = document.createElement('div');
                    const textNode = document.createTextNode(message.message);
                    const avatarElement = document.createElement('div');
                    avatarElement.className = 'avatar';
                    if (message.message.startsWith(username)) {
                        messageElement.className = 'message right appeared';
                    } else {
                        messageElement.className = 'message left appeared';
                    }
                    var text = textNode.nodeValue;
                    const textWrapperElement = document.createElement('div');
                    textWrapperElement.className = 'text_wrapper';
                    var textToRemove1 = "karan: "
                    var textToRemove2 = "chanchal00: "
                    if (text.indexOf(textToRemove1) === 0) {
                        text = text.replace(new RegExp("^" + textToRemove1), "");
                    } else if (text.indexOf(textToRemove2) === 0) {
                        text = text.replace(new RegExp("^" + textToRemove2), "");
                    }
                    const editedTextNode = document.createTextNode(text);
                    textElement.appendChild(editedTextNode);
                    messageElement.appendChild(avatarElement);
                    textWrapperElement.appendChild(textElement);
                    messageElement.appendChild(textWrapperElement);
                    messageContainer.appendChild(messageElement);
                    messageContainer.scrollTop = messageContainer.scrollHeight;
                }
            });
        });
    } else {
        console.log('User does not exist');
    }
}).catch((error) => {
    console.log('Error getting user:', error);
});
const sendMessageButton = document.querySelector('.send_message');
const messageInput = document.querySelector('.message_input');
messageInput.addEventListener("keydown", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        const messageText = messageInput.value.trim();
        if (messageText != "") {
            db.collection('messages').add({
                message: `${username}: ${messageText}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        messageInput.value = '';
    }
});
sendMessageButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
        db.collection('messages').add({
            message: `${username}: ${messageText}`,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        messageInput.value = '';
    }
});