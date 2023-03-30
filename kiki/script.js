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
const time1 = firebase.database().ref("time1");
const time2 = firebase.database().ref("time2");
dmsgs.set("");
userRef.get().then((doc) => {
    if (doc.exists) {
        db.collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const message = change.doc.data();
                    const messageElement = document.createElement('div');
                    const messageElementone = document.createElement('div');
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
                    messageElementone.appendChild(messageElement);
                    messageContainer.appendChild(messageElementone);
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
        messageInput.focus();
    }
});
addEmojis(['🫂','💕', '❤️', '😚', '😌', '😭', '🤣', '🥺', '😗', '🌚', '🙂', '😔', '💋', '🤤', '😩', '😝', '🍑', '🍒', '🤜', '🤛', '😍', '🥵', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '☺️', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😮\u200d💨', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🫣', '🤗', '🫡', '🤔', '🫢', '🤭', '🤫', '🤥', '😶', '😶\u200d🌫️', '😐', '😑', '😬', '🫠', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '😵\u200d💫', '🫥', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦵', '🦿', '🦶', '👣', '👂', '🦻', '👃', '🫀', '🫁', '🧠', '🦷', '🦴', '👀', '👁', '👅', '👄', '💋', '🩸', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻\u200d❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🪸', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🦣', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕\u200d🦺', '🐈', '🐈\u200d⬛', '🪶', '🐓', '🦃', '🦤', '🦚', '🦜', '🦢', '🦩', '🕊', '🐇', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐁', '🐀', '🐿', '🦔', '🐾', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🪹', '🪺', '🪵', '🌱', '🌿', '☘️', '🍀', '🎍', '🪴', '🎋', '🍃', '🍂', '🍁', '🍄', '🐚', '🪨', '🌾', '💐', '🌷', '🪷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌎', '🌍', '🌏', '🪐', '💫', '⭐️', '🌟', '✨', '⚡️', '☄️', '💥', '🔥', '🌪', '🌈', '☀️', '🌤', '⛅️', '🌥', '☁️', '🌦', '🌧', '⛈', '🌩', '🌨', '❄️', '☃️', '⛄️', '🌬', '💨', '💧', '💦', '🫧', '☔️', '☂️', '🌊', '🌫', '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '🫖', '☕️', '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊', '🥄', '🍴', '🍽', '🥣', '🥡', '🥢', '🧂', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '❤️\u200d🔥', '❤️\u200d🩹', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝']);
document.getElementById('bahar').classList.add('hidden');

function addEmojis(emojis) {
    const drawer = document.getElementById('drawer');
    for (const emoji of emojis) {
        const emojiDiv = document.createElement('div');
        emojiDiv.classList.add('emoji');
        emojiDiv.innerHTML = emoji;
        emojiDiv.onclick = () => addEmoji(emoji);
        drawer.appendChild(emojiDiv);
    }
}

function addEmoji(emoji) {
    let input = document.getElementById('input');
    let cursorPosition = input.selectionStart; // get current cursor position
    input.value = input.value.slice(0, cursorPosition) + emoji + input.value.slice(cursorPosition); // insert emoji at cursor position
    cursorPosition += emoji.length; // update cursor position
    input.setSelectionRange(cursorPosition, cursorPosition); // set cursor position to end of input field
    input.focus(); // set focus back to input field
}

function toggleEmojiDrawer() {
    drawer.style.pointerEvents = 'auto';
    if (drawer.classList.contains('hidden')) {
        drawer.classList.remove('hidden');
        document.getElementById('bahar').classList.remove('hidden');
    } else {
        drawer.classList.add('hidden');
        document.getElementById('bahar').classList.add('hidden');
        drawer.style.pointerEvents = 'none';
    }
    document.getElementById('input').focus();
}
if (drawer.classList.contains('hidden')) {
    drawer.style.pointerEvents = 'none';
}
let emojiButton = document.getElementById('emoji-button');
document.addEventListener('click', function(event) {
    let baharDiv = document.getElementById('bahar');
    let targetElement = event.target;
    if (!baharDiv.contains(targetElement) && !emojiButton.contains(targetElement.closest('.ok'))) {
        // user clicked outside of the #bahar div and the clicked element is not an emoji button or its child element, run your specific function here
        console.log('User clicked outside of the #bahar div');
        drawer.classList.add('hidden');
        document.getElementById('bahar').classList.add('hidden');
        drawer.style.pointerEvents = 'none';
    }
});
