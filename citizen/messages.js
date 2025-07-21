// Sidebar toggle (same as your dashboard.js)
document.getElementById("moreOptions").addEventListener("click", () => {
  document.getElementById("sideNav").classList.toggle("active");
});
document.querySelector(".back-btn").addEventListener("click", e => {
  e.preventDefault();
  document.getElementById("sideNav").classList.remove("active");
});

// --- Firebase Setup ---
// Your Firebase config - REPLACE with your own project's config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Dummy contacts (same as before)
const contacts = [
  { id: 1, name: "Alice", avatar: "A", messages: [
    { from: "Alice", text: "Hey! Have you reported the incident?", time: "10:15 AM" },
    { from: "You", text: "Not yet, planning to do it today.", time: "10:17 AM" }
  ]},
  { id: 2, name: "Bob", avatar: "B", messages: [
    { from: "Bob", text: "The traffic is crazy today.", time: "09:30 AM" },
    { from: "You", text: "Yeah, I got stuck for 30 minutes!", time: "09:32 AM" }
  ]},
  { id: 3, name: "Charlie", avatar: "C", messages: [
    { from: "Charlie", text: "Remember to check out the new reports page.", time: "Yesterday" }
  ]},
];

const contactsListEl = document.getElementById("contactsList");
const chatHeaderEl = document.getElementById("chatHeader");
const chatMessagesEl = document.getElementById("chatMessages");
const chatInputEl = document.getElementById("chatInput");
const sendBtnEl = document.getElementById("sendBtn");

let selectedContactId = null;

// Render contacts list
function renderContacts() {
  contactsListEl.innerHTML = "";
  contacts.forEach(contact => {
    const div = document.createElement("div");
    div.className = "contact-item" + (contact.id === selectedContactId ? " active" : "");
    div.dataset.id = contact.id;

    const avatar = document.createElement("div");
    avatar.className = "contact-avatar";
    avatar.textContent = contact.avatar;

    const name = document.createElement("div");
    name.className = "contact-name";
    name.textContent = contact.name;

    div.appendChild(avatar);
    div.appendChild(name);

    div.addEventListener("click", () => {
      selectedContactId = contact.id;
      renderContacts();
      openChat(contact.id);
    });

    contactsListEl.appendChild(div);
  });
}

// Append message to chat window
function appendMessage(type, text, time = "") {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message " + type;
  msgDiv.textContent = text;

  if (time) {
    const timeSpan = document.createElement("div");
    timeSpan.style.fontSize = "0.7rem";
    timeSpan.style.opacity = "0.6";
    timeSpan.style.marginTop = "3px";
    timeSpan.textContent = time;
    msgDiv.appendChild(timeSpan);
  }

  chatMessagesEl.appendChild(msgDiv);
  scrollToBottom();
}

// Scroll chat to bottom
function scrollToBottom() {
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

// Open chat with selected contact and listen for realtime messages
function openChat(contactId) {
  const contact = contacts.find(c => c.id === contactId);
  if (!contact) return;

  chatHeaderEl.textContent = contact.name;
  chatMessagesEl.innerHTML = "";

  chatInputEl.disabled = false;
  sendBtnEl.disabled = false;
  chatInputEl.focus();

  // Listen for messages in Firebase for this contact
  listenForMessages(contactId);
}

// Listen for messages realtime from Firebase
function listenForMessages(contactId) {
  const messagesRef = database.ref('messages/' + contactId);
  
  // Remove any previous listeners to avoid duplicates
  messagesRef.off();

  chatMessagesEl.innerHTML = "";

  messagesRef.on('child_added', snapshot => {
    const msg = snapshot.val();
    if (!msg) return;

    const type = msg.from === "You" ? "sent" : "received";
    appendMessage(type, msg.text, msg.time);
  });
}

// Send message to Firebase Realtime Database
function sendMessage() {
  const text = chatInputEl.value.trim();
  if (!text || !selectedContactId) return;

  const contact = contacts.find(c => c.id === selectedContactId);
  if (!contact) return;

  const newMsgRef = database.ref('messages/' + contact.id).push();
  newMsgRef.set({
    from: "You",
    text: text,
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  });

  chatInputEl.value = "";
  chatInputEl.focus();
}

// Event listeners for send button and enter key
sendBtnEl.addEventListener("click", () => {
  sendMessage();
});

chatInputEl.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

// Initialize contacts list
renderContacts();
function sendMessage() {
  const text = chatInputEl.value.trim();
  if (!text || !selectedContactId) return;

  const contact = contacts.find(c => c.id === selectedContactId);
  if (!contact) return;

  const messagesRef = database.ref('messages/' + contact.id);

  // Send your message
  messagesRef.push().set({
    from: "You",
    text: text,
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  });

  chatInputEl.value = "";
  chatInputEl.focus();

  // Simulate a reply after 2 seconds
  setTimeout(() => {
    messagesRef.push().set({
      from: contact.name,
      text: "Thanks for your message! We'll get back to you soon.",
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
  }, 2000);
}